import { test, expect } from './fixtures'
import { checkViStolerPaDeg, neiOgVidere, svarRadioGruppe } from './utilities'

test.describe('Opphold utenfor EU/EØS', () => {
    test.beforeEach(async ({ page }) => {
        await page.context().clearCookies()
        await page.goto('/syk/sykepengesoknad?testperson=arbeidstaker')

        const link = page.getByRole('link', { name: 'Søknad Om Sykepenger' })
        await link.click()
        await expect(page.getByRole('heading', { level: 1, name: 'Søknad om sykepenger' })).toBeVisible()
    })

    test('Opphold utenfor EU/EØS', async ({ page }) => {
        await test.step('Går til spørsmål om opphold utenfor EU/EØS', async () => {
            await checkViStolerPaDeg(page)
            await neiOgVidere(page, [
                'Tilbake i fullt arbeid',
                'Ferie',
                'Permisjon',
                'Jobb underveis i sykefraværet',
                'Andre inntektskilder',
            ])
            await expect(page.getByRole('heading', { level: 2, name: 'Reise utenfor EU/EØS' })).toBeVisible()
        })

        await test.step('Viser riktig info for opphold utenfor EU/EØS', async () => {
            const hjelptekst = page.getByText(
                'Reiste du til et land utenfor EU/EØS mens du var sykmeldt, må du søke om å beholde sykepengene.',
            )
            await expect(hjelptekst).toBeVisible()
        })

        await test.step('Viser accordion for spesiell info om opphold utenfor EU/EØS', async () => {
            const accordionFerie = page.getByRole('button', { name: 'Var reisen i forbindelse med ferie?' })
            await expect(accordionFerie).toBeVisible()
            await accordionFerie.click()
            await expect(
                page
                    .locator('div')
                    .filter({ has: accordionFerie })
                    .getByText('Når du tar ut lovbestemt ferie, skal du ikke søke om å beholde sykepengene', {
                        exact: false,
                    }),
            ).toBeVisible()

            const accordionOsloSykehus = page.getByRole('button', {
                name: 'Var reisen en behandlingsreise ved Oslo Universitetssykehus?',
            })
            await expect(accordionOsloSykehus).toBeVisible()
            await accordionOsloSykehus.click()
            await expect(
                page
                    .locator('div')
                    .filter({ has: accordionOsloSykehus })
                    .getByText(
                        'Reiste du til utlandet i forbindelse med behandlingsreise ved Oslo Universitetssykehus',
                        { exact: false },
                    ),
            ).toBeVisible()
        })

        await test.step('Viser info om opprettelse av egen søknad', async () => {
            await svarRadioGruppe(page, /Var du på reise utenfor EU\/EØS/i, 'Ja')
            await expect(
                page.getByText('Nav oppretter en egen søknad som du må sende inn', { exact: false }),
            ).toBeVisible()
        })
    })
})
