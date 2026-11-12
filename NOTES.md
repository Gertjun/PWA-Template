# NOTES – PWA-template

De **actuele stand**: versie, open punten en sessielog. Werk dit bij aan het eind van elke sessie (zie `CLAUDE.md`). Besluiten staan in `DECISIONS.md`, wensen in `WISHLIST.md`.

Laatst bijgewerkt: 12 november 2026 · versie **1.5.0**

---

## 1. Werkwijze
De actuele werkwijze staat in `CLAUDE.md`. Wijzigingen verlopen via branches en PR's; merge alleen na expliciet akkoord. Documentatie-only wijzigingen verhogen de app-versie niet.

## 2. Stand
Basistemplate voor Geerts PWA's. De modulaire apps MW4-CAMO, Energieverbruik en Games Backlog vormen de eerste POC-groep voor de centrale PWA-Core.

De repository `Gertjun/PWA-Core` is aangemaakt. De initiële extractie van de gedeelde bestanden, release-manifesten, versiepinning en distributieworkflow moeten nog worden ingericht en getest. PWA-Template 1.5.0 is de actuele referentie voor de nieuwe verwijderadministratie; de bestaande identieke kern van de drie POC-apps wordt eerst zorgvuldig vergeleken voordat bestanden worden vervangen.

Cryptotracker en Vaste Lasten blijven buiten de eerste POC en worden later afzonderlijk op architectuur en migratiemogelijkheden beoordeeld.

## 3. Open punten en bekende problemen
- Centrale PWA-Core vullen met uitsluitend generieke bestanden, contracttests, manifest en release-/distributieworkflows.
- De eerste release en updateworkflow aantonen met aparte PR's voor MW4-CAMO, Energieverbruik en Games Backlog.
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
