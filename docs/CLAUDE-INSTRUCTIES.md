# Projectinstructies voor Claude

Kopieer alles onder de streep naar de **Instructies** van je Claude-project. Vul per app het blok *Over deze app* in. Zet daarnaast in de **projectkennis**: `README.md`, `js/config.js`, `js/app.js` en de bestanden in `js/core/` (of minstens `shell.js`, `vault.js` en `records.js`).

---

## Over deze app (per project invullen)

- **Naam:** …
- **Doel:** … (welk probleem lost de app op, en voor wie)
- **Belangrijkste schermen:** …
- **Datamodel:** … (collecties en hun velden, bijvoorbeeld `items: { id, titel, bedragCenten, datum }`)
- **Externe API's:** geen / … (moeten in de CSP `connect-src` in `index.html`)
- **Repo's:** app `…/…` (GitHub Pages) · data `…/…` (privé), pad `…/vault.json`
- **Huidige versie:** …

## Over mij en de werkwijze

- Communiceer in het Nederlands. Alle teksten in de app zijn ook Nederlands.
- Ik bouw deze apps voor mezelf en ben geen fulltime ontwikkelaar. Leg kort uit wat je wijzigt en waarom, in gewone taal.
- Lever voor elk gewijzigd bestand het **volledige bestand**, met het pad erboven. Geen fragmenten zoals "rest blijft hetzelfde". Is alleen een klein stuk van een groot bestand gewijzigd, noem dan exact welke regels vervangen moeten worden.
- Sluit elke levering af met: de gewijzigde bestanden, het nieuwe versienummer en hoe ik het kan testen.
- Vraag eerst als een wijziging bestaande gegevens raakt of het datamodel verandert.
- Houd het simpel: geen frameworks, geen build-stap, geen npm-packages en geen CDN-scripts. Alleen HTML, CSS en JavaScript-modules.

## Architectuur (gebaseerd op mijn PWA-template)

- Hosting op GitHub Pages. De app is een installeerbare PWA en wordt vooral gebruikt op iPhone (Safari, vanaf het beginscherm) en daarnaast op een laptop.
- `js/core/` is de template-kern: versleutelde kluis (AES-GCM + PBKDF2), Face ID/passkey-ontgrendeling (WebAuthn PRF), sync met één versleuteld bestand in een private GitHub-repo (Contents API), service worker, instellingen en auto-lock. **Pas `core/` niet aan** tenzij ik daar expliciet om vraag. Is een wijziging nodig, maak die dan generiek (bruikbaar voor al mijn apps) en meld het, zodat ik hem in de template kan terugzetten.
- App-specifieke code staat alleen in `js/app.js` (eventueel opgesplitst in extra modules onder `js/`), `css/app.css` en `js/config.js`.
- `app.js` exporteert `app` met `schemaVersion`, `initialData()`, `migrate(data)`, `merge(local, remote)` en `render(root, ctx)`. Gegevens wijzig je alleen via `await ctx.update(d => { … })`. Lees ze via `ctx.data` en muteer ze daar nooit direct.
- De schil regelt al: meerdere tabbladen, blokkeren als de data nieuwer is dan de app, het privacyscherm, sync-timing (`syncDelaySeconds`) en een minimale wachtwoordlengte. Bouw dat niet opnieuw in de app.

## Vaste regels bij elke wijziging

1. **Versie**: verhoog `version` in `js/config.js` en `VERSION` in `sw.js` naar hetzelfde nummer (semver: patch voor fixes, minor voor features).
2. **Nieuw bestand**: voeg het toe aan `PRECACHE` in `sw.js`.
3. **Externe API**: voeg het domein toe aan `connect-src` in de CSP in `index.html`, en vang offline of fouten netjes af.
4. **Datamodel gewijzigd**: verhoog `SCHEMA` (dat is ook `app.schemaVersion`) en schrijf een migratie in `app.migrate()`. Oude gegevens moeten blijven werken, ook als een ander apparaat nog op een oudere versie draait. Laat onbekende velden daarom staan.
5. **Records**: elk record in een lijst heeft `id`, `createdAt` en `updatedAt`. Gebruik de helpers uit `core/records.js` (`newRecord`, `updateById`, `removeById`, `alive`, `mergeCollections`). Verwijder records nooit echt uit een array, want tombstones zijn nodig voor de sync. Zorg dat `merge()` elke collectie samenvoegt.
6. **Veiligheid**: toon gebruikersdata altijd via `h()` of `textContent`, nooit via `innerHTML`. Sla geen gegevens op buiten de kluis (dus geen losse `localStorage`-sleutels met inhoud). Log geen gegevens of tokens naar de console.
7. **Notatie**: bedragen in centen als integers, invoeren met `parseEuro()` en tonen met `formatEuro()`. Datums als `yyyy-mm-dd` (gebruik `today()` voor de lokale datum) en tonen met `Intl` in `nl-NL`.
8. **Mobiel eerst**: touch targets van minimaal 44 px, inputs met 16 px tekst (anders zoomt iOS in), rekening houden met safe areas en dark mode. Gebruik de CSS-variabelen uit `base.css` (`--accent`, `--surface`, `--text`, `--muted`, `--border` …) in plaats van vaste kleuren.
9. **Toegankelijkheid**: knoppen met alleen een icoon krijgen een `aria-label`, en formulieren hebben labels.
10. **Bestanden aanbieden** (export, rapport): via `saveFile()` uit `core/dom.js`, nooit met een eigen download-link.
11. **CHANGELOG.md**: noteer elke versie met wat er is opgelost, toegevoegd of gewijzigd, in gewone taal.

## Testen (vermeld wat relevant is)

- Lokaal: `python3 -m http.server 8080` → `http://localhost:8080`
- Nieuwe kluis → items toevoegen → vergrendelen → ontgrendelen
- Sync tussen twee apparaten, inclusief een gelijktijdige wijziging op beide (handmatig via de sync-knop, of vergrendelen)
- Twee tabbladen tegelijk open: een wijziging in het ene verschijnt in het andere
- Bestaande gegevens van de vorige versie laden (migratie)
- Na deploy: melding "Nieuwe versie beschikbaar" verschijnt op de iPhone
