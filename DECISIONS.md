# DECISIONS – PWA-template

Besluiten die een volgende sessie moet kennen. Oude besluiten pas je niet aan; een nieuw besluit vervangt een oud ("vervangt D3").

### D1 – Geen frameworks of build-stap (okt 2026)
- **Besluit:** alleen HTML, CSS en JavaScript-modules; geen npm-packages of CDN-scripts in de app.
- **Waarom:** eenvoudig te onderhouden voor iemand die geen fulltime ontwikkelaar is.

### D2 – Direct naar main pushen (okt 2026)
- **Besluit:** Claude werkt in de app-repo en pusht rechtstreeks naar `main`, na lokaal testen.
- **Waarom:** Geert koos snelheid boven een review via pull requests.

### D3 – Eén data-repo voor alle apps (okt 2026)
- **Besluit:** de versleutelde kluizen staan in één privé-repo (`Gertjun/SyncData`), met per app een eigen map.

### D4 – Gedeelde kern van de PWA-template (10 nov 2026, template 1.3.0)
- **Besluit:** `js/core/` en `css/base.css` zijn gelijk aan de PWA-template (1.3.0) en aan de andere template-apps. Passkeys gebruiken een vaste PRF-invoer per app, zodat een bestaande passkey na opnieuw installeren weer werkt (*Bestaande passkey*). Face ID start vanzelf (`autoBiometricUnlock`), vergrendeltijd per apparaat.
- **Waarom:** Geert wil al zijn apps uniform. De MW4-aanpak voor passkeys is als standaard gekozen.

### D5 – Vaste documentatieset per repo (10 nov 2026)
- **Besluit:** elke app-repo heeft `README.md`, `CHANGELOG.md`, `WISHLIST.md`, `NOTES.md`, `DECISIONS.md` en `CLAUDE.md`, naar het voorbeeld van Cryptotracker.
- **Waarom:** zo begint elke sessie met dezelfde, korte context in plaats van de hele chatgeschiedenis.

### D6 – Eén indeling voor alle apps (10 nov 2026, 1.4.0)
- **Besluit:** navigatie zit in de kern: tabbalk onderin op de telefoon, tabbladen onder de kopbalk op de iPad rechtop (700–999 px breed en minstens 700 px hoog), inklapbare zijbalk vanaf 1000 px. Instellingen is altijd het laatste scherm, met een vast overzicht en een pagina per onderdeel. Linksboven icoon, naam en versie; rechtsboven synchroniseren en vergrendelen. Filters: chips op de telefoon, keuzelijst op iPad en laptop.
- **Waarom:** elke app had zijn eigen navigatie en instellingen. De breakpoints komen uit Cryptotracker, de zijbalk uit Games Backlog, het instellingenmenu uit MW4.
- **Niet gelijkgetrokken:** accentkleur, logo en de inhoud van de schermen; daaraan herken je de app.

### D7 – Koppelcode zonder kluiswachtwoord (10 nov 2026, 1.4.0)
- **Besluit:** de koppelcode bevat alleen de GitHub-koppeling (met token), versleuteld met een pincode van 8 tekens. Het wachtwoord van de kluis vul je op het nieuwe apparaat zelf in.
- **Waarom:** in Cryptotracker zat het wachtwoord erin, maar daar was het een apart sync-wachtwoord. In de template is het ook het wachtwoord van de app zelf; dat hoort niet in een code die je naar jezelf stuurt.

