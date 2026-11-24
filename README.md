# KvittoKompis · Publik webbplats

Statisk webbplats för KvittoKompis Hantverkare Edition. Render-tjänsten `kvittokompis-website` publicerar från `release/render-landing`, med publiceringskatalog `.` och avstängd automatisk driftsättning. Applikationen har separat källkod och driftmiljö.

## Förhandsgranska

Kör `python3 -m http.server 8000` från denna katalog och öppna `http://localhost:8000/`. Produktionssidan använder lokala resurser och systemtypsnitt.

Produktvyerna är webbillustrationer med fiktiva exempel. Hantverkarfotot är framtaget för webbplatsen. De befintliga KvittoKompis- och Hantverkare-logotyperna används oförändrade.

## Lanseringsläge

I `launch-config.js` är `pre-launch` standard. `beta-launch` lägger till en länk till den godkända, fortsatt skyddade betan först när `betaApp` innehåller dess HTTPS-adress. `public-launch` visar den publika appen och installationshjälpen när `publicApp` är ifylld. Registrering och abonnemang kan då visas med `publicSignup` respektive `publicPlans`. Kod och konfiguration är publika. Använd aldrig hemligheter eller privata åtkomstlänkar i konfigurationen.

## Intresseanmälan

Webbplatsen länkar till ett Brevo-formulär efter godkänd acceptans. Brevo hanterar formuläret och bekräftelsen på serversidan. Ingen formulärdata, API-nyckel eller cookie för Brevo passerar landningssidan. Funktionen är avstängd med tom `verifiedBetaInterestForm` och `privacyContact`.

1. Koppla formuläret **KvittoKompis – betaintresse** till en separat lista. Kräv e-post. Lägg till en valfri bransch med Bygg och snickeri, El, VVS, Måleri, Mark och anläggning, Service och installation och Annat. Formuläret ska bara samla in betaintresse. Om marknadsföring läggs till senare ska den ha ett separat, frivilligt val och en avregistreringslänk.
2. Lägg in länken till `https://kvittokompis.se/integritet.html#intresseanmalan`. Färdigställ information om ansvarig organisation, verifierad kontaktväg, rättslig grund, gallring och rättigheter innan personuppgifter samlas in.
3. Aktivera dubbel bekräftelse med verifierad avsändare. Skriv »Kontrollera din inkorg och bekräfta din e-postadress« för godkänd inskickning. Skriv »Din intresseanmälan är bekräftad« först efter att mottagaren har klickat på länken och Brevo har lagt adressen i listan.
4. Aktivera Brevos tillgängliga spamkontroll och verifiera en faktisk begränsning av täta inskick och duplicerade bekräftelseutskick. Om Brevo-formuläret inte ger tillräcklig begränsning behöver formuläret ett separat skydd med serversideskontroll. Formuläret är då fortsatt avstängt.
5. Testa med godkända testadresser. Kontrollera fel vid ogiltig eller tom e-post, valfri bransch, dubbla försök och spamkontroll. Verifiera mottaget brev, att bekräftelselänken fungerar, att aktuell adress finns en gång i rätt lista efter bekräftelse och att avanmälan fungerar. Använd ingen app- eller kunddata.
6. Efter godkänd testning, lägg in Brevos HTTPS-länk under `verifiedBetaInterestForm` och en verifierad adress på domänen under `privacyContact`. Öppna sidan och kontrollera att den visar rätt länkar.

[Brevo-formulär](https://help.brevo.com/hc/en-us/articles/208771869-Create-a-sign-up-form-in-Brevo) · [Spamskydd](https://help.brevo.com/hc/en-us/articles/19591451188114-Protect-your-forms-from-bots-and-spam-signups)

## Driftsättning

Granska separat från appen. Efter godkännande, driftsätt den granskade committen på den befintliga Render-tjänsten. Kontrollera HTTP 200 och canonical på hemsidan och integritetssidan, att robots och sitemap kan hämtas, OG-bilden, eventuell `X-Robots-Tag` i Render samt att inga applänkar finns i förlanseringsläget.
