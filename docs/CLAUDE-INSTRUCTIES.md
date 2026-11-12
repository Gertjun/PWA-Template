# Projectinstructies voor Claude

Kopieer het blok Projectafspraken naar de instructies van het Claude-project en vul Over deze app in. Codebestanden hoeven niet als projectkennis te worden toegevoegd: werk altijd met de actuele GitHub-repository.

## Over deze app
- **Naam:** …
- **Doel:** …
- **Belangrijkste schermen:** …
- **Datamodel:** …
- **Externe API's:** geen / …
- **App-repo:** eigenaar/repo (GitHub Pages-url: …)
- **Data-repo:** alleen ter context; privé en altijd buiten scope. Nooit openen of wijzigen.
- **Huidige versie:** …

## Projectafspraken
- Communiceer in het Nederlands en leg wijzigingen kort uit in gewone taal.
- De gebruiker bouwt deze apps voor zichzelf en is geen fulltime ontwikkelaar. Houd oplossingen eenvoudig.
- Geen frameworks, npm-packages, CDN-scripts of build-stap in de PWA, tenzij vooraf goedgekeurd.
- Vraag vooraf akkoord voor wijzigingen die bestaande gegevens, datamodel, encryptie, synchronisatie, beveiliging of gedeelde kerncode wezenlijk kunnen beïnvloeden.
- "Hoe zou je…?" en "nog niet bouwen" betekenen: alleen adviseren, niet implementeren.

### Begin van iedere sessie
1. Controleer repo, actieve branch, actuele main-head en of je branch up-to-date is.
2. Bekijk open PR's, relevante branches en Actions-runs. Controleer checks op de actuele commit, niet op een eerdere head.
3. Lees CLAUDE.md, NOTES.md, DECISIONS.md, de bovenste relevante changelog-versies en zo nodig README/WISHLIST.
4. Lees js/config.js, js/app.js en relevante kern-, CSS-, workflow- en testbestanden.
5. Vat status en scope samen. Maak een eigen branch vanaf actuele main.

### Werken en opleveren
- Werk nooit rechtstreeks op main. Gebruik een eigen branch en open een PR.
- Test relevante wijzigingen vóór de PR. Rapporteer alleen daadwerkelijk uitgevoerde tests. Onderscheid automatische tests, CI en praktijktests voor de gebruiker.
- Houd js/config.js version en sw.js VERSION gelijk bij app-codewijzigingen. Documentatie-only wijzigingen verhogen de app-versie niet.
- Werk CHANGELOG.md en WISHLIST.md bij waar nodig.
- Controleer CI op de actuele PR-head. Meld fouten, risico's en resterende tests eerlijk.
- Merge nooit zonder expliciet akkoord van Geert. Groene checks zijn geen merge-toestemming.
- Geen force-push, geschiedenis herschrijven of branches verwijderen.
- Raak privé-datarepo, kluizen of tokens nooit aan. Vraag niet om tokens en log ze nooit.

### Einde van iedere sessie
- Werk NOTES.md bij met datum, stand, open punten en kort sessielog.
- Voeg alleen een nieuw genummerd besluit toe als de volgende sessie die keuze moet kennen; herschrijf oude besluiten niet.
- Werk CHANGELOG.md bij voor app-releases; noteer documentatie-only beheerwerk zonder app-versie te verhogen.
- Controleer dat documentatie overeenkomt met de echte GitHub/PR/CI-status.
- Laat de PR open als merge-akkoord ontbreekt. Rapporteer wijzigingen, tests, PR-status, resterende acties en eerstvolgende stap.

## Architectuur
- Hosting is GitHub Pages; de app is een PWA voor vooral iPhone/Safari en daarnaast laptop.
- App-specifieke code staat in js/app.js, extra modules onder js/, css/app.css en js/config.js.
- De generieke kern omvat kluis/encryptie, passkeys, synchronisatie, navigatie, instellingen en service worker. Wijzig kerncode alleen generiek en plan verspreiding naar andere apps.
- Beoogde richting: één centrale PWA-Core-bron met vastgepinde releases die als bestanden in elke app-repository worden opgenomen. Geen runtime-afhankelijkheid van een externe server. Totdat distributie is ingericht, is PWA-Template de voorlopige bron en gaat verspreiding via afzonderlijke PR's.
- app.js exporteert app met schemaVersion, screens, initialData(), migrate(data), merge(local, remote) en render(root, ctx).
- Navigatie en standaardinstellingen zijn van de schil. Gebruik app.screens, ctx.screen, ctx.go(id), ctx.update() en bestaande bouwstenen. Muteer ctx.data nooit direct.

## Vaste technische regels
1. App-codewijziging: verhoog versie in js/config.js en sw.js gelijk; patch voor fixes, minor voor functies.
2. Nieuw bestand: voeg toe aan PRECACHE in sw.js.
3. Externe API: voeg domein toe aan CSP connect-src en vang offline/fouten af.
4. Datamodel: verhoog schema en schrijf migratie; behoud onbekende velden en compatibiliteit met oudere apparaten.
5. Records: stabiele id, createdAt en updatedAt; gebruik core/records.js; verwijder niet fysiek als tombstones nodig zijn.
6. Veiligheid: gebruik textContent/escaping helpers, geen onveilige innerHTML; sla kluisinhoud niet buiten de kluis op.
7. Bedragen als integer centen; Nederlandse invoer-/weergavehelpers. Datums als yyyy-mm-dd, weergave via Intl met nl-NL.
8. Mobiel eerst: touch targets minimaal 44 px, inputtekst 16 px, safe areas en dark mode.
9. Toegankelijkheid: icon-knoppen hebben aria-label, formulieren hebben labels.
10. Exporteer via bestaande saveFile()-helper.
11. Verplaats afgeronde wishlist-items naar de changelog.

## Testen
- Voer relevante syntax- en automatische tests uit; test browsergedrag op mobiel formaat en light/dark mode waar mogelijk.
- Test waar relevant: nieuwe kluis, toevoegen/bewerken/verwijderen, vergrendelen/ontgrendelen, migratie, back-upherstel, meerdere tabbladen, offline en sync tussen twee apparaten inclusief gelijktijdige wijzigingen.
- Test nooit met de echte privé-datarepo of echte kluisgegevens.
- Na merge/deploy controleert Geert zelf de geïnstalleerde app en praktische werking op zijn apparaten.
