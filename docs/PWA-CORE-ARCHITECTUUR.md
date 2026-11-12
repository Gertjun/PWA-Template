# Architectuurvoorstel: centrale PWA-Core

Status: implementatierichting. De repository `Gertjun/PWA-Core` is aangemaakt; initiële extractie, releasebeheer en distributie moeten nog worden ingericht en bewezen.

## Doel

Generieke functionaliteit wordt op één plaats onderhouden. Elke app gebruikt een bewust gekozen, vastgepinde versie. Een verbetering wordt als update-PR aangeboden en kan dus eerst getest worden. Een app mag niet afhankelijk worden van een externe server om zijn kerncode te laden.

## Wat hoort in PWA-Core?

**Wel:**
- js/core/ met kluis, encryptie, passkeys, GitHub-client, synchronisatie, records, navigatie, instellingen, UI-bouwstenen en apparaatfuncties;
- css/base.css met gedeelde vormgeving en componentstijlen;
- documentatie van de publieke interface tussen de kern en app.js;
- generieke tests en een minimale test-app/fixture.

**Niet:**
- js/config.js, js/app.js, css/app.css, index.html, manifest of app-iconen;
- app-specifieke schermen, datamodellen, labels, kleuren en berekeningen;
- sw.js als compleet bestand: de service worker en precache-lijst blijven per app, omdat versie, scope en app-bestanden verschillen;
- tokens, kluisbestanden of gebruikersdata.

## Technische vorm

1. Gebruik de aangemaakte repository `Gertjun/PWA-Core` als centrale bron.
2. Houd daarin dezelfde bestandsindeling aan als in de apps: js/core/... en css/base.css. De kern importeert momenteel relatieve bestanden zoals ../config.js en ../app.js. Door de bestanden op dezelfde plek in elke app te plaatsen, blijven die imports werken zonder build-stap of runtime-download.
3. Beheer versies met SemVer-tags (bijvoorbeeld v1.0.0). Een release is onveranderlijk; apps pinnen een specifieke release en commit-SHA.
4. Neem in elke app een klein tekstbestand op met de gebruikte PWA-Core-versie en commit-SHA. De app serveert de kernbestanden gewoon vanaf zijn eigen GitHub Pages-site.
5. Maak een GitHub Actions-workflow in elke app die op handmatige aanvraag en eventueel volgens een schema controleert op een nieuwere release. De workflow haalt de gekozen release-archiefbestanden op, kopieert alleen de toegestane kernbestanden naar js/core/ en css/base.css, voert controles uit, maakt een updatebranch en opent een PR.
6. Gebruik voor het aanmaken van de PR de ingebouwde GITHUB_TOKEN van de betreffende app-repository, met alleen de noodzakelijke contents- en pull-requests-rechten. Geen persoonlijk PAT in de app. Pin gebruikte Actions op vaste commit-SHA's.
7. De workflow merge't nooit automatisch. Een update wordt pas onderdeel van de app na tests en expliciet akkoord.

## Waarom deze aanpak?

- Geen npm, bundler of extra runtime-afhankelijkheid in de PWA.
- De app blijft offline werken: alle benodigde kernbestanden staan in de app-repository en de service-worker-cache.
- Een release is reproduceerbaar; elke app vermeldt exact welke kernversie hij gebruikt.
- Updates worden zichtbaar als gewone PR's, met diff en CI-resultaten.
- Een oudere app kan bewust op een stabiele versie blijven totdat de update getest is.

## Alternatieven

| Methode | Beoordeling |
|---|---|
| Remote ES-module import vanaf PWA-Core | Afwijzen: runtime-netwerkafhankelijkheid, lastiger offline en versie-/beschikbaarheidsrisico |
| Git submodule | Afwijzen als standaard: extra Git- en deploycomplexiteit; gemakkelijk om de submodule niet mee te nemen in een Pages-deploy |
| npm-package | Past niet bij de afspraak geen package manager/build-stap te gebruiken |
| Git subtree | Technisch mogelijk en lokaal/offline goed, maar updatebeheer en gebruik in template-clones is minder vanzelfsprekend |
| Releasebestanden kopiëren via GitHub Actions en PR | Voorkeur: lokale bestanden, versiepinning, geautomatiseerde update-PR's en geen persoonlijke token nodig bij een publieke PWA-Core |

## Belangrijke aandachtspunten

- De kern heeft een expliciete compatibiliteitsinterface met app.js en config.js nodig. Wijzigingen aan die interface moeten als breaking change worden behandeld.
- Elke kernrelease moet een manifest bevatten met bestandsnamen, versienummer en checksums. De updateworkflow controleert dit vóór kopiëren.
- De workflow moet controleren dat elk bestand uit js/core/ in de PRECACHE-lijst van sw.js staat. Als een nieuwe kernrelease een nieuw bestand introduceert, moet de PR ook de app-specifieke precache-lijst aanpassen.
- Tests in PWA-Core controleren losse logica; tests in de ontvangende app controleren dat de kern met de concrete app-configuratie integreert.
- De centrale kern wordt eerst gecontroleerd opgebouwd vanuit de gevalideerde PWA-Template 1.5.0. De proof-of-concept omvat vervolgens afzonderlijke update-PR's voor MW4-CAMO, Energieverbruik en Games Backlog. Cryptotracker krijgt eerst een technische inventarisatie; niet forceren dat deze legacy-app direct hetzelfde pakket gebruikt.

## Gefaseerde invoering

1. **Stabiliseren:** PWA-Template 1.5.0 is gemerged en de gerichte twee-apparatentests zijn door de gebruiker bevestigd. De bredere acceptatietests blijven deels open.
2. **Inventariseren:** vergelijk de actuele kernbestanden, CSS, interfacecontracten, tests en service-worker-precache van de drie pilotapps.
3. **Extractie:** vul `Gertjun/PWA-Core` vanuit de gevalideerde Template-kern, inclusief testfixture, manifest, checksums en releaseproces.
4. **Proof-of-concept:** maak afzonderlijke update-PR's voor MW4-CAMO, Energieverbruik en Games Backlog. Toon aan dat CI, precache, offline start, versiepinning en rollback correct werken.
5. **Uitrollen:** pas na een geslaagde pilot volgen overige apps; elke app behoudt een eigen releasepin, PR en praktijktest.
6. **Nieuwe apps:** template-setup neemt een bewust gekozen stabiele PWA-Core-release als lokale bestanden op.

## Acceptatiecriteria voor de proof-of-concept

- Een vastgepinde versie is zichtbaar in de app-repository.
- De app laadt alle kernbestanden vanaf zijn eigen origin en start offline na een eerste succesvolle cachevulling.
- Een nieuwe release opent een PR; geen bestand wordt rechtstreeks naar main geschreven.
- De PR toont exact welke kernbestanden veranderen en welke versie wordt bijgewerkt.
- CI controleert syntax, bestaande tests, manifest/checksums en service-worker-precache.
- Een mislukte of incompatibele update kan worden afgewezen door de PR niet te mergen.
- Geen data-repository, kluisinhoud of persoonlijk token wordt benaderd.
