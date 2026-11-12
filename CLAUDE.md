# CLAUDE.md – werkafspraken voor Claude

Deze afspraken gelden voor alle PWA's van Geert (Cryptotracker, Vaste Lasten, Energieverbruik, Games Backlog, MW4 Camo Tracker en de PWA-template). De instructies in de actuele app-repo en deze centrale werkwijze zijn leidend. Bij tegenstrijdigheid: meld die en volg de veiligste werkwijze; push nooit rechtstreeks naar `main`.

## Aan het begin van elke sessie

1. **Bepaal de juiste repository en opdracht.** Gebruik de repo die Geert in deze sessie noemt of die aantoonbaar bij het lopende project hoort. Raad nooit een repo of projectversie.
2. **Controleer eerst GitHub.** Haal de actuele `main` op, bekijk openstaande branches en PR's en controleer of eerder werk al is gemerged. Baseer nieuw werk op de actuele stand; overschrijf geen werk van een andere sessie.
3. **Lees de projectstatus.** Lees `CLAUDE.md`, `NOTES.md`, `DECISIONS.md), de bovenste paar versies van `CHANGELOG.md` en `WISHLIST.md`. Lees daarna `js/config.js` en `js/app.js`. Lees `README.md`, `docs/CLAUDE-INSTRUCTIES.md` en relevante bestanden onder `js/core/` als de opdracht dat vereist.
4. **Controleer de werkafspraken.** Let op openstaande PR's, testresultaten, bekende problemen en besluiten die deze wijziging raken. Vraag niet opnieuw naar informatie die al in de projectdocumentatie staat.
5. **Bescherm gegevens.** Benader nooit de data-repository, kluisbestanden, persoonlijke toegangstokens of andere geheimen. Vraag eerst akkoord voor wijzigingen die bestaande gebruikersgegevens, het datamodel of een onomkeerbare handeling kunnen raken.

## Tijdens het werk

- **Taal:** communiceer in het Nederlands. Houd uitleg begrijpelijk en leg kort uit wat je wijzigt en waarom.
- **Eerst voorstellen, dan bouwen:** bij "Hoe zou je…?", een ontwerpvraag of "nog niet bouwen" geef je eerst advies en wacht je op akkoord.
- **Werk met branches en pull requests:**
  1. Maak voor een afgebakende wijziging een eigen feature- of fix-branch vanaf de actuele `main` (of werk bewust verder op de bestaande branch/PR als Geert daarom vraagt).
  2. Werk in kleine, begrijpelijke commits. Push nooit rechtstreeks naar `main`.
  3. Open of werk een PR bij met doel, wijzigingen, testresultaten, risico's en resterende handmatige controles.
  4. Controleer de CI-status en de diff. Een groene CI is noodzakelijk, maar bewijst niet dat browser-, iPhone- of multi-devicegedrag correct is.
  5. **Merge nooit zonder expliciet akkoord van Geert.** Een verzoek om "verder te gaan" is geen merge-toestemming.
- **Test vóór het pushen:** voer relevante automatische tests en syntaxcontroles uit. Test browsergedrag waar de omgeving dat toelaat. Als iets niet uitvoerbaar is, meld dat eerlijk; presenteer een niet-uitgevoerde test nooit als geslaagd.
- **Versies bij app-code:** elke release krijgt een eigen semver-versie (`MAJOR.MINOR.PATCH`):
  - MAJOR als Geert of gebruikers een handmatige migratie of hernieuwde koppeling moeten uitvoeren;
  - MINOR voor nieuwe functionaliteit;
  - PATCH voor verbeteringen en foutoplossingen.
  - Verhoog `version` in `js/config.js` en `VERSION` in `sw.js` gelijk.
  - Werk `CHANGELOG.md` bij in gewone taal en haal gerealiseerde wensen uit `WISHLIST.md`.
  - Een wijziging die uitsluitend documentatie of ontwikkelafspraken raakt, krijgt geen onnodige app-versieophoging of service-worker-update. Noteer die wel in `NOTES.md` en zo nodig `DECISIONS.md`.
- **Gegevens en datamodel:** vraag vooraf akkoord voor destructieve wijzigingen, schemawijzigingen of migraties die bestaande gegevens kunnen beïnvloeden. Behoud onbekende velden en compatibiliteit met oudere apparaten.
- **Gedeelde kern:** behandel generieke bestanden zoals `js/core/**` en `css/base.css` niet als app-specifiek. Wijzig ze alleen met een expliciet generiek doel. Controleer vóór een wijziging welke apps dezelfde bestanden gebruiken. Totdat een centrale PWA-Core-repository is ingericht, geldt de PWA-template als voorlopige referentie; kopieer wijzigingen niet blind naar andere apps. Werk de verspreiding gecontroleerd bij via afzonderlijke PR's en tests. Zie `docs/SHARED-CORE.md`.
- **Besluiten:** ga je in tegen `DECISIONS.md), benoem dat en vraag eerst akkoord. Oude besluiten blijven staan; voeg een nieuw besluit toe dat het eerdere besluit expliciet vervangt.
- **Geen geheimen:** schrijf geen tokens, wachtwoorden, kluisinhoud of persoonsgegevens in code, logs, commits, issues of PR's.

## Aan het einde van elke sessie (altijd)

1. **Controleer de eindstand:** bekijk de diff, openstaande wijzigingen, branch en PR-status. Controleer of de laatste commit en CI-resultaten bij elkaar horen.
2. **Werk `NOTES.md` bij:** datum en actuele app-versie, bereikte stand, open punten, uitgevoerde tests en een kort sessielog (nieuwste bovenaan). Vermeld expliciet wat nog niet is getest.
3. **Werk `DECISIONS.md` bij:** voeg een nieuw genummerd besluit toe als deze sessie een keuze vastlegt die volgende sessies moeten kennen. Verwijder of herschrijf oude besluiten niet; vermeld welk besluit wordt vervangen.
4. **Werk `CHANGELOG.md` en `WISHLIST.md` bij** als de app-functionaliteit is gewijzigd. Voor documentatie-only werk volstaan `NOTES.md` en, waar nodig, `DECISIONS.md`.
5. **Werk de PR bij:** beschrijf de uiteindelijke wijziging, teststatus, beperkingen en handmatige teststappen. Push de bijgewerkte branch en controleer de CI opnieuw.
6. **Rapporteer aan Geert:** vermeld wat is aangepast, de branch/PR-link, testresultaten, resterende risico's en de eerstvolgende stap. Vraag expliciet akkoord als de PR klaar is om te mergen.

## Belangrijke projectgrenzen

- Geen frameworks, build-stap, npm-packages of CDN-scripts in de runtime-app, tenzij Geert daar vooraf mee instemt.
- Nooit de data-repository of tokens benaderen.
- Nooit rechtstreeks naar `main` pushen, forceren, geschiedenis herschrijven of branches verwijderen.
- Een PR openen of bijwerken is toegestaan binnen de afgesproken opdracht; mergen blijft een afzonderlijke, expliciete beslissing van Geert.
