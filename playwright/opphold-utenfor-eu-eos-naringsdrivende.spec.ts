import { test, expect } from './utils/fixtures'
import { checkViStolerPaDeg, neiOgVidere } from './utils/utilities'

test.describe('Opphold utenfor EU/EØS', () => {
    test.beforeEach(async ({ page }) => {
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

        await test.step('Viser readmore for spesiell info om opphold utenfor EU/EØS', async () => {
            const readmoreOsloUniversitet = page.getByRole('button', {
                name: 'Var reisen en behandlingsreise i regi av Oslo Universitetssykehus?',
            })
            await expect(readmoreOsloUniversitet).toBeVisible()
            await readmoreOsloUniversitet.click()
            await expect(
                page.getByText(
                    'Reiste du til utlandet i forbindelse med behandlingsreise i regi av Oslo Universitetssykehus trenger du ikke søke om å beholde sykepengene på reise.',
                ),
            ).toBeVisible()
        })
    })
})
