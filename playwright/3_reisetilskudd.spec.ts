const { test, expect } = require('@playwright/test');
const { nyttReisetilskudd } = require('../src/data/mock/data/soknad/arbeidstaker-reisetilskudd');

import {
    checkViStolerPaDeg,
    svarJaHovedsporsmal,
    svarNeiHovedsporsmal,
    klikkGaVidere,
    klikkTilbake,
    sporsmalOgSvar,
    lastOppKvittering,
    velgCheckbox,
    svarFritekst,
    hentFritekst,
    svarRadio,
    svarRadioClickOption,
    // Add any other needed utilities here
} from './utilities';

test.describe('Teste førsteside i reisetilskuddsøknaden', () => {
    test.setTimeout(120 * 1000); // Set a longer timeout for this step
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('/syk/sykepengesoknad?testperson=reisetilskudd');
  });

  test('Complete reisetilskudd søknad flow', async ({ page }) => {
    const steg = { value: 1 };

    await test.step('Landingside og listevisning', async () => {
      await expect(page.locator('.navds-heading--large')).toBeVisible();
      await expect(page.locator('.navds-heading--large')).toHaveText('Søknader');
      await page.getByRole('link', { name: "Søknad om reisetilskudd" }).click();
      

      // await expect(page.getByRole('link', { name: /Søknad om reisetilskudd/ }).filter({ hasText: nyttReisetilskudd.id })).toContainText('Søknad om reisetilskudd');

        // await expect(page.getByRole('link', { name: /Søknad om reisetilskudd/ })).click();

        //       await page.getByRole('link', { name: /Søknad om reisetilskudd/ }).filter({ hasText: nyttReisetilskudd.id }).click();
      await expect(page).toHaveURL(new RegExp(`${nyttReisetilskudd.id}/1`));
    });

    await test.step('Ansvarserklæring - Reisetilskudd', async () => {
      await expect(page).toHaveURL(new RegExp(`${nyttReisetilskudd.id}/1`));

      await page.locator('[data-cy="om-reisetilskudd"]').click();
      await expect(page.locator('.navds-label').filter({ hasText: 'Hva dekker reisetilskuddet' })).toBeVisible();
      // await expect(page.locator('.navds-body-long').filter({ hasText: "Reisetilskuddet dekker nødvendige ekstra reiseutgifter" })).toBeVisible();
        // await page.getByRole('link', { name: "Søknad om reisetilskudd" }).click();
await expect(page.locator('p.navds-body-long').filter({ hasText: "Reisetilskuddet dekker nødvendige ekstra reiseutgifter" })).toBeVisible();


      await expect(page.locator('.navds-label').filter({ hasText: 'De første 16 dagene' })).toBeVisible();
      await expect(page.locator('.navds-label').filter({ hasText: 'Legg ved kvitteringer' })).toBeVisible();
      await expect(page.locator('p.navds-body-long').filter({ hasText: "Du må legge ved bilde av kvitteringene dine" })).toBeVisible();

      await page.locator('.navds-checkbox__label').click();
      await page.getByText('Start søknad').click();
      steg.value++;
    });

    await test.step('Før du fikk sykmelding - Reisetilskudd', async () => {
      await expect(page).toHaveURL(new RegExp(`${nyttReisetilskudd.id}/2`));
      await expect(page.locator('[data-cy="sporsmal-tittel"]')).toHaveText('Før du fikk sykmelding');

      await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click();
      // await page.locator('input[type=checkbox]#1566426').click();
      velgCheckbox(page, 'Offentlig transport');
    await expect(page.getByText('Hvor mye betaler du vanligvis i måneden for offentlig transport?')).toBeVisible();
      // await page.locator('#1566427').fill('1000');
      svarFritekst(page, 'Hvor mye betaler du vanligvis i måneden for offentlig transport?', '1000');
      // await expect(page.locator('#1566427')).toHaveValue('1000');
      await klikkGaVidere(page);

      await klikkTilbake(page);
      // await expect(page.locator('#1566427')).toHaveValue('1000');
        const fritekstValue = await hentFritekst(page, 'Hvor mye betaler du vanligvis i måneden for offentlig transport?')
        expect(fritekstValue).toBe('1000');

      await klikkGaVidere(page);
      steg.value++;
    });

    await test.step('Reise med bil - Reisetilskudd', async () => {
      await expect(page).toHaveURL(new RegExp(`${nyttReisetilskudd.id}/3`));
      await expect(page.locator('[data-cy="sporsmal-tittel"]')).toHaveText('Reise med bil');

      await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click();
      await expect(page.locator('.undersporsmal > :nth-child(1) > :nth-child(1)')).toHaveText('Hvilke dager reiste du med bil i perioden 23. desember 2020 - 7. januar 2021?');

      await klikkGaVidere(page, true);
      await expect(page.locator('[data-cy="feil-lokal"]').nth(0)).toContainText('Du må oppgi minst en dag');

      await page.locator('[aria-label="mandag 4"]').click();
      await page.locator('[aria-label="tirsdag 5"]').click();
      await page.locator('[aria-label="onsdag 6"]').click();

      // await page.locator('input[type=radio]#1566446_0').click();
      await svarRadioClickOption(page, "Hadde du utgifter til bompenger?", "Ja");
      await svarFritekst(page, "Hvor mye betalte du i bompenger mellom hjemmet ditt og jobben?", "1000");
      // await page.locator('#1566447').fill('1000');
      // await page.locator('#1566448').fill('42');
      await svarFritekst(page, "Hvor mange kilometer er kjøreturen mellom hjemmet ditt og jobben én vei?", "42");

      // await klikkGaVidere(page);
      const nextButton = page.getByRole('button', { name: 'Gå videre' })
      await nextButton.click()
    


      await klikkTilbake(page);

    //   await expect(page.locator('[aria-label="mandag 4"]')).toHaveClass(/rdp-day_selected/);
    //   await expect(page.locator('[aria-label="tirsdag 5"]')).toHaveClass(/rdp-day_selected/);
    //   await expect(page.locator('[aria-label="onsdag 6"]')).toHaveClass(/rdp-day_selected/);
    //   await expect(page.locator('[aria-label="torsdag 7"]')).not.toHaveClass(/rdp-day_selected/);

      // await expect(page.locator('#1566447')).toHaveValue('1000');
  
        const fritekstValue = await hentFritekst(page, 'Hvor mye betaler du vanligvis i måneden for offentlig transport?')
        expect(fritekstValue).toBe('1000');
        await page.getByRole('button', { name: 'Gå videre' }).click();
      // await klikkGaVidere(page);
      steg.value++;
    });

    await test.step('Opplasting - Reisetilskudd', async () => {

    
    // await expect(page.getByText('Legg til reiseutgift')).toBeVisible();
    
      await expect(page).toHaveURL(new RegExp(`${nyttReisetilskudd.id}/4`));
      // await expect(page.getByText('Du må laste opp kvittering')).toBeVisible();

      await lastOppKvittering(page); // Using provided utility for uploading taxi kvittering

      const table = page.locator('.navds-table');
      await expect(table).toContainText('Taxi');
      await expect(table).toContainText('1 234 kr');
      await expect(table).toContainText('1 utgift på til sammen');
      await expect(table).toContainText('1 234 kr');

      await table.locator('.navds-table__toggle-expand-button').click();
      await expect(page.locator('.navds-table__expanded-row-content img[alt="kvittering for taxi"]')).toBeVisible();

      await table.getByText('Slett').click();
      await expect(page.getByRole('dialog').filter({ hasText: 'Vil du slette kvitteringen?' })).toBeVisible();
      await page.getByText('Ja, jeg er sikker').click();
      await expect(page.getByText('Vil du slette kvitteringen?')).not.toBeVisible();
      await expect(page.locator('.sumlinje')).not.toBeVisible();

      await page.getByText('Legg til reiseutgift').click();
      await expect(page.getByRole('dialog', { name: 'Legg til reiseutgift' })).toHaveAttribute('open');

      await page.locator('[data-cy="filopplasteren"] input[type=file]').setInputFiles('playwright/fixtures/kvittering.jpg');
      await page.locator('input[name=belop_input]').fill('99');
      await page.locator('select[name=transportmiddel]').selectOption('PARKERING');

      await page.getByText('Bekreft').click();

      await expect(table).toContainText('Parkering');
      await expect(table).toContainText('99 kr');
      await expect(table).toContainText('1 utgift på til sammen');

      await klikkGaVidere(page);
      await klikkTilbake(page);
      await expect(table).toContainText('Parkering');
      await expect(table).toContainText('99 kr');
      await expect(table).toContainText('1 utgift på til sammen');
      await klikkGaVidere(page);
      steg.value++;
    });

    await test.step('Utbetaling - Reisetilskudd', async () => {
      await expect(page).toHaveURL(new RegExp(`${nyttReisetilskudd.id}/5`));
      await expect(page.locator('[data-cy="sporsmal-tittel"]')).toHaveText('Utbetaling');

      await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click();
      await klikkGaVidere(page);
      steg.value++;
    });

    await test.step('Oppsummering - Reisetilskudd', async () => {
      await expect(page).toHaveURL(new RegExp(`${nyttReisetilskudd.id}/6`));
      await expect(page.locator('.navds-guide-panel__content')).toContainText('Nå kan du se over at alt er riktig før du sender inn søknaden.');

    //   const oppsummering = page.locator('[data-cy="oppsummering-fra-søknaden"]');
    //   const q1 = await sporsmalOgSvar(oppsummering, 'Brukte du bil eller offentlig transport til og fra jobben før du ble sykmeldt?', 'Ja');
    //   const subQ1 = q1.locator('..');
    //   await sporsmalOgSvar(subQ1, 'Hva slags type transport brukte du?', 'Offentlig transport');
    //   const subSubQ1 = subQ1.locator('..');
    //   await sporsmalOgSvar(subSubQ1, 'Hvor mye betaler du vanligvis i måneden for offentlig transport?', '1000 kroner');

    //   const q2 = await sporsmalOgSvar(oppsummering, 'Reiste du med egen bil, leiebil eller kollega til jobben mellom 23. desember 2020 - 7. januar 2021?', 'Ja');
    //   const subQ2 = q2.locator('..');
    //   await sporsmalOgSvar(subQ2, 'Hvilke dager reiste du med bil i perioden 23. desember 2020 - 7. januar 2021?', '04.01.2021');
    //   await expect(subQ2).toContainText('05.01.2021');
    //   await expect(subQ2).toContainText('06.01.2021');
    //   await sporsmalOgSvar(subQ2, 'Hadde du utgifter til bompenger?', 'Ja');
    //   const subSubQ2 = subQ2.locator('..');
    //   await sporsmalOgSvar(subSubQ2, 'Hvor mye betalte du i bompenger mellom hjemmet ditt og jobben?', '1000 kroner');
    //   await sporsmalOgSvar(subQ2, 'Hvor mange kilometer er kjøreturen mellom hjemmet ditt og jobben én vei?', '42 kilometer');

    //   await sporsmalOgSvar(oppsummering, 'Last opp kvitteringer for reiser til og fra jobben mellom 1. - 24. april 2020.', 'Du lastet opp 1 kvittering på 99 kr');
    //   await sporsmalOgSvar(oppsummering, 'Legger arbeidsgiveren din ut for reisene?', 'Ja');

      await page.getByText('Send søknaden').click();
    });

    await test.step('Kvittering - Reisetilskudd', async () => {
      await expect(page).toHaveURL(new RegExp(`kvittering/${nyttReisetilskudd.id}`));

      const kvitteringPanel = page.locator('[data-cy="kvittering-panel"]');
      await expect(kvitteringPanel).toContainText('Hva skjer videre?');
      await expect(kvitteringPanel).toContainText('NAV behandler søknaden din');
      await expect(kvitteringPanel).toContainText('Saksbehandlingstiden regnes fra Nav har mottatt all nødvendig dokumentasjon.');
    });
  });
});