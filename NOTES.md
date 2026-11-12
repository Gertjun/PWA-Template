# NOTES – PWA-template

Actuele stand, open punten en sessielog. Werk dit aan het einde van iedere sessie bij volgens CLAUDE.md.

Laatst bijgewerkt: 12 november 2026 · versie op main **1.4.2**

## 1. Stand
Basistemplate voor Geerts PWA's. MW4 Camo Tracker en Energieverbruik gebruiken aantoonbaar dezelfde kernbestanden als de template op de gecontroleerde main-heads van 12 november 2026. Games Backlog is als template-app genoemd; actuele gelijkheid moet bij een concrete wijziging opnieuw worden gecontroleerd. Cryptotracker heeft een afwijkende/ouder structuur en moet apart worden beoordeeld.

## 2. Open punten
- **PR #1 – veilige verwijdergeschiedenis en apparaatregistratie (beoogde versie 1.5.0):** open op feature/safe-tombstone-sync. Laatst bekende head: e418adc591da31c3a5e576a5eecce2d8cdca6d60. Eerdere Actions-runs waren succesvol; controleer checks opnieuw op actuele head. Volledige browser- en twee-apparatentest moet nog worden uitgevoerd. Niet mergen zonder expliciet akkoord.
- **PR #2 – werkafspraken en kernbeheer:** open op docs/session-workflow-and-core-governance, head 57ffffd2efe0be8a4d76d9a5ce48fb10571a1721. Documentatie-only; er is nog geen Actions-workflow op main om deze PR automatisch te testen. PR #1 bevat de eerste testworkflow. Niet mergen zonder expliciet akkoord.
- **Centrale PWA-Core:** architectuur in onderzoek. Doel: één bron voor generieke kerncode, versiebeheer en gecontroleerde verspreiding. Nog geen centrale repository of distributiemechanisme ingericht.
- **Cryptotracker:** beoordelen welke onderdelen veilig kunnen worden overgezet; niet aannemen dat de structuur identiek is.

## 3. Werkwijze
Zie CLAUDE.md. Werk vanaf actuele main in een eigen branch. PR en checks zijn verplicht; merge uitsluitend na expliciet akkoord.

## 4. Sessielog (nieuwste bovenaan)
- **12 nov 2026:** werkafspraken aangescherpt: actuele repo/PR/CI-controle aan het begin, branches en PR's, geen directe push of merge zonder akkoord, vaste afrondingsdocumentatie. Controle bevestigt identieke js/core-bestanden in PWA-Template, MW4-CAMO en Energieverbruik op de gecontroleerde main-heads.
- **10 nov 2026:** 1.4.0: vaste indeling voor alle apps: navigatie, Instellingen als laatste scherm, kopbalk, koppelcode en bouwstenen.
- **10 nov 2026:** 1.3.0: kern gelijkgetrokken met MW4, Games en Energieverbruik; vaste projectdocumentatie toegevoegd.
