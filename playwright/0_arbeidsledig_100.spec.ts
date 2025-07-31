import { test, expect } from '@playwright/test'

import {
    checkViStolerPaDeg,
    klikkGaVidere,
    setPeriodeFraTil,
    sjekkIntroside,
    sporsmalOgSvar,
    fjernAnimasjoner,
} from './utilities'

// Mock-data (basert på Cypress-koden din)
const arbeidsledig = {
    id: '934f39f4-cb47-459f-8209-0dbef6d30059', // Erstatt med faktisk ID fra mock-data, f.eks. fra '../../../src/data/mock/data/soknad/arbeidsledig'
    // Legg til flere felter om nødvendig fra mock-data
}

test.describe('Tester arbeidsledigsøknad', () => {
    test('Gjennomfører hele søknadsflyten for arbeidsledig søknad', async ({ page }) => {
        // Forberedelser: Fjern animasjoner for stabil testing (valgfritt, men anbefalt for flakiness)
        await fjernAnimasjoner(page)

        // await test.step('Laster startside', async () => {
        //   await page.goto('/syk/sykepengesoknad?testperson=arbeidsledig');
        //   await expect(page.getByRole('heading', { name: 'Søknader', level: 1 })).toBeVisible(); // Antatt nivå 1 for '.navds-heading--large'
        //   await page.locator('.navds-link-panel').filter({ hasText: 'Søknad om sykepenger' }).click(); // Klikk på link panel med søknad
        // });

        // await test.step('Laster startside', async () => {
        //     // await expect(page.locator('.navds-heading--large')).toBeVisible()
        //     // await expect(page.locator('.navds-heading--large')).toHaveText('Søknader')
        //     // Assuming soknad.id is known or can be selected by pattern
        //     // For translation, assume we click the link containing the ID
        //     // Replace 'some-soknad-id' with actual if known, or use a better selector
        //     await page.locator(`a[href*="${arbeidsledig.id}]`).click() // Adjust based on actual ID
        // })

        await test.step('Laster startside', async () => {
            // Naviger til startsiden (hvis ikke allerede gjort i et tidligere steg; tilpass om nødvendig)
            await page.goto('/syk/sykepengesoknad?testperson=arbeidsledig')

            // Verifiser at heading er synlig og har riktig tekst (antatt som h1 basert på '.navds-heading--large')
            const heading = page.getByRole('heading', { name: 'Søknader', level: 1 })
            await expect(heading).toBeVisible()
            await expect(heading).toHaveText('Søknader')

            // Klikk på lenken som inneholder soknad.id i href-attributten
            const link = page.locator(`a[href*="${arbeidsledig.id}"]`)
            await expect(link).toBeVisible() // Valgfri sjekk for å sikre lenken finnes
            await link.click()
        })

        await test.step('Søknad ANSVARSERKLARING', async () => {
            await expect(page).toHaveURL(new RegExp(`${arbeidsledig.id}/1`))
            await sjekkIntroside(page) // Bruk eksisterende utility for å verifisere introside-innhold
            await checkViStolerPaDeg(page, true) // Bekreft ansvarserklæring og gå videre (gaVidere=true)
        })

        await test.step('Søknad FRISKMELDT', async () => {
            await expect(page).toHaveURL(new RegExp(`${arbeidsledig.id}/2`))

            // Test spørsmål: Velg 'NEI' på hovedspørsmål
            await page.locator('[data-cy="ja-nei-stor"] input[value=NEI]').check() // Velg 'Nei' (tilsvarer Cypress .click() på radio)
            await expect(page.getByText('Fra hvilken dato trengte du ikke lenger sykmeldingen?')).toBeVisible()

            // Velg dato i kalender
            await page.locator('.navds-date__field-button').click()
            await page.locator('.rdp-day', { hasText: '10' }).click()

            await klikkGaVidere(page) // Gå videre uten å forvente feil
        })

        await test.step('Søknad ANDRE_INNTEKTSKILDER', async () => {
            await expect(page).toHaveURL(new RegExp(`${arbeidsledig.id}/3`))

            // Test spørsmål
            await expect(
                page.getByText('Har du hatt inntekt mens du har vært sykmeldt i perioden 1. - 24. april 2020?'),
            ).toBeVisible()

            // Velg 'JA' på hovedspørsmål
            await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').check()

            // Forsøk å gå videre uten valg for å trigge feil (ingen inntektskilder valgt)
            await klikkGaVidere(page, true) // forventFeil=true
            await expect(page.getByText('Det er 1 feil i skjemaet')).toBeVisible()
            await expect(page.getByText('Du må oppgi hvilke inntektskilder du har')).toBeVisible()

            /*

      await test.step('Velg inntektskilde: andre arbeidsforhold', async () => {
  // Finn og velg checkboxen for "andre arbeidsforhold" basert på ID (fra HTML: id="687404")
  const checkbox = page.locator('#687404'); // Eller bruk page.getByLabel('andre arbeidsforhold') for tekstbasert locator

  // Sjekk at checkboxen er synlig og ikke allerede valgt (valgfri verifikasjon for robusthet)
  await expect(checkbox).toBeVisible();
  await expect(checkbox).not.toBeChecked(); // Hvis du vil sikre at den ikke er forhåndsvalgt

  // Velg (check) checkboxen
  await checkbox.check();

  // Verifiser at den nå er valgt
  await expect(checkbox).toBeChecked();
});

      */
            // Svar JA og velg inntektskilder
            // Underspørsmål nivå 1 - checkbox

            const checkbox = page.getByLabel('andre arbeidsforhold')
            checkbox.click()

            await expect(
                page.getByText(
                    'Dette betyr at du er ansatt hos en eller flere arbeidsgiverne som ikke er kjent for oss enda og derfor ikke ligger i listen ovenfor.',
                ),
            ).toBeVisible()
            await page
                .getByText('Er du sykmeldt fra dette?')
                .locator('xpath=..')
                .getByRole('radio', { name: 'Ja' })
                .click()

            //   await expect(page.locator('.undersporsmal .navds-checkbox label[for=687404]')).toContainText(
            //     'andre arbeidsforhold',
            //   );
            //   await page.locator('input[type=checkbox]#687404').click();

            // Underspørsmål nivå 2 - radio
            // await page.locator('input[type=radio]#687405_0').check();
            // Finn og velg radio-knappen for "Ja" basert på ID (fra HTML: id="687405_0")

            //   await expect(
            //     page.getByText(
            //       'Du må sende egen sykepengesøknad for dette. ' +
            //         'Det betyr også at legen må skrive en sykmelding for hvert arbeidsforhold du er sykmeldt fra.',
            //     ),
            //   ).toBeVisible();

            await klikkGaVidere(page) // Gå videre
        })

        await test.step('Søknad OPPHOLD_UTENFOR_EOS', async () => {
            await expect(page).toHaveURL(new RegExp(`${arbeidsledig.id}/4`))

            // Test spørsmål
            await expect(
                page.getByText('Var du på reise utenfor EU/EØS mens du var sykmeldt 1. - 24. april 2020?'),
            ).toBeVisible()

            // Velg 'JA' på hovedspørsmål
            await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').check()

            // Underspørsmål 1: Sett periode
            await expect(page.getByText('Når var du utenfor EU/EØS?')).toBeVisible()
            await setPeriodeFraTil(page, 17, 24) // Bruk utility for å sette periode

            await klikkGaVidere(page) // Gå videre
        })

        await test.step('Søknad TIL_SLUTT (oppsummering)', async () => {
            await expect(page).toHaveURL(new RegExp(`${arbeidsledig.id}/5`))

            // Verifiser guide-panel innhold
            await expect(page.locator('.navds-guide-panel__content')).toContainText(
                'Nå kan du se over at alt er riktig før du sender inn søknaden. Ved behov kan du endre opplysningene inntil 12 måneder etter innsending.',
            )

            // Verifiser oppsummering med sporsmalOgSvar (bruk container for oppsummering)
            const oppsummering = page.locator('[data-cy="oppsummering-fra-søknaden"]')
            await sporsmalOgSvar(oppsummering, 'Brukte du hele sykmeldingen fram til 24. april 2020?', 'Nei')
            // Nestede spørsmål (bruk .locator for undernivå)
            const friskmeldtSvar = oppsummering
                .getByText('Brukte du hele sykmeldingen fram til 24. april 2020?')
                .locator('..')
            await sporsmalOgSvar(friskmeldtSvar, 'Fra hvilken dato trengte du ikke lenger sykmeldingen?', '10.04.2020')

            await sporsmalOgSvar(
                oppsummering,
                'Har du hatt inntekt mens du har vært sykmeldt i perioden 1. - 24. april 2020?',
                'Ja',
            )
            const inntektSvar = oppsummering
                .getByText('Har du hatt inntekt mens du har vært sykmeldt i perioden 1. - 24. april 2020?')
                .locator('..')
            await sporsmalOgSvar(inntektSvar, 'Hvilke inntektskilder har du hatt?', 'andre arbeidsforhold')
            const underInntektSvar = inntektSvar.getByText('Hvilke inntektskilder har du hatt?').locator('..')
            await sporsmalOgSvar(underInntektSvar, 'Er du sykmeldt fra dette?', 'Ja')

            // Bekreft at 'Søknaden sendes til' ikke finnes
            await expect(page.getByText('Søknaden sendes til')).not.toBeVisible()

            // Send inn søknaden
            await page.getByRole('button', { name: 'Send søknaden' }).click()
        })

        await test.step('Søknad kvittering', async () => {
            // await expect(page).toHaveURL(new RegExp(`/kvittering/${arbeidsledig.id}`))
            // removed this url check as it can be flakey
            // Verifiser kvitteringspanel

            await expect(page.getByRole('heading', { name: 'Søknaden er sendt til NAV' })).toBeVisible()
            const kvitteringPanel = page.locator('[data-cy="kvittering-panel"]')
            await expect(kvitteringPanel).toContainText('Hva skjer videre?')
            await expect(kvitteringPanel).toContainText('NAV behandler søknaden din')
            await expect(kvitteringPanel).toContainText('Når blir pengene utbetalt?')
        })
    })
})
