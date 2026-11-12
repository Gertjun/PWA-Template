# Startprompt voor een nieuwe app

Gebruik dit als **eerste bericht** in een nieuw Claude-project, nadat je:
1. met *Use this template* de app-repo hebt gemaakt, en
2. `docs/CLAUDE-INSTRUCTIES.md` in de projectinstructies hebt geplakt.

Vul de velden tussen [ ] in. Weet je iets nog niet, laat het dan leeg; Claude vraagt ernaar.

---

```
We starten een nieuwe app op basis van mijn PWA-template. De projectinstructies gelden.

Repo: [eigenaar/reponaam]
Idee: [wat moet de app doen, voor wie, en welk probleem lost hij op, in een paar zinnen]
Must-haves voor de eerste versie: [lijstje]
Later of misschien: [lijstje]
Voorbeelden of inspiratie: [optioneel, bijvoorbeeld een bestaande app of Excel-lijst]

Werk in deze volgorde. Na stap 3 stop je en wacht je op mijn akkoord.

1. Controle:
   - Controleer de actuele GitHub-repo, main, branches en openstaande PR's.
   - Controleer of de setup-workflow heeft gedraaid: naam, storagePrefix, datapad, versie in config.js en sw.js, manifest, titels en iconen.
   - Controleer of GitHub Pages live is. Herstel zelf wat veilig kan; meld wat ik moet doen.
   - Lees de projectdocumentatie en noteer open punten en relevante besluiten.

2. Vragen. Stel maximaal 5 gerichte vragen over wat nog onduidelijk is. Kies voor de rest verstandige standaarden en benoem die.

3. Voorstel:
   - het datamodel: collecties, velden en typen;
   - de schermen en navigatie, mobiel eerst;
   - wat in versie 1.0 komt en wat later;
   - externe API's, privacy- en rekenrisico's;
   - een ingevuld blok "Over deze app" voor de projectinstructies.

4. Bouwen, na mijn akkoord:
   - vervang de demo in js/app.js en css/app.css;
   - test volgens de projectinstructies;
   - werk versie, CHANGELOG.md en WISHLIST.md bij;
   - maak een feature-branch en PR. Push niet rechtstreeks naar main en merge niet zonder mijn expliciete akkoord.

5. Afronding:
   - werk NOTES.md en eventueel DECISIONS.md bij;
   - vermeld testresultaten, resterende handmatige controles en de PR-link;
   - leg uit hoe ik de app installeer, sync instel en Face ID aanzet;
   - geef drie logische uitbreidingen voor later.
```
