# NOTES – PWA-template

De **actuele stand**: versie, open punten en sessielog. Werk dit bij aan het eind van elke sessie (zie `CLAUDE.md`). Besluiten staan in `DECISIONS.md`, wensen in `WISHLIST.md`.

Laatst bijgewerkt: 12 november 2026 · versie **1.5.0**

---

## 1. Werkwijze
De actuele werkwijze staat in `CLAUDE.md`. Wijzigingen verlopen via branches en PR's; merge alleen na expliciet akkoord. Documentatie-only wijzigingen verhogen de app-versie niet.

## 2. Stand
Basistemplate voor Geerts PWA's. Apps die erop gebouwd zijn: MW4 Camo Tracker, Games Backlog, Energieverbruik. Nieuwe apps starten met *Use this template*; de workflow *Nieuwe app instellen* vult naam, opslag-id en datapad in.

De template bevat een generieke kern in `js/core/`. PWA-Template is voorlopig de referentie, maar de kern is nog niet afgesplitst naar een zelfstandige PWA-Core-repository. Zie `docs/SHARED-CORE.md`.

## 3. Open punten en bekende problemen
- De graveyard blijft permanent bestaan; dit is bewust om verwijderde records ook na zeer oude back-ups te blokkeren.
- De volledige browser- en twee-apparatentest van versie 1.5.0 moet nog worden uitgevoerd.
- Herstel van een back-up met een andere kluissleutel wordt veilig geweigerd als de actuele remote kluis niet leesbaar is.
- Centrale PWA-Core-repository en gecontroleerde update-workflow zijn nog ontwerpwerk. Eerste vergelijking: MW4-CAMO en Energieverbruik hebben dezelfde hashes voor de aanwezige kernbestanden; PWA-Template wijkt af in shell.js, sync.js en vault.js en heeft daarnaast deletions.js. Zie docs/SHARED-CORE.md.

## 4. Sessielog (kort, nieuwste bovenaan)

- **12 nov 2026:** eerste vergelijking van de gedeelde kern: MW4-CAMO en Energieverbruik delen identieke hashes voor de aanwezige core-bestanden en base.css; Template heeft afwijkende shell/sync/vault en een extra deletions-module. Centrale kern nog niet aangemaakt.
- **12 nov 2026:** werkinstructies gelijkgetrokken: branch/PR-werkwijze, expliciete merge-toestemming, start- en eindcontrole, onderscheid tussen app-releases en documentatie-only wijzigingen. Besluiten D9 en D10 toegevoegd. Nog niet gemerged.
- **12 nov 2026:** 1.5.0: generieke verwijderadministratie, apparaatregistratie en beheer in Instellingen; tombstones worden na alle bevestigingen opgeruimd, terwijl de graveyard behouden blijft. Acht automatische tests en JavaScript-syntaxiscontrole toegevoegd. Browser- en twee-apparatentest open.

- **10 nov 2026:**
  - 1.4.0: vaste indeling voor alle apps: navigatie (`core/nav.js`), Instellingen als laatste scherm, kopbalk, koppelcode (`core/pair.js`) en bouwstenen (`core/ui.js`).
  - 1.3.0: kern gelijkgetrokken met MW4, Games en Energieverbruik (bestaande passkey, auto Face ID, instellingenmenu, drie manieren om instellingen te tonen, `readSyncFile`). CLAUDE.md, NOTES, DECISIONS en WISHLIST toegevoegd als vaste set voor elke app.
