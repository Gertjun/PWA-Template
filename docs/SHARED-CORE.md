# Gedeelde PWA-kern – architectuur en migratieplan

## Doel

Generieke verbeteringen aan synchronisatie, versleuteling, apparaatbeheer, back-up, navigatie en de PWA-schil moeten op een gecontroleerde manier beschikbaar komen in alle apps. Een wijziging in één app mag niet ongemerkt als de nieuwe standaard voor de andere apps gelden.

## Huidige situatie (12 november 2026)

Een eerste vergelijking van GitHub-bestandshashes laat zien:

- MW4-CAMO en Energieverbruik hebben identieke versies van de aanwezige bestanden in `js/core/` en `css/base.css`.
- PWA-Template heeft dezelfde hashes voor een deel van de bestanden, maar wijkt af in `shell.js`, `sync.js` en `vault.js`.
- PWA-Template bevat op de feature-branch ook `js/core/deletions.js`; die module is niet aanwezig in de vergeleken versies van MW4-CAMO en Energieverbruik.
- De templatewijziging 1.5.0 staat nog in PR #1 en is niet gemerged. De browser- en twee-apparatentest staat nog open.

Dit is een eerste inventarisatie, geen volledige functionele compatibiliteitsanalyse. Cryptotracker en Games Backlog moeten nog met hun juiste repositorynamen en actuele branches worden onderzocht.

## Voorgestelde architectuur

### 1. Centrale broncode-repository

Maak een aparte repository, bijvoorbeeld `Gertjun/PWA-Core`, met alleen generieke, herbruikbare bestanden:
- JavaScript-modules voor vault, crypto, biometric, GitHub API, sync, deletions, records, DOM, navigatie, UI en shell.
- `css/base.css`.
- Tests, documentatie, changelog en release-notities.

App-specifieke schermen, datamodellen, configuratie, iconen en CSS blijven in de app-repository.

### 2. Versies vastleggen, geen live afhankelijkheid

Elke app bevat de gebruikte core-bestanden in de eigen repository. Een app verwijst in een klein manifest/document naar de exacte PWA-Core-release (bij voorkeur een Git-tag en commit-SHA). De bestanden worden bij een update tijdens ontwikkeling/buildvoorbereiding naar de app-repo gekopieerd; de browser laadt ze altijd lokaal vanaf dezelfde GitHub Pages-origin.

Dit vermijdt:
- runtime-afhankelijkheid van GitHub of een CDN;
- problemen met offline gebruik en service-worker-caching;
- het risico dat een nieuwe core-release direct alle apps verandert.

Er is geen npm-package of build-stap nodig in de runtime-app. Een Git submodule is voor deze eenvoudige statische PWA's niet de eerste keuze: die maakt het klonen, deployen en beheren voor elke app onnodig complex.

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

1. **Inventariseren:** exacte repositories, branchstatus, core-bestanden, imports, versies, tests en app-afhankelijkheden van iedere PWA vastleggen.
2. **Verschillen beoordelen:** per bestand bepalen of het generiek is, welke implementatie leidend wordt en welke wijzigingen app-specifiek zijn.
3. **Broncode extraheren:** pas na akkoord een PWA-Core-repository opzetten met tests en documentatie.
4. **Eén pilot-app:** één bestaande app aansluiten via een PR en volledige regressie-/praktijktest.
5. **Overige apps:** één voor één aansluiten, telkens met aparte PR en tests.
6. **Nieuwe apps:** PWA-Template gebruikt de vastgelegde stabiele core-versie als startpunt.

## Nog te beantwoorden vóór implementatie

- Wat is de exacte repositorynaam van Cryptotracker en welke andere PWA's vallen onder deze standaard?
- Moet iedere app op dezelfde core-versie blijven of mogen apps tijdelijk verschillende ondersteunde versies gebruiken? Advies: apps pinnen een exacte release; updates zijn bewust en per app.
- Welke core-API's zijn stabiel genoeg om als contract te documenteren?
- Welke automatische tests kunnen alle apps op dezelfde manier uitvoeren?

## Veiligheids- en compatibiliteitsregels

- Nooit data-repositories, tokens of kluisbestanden gebruiken voor core-tests.
- Geen automatische runtime-download van core-code.
- Geen core-update rechtstreeks naar `main` van een app.
- Schemawijzigingen en wijzigingen in sync-/vaultgedrag vereisen expliciete migratie- en hersteltests.
- Bewaar een rollbackmogelijkheid via de vorige core-release en Git-geschiedenis.
