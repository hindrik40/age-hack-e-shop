# Vercel – Stäng av skydd (Deployment Protection)

Den här guiden visar exakt hur du stänger av Vercel-skyddet (kräver inloggning) på produktion så att din webbplats blir publik.

## Översikt
- Målet: Ta bort autentiseringsskyddet på produktion (Production) för projektet `e-shop`.
- Var: Vercel Dashboard → Projektinställningar → Access Controls / Deployment Protection.
- Alternativ: Skapa en bypass-länk om du vill behålla skyddet men ändå dela en åtkomstlänk.

## Förberedelser
1. Gå till Vercel Dashboard: https://vercel.com/dashboard
2. Välj rätt Team/Organisation (om du har flera).
3. Öppna projektet: `e-shop`.

## Steg-för-steg: Stäng av skydd på produktion
1. Öppna `Project → Settings` för `e-shop`.
   - [Skärmdump-beskrivning: Överst i projektet, klicka på fliken “Settings”.]
2. Gå till sektionen `Access Controls` (ibland visas som `Security`), hitta `Deployment Protection`.
   - [Skärmdump-beskrivning: Vänstermenyn innehåller “Access Controls”; på sidan ser du “Deployment Protection”.]
3. Hitta inställningen för `Production` (det kan finnas separata kontroller för `Preview` och `Production`).
4. Stäng av kravet “Require Authentication” / “Protected Deployments” för `Production`.
   - Välj “Off” eller ta bort bocken för att kräva inloggning.
   - [Skärmdump-beskrivning: En toggle eller checkbox vid “Production”. Sätt den till Off.]
5. Spara ändringar (om Vercel begär det; ibland sparas automatiskt).
6. Vänta 10–30 sekunder på att policyn ska gälla.

## Alternativ: Skapa en Protection Bypass-länk
Om du vill behålla skyddet men ändå ge åtkomst:
1. Samma väg: `Project → Settings → Access Controls → Deployment Protection`.
2. Skapa en “Protection Bypass Token” (`Create Bypass Link`).
3. Kopiera den genererade URL:en.
4. Dela länken – besökare kan se siten utan att logga in via den länken.
   - [Skärmdump-beskrivning: Knapp “Create Bypass Link” och en URL som visas.]

## Team/Organisation-skydd
- Om du inte hittar projektinställningarna eller de är låsta kan skyddet vara satt på Team/Organisation-nivå.
- Gå till `Team/Organisation → Settings → Access Controls` och stäng av “Require Authentication” där.
  - [Skärmdump-beskrivning: Vänstermenyn på team/organisation, “Access Controls”.]

## Verifiera att skyddet är av
- Öppna en privat/inkognito-flik och besök:
  - `https://e-shop-i5x9t3jcf-hindrik-ounpuus-projects.vercel.app/`
  - `https://e-shop-i5x9t3jcf-hindrik-ounpuus-projects.vercel.app/treatments`
  - `https://e-shop-i5x9t3jcf-hindrik-ounpuus-projects.vercel.app/forum`
- Tidigare fel: `401 Behörighet saknas` betyder att skyddet fortfarande är aktivt.
- Korrekt läge: Sidor öppnas utan inloggning.

## Felsökning
- Ser du fortfarande `401` efter att ha stängt av `Production`? Kontrollera:
  1. Att du stängde av just `Production`, inte bara `Preview`.
  2. Team/Organisation-nivån (kan åsidosätta projektinställning).
  3. Vänta upp till 1 minut och testa igen i inkognito.
- Om sidan är publik men data saknas på `/treatments`:
  - Kontrollera miljövariabler i Vercel (`Project → Settings → Environment Variables`):
    - `NEXT_PUBLIC_SUPABASE_URL`
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - Kontrollera att Supabase RLS/policies tillåter läsning (SELECT) för anonyma användare på tabellerna:
    - `treatment_categories`, `ailments`, `treatments`, `treatment_ailments`.

## Tips om var menyerna kan vara
- “Access Controls” kan ligga under “Settings” i vänstermenyn; ibland heter sektionen “Security”.
- “Deployment Protection” visas som egen kort/sektion med toggles för `Preview` och `Production`.
- Om du inte ser inställningarna: byt Team/Organisation längst upp i Vercel eller be en ägare höja dina rättigheter.

---

Behöver du att vi stänger av skyddet åt dig eller skapar en bypass-länk? Säg till så tar vi det direkt.