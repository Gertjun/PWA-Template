# NOTES – PWA-template

De **actuele stand**: versie, open punten en sessielog. Werk dit bij aan het eind van elke sessie (zie `CLAUDE.md`). Besluiten staan in `DECISIONS.md`, wensen in `WISHLIST.md`.

Laatst bijgewerkt: 12 november 2026 · versie **1.5.0**

---

## 1. Werkwijze
Zie `CLAUDE.md`.

## 2. Stand
Basistemplate voor Geerts PWA's. Apps die erop gebouwd zijn: MW4 Camo Tracker, Games Backlog, Energieverbruik. Nieuwe apps starten met *Use this template*; de workflow *Nieuwe app instellen* vult naam, opslag-id en datapad in.

## 3. Open punten en bekende problemen
- De graveyard blijft permanent bestaan; dit is bewust om verwijderde records ook na zeer oude back-ups te blokkeren.
- De volledige browser- en twee-apparatentest moet nog worden uitgevoerd.
- Herstel van een back-up met een andere kluissleutel wordt veilig geweigerd als de actuele remote kluis niet leesbaar is.

## 4. Sessielog (kort, nieuwste bovenaan)

- **12 nov 2026:** 1.5.0: eerste generieke verwijderadministratie en apparaatregistratie in de versleutelde kluis; back-upherstel behoudt actuele verwijderhistorie. Zes automatische kern-tests toegevoegd.

- **10 nov 2026:**
  - 1.4.0: vaste indeling voor alle apps: navigatie (`core/nav.js`), Instellingen als laatste scherm, kopbalk, koppelcode (`core/pair.js`) en bouwstenen (`core/ui.js`).
  - 1.3.0: kern gelijkgetrokken met MW4, Games en Energieverbruik (bestaande passkey, auto Face ID, instellingenmenu, drie manieren om instellingen te tonen, `readSyncFile`). CLAUDE.md, NOTES, DECISIONS en WISHLIST toegevoegd als vaste set voor elke app.
