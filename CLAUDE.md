# CLAUDE.md – werkafspraken voor alle PWA-projecten

Deze afspraken gelden voor Cryptotracker, Vaste Lasten, Energieverbruik, Games Backlog, MW4-CAMO, PWA-Template en PWA-Core. De actuele repositorydocumentatie en expliciete projectbesluiten zijn leidend. Bij tegenstrijdigheid: meld die en volg de veiligste werkwijze.

## Aan het begin van elke sessie

1. Bepaal de juiste repository en opdracht uit de actuele projectcontext.
2. Controleer GitHub: actuele `main`, relevante branches, open PR's en checks. Baseer werk nooit op een verouderde snapshot.
3. Lees de relevante statusdocumentatie: `CLAUDE.md`, `NOTES.md`, `DECISIONS.md`, recente changelog en wishlist; lees daarna de relevante code en README.
4. Controleer testresultaten, bekende problemen en besluiten.
5. Bescherm gegevens: benader nooit data-repositories, kluisbestanden, tokens of geheimen. Vraag vooraf akkoord voor destructieve acties of wijzigingen die bestaande gegevens kunnen raken.

## Tijdens het werk

- Communiceer in het Nederlands en leg technische wijzigingen begrijpelijk uit.
- Bij ontwerpvragen: eerst voorstel, dan bouwen na akkoord.
- Maak voor elke afgebakende wijziging een eigen feature-/fix-branch vanaf actuele `main`.
- Push nooit rechtstreeks naar `main`; maak kleine commits en open een PR.
- Test relevante code vóór het pushen en controleer de CI op de exacte laatste PR-commit.
- Een groene CI is noodzakelijk, maar vervangt geen browser-, iPhone-, offline- of multi-device-acceptatie.
- **Merge nooit zonder expliciet akkoord van Geert.**
- Vraag vooraf akkoord voor destructieve wijzigingen, schemawijzigingen en migraties met risico voor bestaande data.
- Volg `DECISIONS.md`; een afwijking moet worden gemotiveerd en vooraf afgestemd.
- Schrijf nooit tokens, wachtwoorden, kluisinhoud of persoonsgegevens in code, logs, commits, issues of PR's.

## Versies en documentatie

- Bij app-runtimecode: verhoog `version` in `js/config.js` en `VERSION` in `sw.js` gelijk volgens SemVer.
- Voeg nieuwe runtimebestanden toe aan de service-worker-`PRECACHE`.
- Werk `CHANGELOG.md` bij bij functionele wijzigingen.
- Bij datamodelwijzigingen: verhoog `schemaVersion`, schrijf een migratie en behoud onbekende velden en compatibiliteit.
- Documentatie-only wijzigingen krijgen geen onnodige app-versie- of service-worker-update; noteer ze in `NOTES.md` en zo nodig `DECISIONS.md`.

## PWA-Core en PWA-Template

- `Gertjun/PWA-Core` is de centrale bron voor generieke kerncode. De eerste stabiele release `v1.0.0` is gepubliceerd.
- `Gertjun/PWA-Template` blijft de officiële startbasis voor nieuwe apps. Het is niet langer de centrale ontwikkelplaats voor generieke core-wijzigingen.
- Core-bestanden worden in ontvangende apps lokaal opgenomen en vanaf de eigen origin geladen; geen runtime-download van PWA-Core of CDN.
- Een formele releasepin bestaat uit `core-manifest.json` en `pwa-core.lock.json`, inclusief versie, tag, volledige commit-SHA en manifestchecksum. Als pinbestanden ontbreken, meld dat als integratiegat.
- Ontwikkel generieke wijzigingen eerst in PWA-Core via branch en PR. Integreer een gereleasete core vervolgens per app via eigen branch en PR.
- App-specifieke configuratie, data, schermen, styling, iconen en volledige service worker blijven eigendom van de ontvangende app.
- Geen automatische merge. Een mislukte of onduidelijke CI-status is geen goedkeuring.
- Pilotgroep: MW4-CAMO, Energieverbruik en Games Backlog. Cryptotracker en Vaste Lasten vragen eerst een eigen adapter-/refactoranalyse.

## Veiligheid en repositorybeheer

- Nooit productie-data-repositories of persoonlijke tokens benaderen.
- Nooit rechtstreeks naar `main` pushen, forceren of geschiedenis herschrijven.
- Verwijder of archiveer repositories/branches niet zonder expliciet akkoord.
- Wijzig of verwijder geen gepubliceerde core-release-tag of assets.
- Houd wijzigingen klein, controleerbaar en omkeerbaar.

## Afronding van elke sessie

1. Controleer diff, branch, PR-status en checks op de laatste commit.
2. Werk `NOTES.md` bij met datum, actuele stand, open punten en uitgevoerde/niet-uitgevoerde tests.
3. Voeg zo nodig een nieuw besluit toe; herschrijf oude besluiten niet.
4. Rapporteer wijzigingen, branch/PR, testresultaten, resterende controles en volgende stap.
5. Vraag expliciet akkoord voordat je merge't.
