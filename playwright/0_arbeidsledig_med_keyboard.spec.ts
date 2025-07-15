import { test, expect, Browser, Page } from '@playwright/test';

// Utility function to check if main content has focus (adapted from Cypress)
async function sjekkMainContentFokus(page: Page) {
  const mainContent = page.locator('main');
  await expect(mainContent).toBeFocused();
}

const arbeidsledig = {
  // Assuming this is the same mock data structure as in the Cypress test
  id: 'some-soknad-id', // Replace with actual mock data if needed
};

let sharedPage: Page;

test.describe.configure({ mode: 'serial' });

test.describe('Tester arbeidsledigsøknad', () => {
  test.beforeAll(async ({ browser }: { browser: Browser }) => {
    const context = await browser.newContext();
    sharedPage = await context.newPage();
    await sharedPage.goto('/syk/sykepengesoknad?testperson=arbeidsledig', {
      waitUntil: 'networkidle',
    });
  });

  test.afterAll(async () => {
    await sharedPage.context().close();
  });

  test('Laster startside', async () => {
    await expect(sharedPage.locator('.navds-heading--large')).toBeVisible();
    await expect(sharedPage.locator('.navds-heading--large')).toHaveText(
      'Søknader',
    );
    await sharedPage.locator(`a[href*="${arbeidsledig.id}"]`).click();
  });

  test('Navigerer søknaden', async () => {
    await expect(sharedPage).toHaveURL(new RegExp(`${arbeidsledig.id}/1`));

    await sharedPage.keyboard.press('Tab');
    await sharedPage.keyboard.press('Tab');
    await sharedPage.keyboard.press('Tab');
    await sharedPage.keyboard.press('Tab');
    await sharedPage.keyboard.press('Tab');
    await sharedPage.keyboard.press('Space');
    await expect(
      sharedPage.getByText(
        'Les mer om hvordan NAV behandler personopplysningene dine',
      ),
    ).toBeVisible();

    await sharedPage.keyboard.press('Tab');
    await sharedPage.keyboard.press('Tab');
    await sharedPage.keyboard.press('Space');
    await expect(
      sharedPage.getByText(
        'Vi lagrer svarene dine mens du fyller ut, så du kan ta pauser underveis. Søknader som ikke blir sendt inn lagrer vi i 4 måneder før de slettes automatisk.',
      ),
    ).toBeVisible();

    await sharedPage.keyboard.press('Tab');
    await sharedPage.keyboard.press('Tab');
    const bekreftLabel = sharedPage
      .locator('label')
      .filter({
        hasText: 'Jeg bekrefter at jeg vil svare så riktig som jeg kan.',
      })
      .locator('..');
    await expect(bekreftLabel).toHaveCSS('box-shadow', /./); // Check for any box-shadow
    await sharedPage.keyboard.press('Space');

    await sharedPage.keyboard.press('Tab');
    const startButton = sharedPage.getByRole('button', {
      name: 'Start søknad',
    });
    await expect(startButton).toHaveCSS('box-shadow', /./);
    await sharedPage.keyboard.press('Enter');
    await sjekkMainContentFokus(sharedPage);

    await expect(sharedPage.getByText('Friskmeldt')).toBeVisible();
    await expect(
      sharedPage.locator('form').getByRole('radio', { name: 'Nei' }),
    ).toHaveCount(1);

    await sharedPage.keyboard.press('Tab');
    await sharedPage.keyboard.press('Tab');
    await sharedPage.keyboard.press('Tab');
    await sharedPage.keyboard.press('Tab');
    await sharedPage.keyboard.press('Space');
    await sharedPage.keyboard.press('Tab');
    await sharedPage.keyboard.press('Tab');
    const gaVidereButton1 = sharedPage.getByRole('button', {
      name: 'Gå videre',
    });
    await expect(gaVidereButton1).toHaveCSS('box-shadow', /./);
    await sharedPage.keyboard.press('Enter');
    await sjekkMainContentFokus(sharedPage);

    await expect(sharedPage.getByText('Andre inntektskilder')).toBeVisible();
    await expect(
      sharedPage.getByText('Hva mener vi med andre inntektskilder?'),
    ).toBeVisible();

    await sharedPage.keyboard.press('Tab');
    await sharedPage.keyboard.press('Tab');
    await sharedPage.keyboard.press('Tab');
    await sharedPage.keyboard.press('Tab');
    await sharedPage.keyboard.press('Tab');
    await sharedPage.keyboard.press('Space');
    await sharedPage.keyboard.press('ArrowRight');
    await sharedPage.keyboard.press('Tab');
    await sharedPage.keyboard.press('Tab');
    const gaVidereButton2 = sharedPage.getByRole('button', {
      name: 'Gå videre',
    });
    await expect(gaVidereButton2).toHaveCSS('box-shadow', /./);
    await sharedPage.keyboard.press('Enter');
    await sjekkMainContentFokus(sharedPage);

    await expect(sharedPage.getByText('Reise')).toBeVisible();

    await sharedPage.keyboard.press('Tab');
    await sharedPage.keyboard.press('Tab');
    await sharedPage.keyboard.press('Tab');
    await sharedPage.keyboard.press('Tab');
    await sharedPage.keyboard.press('Tab');
    await sharedPage.keyboard.press('Space');
    await sharedPage.keyboard.press('ArrowRight');
    await sharedPage.keyboard.press('Tab');
    await sharedPage.keyboard.press('Tab');
    const gaVidereButton3 = sharedPage.getByRole('button', {
      name: 'Gå videre',
    });
    await expect(gaVidereButton3).toHaveCSS('box-shadow', /./);
    await sharedPage.keyboard.press('Enter');
    await sjekkMainContentFokus(sharedPage);

    await expect(
      sharedPage.getByText('Oppsummering fra søknaden'),
    ).toBeVisible();

    await sharedPage.keyboard.press('Tab');
    await sharedPage.keyboard.press('Tab');
    await sharedPage.keyboard.press('Tab');
    await sharedPage.keyboard.press('Tab');
    await sharedPage.keyboard.press('Tab');
    await sharedPage.keyboard.press('Tab');
    const sendButton = sharedPage.getByRole('button', {
      name: 'Send søknaden',
    });
    await expect(sendButton).toHaveCSS('box-shadow', /./);
    await sharedPage.keyboard.press('Enter');
    await sjekkMainContentFokus(sharedPage);

    await expect(
      sharedPage.getByText('Søknaden er sendt til NAV'),
    ).toBeVisible();
    await expect(sharedPage.getByText('Mottatt')).toBeVisible();
  });
});
