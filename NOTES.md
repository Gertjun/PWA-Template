# NOTES – PWA-template

De **actuele stand**: versie, open punten en sessielog. Werk dit bij aan het eind van elke sessie (zie `CLAUDE.md`). Besluiten staan in `DECISIONS.md`, wensen in `WISHLIST.md`.

Laatst bijgewerkt: 12 november 2026 · versie **1.5.0** (documentatie bijgewerkt; geen app-release)

---

## 1. Werkwijze
De actuele werkwijze staat in `CLAUDE.md`. Wijzigingen verlopen via branches en PR's; merge alleen na expliciet akkoord. Documentatie-only wijzigingen verhogen de app-versie niet.

## 2. Stand
Basistemplate voor Geerts PWA's. PWA-Core v1.0.0 is inmiddels de centrale bron en eerste stabiele release voor de gedeelde modulaire kern. De eerste pilotgroep bestaat uit MW4-CAMO, Energieverbruik en Games Backlog; iedere app wordt afzonderlijk gemigreerd en geaccepteerd.

De core-bestanden in deze template zijn afkomstig uit broncommit `0f538f8acf40d086df38e9bc4ed2cd875925c569`, zoals vermeld in het PWA-Core-manifest. De formele `core-manifest.json`-/`pwa-core.lock.json`-integratie en automatische distributie/updateworkflow zijn nog niet in de template-setup geïntegreerd. Dit blijft een expliciet open punt; de template mag niet als formeel gepind worden beschouwd.

Cryptotracker en Vaste Lasten blijven buiten de eerste POC en worden later afzonderlijk op architectuur en migratiemogelijkheden beoordeeld.

## 3. Open punten en bekende problemen
- Formele PWA-Core-manifest- en lockfile-integratie in PWA-Template en de setup voor nieuwe apps ontwerpen en implementeren.
- Distributie-/updateworkflow vanuit PWA-Core naar ontvangende apps voorbereiden en per app testen.
- Pilotmigraties van MW4-CAMO, Energieverbruik en Games Backlog afzonderlijk uitvoeren en accepteren.
- De bredere acceptatietests en platformmatrix blijven deels open. De geslaagde twee-apparatentest van 1.5.0 bewijst niet automatisch alle 29 contracttests of alle OS-/browsercombinaties.
- PWA-Template PR #2 bevat werkafspraken en de architectuur-/contractdocumenten. Deze PR wordt bijgewerkt op basis van de actuele main en blijft open voor beoordeling; er wordt niet automatisch gemerged.
- De tijdelijke testtoken is ingetrokken. Productiedata, kluisbestanden en productietokens blijven buiten scope.

## 4. Sessielog (kort, nieuwste bovenaan)

- **12 nov 2026:** PWA-Core-repository aangemaakt. PR #2 wordt bijgewerkt met een merge van de actuele Template-main en opgeloste documentatieconflicten. De architectuur- en contractdocumenten worden bijgewerkt naar de actuele projectstatus. Geen app-code of app-versie gewijzigd.
- **12 nov 2026:** PWA-Template 1.5.0 is gemerged naar main. De gebruiker heeft de gerichte twee-apparatentests voor synchronisatie, offline-verwijdering, back-upherstel, afmelden/opnieuw koppelen en verwijderbevestigingen succesvol afgerond. De tijdelijke testtoken is ingetrokken.
- **12 nov 2026:** de modulaire apps MW4-CAMO, Energieverbruik en Games Backlog zijn geselecteerd als eerste POC-groep. Cryptotracker en Vaste Lasten worden later afzonderlijk beoordeeld.
- **12 nov 2026:** werkafspraken aangescherpt: actuele repo/PR/CI-controle, branches en PR's, geen directe push of merge zonder expliciet akkoord, vaste start- en eindcontrole.

- **10 nov 2026:** 1.4.0: vaste indeling voor alle apps: navigatie, Instellingen als laatste scherm, kopbalk, koppelcode en gedeelde UI-bouwstenen.
- **10 nov 2026:** 1.3.0: kern gelijkgetrokken met MW4, Games en Energieverbruik; vaste projectdocumentatie toegevoegd.

- **12 nov 2026:** documentatie bijgewerkt op branch `docs/align-template-with-pwa-core`: README, PWA-Core-architectuur, Claude-projectinstructies, centrale `CLAUDE.md` en deze NOTES. Vastgelegd dat PWA-Core v1.0.0 stabiel is, maar formele pin-/distributie-integratie in de template nog openstaat. Geen runtimecode of app-versie gewijzigd.
