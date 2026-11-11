# Changelog

## 1.4.1

**Verbeterd**
- Het gekozen scherm in de navigatie gebruikt `--accent-text` als die is opgegeven, zodat een lichte accentkleur (geel) leesbaar blijft.
- Een lange appnaam loopt in de zijbalk door op een tweede regel in plaats van afgekapt te worden.
- iPad (app op het beginscherm): de kopbalk schuift niet meer onder de statusbalk.

## 1.4.0

Eén vaste indeling voor alle apps.

**Toegevoegd**
- **Navigatie in de kern** (`js/core/nav.js`): de app geeft zijn schermen op in `app.screens`; de schil tekent ze als tabbalk onderin (telefoon), tabbladen onder de kopbalk (iPad rechtop) of inklapbare zijbalk links (laptop, iPad liggend). `ctx.screen`, `ctx.go(id)` en `ctx.setBadge(id, n)`.
- **Instellingen is altijd het laatste scherm** en opent met hetzelfde overzicht: Synchronisatie, Beveiliging, Back-up, Over deze app en Dit apparaat wissen. Het tandwiel in de kopbalk is weg. `ctx.openSettings(pagina)`.
- **Kopbalk**: app-icoon met naam en versie; naast de zijbalk de titel van het scherm. Synchroniseren en vergrendelen staan altijd rechtsboven.
- **Koppelcode met pincode** (`js/core/pair.js`): Instellingen → Synchronisatie → *Ander apparaat koppelen* maakt een code; op het nieuwe apparaat plak je die bij *Bestaande koppelen*. Het wachtwoord van de kluis zit er niet in.
- **Bouwstenen** (`js/core/ui.js`): `filterControl()` (chips op de telefoon, keuzelijst op iPad en laptop), `emptyState()` en `card()`.

## 1.3.0

Verbeteringen uit MW4 Camo Tracker, Games Backlog en Energieverbruik teruggezet in de template, zodat alle apps weer dezelfde kern hebben.

**Toegevoegd**
- Face ID / passkey na opnieuw installeren: kies je bestaande passkey met *Bestaande passkey*. Elke app gebruikt een vaste PRF-invoer, dus dezelfde passkey geeft altijd hetzelfde geheim. Passkeys van een andere app op hetzelfde domein worden herkend en geweigerd.
- Face ID start vanzelf bij het openen van de app of bij terugkeer (`autoBiometricUnlock`, Safari vanaf iOS 17.4). Annuleren laat gewoon de knop en het wachtwoordveld staan.
- Automatisch vergrendelen is per apparaat in te stellen (Instellingen → Beveiliging).
- Instellingen als overzicht met een pagina per onderdeel en een Terug-knop, zoals op iOS (alleen als `#settings-menu` in `index.html` staat).
- Instellingen kunnen ook als scherm in de app (`<dialog id="dlg-settings" data-mode="page">`, met het event `settings:open`) of als paneel in de pagina (`#settings-panel` met secties met `data-group`, te tonen via `ctx.showShellSettings(group)`).
- Elke knop met `data-open-settings` opent de instellingen; elementen met `data-app-version` tonen het versienummer.
- `ctx.syncConfigured` en `ctx.readSyncFile(path)` om een ander, onversleuteld bestand uit de data-repo te lezen; `getText()` in de GitHub-client.
- Kopstijl `.app-brand` (icoon, naam en versie) in `base.css`.

**Gewijzigd**
- Kleuren in `base.css` staan nu als `light-dark(licht, donker)` in één regel. Een app kan licht of donker vastzetten met `data-modus="licht"` of `"donker"` op `<html>`.

## 1.2.0

**Toegevoegd**
- Automatische setup: na *Use this template* stelt de workflow *Nieuwe app instellen* naam, opslag-id, datapad, versie, manifest en titels in en probeert GitHub Pages aan te zetten. Handmatig te starten met een eigen naam, kleur en icoonletter; de iconen worden dan in alle formaten gemaakt (`tools/setup.mjs`).
- De accentkleur bepaalt automatisch de tekstkleur op knoppen (wit of donker), zodat ook lichte kleuren leesbaar blijven.

## 1.1.0

**Opgelost**
- Twee tabbladen tegelijk open kon wijzigingen van het andere tabblad overschrijven. Tabbladen laden nu elkaars wijzigingen in.
- Snel achter elkaar wijzigen kon wijzigingen kwijtraken. Wijzigingen en opslag lopen nu strikt één voor één.
- Een oudere app-versie kon gegevens van een nieuwere versie beschadigen. De app blokkeert nu het bewerken en synchroniseren en vraagt om bij te werken (`app.schemaVersion`).

**Toegevoegd**
- Privacyscherm: de inhoud wordt verborgen in de app-wisselaar en op de achtergrond.
- Synchroniseren wacht 20 seconden na de laatste wijziging (`syncDelaySeconds`), en gebeurt altijd direct bij vergrendelen of het verlaten van de app. Dat geeft minder commits.
- De app vraagt de browser om de opslag permanent te bewaren (`navigator.storage.persist()`).
- Back-up op de telefoon gaat via het deelmenu (`saveFile()`).
- Nieuwe wachtwoorden moeten minimaal 12 tekens hebben (`minPasswordLength`), met een sterktemeter.
- Knop om het wachtwoord te tonen of te verbergen.
- Na het instellen of koppelen biedt de app aan om Face ID / passkey in te schakelen.
- `parseEuro()` voor het invoeren van bedragen in Nederlandse notatie.
- Verwijderde records worden na 180 dagen opgeruimd (in de demo-`migrate`).
- Waarschuwing als de versies in `config.js` en `sw.js` verschillen.
- `CHANGELOG.md`.

**Gewijzigd**
- De kopbalk op brede schermen is even breed als de inhoud.

## 1.0.0

- Eerste versie: versleutelde kluis, GitHub-sync, Face ID / passkey, offline en updates, instellingen, back-up.
