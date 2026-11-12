# DECISIONS – PWA-template

Besluiten voor volgende sessies. Oude besluiten worden niet aangepast; een nieuw besluit kan een ouder besluit expliciet vervangen.

### D1 – Geen frameworks of build-stap (okt 2026)
- **Besluit:** alleen HTML, CSS en JavaScript-modules; geen npm-packages of CDN-scripts in de app.
- **Waarom:** eenvoudig te onderhouden.

### D2 – Direct naar main pushen (okt 2026) – VERVALLEN
- **Oorspronkelijk besluit:** rechtstreeks naar main pushen na lokaal testen.
- **Status:** vervangen door D8; geldt niet meer.

### D3 – Eén data-repo voor alle apps (okt 2026)
- **Besluit:** versleutelde kluizen staan in één privé-repo (Gertjun/SyncData), met per app een eigen map.
- **Beperking:** data-repo en tokens blijven buiten bereik van de assistent.

### D4 – Gedeelde kern van de PWA-template (10 nov 2026)
- **Besluit:** js/core/ en css/base.css zijn generieke onderdelen die uniform moeten blijven tussen template-apps. Passkeys gebruiken een vaste PRF-invoer per app; Face ID start vanzelf; vergrendeltijd is per apparaat.
- **Waarom:** uniform gedrag en onderhoud.

### D5 – Vaste documentatieset per repo (10 nov 2026)
- **Besluit:** elke app-repo heeft README.md, CHANGELOG.md, WISHLIST.md, NOTES.md, DECISIONS.md en CLAUDE.md.

### D6 – Eén indeling voor alle apps (10 nov 2026, 1.4.0)
- **Besluit:** navigatie zit in de kern: tabbalk op telefoon, tabbladen op iPad rechtop en inklapbare zijbalk vanaf 1000 px. Instellingen is altijd het laatste scherm. Kopbalk bevat app-icoon, naam, versie, synchroniseren en vergrendelen.
- **Niet gelijkgetrokken:** accentkleur, logo en app-inhoud.

### D7 – Koppelcode zonder kluiswachtwoord (10 nov 2026)
- **Besluit:** de koppelcode bevat alleen de GitHub-koppeling, versleuteld met een pincode van 8 tekens. Het kluiswachtwoord wordt op het nieuwe apparaat zelf ingevoerd.

### D8 – Werken via branches en pull requests (12 nov 2026) – vervangt D2
- **Besluit:** iedere wijziging gebeurt op een eigen branch vanaf actuele main. Na tests en documentatie wordt een PR geopend. Checks moeten op de actuele PR-head slagen. Er wordt nooit rechtstreeks naar main gepusht en nooit gemerged zonder expliciet akkoord van Geert.
- **Waarom:** wijzigingen controleerbaar houden en de mergebeslissing bij Geert laten.

### D9 – Gedeelde kern: één bron, vastgepinde app-versies (12 nov 2026)
- **Besluit:** de generieke PWA-kern krijgt één beheerde bron en expliciete versies. Apps gebruiken een vastgepinde release die als gewone bestanden in hun eigen repository aanwezig is; runtime-afhankelijkheid van een externe kernserver is niet toegestaan. Nieuwe kernversies worden per app via branch en PR aangeboden, met tests vóór merge.
- **Overgangsafspraak:** totdat een centrale PWA-Core-repository en distributieworkflow zijn ingericht, geldt PWA-Template als voorlopige bron voor generieke kernwijzigingen. Verspreiding naar andere apps gebeurt via afzonderlijke PR's. Nooit blind kopiëren of automatisch mergen.
- **Nog te onderzoeken:** distributiemethode (bijvoorbeeld release-download op update-moment versus Git-subtree/vendor-sync) en migratie van bestaande apps. Kies pas na een proof-of-concept en controle van toegangsrechten en CI.
