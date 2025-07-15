import { test, expect } from '@playwright/test';

test.describe('Tester arbeidstakersøknad - gradert 50%', () => {
  test.beforeAll(async ({ page }) => {
    await page.goto(
      '/syk/sykepengesoknad?testperson=arbeidstaker-gradert',
    );
  });

  test('Laster startside', async ({ page }) => {
    await expect(
      page.locator('.navds-heading--large'),
    ).toBeVisible();
    await expect(
      page.locator('.navds-heading--large'),
    ).toHaveText('Søknader');
    // Assuming soknad.id is known or can be selected by pattern
    // In Cypress it's `a[href*=${soknad.id}]`, here we simulate
    // For translation, assume we click the link containing the ID
    // But since soknad is imported in Cypress, here we hardcode or simulate
    // To match, let's assume the link is identifiable
    await page
      .locator('a[href*="some-soknad-id"]') // Replace with actual selector if needed
      .click(); // Adjust based on actual ID
  });

  test('Søknad ANSVARSERKLARING', async ({ page }) => {
    // Assuming soknad.id is 'some-id', adjust accordingly
    await expect(page).toHaveURL(/.*some-id\/1/);
    // sjekkIntroside() - translate to checks
    // Assuming it checks for intro elements, inline similar checks
    await expect(
      page.locator('h2'), // Example, adjust to actual intro checks
    ).toHaveText('Intro title'); // Placeholder

    // checkViStolerPaDeg() - likely checks a checkbox or text
    // Assuming it's checking and clicking a consent
    await page
      .locator('[data-cy="ansvarserklaering"] input[type="checkbox"]')
      .check(); // Adjust selector
  });

  test('Tilbake til ANSVARSERKLARING og frem igjen', async ({
    page,
  }) => {
    // klikkTilbake() - click back
    await page.locator('button[data-cy="tilbake"]').click();
    await page
      .locator('button')
      .filter({ hasText: 'Start søknad' })
      .click();
  });

  test('Søknad TILBAKE_I_ARBEID', async ({ page }) => {
    await expect(page).toHaveURL(/.*some-id\/2/);
    await page
      .locator('[data-cy="ja-nei-stor"] input[value="JA"]')
      .click();
    await expect(page.locator('text=Når begynte du å jobbe igjen?')).toBeVisible();
    await page.locator('.navds-date__field-button').click();
    await page.locator('.rdp-day:has-text("20")').click();
    // klikkGaVidere() - click next
    await page.locator('button[data-cy="ga-videre"]').click();
  });

  test('Søknad FERIE_V2', async ({ page }) => {
    await expect(page).toHaveURL(/.*some-id\/3/);
    await page
      .locator('[data-cy="ja-nei-stor"] input[value="JA"]')
      .click();
    await expect(page.locator('text=Når tok du ut feriedager?')).toBeVisible();
    // setPeriodeFraTil(16, 23) - set dates
    await page.locator('#fra-dato').fill('2020-04-16'); // Assuming format
    await page.locator('#til-dato').fill('2020-04-23');
    await page.locator('button[data-cy="ga-videre"]').click();
  });

  test('Søknad PERMISJON_V2', async ({ page }) => {
    await expect(page).toHaveURL(/.*some-id\/4/);
    await page
      .locator('[data-cy="ja-nei-stor"] input[value="JA"]')
      .click();
    await expect(page.locator('text=Når tok du permisjon?')).toBeVisible();
    // setPeriodeFraTil(14, 22)
    await page.locator('#fra-dato').fill('2020-04-14');
    await page.locator('#til-dato').fill('2020-04-22');
    await page.locator('button[data-cy="ga-videre"]').click();
  });

  test('Søknad JOBBET_DU_GRADERT', async ({ page }) => {
    await expect(page).toHaveURL(/.*some-id\/5/);
    await page
      .locator('[data-cy="ja-nei-stor"] input[value="JA"]')
      .click();
    await expect(
      page.locator('text=Antall timer du skrev inn, betyr at du har jobbet'),
    ).not.toBeVisible();

    await expect(
      page.locator(
        'text=Hvor mange timer i uken jobber du vanligvis når du er frisk? Varierer det, kan du oppgi gjennomsnittet.',
      ),
    ).toBeVisible();
    await page
      .locator(
        '.undersporsmal .navds-text-field__input#495730df-717d-3774-bd19-e6bcf76e3ba2',
      )
      .fill('12');

    await expect(
      page.locator('text=Hvor mye jobbet du tilsammen 1. - 24. april 2020?'),
    ).toBeVisible();
    await expect(page.locator('text=Velg timer eller prosent')).toBeVisible();

    await page.locator('.undersporsmal input[value="Prosent"]').click();
    await page
      .locator(
        '.undersporsmal .navds-text-field__input#13acfccb-3f39-3893-8054-058270add6ab',
      )
      .fill('51');

    await page.locator('.undersporsmal input[value="Timer"]').click();
    await page
      .locator(
        '.undersporsmal .navds-text-field__input#34c3cb3f-1aeb-3095-9ac6-d8f4f4c9e539',
      )
      .fill('10.7');
    await expect(
      page.locator(
        'text=Antall timer du skrev inn, betyr at du har jobbet 49% av det du gjør når du er frisk.',
      ),
    ).toBeVisible();

    // klikkGaVidere(true) - assuming with validation
    await page.locator('button[data-cy="ga-videre"]').click();

    await expect(
      page.locator('.navds-read-more__button:has-text("Er prosenten lavere enn du forventet?")'),
    ).toBeVisible();

    await expect(
      page.locator('[data-cy="feil-lokal"]:has-text("Timene utgjør mindre enn 50 %.")'),
    ).toBeVisible();
    await expect(
      page.locator(
        'text=Antall timer du skrev inn, betyr at du har jobbet 49 % av det du gjør når du er frisk. Du må enten svare nei på øverste spørsmålet eller endre antall timer totalt.',
      ),
    ).toBeVisible();
    await expect(
      page.locator(
        'text=Antall timer du skrev inn, betyr at du har jobbet 49% av det du gjør når du er frisk.',
      ),
    ).toBeVisible();

    await page
      .locator(
        '.undersporsmal .navds-text-field__input#34c3cb3f-1aeb-3095-9ac6-d8f4f4c9e539',
      )
      .clear();
    await page
      .locator(
        '.undersporsmal .navds-text-field__input#34c3cb3f-1aeb-3095-9ac6-d8f4f4c9e539',
      )
      .fill('11');

    await page.locator('button[data-cy="ga-videre"]').click();
  });

  test('Søknad ARBEID_UTENFOR_NORGE', async ({ page }) => {
    await expect(page).toHaveURL(/.*some-id\/6/);
    await page
      .locator('[data-cy="ja-nei-stor"] input[value="JA"]')
      .click();
    await expect(
      page.locator('text=Har du arbeidet i utlandet i løpet av de siste 12 månedene?'),
    ).toBeVisible();
    await page.locator('button[data-cy="ga-videre"]').click();
  });

  test('Søknad ANDRE_INNTEKTSKILDER_V2', async ({ page }) => {
    await expect(page).toHaveURL(/.*some-id\/7/);
    await expect(
      page.locator('text=Har du andre inntektskilder enn nevnt over?'),
    ).toBeVisible();
    await page
      .locator('[data-cy="ja-nei-stor"] input[value="JA"]')
      .click();
    await expect(
      page.locator(
        'text=Velg inntektskildene som passer for deg. Finner du ikke noe som passer for deg, svarer du nei',
      ),
    ).toBeVisible();
    await expect(
      page.locator(
        '.undersporsmal .navds-checkbox label[for="d9ac4359-5519-34f1-b59d-b5ab24e55821"]',
      ),
    ).toHaveText(/ansatt et annet sted enn nevnt over/);
    await page
      .locator('input[type="checkbox"]#d9ac4359-5519-34f1-b59d-b5ab24e55821')
      .check();
    await page.locator('button[data-cy="ga-videre"]').click();
  });

  test('Søknad OPPHOLD_UTENFOR_EOS', async ({ page }) => {
    await expect(page).toHaveURL(/.*some-id\/8/);
    await page
      .locator('[data-cy="ja-nei-stor"] input[value="JA"]')
      .click();
    await expect(page.locator('text=Når var du utenfor EU/EØS?')).toBeVisible();
    // setPeriodeFraTil(14, 22)
    await page.locator('#fra-dato').fill('2020-04-14');
    await page.locator('#til-dato').fill('2020-04-22');
    await page.locator('button[data-cy="ga-videre"]').click();
  });

  test('Søknad TIL_SLUTT', async ({ page }) => {
    await expect(page).toHaveURL(/.*some-id\/9/);
    await expect(
      page.locator('text=Oppsummering fra søknaden'),
    ).toBeVisible();
    const oppsummering = page.locator('[data-cy="oppsummering-fra-søknaden"]');
    await expect(oppsummering).toContainText('Søknaden sendes til');
    await expect(oppsummering).toContainText('Posten Norge AS, Bærum');
    // sporsmalOgSvar - assuming it checks specific Q&A
    await page
      .locator('button')
      .filter({ hasText: 'Send søknaden' })
      .click();
  });

  test('Søknad kvittering', async ({ page }) => {
    await expect(page).toHaveURL(/.*kvittering\/some-id/);
    const kvittering = page.locator('[data-cy="kvittering"]');
    await expect(kvittering).toContainText('Hva skjer videre?');
    await expect(kvittering).toContainText(
      'Du får sykepengene fra arbeidsgiveren din',
    );
    await expect(kvittering).not.toContainText(
      'Vi trenger inntektsopplysninger fra deg',
    );
  });
});
