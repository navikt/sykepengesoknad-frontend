import { test, expect, Page } from '@playwright/test'

/**
 * Fill a text field by trying multiple locator strategies
 * @param page - Playwright page object
 * @param labelText - The label text associated with the input field
 * @param value - The value to fill
 * @param fallbackSelector - Optional fallback CSS selector if label approach fails
 */
const fillTextFieldByLabel = async (page: Page, labelText: string, value: string, fallbackSelector?: string) => {
    try {
        // Primary strategy: Use getByLabel which is more semantic and robust
        await page.getByLabel(labelText).fill(value)
    } catch (error) {
        console.warn(`Failed to fill field by label "${labelText}", trying fallback selector`)
        if (fallbackSelector) {
            await page.locator(fallbackSelector).fill(value)
        } else {
            throw error
        }
    }
}

const setPeriodeFraTil = async (page: Page, fom: number, tom: number, periodeIndex = 0) => {
    // In a period component with a given ID, the "from" field is the first field and "to" field is the second field.
    // Get the period component with the right id (including 0, 1 etc for where in the sequence it is)
    // Then select the right calendar date popup button for day in month.
    
    const periodeComponent = page.locator(`[data-cy="periode"]`).nth(periodeIndex)
    
    // Click the first date field button (fra/from)
    await periodeComponent.locator('.navds-date__field-button').nth(0).click()
    
    // Click the "from" date
    await periodeComponent.locator('.rdp-cell').filter({ hasText: fom.toString() }).click()
    
    // Click the "to" date  
    await periodeComponent.locator('.rdp-cell').filter({ hasText: tom.toString() }).click()
}

test.describe('Tester arbeidstakersøknad - gradert 50%', () => {
    test('Full søknadsflyt', async ({ page }) => {
        await page.goto('/syk/sykepengesoknad?testperson=arbeidstaker-gradert')

        const soknadId = '5b769c04-e171-47c9-b79b-23ab8fce331e'

        await test.step('Laster startside', async () => {
            await expect(page.locator('.navds-heading--large')).toBeVisible()
            await expect(page.locator('.navds-heading--large')).toHaveText('Søknader')
            // Assuming soknad.id is known or can be selected by pattern
            // For translation, assume we click the link containing the ID
            // Replace 'some-soknad-id' with actual if known, or use a better selector
            await page.locator('a[href*="5b769c04-e171-47c9-b79b-23ab8fce331e"]').click() // Adjust based on actual ID
        })

        await test.step('Søknad ANSVARSERKLARING', async () => {
            // Assuming soknad.id is 'some-id', adjust accordingly
            // await expect(page).toHaveURL(/.*5b769c04-e171-47c9-b79b-23ab8fce331e\/1/)
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\\/1`))
            // sjekkIntroside() - translate to checks
            // Use a strict locator for the heading
            await expect(page.getByRole('heading', { name: 'Før du søker' })).toBeVisible()
            // checkViStolerPaDeg() - likely checks and interacts with a consent
            // Assuming it's checking and clicking a checkbox

            // const pageDomContent = await page.content()
            // console.log(pageDomContent) // For debugging, remove in production
            // const checkbox = page.locator('input[data-cy="bekreftCheckboksPanel"]')
            // await expect(checkbox).toBeVisible()
            // await checkbox.check()
            // await page.locator('button').filter({ hasText: 'Start søknad' }).click()

            await page.getByLabel('Jeg bekrefter at jeg vil svare så riktig som jeg kan.').check();


            // Klikk "Start søknaden"
            await expect(page.getByRole('button', { name: 'Start søknad' })).toBeVisible()
            await page.getByRole('button', { name: 'Start søknad' }).click()



        })

        await test.step('Tilbake til ANSVARSERKLARING og frem igjen', async () => {
            // klikkTilbake() - click back
            // wait for 10 seconds
            await page.locator('button').filter({ hasText: 'Tilbake' }).click()
            await page.locator('button').filter({ hasText: 'Start søknad' }).click()
        })

        await test.step('Søknad TILBAKE_I_ARBEID', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\\/2`))
            await page.locator('[data-cy="ja-nei-stor"] input[value="JA"]').click()
            await expect(page.locator('text=Når begynte du å jobbe igjen?')).toBeVisible()
            await page.locator('.navds-date__field-button').click()
            await page.locator('.rdp-day:has-text("20")').click()
            // klikkGaVidere() - click next
            await page.locator('button').filter({ hasText: 'Gå videre' }).click()

            // await page.locator('button').filter({ hasText: 'Gå videre' }).click()
        })

        await test.step('Søknad FERIE_V2', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\\/3`))
            await page.locator('[data-cy="ja-nei-stor"] input[value="JA"]').click()
            await expect(page.locator('text=Når tok du ut feriedager?')).toBeVisible()
            // Set period from 16th to 23rd
            await setPeriodeFraTil(page, 16, 23)
            await page.locator('button').filter({ hasText: 'Gå videre' }).click()

        })

        await test.step('Søknad PERMISJON_V2', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\\/4`))
            await page.locator('[data-cy="ja-nei-stor"] input[value="JA"]').click()
            await expect(page.locator('text=Når tok du permisjon?')).toBeVisible()
            // Set period from 14th to 22nd
            await setPeriodeFraTil(page, 14, 22)
            await page.locator('button').filter({ hasText: 'Gå videre' }).click()
        })

        await test.step('Søknad JOBBET_DU_GRADERT', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\\/5`))
            await page.locator('[data-cy="ja-nei-stor"] input[value="JA"]').click()
            await expect(page.locator('text=Antall timer du skrev inn, betyr at du har jobbet')).not.toBeVisible()

            await expect(
                page.locator(
                    'text=Hvor mange timer i uken jobber du vanligvis når du er frisk? Varierer det, kan du oppgi gjennomsnittet.',
                ),
            ).toBeVisible()
            await fillTextFieldByLabel(
                page, 
                'Hvor mange timer i uken jobber du vanligvis når du er frisk? Varierer det, kan du oppgi gjennomsnittet.',
                '12'
            )

            await expect(page.locator('text=Hvor mye jobbet du tilsammen 1. - 24. april 2020?')).toBeVisible()
            await expect(page.locator('text=Velg timer eller prosent')).toBeVisible()

            await page.locator('.undersporsmal input[value="Prosent"]').click()
            await fillTextFieldByLabel(
                page,
                'Oppgi prosent',
                '51',
                '.undersporsmal .navds-text-field__input#13acfccb-3f39-3893-8054-058270add6ab'
            )

            await page.locator('.undersporsmal input[value="Timer"]').click()
            
            await fillTextFieldByLabel(
                page,
                'Oppgi timer totalt',
                '10.7',
                '.undersporsmal .navds-text-field__input#13acfccb-3f39-3893-8054-058270add6ab'
            )

            // await page
            //     .locator('.undersporsmal .navds-text-field__input#34c3cb3f-1aeb-3095-9ac6-d8f4f4c9e539')
            //     .fill('10.7')
            // await expect(
            //     page.locator(
            //         'text=Antall timer du skrev inn, betyr at du har jobbet 49% av det du gjør når du er frisk.',
            //     ),
            // ).toBeVisible()

            // klikkGaVidere(true) - assuming with validation
            await page.locator('button').filter({ hasText: 'Gå videre' }).click()

            await expect(
                page.locator('.navds-read-more__button:has-text("Er prosenten lavere enn du forventet?")'),
            ).toBeVisible()

            await expect(
                page.locator('[data-cy="feil-lokal"]:has-text("Timene utgjør mindre enn 50 %.")'),
            ).toBeVisible()
            await expect(
                page.locator(
                    'text=Antall timer du skrev inn, betyr at du har jobbet 49 % av det du gjør når du er frisk. Du må enten svare nei på øverste spørsmålet eller endre antall timer totalt.',
                ),
            ).toBeVisible()
            await expect(
                page.locator(
                    'text=Antall timer du skrev inn, betyr at du har jobbet 49% av det du gjør når du er frisk.',
                ),
            ).toBeVisible()

                await fillTextFieldByLabel(
                page,
                'Oppgi timer totalt',
                '11',
                '.undersporsmal .navds-text-field__input#13acfccb-3f39-3893-8054-058270add6ab'
            )

            await page.locator('button').filter({ hasText: 'Gå videre' }).click()
        })

        await test.step('Søknad ARBEID_UTENFOR_NORGE', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\\/6`))
            await page.locator('[data-cy="ja-nei-stor"] input[value="JA"]').click()
            await expect(page.locator('text=Har du arbeidet i utlandet i løpet av de siste 12 månedene?')).toBeVisible()
            await page.locator('button').filter({ hasText: 'Gå videre' }).click()
        })

        await test.step('Søknad ANDRE_INNTEKTSKILDER_V2', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\\/7`))
            await expect(page.locator('text=Har du andre inntektskilder enn nevnt over?')).toBeVisible()
            await page.locator('[data-cy="ja-nei-stor"] input[value="JA"]').click()
            await expect(
                page.locator(
                    'text=Velg inntektskildene som passer for deg. Finner du ikke noe som passer for deg, svarer du nei',
                ),
            ).toBeVisible()
            await expect(
                page.locator('.undersporsmal .navds-checkbox label[for="d9ac4359-5519-34f1-b59d-b5ab24e55821"]'),
            ).toHaveText(/ansatt et annet sted enn nevnt over/)
            await page.locator('input[type="checkbox"]#d9ac4359-5519-34f1-b59d-b5ab24e55821').check()
            await page.locator('button').filter({ hasText: 'Gå videre' }).click()
        })

        await test.step('Søknad OPPHOLD_UTENFOR_EOS', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\\/8`))
            await page.locator('[data-cy="ja-nei-stor"] input[value="JA"]').click()
            await expect(page.locator('text=Når var du utenfor EU/EØS?')).toBeVisible()
            // Set period from 14th to 22nd
            await setPeriodeFraTil(page, 14, 22)
            await page.locator('button').filter({ hasText: 'Gå videre' }).click()
        })

        await test.step('Søknad TIL_SLUTT', async () => {
            await expect(page).toHaveURL(new RegExp(`.*${soknadId}\\/9`))
            await expect(page.locator('text=Oppsummering fra søknaden')).toBeVisible()
            const oppsummering = page.locator('[data-cy="oppsummering-fra-søknaden"]')
            await expect(oppsummering).toContainText('Søknaden sendes til')
            await expect(oppsummering).toContainText('Posten Norge AS, Bærum')
            // sporsmalOgSvar - assuming it checks specific Q&A
            await page.locator('button').filter({ hasText: 'Send søknaden' }).click()
        })

        await test.step('Søknad kvittering', async () => {
            await expect(page).toHaveURL(new RegExp(`.*\\/kvittering\\/${soknadId}`))
            const kvittering = page.locator('[data-cy="kvittering"]')
            await expect(kvittering).toContainText('Hva skjer videre?')
            await expect(kvittering).toContainText('Du får sykepengene fra arbeidsgiveren din')
            await expect(kvittering).not.toContainText('Vi trenger inntektsopplysninger fra deg')
        })
    })
})
