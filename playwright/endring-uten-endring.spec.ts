import { sendtArbeidsledigKvittering } from '../src/data/mock/data/soknad/soknader-integration'

import { test, expect } from './fixtures'
import { klikkGaVidere, checkViStolerPaDeg, harSynligTittel, harSoknaderlisteHeading } from './utilities'
import { validerAxeUtilityWrapper } from "./uuvalidering";

test.describe('Tester endring uten en endringer', () => {
    const soknad = sendtArbeidsledigKvittering
    const testpersonQuery = '?testperson=integrasjon-soknader'

    test('Full flyt for endring uten endring', async ({ page }) => {
        await test.step('Gå til sendt søknad', async () => {
            await page.goto(`/syk/sykepengesoknad/sendt/${soknad.id}${testpersonQuery}`)
        })

        await test.step('Jeg vil endre svarene i søknaden', async () => {
            await page.getByRole('button', { name: 'Jeg vil endre svarene i søknaden' }).click()
            await harSynligTittel(page, 'Jeg vil endre svarene i søknaden', 1)
            await page.getByRole('button', { name: 'Ok' }).click()
            await expect(page).not.toHaveURL(new RegExp(`/sendt/${soknad.id}`))
            await expect(page).toHaveURL(/\/1/)

            await expect(page.getByText('Avslutt uten å endre søknaden')).toBeVisible()
            await validerAxeUtilityWrapper(page, test.info())
            await expect(page.getByRole('button', { name: 'Jeg vil slette denne søknaden' })).toBeHidden()
        })

        await test.step('Svarer det samme søknaden', async () => {
            await checkViStolerPaDeg(page)
            await klikkGaVidere(page)
            await klikkGaVidere(page)
            await klikkGaVidere(page)
            await klikkGaVidere(page)
            await harSynligTittel(page, 'Oppsummering fra søknaden', 2)
            await validerAxeUtilityWrapper(page, test.info())
        })

        await test.step('Vi ser en popup og lander på listevisninga', async () => {
            await expect(page).toHaveURL(/\/6/)
            await page.getByRole('button', { name: 'Send endringene' }).click()
            await harSynligTittel(page, 'Du har ikke gjort noen endringer', 1)
            await expect(
                page.getByRole('dialog').filter({ hasText: /Vi behandler den opprinnelige sykepengesøknaden din./i }),
            ).toBeVisible()
            await page.getByRole('button', { name: 'Ok', exact: true }).click()
            await validerAxeUtilityWrapper(page, test.info())
            await harSoknaderlisteHeading(page)
        })
    })
})
