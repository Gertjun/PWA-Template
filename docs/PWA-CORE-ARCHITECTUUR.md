# PWA-Template en PWA-Core – architectuur en status

## Actuele status

PWA-Core v1.0.0 is de eerste stabiele release en is gepubliceerd via Git-tag `v1.0.0`. De release bevat `core-manifest.json` en 13 allowlisted bestanden: 12 JavaScript-modules onder `js/core/` en `css/base.css`.

PWA-Template blijft de officiële startbasis voor nieuwe apps. De gedeelde kern wordt echter centraal onderhouden in PWA-Core. De browser laadt de core-bestanden lokaal vanuit de ontvangende app-repository; er is geen runtime-import vanaf GitHub of een CDN.

De core-bestanden in de huidige template zijn afkomstig uit templatebroncommit `0f538f8acf40d086df38e9bc4ed2cd875925c569`, zoals vastgelegd in het manifest van PWA-Core v1.0.0. De template-setup bevat op dit moment nog geen formele `core-manifest.json`/`pwa-core.lock.json`-integratie en automatiseert nog geen release-distributie. Dat is een expliciet open integratiepunt; documentatie mag dit niet als afgerond voorstellen.

## Doel

Generieke functionaliteit wordt op één plaats onderhouden. Elke app gebruikt een bewust gekozen, vastgepinde versie. Een verbetering wordt via een aparte update-PR aangeboden en eerst getest. Een app mag niet afhankelijk worden van een externe server om zijn kerncode te laden.

## Verantwoordelijkheden

### PWA-Core

**Wel:**
- `js/core/` met kluis, encryptie, passkeys, GitHub-client, synchronisatie, records, navigatie, instellingen, UI-bouwstenen en apparaatfuncties;
- `css/base.css`;
- generieke tests, fixtures, API-contracten, manifest en releasebeheer.

**Niet:**
- `js/config.js`, `js/app.js`, `css/app.css`, `index.html`, manifest of app-iconen;
- app-specifieke schermen, datamodellen, labels, kleuren en berekeningen;
- de volledige `sw.js`: de service worker en precache-lijst blijven per app;
- tokens, kluisbestanden of gebruikersdata.

### PWA-Template en ontvangende apps

- De template levert een startbare app met lokale core-bestanden.
- Iedere app beheert zijn eigen configuratie, app-code, datamodel, styling, iconen en service worker.
- Een app serveert core-bestanden vanaf de eigen origin en neemt ze op in de eigen offline-cache.
- Generieke core-wijzigingen worden eerst in PWA-Core voorbereid en gereleased; daarna worden ze per app gecontroleerd geïntegreerd.

## Release- en pincontract

Een formele ontvangende app legt de gekozen core-release vast met:
- `core-manifest.json`: allowlist en SHA-256-checksums;
- `pwa-core.lock.json`: repository, versie, tag, volledige commit-SHA en SHA-256 van de exacte manifestbytes.

De tag moet naar de opgegeven volledige commit-SHA verwijzen. De lokale pin wordt gecontroleerd met `node tools/pin.mjs verify`. De lokale bestanden en service-worker-precache worden gecontroleerd met `node tools/precache.mjs --manifest core-manifest.json --service-worker sw.js`.

De huidige template-setup maakt deze metadata nog niet automatisch aan. Totdat de integratie is gerealiseerd, moet een nieuwe app niet worden beschouwd als formeel gepind, ook al bevat hij lokale core-bestanden.

## Waarom deze aanpak?

- Geen npm, bundler of extra runtime-afhankelijkheid.
- Offline gebruik blijft mogelijk doordat core-bestanden lokaal aanwezig zijn en worden gecachet.
- Elke app kan bewust op een stabiele versie blijven.
- Updates zijn reproduceerbaar en zichtbaar als PR's met diff en CI-resultaten.
- Een mislukte of incompatibele update kan worden afgewezen zonder productiecode te wijzigen.

## Updateproces

1. Core-release en manifest controleren.
2. In de ontvangende app een eigen featurebranch maken.
3. Alleen de allowlisted bestanden en pinmetadata bijwerken.
4. De app-eigen precache gericht bijwerken indien nodig.
5. Pin-, manifest-, syntax-, unit- en app-contracttests uitvoeren.
6. PR openen met release-identificatie, diff, testresultaten en resterende handmatige controles.
7. Pas na expliciet akkoord mergen.

Geen automatische merge en geen directe wijziging van app-`main`.

## Reikwijdte

De eerste pilotgroep bestaat uit MW4-CAMO, Energieverbruik en Games Backlog. Deze worden elk afzonderlijk gemigreerd en geaccepteerd.

Cryptotracker en Vaste Lasten hebben een afwijkende, meer monolithische architectuur en eigen gegevens-/synccontracten. Ze worden pas na een afzonderlijke adapter-/refactoranalyse beoordeeld; er wordt geen gedeelde core geforceerd.

## Veiligheidsgrenzen

- Gebruik voor core-tests uitsluitend synthetische data en nepclients.
- Benader geen productie-datarepository, kluisbestanden of persoonlijke tokens.
- Wijzig nooit een gepubliceerde core-release-tag of de release-assets.
- Een groene CI is geen vervanging voor browser-, offline-, passkey- en multi-device-acceptatie.
