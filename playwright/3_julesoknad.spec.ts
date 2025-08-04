import { test, expect } from '@playwright/test'

import { julesoknadPerson } from '../src/data/mock/data/personas/personas'

import { checkViStolerPaDeg, klikkGaVidere, fjernAnimasjoner } from './utilities'

test.describe('Julesøkand med informasjon på introside og kvittering', () => {
    const soknad = julesoknadPerson.soknader[0]

    test('Gjennomfører hele søknadsflyten for julesøknad', async ({ page }) => {
        // Forberedelser: Fjern animasjoner for stabil testing
        await fjernAnimasjoner(page)

        await test.step('Laster introside', async () => {
            await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/1?testperson=julesoknad`)
            await expect(page.locator('.navds-heading--large')).toBeVisible()
        })

        await test.step('Søknad ANSVARSERKLARING - med julesøknad informasjon', async () => {
            await expect(page).toHaveURL(new RegExp(`${soknad.id}/1`))

            // Verifiser julesøknad-spesifikk informasjon på introside
            await expect(
                page.getByText(
                    'For å kunne få sykepenger før jul, kan du søke tidligere enn vanlig. Da må du fylle ut søknaden med opplysninger om hvordan du tror sykmeldingsperioden fremover vil bli.',
                ),
            ).toBeVisible()

            await checkViStolerPaDeg(page, true) // Bekreft ansvarserklæring og gå videre
        })

        await test.step('Søknad TILBAKE_I_ARBEID', async () => {
            await expect(page).toHaveURL(new RegExp(`${soknad.id}/2`))

            // Velg 'NEI' på spørsmål om tilbake i arbeid
            await page.locator('[data-cy="ja-nei-stor"] input[value="NEI"]').click()
            await klikkGaVidere(page)
        })

        await test.step('Søknad TIL_SLUTT (oppsummering)', async () => {
            await expect(page).toHaveURL(new RegExp(`${soknad.id}/3`))

            // Send inn søknaden
            await page.getByRole('button', { name: 'Send søknaden' }).click()
        })

        await test.step('Søknad kvittering - med julesøknad informasjon', async () => {
            await expect(page).toHaveURL(new RegExp(`/kvittering/${soknad.id}`))

            // Verifiser standard kvitteringsinnhold
            await expect(page.getByRole('heading', { name: 'Søknaden er sendt' })).toBeVisible()

            // Verifiser julesøknad-spesifikk informasjon på kvittering
            await expect(page.getByText('Endre søknaden hvis situasjonen din endrer seg')).toBeVisible()
            await expect(
                page.getByText(
                    'Endringer i situasjonen din mens du er sykmeldt kan påvirke hva du får utbetalt. Når sykmeldingsperioden er over bør du sjekke at søknaden fortsatt stemmer. Du kan oppdatere svarene dine i 12 måneder etter du har sendt inn søknaden.',
                ),
            ).toBeVisible()
        })
    })
})
