import { test, expect } from '@playwright/test'
import { julesoknadPerson } from '../src/data/mock/data/personas/personas'
import { checkViStolerPaDeg, klikkGaVidere } from './utilities'

test.describe('Julesøkand med informasjon på introside og kvittering', () => {
    const soknad = julesoknadPerson.soknader[0]

    test.beforeEach(async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/1?testperson=julesoknad`)
        await expect(page.locator('.navds-heading--large')).toBeVisible()
    })

    test('Informasjon om Julesøknad på Introside', async ({ page }) => {
        await expect(
            page.getByText(
                'For å kunne få sykepenger før jul, kan du søke tidligere enn vanlig. Da må du fylle ut søknaden med opplysninger om hvordan du tror sykmeldingsperioden fremover vil bli.'
            )
        ).toBeVisible()
        
        await checkViStolerPaDeg(page)
    })

    test('Søknad TILBAKE_I_ARBEID', async ({ page }) => {
        await checkViStolerPaDeg(page)
        
        await expect(page).toHaveURL(new RegExp(`${soknad.id}/2`))
        await page.locator('[data-cy="ja-nei-stor"] input[value="NEI"]').click()
        await klikkGaVidere(page)
    })

    test('Søknad TIL_SLUTT', async ({ page }) => {
        await checkViStolerPaDeg(page)
        
        // Navigate through the previous step first
        await expect(page).toHaveURL(new RegExp(`${soknad.id}/2`))
        await page.locator('[data-cy="ja-nei-stor"] input[value="NEI"]').click()
        await klikkGaVidere(page)
        
        // Now we should be on the final step
        await page.getByRole('button', { name: 'Send søknaden' }).click()
    })

    test('Søknad kvittering', async ({ page }) => {
        await checkViStolerPaDeg(page)
        
        // Navigate through all the steps to reach the kvittering
        // await expect(page).toHaveURL(new RegExp(`${soknad.id}/2`))
        await page.locator('[data-cy="ja-nei-stor"] input[value="NEI"]').click()
        await klikkGaVidere(page)
        
        await page.getByRole('button', { name: 'Send søknaden' }).click()
        
        // Verify kvittering content
        await expect(page.getByText('Endre søknaden hvis situasjonen din endrer seg')).toBeVisible()
        await expect(
            page.getByText(
                'Endringer i situasjonen din mens du er sykmeldt kan påvirke hva du får utbetalt. Når sykmeldingsperioden er over bør du sjekke at søknaden fortsatt stemmer. Du kan oppdatere svarene dine i 12 måneder etter du har sendt inn søknaden.'
            )
        ).toBeVisible()
    })
})
