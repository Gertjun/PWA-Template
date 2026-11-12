# DECISIONS – PWA-template

Besluiten die een volgende sessie moet kennen. Oude besluiten pas je niet aan; een nieuw besluit vervangt een oud ("vervangt D3").

### D1 – Geen frameworks of build-stap (okt 2026)
- **Besluit:** alleen HTML, CSS en JavaScript-modules; geen npm-packages of CDN-scripts in de app.
- **Waarom:** eenvoudig te onderhouden voor iemand die geen fulltime ontwikkelaar is.

### D2 – Direct naar main pushen (okt 2026)
- **Historisch besluit:** Claude werkte rechtstreeks op `main`, na lokaal testen.
- **Status:** vervangen door D9. Dit besluit blijft staan voor de historie; het is niet meer van kracht.

### D3 – Eén data-repo voor alle apps (okt 2026)
- **Besluit:** de versleutelde kluizen staan in één privé-repo (`Gertjun/SyncData`), met per app een eigen map.

### D4 – Gedeelde kern van de PWA-template (10 nov 2026, template 1.3.0)
- **Besluit:** `js/core/` en `css/base.css` zijn gelijk aan de PWA-template (1.3.0) en aan de andere template-apps. Passkeys gebruiken een vaste PRF-invoer per app, zodat een bestaande passkey na opnieuw installeren weer werkt (*Bestaande passkey*). Face ID start vanzelf (`autoBiometricUnlock`), vergrendeltijd per apparaat.
- **Waarom:** Geert wil al zijn apps uniform. De MW4-aanpak voor passkeys is als standaard gekozen.

### D5 – Vaste documentatieset per repo (10 nov 2026)
- **Besluit:** elke app-repo heeft `README.md`, `CHANGELOG.md`, `WISHLIST.md`, `NOTES.md`, `DECISIONS.md` en `CLAUDE.md`, naar het voorbeeld van Cryptotracker.

### D6 – Eén indeling voor alle apps (10 nov 2026, 1.4.0)
- **Besluit:** navigatie zit in de kern: tabbalk onderin op de telefoon, tabbladen onder de kopbalk op de iPad rechtop (700–999 px breed en minstens 700 px hoog), inklapbare zijbalk vanaf 1000 px. Instellingen is altijd het laatste scherm, met een vast overzicht en een pagina per onderdeel. Linksboven icoon, naam en versie; rechtsboven synchroniseren en vergrendelen. Filters: chips op de telefoon, keuzelijst op iPad en laptop.

### D7 – Koppelcode zonder kluiswachtwoord (10 nov 2026, 1.4.0)
- **Besluit:** de koppelcode bevat alleen de GitHub-koppeling (met token), versleuteld met een pincode van 8 tekens. Het wachtwoord van de kluis vul je op het nieuwe apparaat zelf in.

### D8 – Verwijdergeschiedenis is blijvend (12 nov 2026, template 1.5.0)
- **Besluit:** verwijderingen worden in `__pwaSync.deletions` bijgehouden, onafhankelijk van de app-specifieke `merge()`. Elk apparaat heeft een eigen ID en bevestigt verwijderingen die het heeft verwerkt. De graveyard wordt niet automatisch gewist. Een remote kluis die niet met de huidige sleutel kan worden gelezen, wordt bij herstel nooit blind overschreven.
- **Waarom:** een oud/offline apparaat of een oude back-up mag verwijderde gegevens niet opnieuw introduceren.

### D9 – Branches, pull requests en expliciete merge-toestemming (12 nov 2026)
- **Besluit:** elke afgebakende wijziging gebeurt op een feature- of fix-branch vanaf de actuele `main`. Wijzigingen worden via een PR aangeboden met testresultaten, risico's en resterende handmatige controles. Er wordt nooit rechtstreeks naar `main` gepusht en er wordt nooit gemerged zonder expliciet akkoord van Geert. Een verzoek om verder te werken is geen merge-toestemming.
- **Vervangt:** D2.
- **Waarom:** wijzigingen zijn controleerbaar, CI kan ze vooraf testen en Geert houdt de laatste beslissing over wat live gaat.

### D10 – Gedeelde kern gecontroleerd verspreiden (12 nov 2026)
- **Besluit:** generieke kerncode wordt niet blind per app gekopieerd. Totdat een centrale PWA-Core-repository bestaat, is PWA-Template de voorlopige referentie. Eerst vergelijken welke apps dezelfde kernversie gebruiken; daarna updates per app via eigen PR en tests verspreiden.
- **Waarom:** voorkomt onbedoelde verschillen en regressies tussen apps.

### D11 – Centrale PWA-Core en eerste pilotgroep (12 nov 2026)
- **Besluit:** `Gertjun/PWA-Core` is de centrale repository voor generieke kerncode. De eerste proof-of-concept omvat MW4-CAMO, Energieverbruik en Games Backlog. Elke app krijgt een eigen update-PR en tests; er wordt nooit automatisch gemerged.
- **Vervangt / werkt D10 bij:** de centrale repository is inmiddels aangemaakt. PWA-Template 1.5.0 is de actuele bronbasis voor de extractie, maar de eerste release wordt pas vastgelegd na inventarisatie, contractcontrole en tests.
- **Waarom:** één beheerde bron met bewuste versiepinning, zonder runtime-CDN-afhankelijkheid of ongecontroleerde wijzigingen in bestaande apps.
