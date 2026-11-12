# PWA-Core – API- en gegevenscontracten

Status: analyse op 12 november 2026. Gebaseerd op de actuele hoofdbranches van MW4-CAMO, Energieverbruik, Games Backlog, Cryptotracker en Vaste Lasten, plus de PWA-Template 1.5.0 op main, inclusief de door de gebruiker bevestigde gerichte twee-apparatentests. Dit document beschrijft de contracten; het is nog geen bewijs van runtime- of praktijktest.

## 1. Reikwijdte en migratievolgorde

Alle vijf apps blijven binnen het programma:

1. MW4-CAMO
2. Energieverbruik
3. Games Backlog
4. Cryptotracker
5. Vaste Lasten

De eerste PWA-Core-release richt zich op de modulaire familie: MW4-CAMO, Energieverbruik en Games Backlog. Deze drie hebben identieke Git-blob-hashes voor de twaalf bestaande kern-/basebestanden. PWA-Template is de bronbasis voor nieuwe apps. Versie 1.5.0 is gemerged en de gerichte handmatige twee-apparatentests zijn door de gebruiker succesvol bevestigd; bredere platform- en contracttests blijven nog open.

Cryptotracker en Vaste Lasten blijven in scope, maar zijn geen directe kopieermigraties: Cryptotracker heeft een monolithische app.js met eigen opslag, versleuteling en synchronisatie; Vaste Lasten heeft de werking in één grote index.html en een eigen gegevens-/syncmodel. Eerst volgt voor elk een afzonderlijke adapter-/refactoranalyse. Er wordt geen gedeelde core geforceerd.

## 2. Runtimegrens: app en kern

De kernbestanden worden op dezelfde paden in de app-repository geplaatst. Ze worden lokaal vanaf de eigen GitHub Pages-origin geladen en in de service-worker-cache opgenomen. De runtime importeert nooit code rechtstreeks uit PWA-Core of via een CDN.

### 2.1 Configuratiecontract: js/config.js

De kern verwacht `export const APP` met minimaal:

- `name`: zichtbare appnaam;
- `version`: appversie (SemVer; niet de core-versie);
- `storagePrefix`: vaste, unieke prefix per app; na ingebruikname nooit wijzigen;
- `defaultDataPath` en `defaultBranch`: standaardlocatie van de versleutelde kluis;
- `autoLockMinutes`, `autoBiometricUnlock`, `syncDelaySeconds`;
- `minPasswordLength`, `kdfIterations`.

De drie modulaire apps gebruiken dezelfde configuratiestructuur en dezelfde waarden voor de generieke instellingen. Hun eigen naam, versie, opslagprefix en datapad verschillen. De huidige opslagprefixen zijn `mw4-camo`, `energieverbruik` en `games-backlog`.

### 2.2 App-contract: js/app.js

De schil importeert `app` uit `../app.js`. Verplichte eigenschappen:

- `schemaVersion`: hoogste ondersteunde app-dataschema;
- `screens`: lijst met `{ id, label, icon }`;
- `initialData()`: lege beginstructuur;
- `migrate(data)`: oude data naar het huidige app-schema brengen;
- `merge(local, remote)`: twee app-datasets samenvoegen;
- `render(root, ctx)`: huidig scherm tekenen.

Optioneel:

- `renderSettings(page, element, ctx)`: app-eigen instellingenpagina;
- aanvullende app-eigen eigenschappen en functies, zolang de generieke kern die niet overschrijft.

Regels voor de app-implementatie:

- `migrate` en `merge` behouden onbekende velden op hoofdniveau, waaronder `__pwaSync`;
- `merge` is deterministisch en behoudt records uit beide kanten;
- recordcollecties gebruiken `id` en `updatedAt`; verwijderingen worden niet als definitief ontbreken geïnterpreteerd;
- de app muteert `ctx.data` niet rechtstreeks.

### 2.3 Contextcontract: ctx

De kern levert aan `render`:

- `data` (alleen lezen);
- `update(mutator)` (asynchroon; mutator krijgt een wijzigbare kopie);
- `toast(message, kind)`, `confirm(message)`;
- `screen`, `go(id)`, `setBadge(id, count)`;
- `openSettings(page)`, `showShellSettings(group)`;
- `syncConfigured` (boolean);
- `readSyncFile(path)` (asynchroon; `{ sha, text }` of `null`).

De contracttests moeten controleren dat deze eigenschappen beschikbaar zijn en dat `update` de wijziging opslaat voordat de promise is afgerond.

## 3. Opslag- en versleutelingscontract

### 3.1 Lokale opslag

De kern gebruikt een app-eigen namespace op basis van `APP.storagePrefix`, onder meer voor:

- `<prefix>:vault`: versleutelde kluis-envelop;
- `<prefix>:device`: versleutelde apparaatinstellingen;
- `<prefix>:sync`: lokale synchronisatiestatus;
- `<prefix>:device-id`: willekeurig apparaat-ID;
- `<prefix>:biometric`: lokaal passkey-/PRF-record;
- aanvullende instellingen voor navigatie en de schil.

Geen app mag de prefix van een andere app gebruiken. App-gegevens en apparaatinstellingen blijven versleuteld; het apparaat-ID bevat geen gebruikersgegevens.

### 3.2 Kluis-envelop

De huidige envelop heeft deze vorm:

```json
{
  "format": "pwa-vault",
  "version": 1,
  "kdf": { "name": "PBKDF2-SHA256", "iterations": 600000, "salt": "…" },
  "wrappedKey": { "iv": "…", "data": "…" },
  "payload": { "iv": "…", "data": "…" },
  "updatedAt": 0
}
```

De wachtwoordsleutel wordt met PBKDF2-SHA256 afgeleid; de datasleutel en payload gebruiken AES-GCM. De payload bevat het app-datamodel. De envelope-versie staat los van de app-`schemaVersion` en de PWA-Core-versie.

### 3.3 Passkeys

WebAuthn PRF levert een geheim dat via HKDF wordt gebruikt om de datasleutel lokaal in te pakken. De PRF-invoer en opslagkeys zijn per app afgeleid van `storagePrefix`. De kern ondersteunt ook het opnieuw koppelen van een bestaande passkey. Een wachtwoord blijft de terugvaloptie.

Passkey-tests zijn platformtests en geen gewone Node-unit-tests. Test minimaal Safari op iPhone/iPad en een Windows-browser met Windows Hello; controleer ook de wachtwoord-terugval. Een passkey-record op één apparaat wordt niet als bewijs gezien dat een ander apparaat is ingericht.

## 4. Synchronisatiecontract

### 4.1 GitHub-client

`createClient(settings)` verwacht:

`{ owner, repo, branch, path, token }`

De client leest en schrijft één bestand via de GitHub Contents API. Een upload gebruikt de eerder opgehaalde SHA als voorwaarde; een conflict wordt als `ConflictError` gemeld. Tokens worden uitsluitend lokaal ingevoerd en mogen nooit in tests, logs, fixtures of PWA-Core terechtkomen.

### 4.2 syncNow

`syncNow({ settings, merge, migrate, schemaVersion })` levert één van:

- `up-to-date`
- `uploaded`
- `downloaded`
- `merged`
- `restored`

De kern voorkomt gelijktijdige sync-runs, controleert of lokale data tijdens het ophalen veranderde en probeert GitHub-conflicten beperkt opnieuw. Remote data met een hoger app-schema blokkeert synchronisatie met `UpdateRequiredError`.

De 1.5.0-variant bereidt vóór sync de verwijderadministratie voor en schrijft na het ophalen ook de bijgewerkte administratie terug. Dit wijkt bewust af van de oudere sync-implementatie.

## 5. Record- en verwijdercontract

### 5.1 Records

De generieke helpers zijn:

- `newRecord(fields)`: maakt `id`, `createdAt` en `updatedAt`;
- `alive(list)`: filtert verwijderde records uit de weergave;
- `findById(list, id)`;
- `updateById(list, id, changes)`;
- `removeById(list, id)`: schrijft een tombstone;
- `mergeCollections(local, remote)`: per ID wint de nieuwste `updatedAt`; bij gelijke tijd wint lokaal;
- `purgeTombstones(list, days)`: verwijdert oude tombstones uit de collectie.

### 5.2 Verwijderadministratie in 1.5.0

De nieuwe module `deletions.js` voegt `__pwaSync` toe aan de versleutelde app-data:

```json
{
  "__pwaSync": {
    "version": 1,
    "devices": {
      "device-id": {
        "createdAt": 0,
        "lastSeenAt": 0,
        "acknowledged": { "collectie:record-id": 0 }
      }
    },
    "deletions": { "collectie:record-id": 0 }
  }
}
```

Een verwijdering wordt geïdentificeerd met collectiepad plus record-ID. Actieve apparaten bevestigen welke verwijderingen zij hebben verwerkt. Tombstones kunnen worden opgeruimd zodra alle actieve apparaten de verwijdering hebben bevestigd; de graveyard blijft bestaan om oude back-ups en lang offline apparaten te blokkeren. Een afgemeld apparaat mag niet opnieuw deelnemen.

Dit is een apart contract naast het app-dataschema. De app-merge moet `__pwaSync` behouden. De kern combineert de administratie onafhankelijk van de app-specifieke merge en past de graveyard na samenvoegen opnieuw toe.

## 6. Compatibiliteitsmatrix

| Onderdeel | MW4-CAMO | Energieverbruik | Games Backlog | Cryptotracker | Vaste Lasten |
|---|---|---|---|---|---|
| Modulaire `js/core/` | Ja | Ja | Ja | Nee | Nee |
| Zelfde 12 core-/base-hashes | Ja | Ja | Ja | n.v.t. | n.v.t. |
| App-merge behoudt onbekende top-level velden | Ja, spread + collecties | Ja, spread + collecties | Ja, spread + collecties | Eigen merge; apart beoordelen | Eigen merge; apart beoordelen |
| Records/tombstones | `progress`, `pins`, `loadouts` | 8 collecties | `games`, `gameInfo` | Eigen `del`/deleted administratie | Eigen model |
| Huidig app-schema | 4 | 5 | 9 | Eigen DATA_V | Eigen versie-/datamodel |
| Eerste migratiegroep | 1 | 2 | 3 | Later apart | Later apart |

### Specifieke aandachtspunten

- Energieverbruik en Games Backlog ruimen tombstones na 180 dagen op tijdens `migrate`; de blijvende `__pwaSync.deletions`-graveyard moet voorkomen dat oude records terugkomen.
- MW4 bewaart verwijdermarkeringen al bewust en gebruikt vaste record-ID's voor camo-voortgang.
- De drie modulaire apps gebruiken verschillende app-schema's. De kern mag deze schema's niet gelijk trekken of zelf verhogen.
- Cryptotracker gebruikt onder meer `data.v`, eigen `deleted`-administratie, eigen sync/crypto en een eigen conflictstrategie. Vaste Lasten verdeelt data bovendien over gedeelde en persoonsgebonden bestanden. Beide vragen een eigen analyse en migratieontwerp.

## 7. Verplichte geautomatiseerde compatibiliteitstests

De tests draaien zonder echte GitHub-repository, tokens of gebruikersdata. Gebruik synthetische data en een nep-GitHub-client/fetch.

### A. Publieke interface
1. Configuratie bevat alle vereiste APP-velden; opslagprefixen van fixtures zijn uniek.
2. De app-export voldoet aan het contract en de kern kan starten met een minimale test-app.
3. Alle ctx-methodes bestaan; `ctx.update` is asynchroon en markeert data als gewijzigd.

### B. Kluis en versleuteling
4. Envelope round-trip: aanmaken, opslaan, openen en payload teruglezen.
5. Verkeerd wachtwoord en beschadigde envelope worden veilig geweigerd.
6. Een onbekende toekomstige envelope-versie wordt geweigerd zonder lokale data te overschrijven.
7. Meerdere snelle updates worden in volgorde opgeslagen; `flush` wacht op de laatste revisie.
8. Apparaatinstellingen zijn niet leesbaar zonder de datasleutel.

### C. Synchronisatie
9. Geen remote bestand → eerste upload.
10. Alleen lokaal gewijzigd → upload met SHA.
11. Alleen remote gewijzigd → downloaden en veilig toepassen.
12. Beide gewijzigd → app-merge, zonder onbekende top-level velden te verliezen.
13. Gelijktijdige wijziging/conflict → beperkte retry zonder overschrijven van nieuwere data.
14. Remote app-schema hoger → sync stopt met updateverzoek.
15. Lokale wijziging tijdens remote fetch → sync start opnieuw.
16. Een mislukte upload laat de lokale data als dirty gemarkeerd.

### D. Verwijderingen en herstel
17. Verwijdering op apparaat A wordt na sync niet teruggezet door apparaat B.
18. Apparaat B is langdurig offline; na terugkeer blijft de verwijdering gelden.
19. Een oude back-up brengt een verwijderd record niet terug.
20. Tombstone-opruiming gebeurt pas nadat alle actieve apparaten hebben bevestigd.
21. Een afgemeld apparaat kan niet opnieuw registreren.
22. Een record-ID in twee verschillende collecties veroorzaakt geen kruisverwijdering.
23. Een verwijdering blijft gelden bij gelijktijdige wijziging van hetzelfde record.
24. Herstel van back-up behoudt de actuele graveyard; een onleesbare remote kluis wordt nooit blind overschreven.

### E. App-integratie en distributie
25. De manifestbestanden en checksums komen exact overeen met de release.
26. Alle core-modules staan in de service-worker-PRECACHE.
27. De test-app start online en na een eerste cachevulling offline.
28. Per ontvangende app draaien de eigen unit-/E2E-tests; onbekende velden en collecties blijven behouden.
29. Een update opent een PR op een aparte branch; geen directe wijziging van main en geen automatische merge.

## 8. Praktijktests vóór de eerste stabiele release

De volgende 1.5.0-scenario's zijn op 12 november 2026 uitgevoerd in de geïsoleerde testapp `Gertjun/PWA-Template-Test`, met een afzonderlijke privé-testdatarepo. De uitkomsten hieronder zijn door de gebruiker op twee apparaten bevestigd:

- Synchronisatie in beide richtingen en het koppelen van een tweede apparaat: geslaagd.
- Apparaat B offline houden, op A een record verwijderen, B weer online brengen en synchroniseren: het verwijderde record kwam niet terug.
- Een eerdere back-up herstellen op A en daarna op B: het verwijderde record bleef op beide apparaten verwijderd.
- Een apparaat afmelden: het apparaat kon daarna niet meer synchroniseren en kreeg de verwachte melding dat het was afgemeld.
- Het afgemelde apparaat wissen en opnieuw koppelen: de oude afmelding bleef zichtbaar en de nieuwe koppeling verscheen als een nieuwe apparaatregistratie.
- Verwijderbevestigingen controleren: beide actieve apparaten toonden hetzelfde aantal bevestigingen; het oude afgemelde apparaat liep één bevestiging achter en blokkeerde de compactie niet.

De testbranch heeft een geslaagde GitHub Actions-testworkflow (commit `3cdc5fa490da0a194919e3e0354ac1f49c331e6d`, run [43201963152](https://github.com/Gertjun/PWA-Template-Test/actions/runs/43201963152)) en een geslaagde GitHub Pages-deployment (run [43202645959](https://github.com/Gertjun/PWA-Template-Test/actions/runs/43202645959)).

Beperkingen: de exacte OS-/browsercombinaties zijn niet voor elke praktijktest vastgelegd. De volgende bredere controles uit de PWA-Core-acceptatielijst zijn niet allemaal met deze praktijktest bewezen: passkey-PRF op elk ondersteund platform, wachtwoordterugval, herstel met een andere sleutel, meerdere browsertabbladen, update van een reeds geopende oude app-versie en volledige offline-start na cachevulling. De 29 contracttests zijn een bredere acceptatielijst en niet allemaal geïmplementeerd of uitgevoerd.

## 9. Huidige status en blokkades

- PWA-Template 1.5.0 is op 12 november 2026 gemerged naar `main` via PR #1, commit `0f538f8acf40d086df38e9bc4ed2cd875925c569`.
- De GitHub Actions-testworkflow op die main-commit is succesvol afgerond (run [43197012910](https://github.com/Gertjun/PWA-Template/actions/runs/43197012910)).
- De gerichte 1.5.0-praktijktests voor synchronisatie, offline-verwijdering, back-upherstel, afmelden/opnieuw koppelen en verwijderbevestigingen zijn door de gebruiker op twee apparaten succesvol bevestigd (zie §8).
- De geïsoleerde testapp en testdatarepo zijn alleen voor validatie gebruikt; de productie-datarepo en productietokens zijn buiten scope gebleven.
- De exacte OS-/browsermatrix en de overige bredere PWA-Core-acceptatietests blijven open; de resultaten bewijzen dus niet dat alle 29 contracttests of alle platformcombinaties zijn afgedekt.
- De centrale repository `Gertjun/PWA-Core` is aangemaakt. De initiële extractie, release-manifesten, versiepinning en distributieworkflow zijn nog niet ingericht of getest.
