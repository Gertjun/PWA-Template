# Projectinstructies voor Claude

Kopieer alles onder de streep naar de **Instructies** van je Claude-project en vul het blok *Over deze app* in. Vul vooral de app-repo goed in. Codebestanden hoef je niet als projectkennis toe te voegen: Claude werkt direct in de repo en leest daar altijd de actuele versie.

---

## Over deze app (per project invullen)

- **Naam:** …
- **Doel:** … (welk probleem lost de app op, en voor wie)
- **Belangrijkste schermen:** …
- **Datamodel:** … (collecties en hun velden, bijvoorbeeld `items: { id, titel, bedragCenten, datum }`)
- **Externe API's:** geen / … (moeten in de CSP `connect-src` in `index.html`)
- **App-repo:** `…/…` (GitHub Pages: `https://….github.io/…/`)
- **Data-repo:** `…/…` (privé), pad `…/vault.json`. Hier komt Claude niet aan.
- **Huidige versie:** …

## Over mij en de werkwijze

- Communiceer in het Nederlands. Alle teksten in de app zijn ook Nederlands.
- Ik bouw deze apps voor mezelf en ben geen fulltime ontwikkelaar. Leg kort uit wat je wijzigt en waarom, in gewone taal.
- Vraag eerst als een wijziging bestaande gegevens raakt, het datamodel verandert of een onomkeerbare actie vereist.
- Houd de runtime simpel: geen frameworks, geen build-stap, geen npm-packages en geen CDN-scripts. Alleen HTML, CSS en JavaScript-modules.
- **Nooit** de data-repo, kluisbestanden of tokens benaderen.

## Werken in de repo

### Begin van elke sessie
1. Controleer eerst de actuele repository, `main`, openstaande branches en PR's. Haal de laatste versie op; baseer geen werk op een verouderde kopie.
2. Lees `CLAUDE.md`, `NOTES.md`, `DECISIONS.md`, de bovenste paar versies van `CHANGELOG.md` en `WISHLIST.md).
3. Lees `js/config.js` en `js/app.js`; lees `README.md` en relevante delen van `js/core/` als de opdracht dat vraagt.
4. Controleer openstaande testresultaten, bekende problemen en besluiten. Vraag niet opnieuw naar context die al in de repo staat.

### Tijdens het werk
- Werk voor iedere afgebakende wijziging op een eigen feature- of fix-branch vanaf de actuele `main). Werk alleen verder op een bestaande branch als dat bewust bij de lopende PR hoort.
- Push nooit rechtstreeks naar `main). Maak kleine commits en open of werk een PR bij.
- Test relevante code vóór het pushen. Controleer daarna de GitHub Actions-resultaten op de actuele PR-commit.
- Een groene CI is geen vervanging voor handmatige browser-, iPhone- of twee-apparatentests. Meld duidelijk welke tests wel en niet zijn uitgevoerd.
- **Merge nooit zonder mijn expliciete akkoord.** "Ga verder" of "voer de volgende stap uit" is op zichzelf geen toestemming om te mergen.
- Leg wijzigingen kort uit en benoem risico's. Vraag vooraf akkoord voor destructieve wijzigingen, schemawijzigingen en migraties die bestaande gegevens kunnen raken.
- Houd rekening met `DECISIONS.md`. Wil je van een besluit afwijken, leg uit waarom en vraag eerst akkoord.

### Versies en documentatie
1. Bij app-code: verhoog `version` in `js/config.js` en `VERSION` in `sw.js) naar hetzelfde semver-nummer.
2. Voeg nieuwe runtimebestanden toe aan `PRECACHE` in `sw.js`.
3. Werk `CHANGELOG.md` bij in gewone taal en haal gerealiseerde punten uit `WISHLIST.md`.
4. Bij een wijziging aan het datamodel: verhoog `schemaVersion`, schrijf een migratie en behoud compatibiliteit met oudere app-versies en onbekende velden.
5. Documentatie-only wijzigingen verhogen de app-versie niet en veroorzaken geen onnodige service-worker-update. Noteer ze in `NOTES.md` en voeg een besluit toe als dat voor volgende sessies relevant is.

### Gedeelde kern
- Generieke bestanden zoals `js/core/**` en `css/base.css` kunnen door meerdere apps worden gebruikt. Controleer vóór wijziging welke apps ze gebruiken en vergelijk de actuele versies.
- Totdat een centrale PWA-Core-repository bestaat, is de PWA-template de voorlopige referentie. Kopieer geen bestanden blind naar andere apps.
- Breng generieke wijzigingen gecontroleerd over via aparte branches en PR's per app. Test elke app afzonderlijk.
- Zie `docs/SHARED-CORE.md` voor de beoogde aanpak en status van de centrale kern.

## Architectuur (gebaseerd op mijn PWA-template)

- Hosting op GitHub Pages. De app is een installeerbare PWA en wordt vooral gebruikt op iPhone (Safari, vanaf het beginscherm) en daarnaast op een laptop.
- `js/core/` bevat de generieke schil: versleutelde kluis (AES-GCM + PBKDF2), Face ID/passkey-ontgrendeling (WebAuthn PRF), synchronisatie met één versleuteld bestand in een private GitHub-repo (Contents API), service worker, instellingen en auto-lock.
- App-specifieke code staat in `js/app.js` (eventueel opgesplitst in extra modules onder `js/`), `css/app.css` en `js/config.js`.
- `app.js` exporteert `app` met `schemaVersion`, `screens`, `initialData()`, `migrate(data)`, `merge(local, remote)` en `render(root, ctx)`.
- Navigatie en algemene instellingen zijn van de schil. Geef schermen op in `app.screens` en teken in `render()` het scherm `ctx.screen`. Bouw geen eigen tabbalk, zijbalk of instellingenvenster.
- Gegevens wijzig je alleen via `await ctx.update(d => { … })`. Lees ze via `ctx.data` en muteer ze daar nooit direct.
- De schil regelt al meerdere tabbladen, blokkeren bij nieuwere data, het privacyscherm, sync-timing en minimale wachtwoordlengte. Bouw dat niet opnieuw in de app.

## Vaste regels bij elke app-codewijziging

1. **Versie**: verhoog `version` in `js/config.js` en `VERSION` in `sw.js` naar hetzelfde nummer (semver).
2. **Nieuw bestand**: voeg het toe aan `PRECACHE` in `sw.js`.
3. **Externe API**: voeg het domein toe aan `connect-src` in de CSP in `index.html`, en vang offline- en API-fouten netjes af.
4. **Datamodel**: verhoog `schemaVersion` en schrijf een migratie. Oude gegevens moeten blijven werken, ook als een ander apparaat nog op een oudere versie draait. Laat onbekende velden staan.
5. **Records**: elk record in een lijst heeft `id`, `createdAt` en `updatedAt`. Gebruik helpers uit `core/records.js`. Verwijder records niet echt uit een array; tombstones zijn nodig voor sync.
6. **Veiligheid**: toon gebruikersdata via `h()` of `textContent`, nooit via `innerHTML`. Sla geen gegevens buiten de kluis op. Log geen gegevens of tokens.
7. **Notatie**: bedragen in centen als integers, invoeren met `parseEuro()` en tonen met `formatEuro()`. Datums als `yyyy-mm-dd` en tonen met `Intl` in `nl-NL`.
8. **Mobiel eerst**: touch targets minimaal 44 px, inputs 16 px, rekening houden met safe areas en dark mode. Gebruik CSS-variabelen uit `base.css`.
9. **Toegankelijkheid**: icon-knoppen krijgen een `aria-label`; formulieren hebben labels.
10. **Bestanden aanbieden**: gebruik `saveFile()` uit `core/dom.js`.

## Testen (vóór iedere push, voor zover relevant)

- Voer automatische tests en JavaScript-syntaxiscontroles uit.
- Start lokaal met `python3 -m http.server 8080` en test in een browser, op een iPhone-formaat scherm en in light/dark mode als de omgeving dit ondersteunt.
- Test relevante flows: nieuwe kluis, toevoegen/wijzigen/verwijderen, vergrendelen/ontgrendelen, sync op twee apparaten inclusief gelijktijdige wijzigingen, twee tabbladen, migratie vanaf vorige versie en herstel van back-up.
- Na de PR-merge controleer je dat GitHub Pages is bijgewerkt; Geert controleert zelf de geïnstalleerde app op zijn apparaten.

## Afronding van elke sessie

- Werk `NOTES.md` bij met stand, open punten, uitgevoerde en niet-uitgevoerde tests en een kort sessielog.
- Voeg een nieuw besluit toe aan `DECISIONS.md` als een volgende sessie die keuze moet kennen; herschrijf oude besluiten niet.
- Werk `CHANGELOG.md` en `WISHLIST.md` bij als app-functionaliteit is gewijzigd.
- Werk de PR-beschrijving bij, push de branch en controleer de CI op de laatste commit.
- Rapporteer de branch/PR, resultaten, resterende handmatige controles en de volgende stap. Wacht op expliciet akkoord voor merge.
