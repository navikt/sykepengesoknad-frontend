import { test, expect } from '@playwright/test'

// Assuming the mock data is available; adjust the import path as needed
// import { arbeidsledig } from '../../../src/data/mock/data/soknad/arbeidsledig';
// For this example, we'll define a placeholder if needed, but use as in original
const soknad = { id: 'placeholder-id' } // Replace with actual import or value

let sharedPage

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext()
    sharedPage = await context.newPage()
    await sharedPage.goto('/syk/sykepengesoknad?testperson=arbeidsledig')
})

test.afterAll(async () => {
    await sharedPage.context().close()
})

test.describe('Tester arbeidsledigsøknad', () => {
    test('Laster startside', async () => {
        await expect(sharedPage.locator('.navds-heading--large')).toBeVisible()
        await expect(sharedPage.locator('.navds-heading--large')).toHaveText('Søknader')
        await sharedPage.locator(`a[href*="${soknad.id}"]`).click()
    })

    test('Søknad ANSVARSERKLARING', async () => {
        await expect(sharedPage).toHaveURL(new RegExp(`${soknad.id}/1`))

        // Approximating sjekkIntroside(): Checking for some intro elements (guessed based on context)
        // If it's a standard check, adjust accordingly; e.g., check for specific texts or elements
        await expect(sharedPage.getByText('Før du begynner')).toBeVisible() // Placeholder; replace with actual if known

        // Approximating checkViStolerPaDeg(): Likely checks a "we trust you" checkbox and proceeds
        // Assuming it's a checkbox with specific label or id
        await sharedPage.locator('input[type="checkbox"][id*="vi-stoler-pa-deg"]').check() // Adjust selector
        // Assuming this also clicks next or is followed by navigation
        await sharedPage.getByRole('button', { name: 'Start søknaden' }).click() // Placeholder; adjust
    })

    test('Søknad FRISKMELDT', async () => {
        await expect(sharedPage).toHaveURL(new RegExp(`${soknad.id}/2`))

        // Test spørsmål
        await sharedPage.locator('[data-cy="ja-nei-stor"] input[value="NEI"]').check()
        await expect(sharedPage.getByText('Fra hvilken dato trengte du ikke lenger sykmeldingen?')).toBeVisible()
        await sharedPage.locator('.navds-date__field-button').click()
        await sharedPage.locator('.rdp-day', { hasText: '10' }).click()

        // Approximating klikkGaVidere(): Click "Gå videre" button
        await sharedPage.getByRole('button', { name: 'Gå videre' }).click()
    })

    test('Søknad ANDRE_INNTEKTSKILDER', async () => {
        await expect(sharedPage).toHaveURL(new RegExp(`${soknad.id}/3`))

        // Test spørsmål
        await expect(
            sharedPage.getByText('Har du hatt inntekt mens du har vært sykmeldt i perioden 1. - 24. april 2020?'),
        ).toBeVisible()
        await sharedPage.locator('[data-cy="ja-nei-stor"] input[value="JA"]').check()

        // Når ingen velges så dukker bare 1 feilmelding opp
        await sharedPage.getByRole('button', { name: 'Gå videre' }).click() // Attempt to proceed to trigger error
        await expect(sharedPage.getByText('Det er 1 feil i skjemaet')).toBeVisible()
        await expect(sharedPage.getByText('Du må oppgi hvilke inntektskilder du har')).toBeVisible()

        // Svarer JA
        // Underspørsmål nivå 1 - checkbox
        await expect(sharedPage.getByText('Hvilke inntektskilder har du hatt?')).toBeVisible()
        await expect(sharedPage.locator('.undersporsmal .navds-checkbox label[for="687404"]')).toContainText(
            'andre arbeidsforhold',
        )
        await sharedPage.locator('input[type="checkbox"]#687404').check()

        // Underspørsmål nivå 2 - radio
        await sharedPage.locator('input[type="radio"]#687405_0').check()
        await expect(
            sharedPage.getByText(
                'Du må sende egen sykepengesøknad for dette. ' +
                    'Det betyr også at legen må skrive en sykmelding for hvert arbeidsforhold du er sykmeldt fra.',
            ),
        ).toBeVisible()

        await sharedPage.getByRole('button', { name: 'Gå videre' }).click()
    })

    test('Søknad OPPHOLD_UTENFOR_EOS', async () => {
        await expect(sharedPage).toHaveURL(new RegExp(`${soknad.id}/4`))

        // Test spørsmål
        await expect(
            sharedPage.getByText('Var du på reise utenfor EU/EØS mens du var sykmeldt 1. - 24. april 2020?'),
        ).toBeVisible()
        await sharedPage.locator('[data-cy="ja-nei-stor"] input[value="JA"]').check()

        // Underspørsmål 1
        await expect(sharedPage.getByText('Når var du utenfor EU/EØS?')).toBeVisible()

        // Approximating setPeriodeFraTil(17, 24): Set date range
        // Assuming two date pickers for from and to
        await sharedPage.locator('.navds-date__field-button').first().click() // From date
        await sharedPage.locator('.rdp-day', { hasText: '17' }).click()
        await sharedPage.locator('.navds-date__field-button').nth(1).click() // To date
        await sharedPage.locator('.rdp-day', { hasText: '24' }).click()

        await sharedPage.getByRole('button', { name: 'Gå videre' }).click()
    })

    test('Søknad TIL_SLUTT', async () => {
        await expect(sharedPage).toHaveURL(new RegExp(`${soknad.id}/5`))

        await expect(sharedPage.locator('.navds-guide-panel__content')).toContainText(
            'Nå kan du se over at alt er riktig før du sender inn søknaden. Ved behov kan du endre opplysningene inntil 12 måneder etter innsending.',
        )

        const oppsummering = sharedPage.locator('[data-cy="oppsummering-fra-søknaden"]')
        // Approximating sporsmalOgSvar checks (nested)
        const friskmeldt = oppsummering.locator('div', {
            hasText: 'Brukte du hele sykmeldingen fram til 24. april 2020?',
        })
        await expect(friskmeldt).toContainText('Nei')
        await expect(
            friskmeldt.locator('div', {
                hasText: 'Fra hvilken dato trengte du ikke lenger sykmeldingen?',
            }),
        ).toContainText('10.04.2020')

        const inntektskilder = oppsummering.locator('div', {
            hasText: 'Har du hatt inntekt mens du har vært sykmeldt i perioden 1. - 24. april 2020?',
        })
        await expect(inntektskilder).toContainText('Ja')
        await expect(inntektskilder.locator('div', { hasText: 'Hvilke inntektskilder har du hatt?' })).toContainText(
            'andre arbeidsforhold',
        )
        await expect(inntektskilder.locator('div', { hasText: 'Er du sykmeldt fra dette?' })).toContainText('Ja')

        await expect(sharedPage.getByText('Søknaden sendes til')).toHaveCount(0)
        await sharedPage.getByRole('button', { name: 'Send søknaden' }).click()
    })

    test('Søknad kvittering', async () => {
        await expect(sharedPage).toHaveURL(new RegExp(`/kvittering/${soknad.id}`))

        // Hva skjer videre
        const kvittering = sharedPage.locator('[data-cy="kvittering-panel"]')
        await expect(kvittering).toContainText('Hva skjer videre?')
        await expect(kvittering).toContainText('NAV behandler søknaden din')
        await expect(kvittering).toContainText('Når blir pengene utbetalt?')
    })
})
