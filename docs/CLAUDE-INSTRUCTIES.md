# Projectinstructies voor Claude

Kopieer alles onder de streep naar de **Instructies** van je Claude-project en vul het blok *Over deze app* in. Vul vooral de app-repo goed in. Codebestanden hoef je niet als projectkennis toe te voegen: Claude werkt direct in de repo en leest daar altijd de actuele versie.

---

## Over deze app (per project invullen)

- **Naam:** …
- **Doel:** …
- **Belangrijkste schermen:** …
- **Datamodel:** …
- **Externe API's:** geen / … (moeten in de CSP `connect-src` in `index.html`)
- **App-repo:** `…/…` (GitHub Pages: `https://….github.io/…/`)
- **Data-repo:** `…/…` (privé), pad `…/vault.json`. Hier komt Claude niet aan.
- **Huidige app-versie:** …
- **PWA-Core-versie en commit:** … (aflezen uit `pwa-core.lock.json`, indien aanwezig)

## Over mij en de werkwijze

- Communiceer in het Nederlands. Alle teksten in de app zijn ook Nederlands.
- Leg kort uit wat je wijzigt en waarom, in gewone taal.
- Vraag eerst als een wijziging bestaande gegevens raakt, het datamodel verandert of een onomkeerbare actie vereist.
- Houd de runtime simpel: geen frameworks, geen build-stap, geen npm-packages en geen CDN-scripts.
- **Nooit** de data-repo, kluisbestanden of tokens benaderen.

## Werken in de repo

### Begin van elke sessie

1. Controleer eerst de actuele repository, `main`, branches en openstaande PR's.
2. Lees `CLAUDE.md`, `NOTES.md`, `DECISIONS.md`, recente `CHANGELOG.md`-items en `WISHLIST.md`.
3. Lees `js/config.js`, `js/app.js`, `README.md` en relevante core-bestanden.
4. Controleer openstaande testresultaten, bekende problemen en besluiten. Vraag niet opnieuw naar context die al in de repo staat.

### Tijdens het werk

- Werk voor iedere afgebakende wijziging op een eigen feature- of fix-branch vanaf de actuele `main`.
- Push nooit rechtstreeks naar `main`. Maak kleine commits en open of werk een PR bij.
- Test relevante code vóór het pushen. Controleer daarna de GitHub Actions-resultaten op de actuele PR-commit.
- Een groene CI vervangt geen handmatige browser-, iPhone- of twee-apparatentests.
- **Merge nooit zonder expliciet akkoord.**
- Leg wijzigingen uit en benoem risico's. Vraag vooraf akkoord voor destructieve wijzigingen, schemawijzigingen en migraties die bestaande gegevens kunnen raken.
- Houd rekening met `DECISIONS.md`.

### Versies en documentatie

1. Bij app-runtimecode: verhoog `version` in `js/config.js` en `VERSION` in `sw.js` naar hetzelfde SemVer-nummer.
2. Voeg nieuwe runtimebestanden toe aan de app-eigen `PRECACHE`.
3. Werk `CHANGELOG.md` bij bij functionele wijzigingen.
4. Bij een datamodelwijziging: verhoog `schemaVersion`, schrijf een migratie en behoud onbekende velden.
5. Documentatie-only wijzigingen verhogen de appversie niet en veroorzaken geen onnodige service-worker-update. Noteer ze in `NOTES.md` en zo nodig `DECISIONS.md`.

### Gedeelde kern

- De centrale bron voor generieke code is `Gertjun/PWA-Core`. De eerste stabiele release `v1.0.0` is gepubliceerd.
- PWA-Template blijft de officiële startbasis voor nieuwe apps, maar is niet langer de centrale plaats om generieke core-wijzigingen te ontwikkelen.
- Controleer vóór core-wijzigingen welke apps de betrokken modules gebruiken.
- Een formele app-pin bestaat uit `core-manifest.json` en `pwa-core.lock.json`; controleer de exacte release, tag, commit-SHA en checksums. Als deze bestanden ontbreken, meld dat als integratiegat en verzin geen pin.
- Breng generieke wijzigingen eerst via een branch en PR naar PWA-Core. Na een release worden ze per ontvangende app via een eigen branch en PR geïntegreerd.
- Kopieer geen bestanden blind en wijzig de app-eigen `sw.js` alleen gericht voor de precache.
- Zie de architectuur- en contractdocumentatie in PWA-Core en `docs/PWA-CORE-ARCHITECTUUR.md`.

## Architectuur

- Hosting op GitHub Pages; mobiel eerst, met iPhone/Safari en laptop als belangrijke omgevingen.
- `js/core/` bevat de generieke schil; `js/app.js`, `js/config.js` en `css/app.css` blijven app-specifiek.
- `app.js` exporteert `app` met `schemaVersion`, `screens`, `initialData()`, `migrate(data)`, `merge(local, remote)` en `render(root, ctx)`.
- Lees data via `ctx.data`; wijzig uitsluitend via `await ctx.update(d => { … })`.
- Bouw geen eigen generieke navigatie, instellingen, sync of vault als de core die al levert.

## Veiligheid en testen

- Gebruik geen `innerHTML` voor gebruikersdata; gebruik veilige DOM-helpers of `textContent`.
- Sla geen gegevens buiten de kluis op en log geen gegevens of tokens.
- Test syntax, unit-tests en relevante app-flows.
- Test waar relevant nieuwe kluis, toevoegen/wijzigen/verwijderen, vergrendelen/ontgrendelen, sync op twee apparaten, meerdere tabbladen, migratie en back-upherstel.
- Na merge controleer je deployment; de gebruiker voert zelf de geïnstalleerde app- en platformacceptatie uit.

## Afronding van elke sessie

- Werk `NOTES.md` bij met stand, open punten, uitgevoerde en niet-uitgevoerde tests.
- Voeg een nieuw besluit toe aan `DECISIONS.md` als een keuze volgende sessies moet sturen; herschrijf oude besluiten niet.
- Werk `CHANGELOG.md` en `WISHLIST.md` bij als app-functionaliteit is gewijzigd.
- Werk de PR-beschrijving bij, push de branch en controleer CI op de laatste commit.
- Rapporteer branch/PR, resultaten, resterende handmatige controles en volgende stap. Wacht op expliciet akkoord voor merge.
