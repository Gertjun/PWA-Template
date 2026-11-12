# PWA-Template

Officiële startbasis voor nieuwe, installeerbare Progressive Web Apps op GitHub Pages. De template levert de app-schil, een demo-app en de lokale gedeelde kernbestanden.

## Architectuur in het kort

De gedeelde kern wordt centraal onderhouden in [PWA-Core](https://github.com/Gertjun/PWA-Core). De browser laadt de kern niet rechtstreeks uit PWA-Core: de JavaScript-modules en basis-CSS staan lokaal in de app-repository en worden vanaf de eigen GitHub Pages-origin geladen.

PWA-Core v1.0.0 is gepubliceerd. De core-bestanden in deze template zijn afkomstig uit de templatebroncommit `0f538f8acf40d086df38e9bc4ed2cd875925c569`, die als bron in het PWA-Core-manifest is vastgelegd. De formele app-pinbestanden en de automatische distributie-/updateworkflow zijn nog niet in deze template-setup geïntegreerd. Behandel de aanwezigheid van lokale core-bestanden dus niet als bewijs dat een nieuwe app al een gevalideerd `pwa-core.lock.json` heeft. Dit wordt als afzonderlijke integratiestap opgepakt.

**Belangrijk:** pas generieke kernbestanden niet zelfstandig in deze repository aan als app-specifieke oplossing. Een generieke wijziging hoort thuis in PWA-Core en wordt daarna gecontroleerd via aparte PR's naar ontvangende apps verspreid.

## Wat bevat de template?

- Versleutelde lokale kluis (AES-256-GCM; PBKDF2-SHA256 voor wachtwoordafleiding).
- Synchronisatie tussen apparaten via één versleuteld bestand in een eigen private GitHub-repository.
- Ontgrendelen met Face ID / Touch ID / Windows Hello / passkey (WebAuthn PRF), met wachtwoord als terugval.
- Offline werking en gecontroleerde updates via de service worker.
- Automatisch vergrendelen, privacyscherm, back-up en herstel, dark mode en iPhone-safe-areas.
- Bescherming bij meerdere tabbladen en verschillende app-versies.
- Apparaatregistratie, bevestiging van verwijderingen en bescherming tegen terugzetten via oude back-ups.
- Geen framework, build-stap, CDN-script of externe runtime-library.

## Structuur

```
index.html              App-schil en schermen
manifest.webmanifest    Naam, kleuren en installatie-iconen
sw.js                   App-eigen service worker en PRECACHE
css/base.css            Gedeelde basisstijl (PWA-Core)
css/app.css             App-specifieke stijl
js/config.js            Appnaam, versie, opslagprefix, datapad en timing
js/app.js               App-eigen datamodel, merge en schermen
js/main.js              Opstarten
js/core/                Lokale kopie van de gedeelde PWA-Core-modules
icons/                  App-iconen
tools/setup.mjs         Nieuwe app instellen
.github/workflows/      Setupworkflow voor Use this template
docs/                   Projectinstructies en architectuurdocumentatie
```

De service worker blijft app-eigendom. De core-allowlist bevat geen volledige `sw.js`; de app beheert zelf zijn versie, scope en precache.

## Een nieuwe app starten

1. Open deze repository en kies **Use this template** → **Create a new repository**.
2. Kies een duidelijke reponaam, bijvoorbeeld `energieverbruik`.
3. Wacht tot de workflow **Nieuwe app instellen** klaar is. Deze stelt onder meer de naam, opslagprefix, datapad, app-versie, manifest en titels in en probeert GitHub Pages te activeren.
4. Controleer de workflow-samenvatting. Als Pages niet automatisch is ingeschakeld: Settings → Pages en configureer de door de repository gebruikte deploymethode.
5. Vul de projectinstructies uit `docs/CLAUDE-INSTRUCTIES.md` aan en start met `docs/STARTPROMPT.md`.
6. Controleer vóór ingebruikname de core-release-identificatie en pinintegratie. De huidige template-setup maakt nog niet automatisch een formeel `pwa-core.lock.json`.
7. Test de app online en offline en voer de relevante beveiligings- en herstelcontroles uit voordat echte gegevens worden gebruikt.

## App-specifieke ontwikkeling

Vervang de demo in `js/app.js` en `css/app.css`. De app exporteert `app` met minimaal:

```js
export const app = {
  schemaVersion: 1,
  screens: [],
  initialData() { return { schema: 1 }; },
  migrate(data) { return data; },
  merge(local, remote) { /* behoud gegevens aan beide kanten */ },
  render(root, ctx) { /* teken het actieve scherm */ },
};
```

- Lees gegevens via `ctx.data`; muteer deze niet rechtstreeks.
- Wijzig gegevens uitsluitend via `await ctx.update(d => { ... })`.
- Gebruik de contextmethodes voor navigatie, meldingen en instellingen.
- Behoud onbekende velden, waaronder `__pwaSync`, in `migrate` en `merge`.
- Gebruik de gedeelde recordhelpers voor record-ID's, timestamps en verwijdermarkeringen.
- Bouw geen eigen generieke navigatie, instellingen of synchronisatie die al door de schil worden geleverd.

## Configuratie (`js/config.js`)

| Instelling | Betekenis |
|---|---|
| `name` | Zichtbare appnaam |
| `version` | Appversie; staat los van de PWA-Core-versie |
| `storagePrefix` | Unieke, blijvende lokale opslagnamespace; na ingebruikname niet wijzigen |
| `defaultDataPath` | Pad van de versleutelde kluis in de private data-repository |
| `autoLockMinutes` | Automatisch vergrendelen |
| `syncDelaySeconds` | Wachttijd na laatste wijziging voordat sync start |
| `minPasswordLength` | Minimale lengte voor nieuwe wachtwoorden |
| `kdfIterations` | PBKDF2-iteraties |

## Synchronisatie instellen

1. Maak een private GitHub-repository voor de versleutelde data.
2. Maak een fine-grained personal access token met toegang tot alleen die repository en alleen de benodigde Contents-rechten.
3. Vul eigenaar, repository, branch, datapad en token in via de app-instellingen.
4. Test synchronisatie en koppel daarna eventueel een tweede apparaat.

Het token wordt lokaal versleuteld opgeslagen en niet gesynchroniseerd. Deel of commit het token nooit. De ontwikkelworkflow benadert de data-repository, kluisbestanden of tokens niet.

## Beveiligingsmodel

| Onderdeel | Werking |
|---|---|
| Gegevens | AES-256-GCM |
| Wachtwoordafleiding | PBKDF2-SHA256 met de ingestelde iteraties |
| Passkey | WebAuthn PRF, met lokaal afgeleide sleutel |
| GitHub-opslag | Alleen het versleutelde kluisbestand |
| Token | Lokaal versleuteld; nooit in de repository of syncdata |
| Offline | Lokale bestanden en service-worker-cache |
| Herstel | Back-up/herstel volgens de app-contracten; wachtwoordherstel is niet mogelijk zonder beschikbare sleutel |

Een passkey is apparaat-/credentialgebonden. Een andere passkey levert niet vanzelf hetzelfde PRF-geheim op. Houd de wachtwoordterugval en back-upinstructies beschikbaar.

## Versies en updates

- Appversie: verhoog `version` in `js/config.js` en `VERSION` in `sw.js` gelijk wanneer runtimecode wijzigt.
- Nieuwe runtimebestanden: voeg ze toe aan de app-eigen `PRECACHE`.
- Datamodel: verhoog `schemaVersion` en schrijf een compatibele migratie.
- Core: wijzig generieke code via PWA-Core; distribueer een gekozen release via een afzonderlijke app-branch en PR.
- Merge: nooit automatisch en nooit zonder expliciet akkoord van de eigenaar.

Documentatie-only wijzigingen verhogen de appversie niet.

## Lokaal testen

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

Service workers en Web Crypto werken alleen via HTTPS of localhost.

## Documentatie

- `docs/CLAUDE-INSTRUCTIES.md`: projectwerkwijze en technische regels.
- `docs/STARTPROMPT.md`: startprompt voor een nieuw app-project.
- `docs/PWA-CORE-ARCHITECTUUR.md`: relatie tussen template en centrale kern.
- `docs/PWA-CORE-CONTRACTS.md`: technische contracten.
- `docs/SHARED-CORE.md`: historische inventarisatie en migratieachtergrond.
