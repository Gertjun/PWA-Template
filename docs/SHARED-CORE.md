# Gedeelde PWA-kern – architectuur en migratieplan

## Doel

Generieke verbeteringen aan synchronisatie, versleuteling, apparaatbeheer, back-up, navigatie en de PWA-schil moeten op een gecontroleerde manier beschikbaar komen in alle apps. Een wijziging in één app mag niet ongemerkt als de nieuwe standaard voor de andere apps gelden.

## Repository-inventarisatie (12 november 2026)

De actieve repositories zijn gecontroleerd op de hoofdbranch. De PWA-Template is daarnaast op de openstaande feature-branch bekeken, omdat de nieuwe 1.5.0-wijzigingen nog niet in main staan.

| App | Repository | Opbouw | Status gedeelde kern |
|---|---|---|---|
| MW4 Camo Tracker | `Gertjun/MW4-CAMO` | Modulaire app met `js/core/` | Dezelfde hashes als Energieverbruik en Games Backlog voor alle 12 aanwezige core-/basebestanden |
| Energieverbruik | `Gertjun/Energieverbruik` | Modulaire app met `js/core/` | Dezelfde hashes als MW4 en Games Backlog |
| Games Backlog | `Gertjun/Games-Backlog` | Modulaire app met `js/core/` | Dezelfde hashes als MW4 en Energieverbruik |
| PWA-Template | `Gertjun/PWA-Template` | Modulaire basis met `js/core/` | De bestaande core is gelijk aan de drie apps voor de meeste modules; `shell.js`, `sync.js` en `vault.js` wijken af in PR #1. PR #1 voegt ook `deletions.js` toe |
| Crypto Portfolio | `Gertjun/Cryptotracker` | Monolithische `app.js` (circa 2.600 regels volgens ARCHITECTUUR.md), CSS in `index.html` | Geen `js/core/`; eigen opslag, sync, crypto en UI-implementatie |
| Vaste Lasten | `Gertjun/vaste-lasten` | Monolithische `index.html`; versie bijgehouden in `version.json` en andere app-locaties | Geen `js/core/`; eigen synchronisatie- en gegevensmodel |

### Hashvergelijking modulaire apps

MW4, Energieverbruik en Games Backlog hebben identieke Git-blob-hashes voor:
- `css/base.css`
- `js/core/biometric.js`
- `js/core/crypto.js`
- `js/core/dom.js`
- `js/core/github.js`
- `js/core/nav.js`
- `js/core/pair.js`
- `js/core/records.js`
- `js/core/shell.js`
- `js/core/sync.js`
- `js/core/ui.js`
- `js/core/vault.js`

De Template deelt dezelfde hashes voor de bestanden die niet in PR #1 zijn aangepast. In de PR-branch verschillen:
- `js/core/shell.js`
- `js/core/sync.js`
- `js/core/vault.js`
- extra module `js/core/deletions.js`

Dit is een structurele vergelijking van bestanden, nog geen bewijs dat iedere app dezelfde runtimecontracten of instellingen gebruikt.

## Conclusies

1. **Er bestaat al een gedeelde kernfamilie.** MW4, Energieverbruik en Games Backlog gebruiken aantoonbaar identieke kernbestanden. Dat is de beste eerste groep voor centrale versiecontrole.
2. **PWA-Template is de bron voor nieuwe apps, niet automatisch de bewezen runtime-waarheid.** De 1.5.0-syncwijziging is nog niet gemerged en moet eerst de twee-apparatentest doorstaan.
3. **Cryptotracker en Vaste Lasten zijn geen directe kandidaten voor dezelfde core-package.** Beide hebben een andere, monolithische opbouw en eigen gegevens-/synccontracten. Ze kunnen later onderdelen hergebruiken, maar dat vraagt eerst een afzonderlijke refactor en compatibiliteitsanalyse.
4. **Niet alle generieke code hoeft meteen gedeeld te worden.** Begin met de modulaire familie en de stabiele contracten. Trek niet geforceerd de twee monolithische apps in dezelfde architectuur.

## Voorgestelde architectuur

### 1. Centrale broncode-repository

Maak een aparte repository, bijvoorbeeld `Gertjun/PWA-Core`, met alleen generieke, herbruikbare bestanden:
- JavaScript-modules voor vault, crypto, biometric, GitHub API, sync, deletions, records, DOM, navigatie, UI en shell.
- `css/base.css`.
- Tests, documentatie, changelog en release-notities.

App-specifieke schermen, datamodellen, configuratie, iconen en CSS blijven in de app-repository.

### 2. Versies vastleggen, geen live afhankelijkheid

Elke app bevat de gebruikte core-bestanden in de eigen repository. Een manifest/document legt de exacte PWA-Core-release (Git-tag én commit-SHA) vast. Bij een update worden de bestanden tijdens de ontwikkel-/updateworkflow naar de app-repo gekopieerd; de browser laadt ze altijd lokaal.

Dit vermijdt:
- runtime-afhankelijkheid van GitHub of een CDN;
- problemen met offline gebruik en service-worker-caching;
- het risico dat een nieuwe core-release direct alle apps verandert.

Er is geen npm-package of build-stap nodig in de runtime-app. Een Git submodule is voor deze eenvoudige statische PWA's niet de eerste keuze: die maakt klonen, deployen en beheren onnodig complex.

### 3. Gecontroleerde update per app

Bij een nieuwe core-release:
1. CI van PWA-Core voert tests en syntaxcontroles uit.
2. Er wordt een onveranderlijke release/tag gepubliceerd.
3. Een updateworkflow maakt per aangesloten app een aparte branch met de core-bestanden en het bijgewerkte core-manifest.
4. De workflow voert de app-tests uit en maakt een PR met release-notities en eventuele migratiewaarschuwingen.
5. Geert controleert de PR en voert waar nodig handmatige browser- en multi-device-tests uit.
6. Alleen na expliciet akkoord wordt de PR gemerged.

Automatische PR's zijn gewenst; automatisch mergen is niet de standaard.

## Migratie in fasen

1. **Inventarisatie:** afgerond op bestandsniveau voor de zes genoemde repositories. Volledige functionele contractanalyse volgt nog.
2. **Verschillen beoordelen:** documenteer de API-contracten van de modulaire kern en bepaal welke implementatie leidend wordt.
3. **Stabiliseren Template 1.5.0:** PR #1 heeft groene CI; browser- en twee-apparatentest is nog nodig voordat de nieuwe deletion-module als stabiele kern geldt.
4. **Broncode extraheren:** na stabilisatie een PWA-Core-repository opzetten met tests en documentatie.
5. **Pilot:** sluit eerst één app uit de bestaande identieke groep aan via een PR; voer volledige regressie- en praktijktests uit.
6. **Overige modulaire apps:** sluit MW4, Energieverbruik en Games Backlog één voor één aan.
7. **Monolithische apps:** beoordeel Cryptotracker en Vaste Lasten apart. Alleen refactoren als daar een concreet voordeel tegenover de migratierisico's staat.
8. **Nieuwe apps:** PWA-Template gebruikt een vastgelegde stabiele core-versie als startpunt.

## Nog uit te werken vóór implementatie

- De publieke API-contracten tussen `shell.js` en `app.js`, inclusief `app`-exports en contextmethodes.
- Welke tests generiek naar PWA-Core kunnen en welke app-specifiek blijven.
- Hoe schema-/syncversies en compatibiliteit tussen oude en nieuwe apparaten worden bewaakt.
- Welke releaseversies de bestaande modulaire apps op dit moment impliciet delen; Git-hashes zijn hiervoor de betrouwbare uitgangsmeting, niet alleen app-versienummers.

## Veiligheids- en compatibiliteitsregels

- Nooit data-repositories, tokens of kluisbestanden gebruiken voor core-tests.
- Geen automatische runtime-download van core-code.
- Geen core-update rechtstreeks naar `main` van een app.
- Schemawijzigingen en wijzigingen in sync-/vaultgedrag vereisen expliciete migratie- en hersteltests.
- Bewaar een rollbackmogelijkheid via de vorige core-release en Git-geschiedenis.
