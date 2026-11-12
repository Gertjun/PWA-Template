# CLAUDE.md – vaste werkafspraken

Deze afspraken gelden voor alle PWA's van Geert. De repository- en app-specifieke documentatie blijft leidend voor details.

## Aan het begin van iedere sessie
1. **Controleer de repository:** bevestig eigenaar/reponaam, actieve branch en actuele HEAD. Haal de actuele main op en controleer of je branch niet achterloopt. Werk nooit op basis van een oude chatbeschrijving of onthouden commit.
2. **Controleer open werk:** bekijk open PR's, relevante branches en de laatste GitHub Actions-runs. Controleer checks op de actuele commit; oude groene checks tellen niet voor een nieuwere head.
3. **Lees documentatie:** CLAUDE.md, NOTES.md, DECISIONS.md, de bovenste relevante versies van CHANGELOG.md en zo nodig README.md/WISHLIST.md. Lees daarna js/config.js en js/app.js. Lees core-, CSS-, workflow- en testbestanden als de taak die raakt.
4. **Bepaal de scope:** vat kort samen wat al gedaan is, wat openstaat en wat nu nodig is. Respecteer eerdere besluiten. Vraag vooraf akkoord bij risicovolle wijzigingen aan bestaande gegevens, datamodel, encryptie, synchronisatie of gedeelde kerncode.
5. **Maak een eigen werkbranch vanaf de actuele main.** Werk nooit rechtstreeks op main.

## Tijdens het werk
- Communiceer in het Nederlands, kort en begrijpelijk. Alle zichtbare appteksten zijn Nederlands.
- Voer afgesproken werkzaamheden zelfstandig uit, inclusief analyse, code, documentatie en tests.
- "Hoe zou je…?", brainstormen of "nog niet bouwen" is alleen een adviesverzoek, geen toestemming om te implementeren.
- Bij app-codewijzigingen: verhoog MAJOR.MINOR.PATCH. MAJOR bij noodzakelijke gebruikershandeling/incompatibiliteit, MINOR bij functionaliteit, PATCH bij fixes. Houd js/config.js version en sw.js VERSION gelijk. Documentatie-only wijzigingen verhogen de app-versie niet.
- Werk CHANGELOG.md bij voor elke app-release. Verplaats afgeronde wensen uit WISHLIST.md. Werk NOTES.md en DECISIONS.md aan het einde bij.
- Behandel js/core/ en css/base.css als gedeelde generieke code. Wijzig ze alleen als de verbetering voor alle apps klopt. Beschrijf impact en compatibiliteit en plan verspreiding naar de andere apps via afzonderlijke PR's. Maak niet stilzwijgend verschillende varianten.
- Als werk een besluit uit DECISIONS.md tegenspreekt, benoem dat en vraag eerst akkoord.
- Open, wijzig of gebruik nooit de privé-datarepository, kluizen, persoonlijke gegevens of tokens. Vraag niet om tokens en plaats ze nooit in code, logs, commits of chat.
- Nooit force-pushen, geschiedenis herschrijven of branches verwijderen. Geen directe push naar main.

## Wijzigingen, testen en pull requests
1. Werk op een eigen branch vanaf de actuele main. Houd wijzigingen klein en gericht.
2. Test vóór de PR. Voer relevante automatische tests, syntaxcontroles en statische controles uit. Test browsergedrag op desktop en mobiel formaat, light/dark mode en relevante flows. Test sync en migraties expliciet wanneer die geraakt worden.
3. Claim alleen tests die daadwerkelijk zijn uitgevoerd. Maak onderscheid tussen lokale tests, GitHub Actions en praktijktests die Geert nog moet uitvoeren.
4. Werk alle relevante documentatie bij voordat de PR als gereed wordt gemeld.
5. Maak of actualiseer een PR naar main met doel, wijzigingen, testresultaten, risico's en resterende praktijktests. Controleer daarna checks op de exacte actuele PR-head.
6. Meld of de PR open, klaar voor review, geblokkeerd of gefaald is. **Merge nooit zonder expliciet akkoord van Geert.** Groene CI is geen merge-toestemming.
7. Na een toegestane merge: controleer merge-commit, main, deploy-workflow en live status. Meld wat Geert op zijn apparaten moet controleren.

## Aan het einde van iedere sessie (altijd)
1. NOTES.md: datum, actuele versie/branch/PR, stand, open punten en sessielog bijwerken; nieuwste bovenaan.
2. DECISIONS.md: alleen een nieuw genummerd besluit toevoegen als de volgende sessie die keuze moet kennen. Oude besluiten niet herschrijven.
3. CHANGELOG.md: appwijzigingen vastleggen. Documentatie-only werk apart noteren zonder app-versie te verhogen.
4. Controleren dat documentatie overeenkomt met de werkelijke GitHub-status en dat tests/merges niet te rooskleurig worden beschreven.
5. Zorgen dat branch en PR een duidelijke vervolgstap hebben. Laat de PR open als merge-akkoord ontbreekt. Rapporteer wijzigingen, tests, PR/checkstatus, resterende acties en eerstvolgende stap.

## Technische uitgangspunten
- Geen frameworks, npm-packages, CDN-scripts of build-stap in de PWA, tenzij Geert vooraf instemt.
- Behoud bestaande gegevens en onbekende velden. Datamodelwijzigingen vereisen migraties en tests.
- Geef gebruikersdata veilig weer; geen onveilige HTML-injectie. Sla geen kluisinhoud buiten de versleutelde kluis op en log geen gegevens of tokens.
- Records hebben stabiele ID's en tijdstempels; verwijderingen blijven compatibel met sync en tombstones.
- Houd rekening met iPhone/Safari, offline gebruik, toegankelijkheid, touch targets, safe areas en dark mode.
- De privé-datarepository blijft buiten scope, ook als een test of herstel daardoor eenvoudiger lijkt.
