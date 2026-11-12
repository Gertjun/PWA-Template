# NOTES – PWA-template

Actuele stand, open punten en sessielog. Werk dit aan het einde van iedere sessie bij volgens CLAUDE.md.

Laatst bijgewerkt: 12 november 2026 · versie op main **1.5.0**

## 1. Stand
Basistemplate voor Geerts PWA's. MW4 Camo Tracker en Energieverbruik gebruiken aantoonbaar dezelfde kernbestanden als de template op de gecontroleerde main-heads van 12 november 2026. Games Backlog is als template-app genoemd; actuele gelijkheid moet bij een concrete wijziging opnieuw worden gecontroleerd. Cryptotracker heeft een afwijkende/ouder structuur en moet apart worden beoordeeld.

## 2. Open punten
- **PWA-Core-contracten:** `docs/PWA-CORE-CONTRACTS.md` toegevoegd op de documentatiebranch. Beschrijft app-/ctx-API, configuratie, vault-envelope, sync, records, verwijderadministratie, migratievolgorde en 29 geautomatiseerde acceptatietests. De tests zijn nog niet allemaal gebouwd of uitgevoerd.
- **PWA-Template 1.5.0:** PR #1 is op 12 november 2026 om 10:03 gemerged naar `main` (commit `0f538f8acf40d086df38e9bc4ed2cd875925c569`). De GitHub Actions-testworkflow op deze main-commit is succesvol (run [43197012910](https://github.com/Gertjun/PWA-Template/actions/runs/43197012910)).
- **PR #2 – werkafspraken en kernbeheer:** open op `docs/session-workflow-and-core-governance`. Deze documentatie-PR wordt bijgewerkt met de afgeronde 1.5.0-testresultaten. Geen merge zonder expliciet akkoord.
- **1.5.0-praktijktest:** uitgevoerd in de geïsoleerde openbare testapp `Gertjun/PWA-Template-Test` met afzonderlijke privé-testdatarepo. Gebruiker rapporteert geslaagde tweerichtingssync, offline-verwijdering, back-upherstel op beide apparaten, afmelden, blokkeren van het afgemelde apparaat, opnieuw koppelen als nieuwe registratie en bevestiging/compactie door alle actieve apparaten. Het oude afgemelde apparaat bleef zichtbaar en telde niet meer mee. Actions-tests op testcommit `3cdc5fa490da0a194919e3e0354ac1f49c331e6d` geslaagd (run [43201963152](https://github.com/Gertjun/PWA-Template-Test/actions/runs/43201963152)); Pages-deployment geslaagd (run [43202645959](https://github.com/Gertjun/PWA-Template-Test/actions/runs/43202645959)). De gebruikte OS/browsercombinaties zijn niet afzonderlijk vastgelegd; claim daarom geen volledige platformmatrix. Test-PAT nog intrekken zodra de testomgeving niet meer nodig is.
- **Centrale PWA-Core:** architectuur in onderzoek. Doel: één bron voor generieke kerncode, versiebeheer en gecontroleerde verspreiding. Nog geen centrale repository of distributiemechanisme ingericht.
- **Cryptotracker:** beoordelen welke onderdelen veilig kunnen worden overgezet; niet aannemen dat de structuur identiek is.

## 3. Architectuur
- De API- en gegevenscontracten, compatibiliteitsmatrix en testbasis staan nu in `docs/PWA-CORE-CONTRACTS.md`; het architectuurvoorstel en distributiemodel staan in `docs/PWA-CORE-ARCHITECTUUR.md`.
- Voorkeursontwerp en invoeringsstappen staan in docs/PWA-CORE-ARCHITECTUUR.md. Voorkeur: releasebestanden via GitHub Actions als lokale bestanden in elke app opnemen en via update-PR aanbieden. Proof-of-concept is nog niet uitgevoerd.

## 4. Werkwijze
Zie CLAUDE.md. Werk vanaf actuele main in een eigen branch. PR en checks zijn verplicht; merge uitsluitend na expliciet akkoord.

## 5. Sessielog (nieuwste bovenaan)
- **12 nov 2026:** PWA-Template 1.5.0 is gemerged naar main. De geïsoleerde twee-apparatentests voor verwijderadministratie, back-upherstel, afmelden/opnieuw koppelen en bevestigingsadministratie zijn door de gebruiker succesvol afgerond; de testbranch-CI en Pages-deployment zijn groen. De 29 bredere PWA-Core-acceptatietests zijn niet allemaal geïmplementeerd of uitgevoerd. Volgende stap: test-PAT intrekken en daarna verder met de centrale PWA-Core-proof-of-concept.
- **12 nov 2026:** API- en gegevenscontracten van de modulaire kern uitgewerkt; compatibiliteitsmatrix voor alle vijf apps, migratievolgorde en 29 acceptatietests vastgelegd in `docs/PWA-CORE-CONTRACTS.md`. Geen runtimecode of app-versies gewijzigd.
- **12 nov 2026:** architectuurvoorstel voor centrale PWA-Core toegevoegd; distributie via vastgepinde releases en update-PR's is de voorkeursrichting, nog te bewijzen in een POC. Werkafspraken aangescherpt: actuele repo/PR/CI-controle aan het begin, branches en PR's, geen directe push of merge zonder akkoord, vaste afrondingsdocumentatie. Controle bevestigt identieke js/core-bestanden in PWA-Template, MW4-CAMO en Energieverbruik op de gecontroleerde main-heads.
- **10 nov 2026:** 1.4.0: vaste indeling voor alle apps: navigatie, Instellingen als laatste scherm, kopbalk, koppelcode en bouwstenen.
- **10 nov 2026:** 1.3.0: kern gelijkgetrokken met MW4, Games en Energieverbruik; vaste projectdocumentatie toegevoegd.
