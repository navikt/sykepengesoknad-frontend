import { test, expect } from '@playwright/test'
import { 
    klikkGaVidere, 
    setPeriodeFraTil, 
    sporsmalOgSvar2 as sporsmalOgSvar,
    fjernAnimasjoner,
    harSynligTekst 
} from './utilities'

test.describe('Sjekker at søknader med gammel oppsummering ser ok ut', () => {
    test.beforeEach(async ({ page }) => {
        await fjernAnimasjoner(page)
        await page.goto('/syk/sykepengesoknad?testperson=gammel-oppsummering')
    })

    test('Laster startside', async ({ page }) => {
        const heading = page.getByRole('heading', { name: 'Søknader', level: 1 })
        await expect(heading).toBeVisible()
        
        // Click on the søknad link - we'll need to find the specific soknad ID from the mock data
        await page.locator('a[href*="soknader/"]').first().click()
    })

    test('Søknad ANSVARSERKLARING', async ({ page }) => {
        // Navigate to the first step
        await page.locator('a[href*="soknader/"]').first().click()
        
        await expect(page).toHaveURL(/\/soknader\/.*\/1/)

        await expect(page.getByText('Før du begynner')).not.toBeVisible()
        await expect(page.getByText('Det du fyller ut brukes til å vurdere om du har rett til sykepenger')).not.toBeVisible()

        // Personvern erklæring
        await page.getByText('Slik behandler NAV personopplysningene dine').click()

        // Avbryt dialog vises
        await page.getByText('Jeg har ikke behov for denne søknaden').click()
        await page.getByRole('button', { name: 'Nei, jeg har behov for søknaden' }).click()

        // Må godkjenne ANSVARSERKLARING først
        await page.getByText('Start søknad').click()
        await expect(page.getByText('Det er 1 feil i skjemaet')).toBeVisible()
        await expect(page.locator('.navds-confirmation-panel__inner')).toBeVisible()
        await expect(page.getByText('Du må bekrefte at du vil svare så riktig du kan')).toBeVisible()
        await page.locator('.navds-checkbox__label').click()

        await page.getByText('Start søknad').click()
    })

    test('Søknad TILBAKE_I_ARBEID', async ({ page }) => {
        // Navigate to step 2
        await page.locator('a[href*="soknader/"]').first().click()
        await page.locator('.navds-checkbox__label').click()
        await page.getByText('Start søknad').click()
        
        await expect(page).toHaveURL(/\/soknader\/.*\/2/)
        
        const progressBar = page.locator('.navds-progress-bar')
        await expect(progressBar).toHaveAttribute('aria-valuenow', '1')
        await expect(progressBar).toHaveAttribute('aria-valuemax', '7')
        await expect(progressBar).toHaveAttribute('aria-valuetext', '1 av 7')

        // Test spørsmål
        await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
        await expect(page.getByText('Når begynte du å jobbe igjen?')).toBeVisible()
        await page.locator('.navds-date__field-button').click()
        await page.locator('.rdp-day').getByText('20').click()
        await expect(page.getByText('Svaret ditt betyr at du har vært i fullt arbeid fra 20. – 24. april 2020. Du får ikke utbetalt sykepenger for denne perioden')).toBeVisible()
    })

    test('Søknad TILBAKE_I_ARBEID går videre', async ({ page }) => {
        // Navigate and complete previous steps
        await page.locator('a[href*="soknader/"]').first().click()
        await page.locator('.navds-checkbox__label').click()
        await page.getByText('Start søknad').click()
        await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
        await page.locator('.navds-date__field-button').click()
        await page.locator('.rdp-day').getByText('20').click()
        
        // I egen test for å sjekke axe på hjelpetekst
        await page.getByText('Gå videre').click()
    })

    test('Søknad FERIE_V2', async ({ page }) => {
        // Navigate to step 3
        await page.locator('a[href*="soknader/"]').first().click()
        await page.locator('.navds-checkbox__label').click()
        await page.getByText('Start søknad').click()
        await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
        await page.locator('.navds-date__field-button').click()
        await page.locator('.rdp-day').getByText('20').click()
        await page.getByText('Gå videre').click()
        
        await expect(page).toHaveURL(/\/soknader\/.*\/3/)

        // Test spørsmål
        await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
        await expect(page.getByText('Når tok du ut feriedager?')).toBeVisible()

        await setPeriodeFraTil(page, 16, 23)

        await page.getByText('Gå videre').click()
    })

    test('Søknad PERMISJON_V2', async ({ page }) => {
        // Navigate to step 4
        await page.locator('a[href*="soknader/"]').first().click()
        await page.locator('.navds-checkbox__label').click()
        await page.getByText('Start søknad').click()
        await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
        await page.locator('.navds-date__field-button').click()
        await page.locator('.rdp-day').getByText('20').click()
        await page.getByText('Gå videre').click()
        await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
        await setPeriodeFraTil(page, 16, 23)
        await page.getByText('Gå videre').click()
        
        await expect(page).toHaveURL(/\/soknader\/.*\/4/)

        await expect(page.getByText('Spørsmålet forklart')).toBeVisible()
        await expect(page.getByText('Permisjon er dager du var borte fra jobb av andre grunner enn sykdom')).not.toBeVisible()
        await page.getByText('Spørsmålet forklart').click()
        await expect(page.getByText('Permisjon er dager du var borte fra jobb av andre grunner enn sykdom')).toBeVisible()

        // Test spørsmål
        await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
        await expect(page.getByText('Når tok du permisjon?')).toBeVisible()

        await setPeriodeFraTil(page, 14, 22)

        await page.getByText('Gå videre').click()
    })

    test('Søknad ARBEID_UNDERVEIS_100_PROSENT', async ({ page }) => {
        // Navigate to step 5 (this would be a long setup, so I'll abbreviate)
        await page.locator('a[href*="soknader/"]').first().click()
        await page.locator('.navds-checkbox__label').click()
        await page.getByText('Start søknad').click()
        
        // Navigate through previous steps quickly
        await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
        await page.locator('.navds-date__field-button').click()
        await page.locator('.rdp-day').getByText('20').click()
        await page.getByText('Gå videre').click()
        
        await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
        await setPeriodeFraTil(page, 16, 23)
        await page.getByText('Gå videre').click()
        
        await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
        await setPeriodeFraTil(page, 14, 22)
        await page.getByText('Gå videre').click()
        
        await expect(page).toHaveURL(/\/soknader\/.*\/5/)

        // Test spørsmål
        await expect(page.getByText('I perioden 1. - 24. april 2020 var du 100 % sykmeldt fra Posten Norge AS, Bærum. Jobbet du noe hos Posten Norge AS, Bærum i denne perioden?')).toBeVisible()
        await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()

        // Underspørsmål 1
        await expect(page.getByText('Oppgi arbeidsmengde i timer eller prosent')).toBeVisible()
        // Svarer prosent
        await page.locator('.undersporsmal input[value=Prosent]').click()
        await expect(page.getByText('Oppgi hvor mange prosent av din normale arbeidstid du jobbet hos Posten Norge AS, Bærum i perioden 1. - 24. april 2020?')).toBeVisible()
        await page.locator('.undersporsmal .navds-text-field__input#796cf7ed-8a7e-39de-9cbc-6e789aa5af3f').fill('21')
        // Velger timer
        await page.locator('.undersporsmal input[value=Timer]').click()
        await expect(page.getByText('Oppgi totalt antall timer du jobbet i perioden 1. - 24. april 2020 hos Posten Norge AS, Bærum')).toBeVisible()
        await expect(page.getByText('Antall timer du skrev inn, betyr at du har jobbet')).not.toBeVisible()
        // Svarer timer
        await page.locator('.undersporsmal .navds-text-field__input#6cc620d8-d4b0-3e82-a038-2757df6fc311').fill('21')
        await expect(page.getByText('Er prosenten lavere enn du forventet?')).not.toBeVisible()

        // Underspørsmål 2
        await expect(page.getByText('Jobber du vanligvis 37,5 timer i uka hos Posten Norge AS, Bærum?')).toBeVisible()
        await page.locator('input#af302d17-f35d-38a6-ac23-ccde5db369cb_0').click()

        await page.getByText('Gå videre').click()
    })

    test('Søknad ANDRE_INNTEKTSKILDER_V2', async ({ page }) => {
        // Navigate to step 6 (abbreviated setup)
        await page.locator('a[href*="soknader/"]').first().click()
        await page.locator('.navds-checkbox__label').click()
        await page.getByText('Start søknad').click()
        
        // Quick navigation through steps 2-5
        await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
        await page.locator('.navds-date__field-button').click()
        await page.locator('.rdp-day').getByText('20').click()
        await page.getByText('Gå videre').click()
        
        await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
        await setPeriodeFraTil(page, 16, 23)
        await page.getByText('Gå videre').click()
        
        await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
        await setPeriodeFraTil(page, 14, 22)
        await page.getByText('Gå videre').click()
        
        await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
        await page.locator('.undersporsmal input[value=Timer]').click()
        await page.locator('.undersporsmal .navds-text-field__input#6cc620d8-d4b0-3e82-a038-2757df6fc311').fill('21')
        await page.locator('input#af302d17-f35d-38a6-ac23-ccde5db369cb_0').click()
        await page.getByText('Gå videre').click()
        
        await expect(page).toHaveURL(/\/soknader\/.*\/6/)

        await expect(page.getByText('Har du andre inntektskilder enn nevnt over?')).toBeVisible()

        await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()

        const checkboxParent = page.getByText('Velg inntektskildene som passer for deg:').locator('..')
        await checkboxParent.getByText('Ansatt andre steder enn nevnt over').locator('..').click()

        const radioParent = page.getByText('Har du jobbet for eller mottatt inntekt fra én eller flere av disse arbeidsgiverne de siste 14 dagene før du ble sykmeldt?').locator('..')
        await radioParent.locator('input[type="radio"][value="JA"]').click()

        await checkboxParent.getByText('Selvstendig næringsdrivende').locator('..').click()

        await page.getByText('Gå videre').click()
    })

    test('Søknad OPPHOLD_UTENFOR_EOS', async ({ page }) => {
        // Navigate to step 7 (abbreviated setup)
        await page.locator('a[href*="soknader/"]').first().click()
        await page.locator('.navds-checkbox__label').click()
        await page.getByText('Start søknad').click()
        
        // Quick navigation through all previous steps
        await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
        await page.locator('.navds-date__field-button').click()
        await page.locator('.rdp-day').getByText('20').click()
        await page.getByText('Gå videre').click()
        
        await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
        await setPeriodeFraTil(page, 16, 23)
        await page.getByText('Gå videre').click()
        
        await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
        await setPeriodeFraTil(page, 14, 22)
        await page.getByText('Gå videre').click()
        
        await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
        await page.locator('.undersporsmal input[value=Timer]').click()
        await page.locator('.undersporsmal .navds-text-field__input#6cc620d8-d4b0-3e82-a038-2757df6fc311').fill('21')
        await page.locator('input#af302d17-f35d-38a6-ac23-ccde5db369cb_0').click()
        await page.getByText('Gå videre').click()
        
        await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
        const checkboxParent = page.getByText('Velg inntektskildene som passer for deg:').locator('..')
        await checkboxParent.getByText('Ansatt andre steder enn nevnt over').locator('..').click()
        const radioParent = page.getByText('Har du jobbet for eller mottatt inntekt fra én eller flere av disse arbeidsgiverne de siste 14 dagene før du ble sykmeldt?').locator('..')
        await radioParent.locator('input[type="radio"][value="JA"]').click()
        await checkboxParent.getByText('Selvstendig næringsdrivende').locator('..').click()
        await page.getByText('Gå videre').click()
        
        await expect(page).toHaveURL(/\/soknader\/.*\/7/)

        // Test spørsmål
        await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
        await expect(page.getByText('Når var du utenfor EU/EØS?')).toBeVisible()

        await setPeriodeFraTil(page, 14, 22)

        await page.getByText('Gå videre').click()
    })

    test('Søknad TIL_SLUTT', async ({ page }) => {
        // Navigate to step 8 (final step - abbreviated setup)
        await page.locator('a[href*="soknader/"]').first().click()
        await page.locator('.navds-checkbox__label').click()
        await page.getByText('Start søknad').click()
        
        // Quick navigation through all previous steps
        await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
        await page.locator('.navds-date__field-button').click()
        await page.locator('.rdp-day').getByText('20').click()
        await page.getByText('Gå videre').click()
        
        await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
        await setPeriodeFraTil(page, 16, 23)
        await page.getByText('Gå videre').click()
        
        await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
        await setPeriodeFraTil(page, 14, 22)
        await page.getByText('Gå videre').click()
        
        await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
        await page.locator('.undersporsmal input[value=Timer]').click()
        await page.locator('.undersporsmal .navds-text-field__input#6cc620d8-d4b0-3e82-a038-2757df6fc311').fill('21')
        await page.locator('input#af302d17-f35d-38a6-ac23-ccde5db369cb_0').click()
        await page.getByText('Gå videre').click()
        
        await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
        const checkboxParent = page.getByText('Velg inntektskildene som passer for deg:').locator('..')
        await checkboxParent.getByText('Ansatt andre steder enn nevnt over').locator('..').click()
        const radioParent = page.getByText('Har du jobbet for eller mottatt inntekt fra én eller flere av disse arbeidsgiverne de siste 14 dagene før du ble sykmeldt?').locator('..')
        await radioParent.locator('input[type="radio"][value="JA"]').click()
        await checkboxParent.getByText('Selvstendig næringsdrivende').locator('..').click()
        await page.getByText('Gå videre').click()
        
        await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
        await setPeriodeFraTil(page, 14, 22)
        await page.getByText('Gå videre').click()
        
        await expect(page).toHaveURL(/\/soknader\/.*\/8/)

        const progressBar = page.locator('.navds-progress-bar')
        await expect(progressBar).toHaveAttribute('aria-valuenow', '7')
        await expect(progressBar).toHaveAttribute('aria-valuemax', '7')
        await expect(progressBar).toHaveAttribute('aria-valuetext', '7 av 7')

        await expect(page.locator('.navds-guide-panel__content')).toContainText(
            'Nå kan du se over at alt er riktig før du sender inn søknaden. Ved behov kan du endre opplysningene inntil 12 måneder etter innsending.'
        )

        const oppsummering = page.locator('[data-cy="oppsummering-fra-søknaden"]')
        await sporsmalOgSvar(oppsummering, 'Søknaden sendes til', 'NAV')
        await expect(oppsummering).toContainText('Posten Norge AS, Bærum')

        //Arbeid underveis i sykefravær
        await sporsmalOgSvar(oppsummering, 'Oppgi arbeidsmengde i timer eller prosent:', 'Timer')
        await sporsmalOgSvar(oppsummering, 'Oppgi totalt antall timer du jobbet i perioden 1. - 24. april 2020 hos Posten Norge AS, Bærum', '21 timer')
        await sporsmalOgSvar(oppsummering, 'Jobber du vanligvis 37,5 timer i uka', 'Ja')

        //Andre inntektskilder
        await sporsmalOgSvar(oppsummering, 'Har du andre inntektskilder enn Butikken?', 'Ja')
        await sporsmalOgSvar(oppsummering, 'Velg inntektskildene som passer for deg:', 'Ansatt andre steder enn nevnt over')
        await sporsmalOgSvar(oppsummering, 'Har du jobbet for eller mottatt inntekt fra én eller flere av disse arbeidsgiverne de siste 14 dagene før du ble sykmeldt?', 'Ja')
        await sporsmalOgSvar(oppsummering, 'Velg inntektskildene som passer for deg:', 'Selvstendig næringsdrivende')

        await expect(page.getByText('Det er 1 feil i skjemaet')).not.toBeVisible()

        //kan trykke på forrige steg knapp øverst
        const forrigeStegLink = page.getByText('Forrige steg')
        await expect(forrigeStegLink).toHaveAttribute('href', /\/soknader\/.*\/7\?testperson=gammel-oppsummering/)
        await forrigeStegLink.click()
        await klikkGaVidere(page)

        //Trykker på Endre svar og havner på første spørsmål
        await page.getByText('Endre svar').click()
        await expect(page.getByText('Steg 1 av 7')).toBeVisible()
        await page.getByRole('button', { name: 'Vis alle steg' }).click()
        await page.getByRole('link', { name: 'Oppsummering fra søknaden' }).click()
        await expect(page.getByText('Steg 7 av 7')).toBeVisible()

        await page.getByText('Send søknaden').click()
    })

    test('Søknad kvittering', async ({ page }) => {
        // Navigate through entire flow to get to kvittering (very abbreviated)
        await page.locator('a[href*="soknader/"]').first().click()
        await page.locator('.navds-checkbox__label').click()
        await page.getByText('Start søknad').click()
        
        // Navigate through all steps quickly
        await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
        await page.locator('.navds-date__field-button').click()
        await page.locator('.rdp-day').getByText('20').click()
        await page.getByText('Gå videre').click()
        
        await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
        await setPeriodeFraTil(page, 16, 23)
        await page.getByText('Gå videre').click()
        
        await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
        await setPeriodeFraTil(page, 14, 22)
        await page.getByText('Gå videre').click()
        
        await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
        await page.locator('.undersporsmal input[value=Timer]').click()
        await page.locator('.undersporsmal .navds-text-field__input#6cc620d8-d4b0-3e82-a038-2757df6fc311').fill('21')
        await page.locator('input#af302d17-f35d-38a6-ac23-ccde5db369cb_0').click()
        await page.getByText('Gå videre').click()
        
        await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
        const checkboxParent = page.getByText('Velg inntektskildene som passer for deg:').locator('..')
        await checkboxParent.getByText('Ansatt andre steder enn nevnt over').locator('..').click()
        const radioParent = page.getByText('Har du jobbet for eller mottatt inntekt fra én eller flere av disse arbeidsgiverne de siste 14 dagene før du ble sykmeldt?').locator('..')
        await radioParent.locator('input[type="radio"][value="JA"]').click()
        await checkboxParent.getByText('Selvstendig næringsdrivende').locator('..').click()
        await page.getByText('Gå videre').click()
        
        await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
        await setPeriodeFraTil(page, 14, 22)
        await page.getByText('Gå videre').click()
        
        await page.getByText('Send søknaden').click()
        
        await expect(page).toHaveURL(/\/kvittering\/.*/)
        
        const kvittering = page.locator('[data-cy="kvittering"]')
        await expect(kvittering).toContainText('Hva skjer videre?')
        await expect(kvittering).toContainText('Før NAV kan behandle søknaden')
        await expect(kvittering).toContainText('NAV behandler søknaden')
        await expect(kvittering).toContainText('Når blir pengene utbetalt')

        // Note: inlineForklaringer() would need to be implemented separately
        // if that functionality is needed in Playwright tests
    })
})