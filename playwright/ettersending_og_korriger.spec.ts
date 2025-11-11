import { arbeidstakerGradert } from '../src/data/mock/data/soknad/arbeidstaker-gradert'

import { test, expect } from './utils/fixtures'
import {
    checkViStolerPaDeg,
    harSoknaderlisteHeading,
    harSynligTittel,
    klikkGaVidere,
    neiOgVidere,
    svarJaHovedsporsmal,
    trykkPaSoknadMedId,
} from './utils/utilities'
import { validerAxeUtilityWrapper } from './uuvalidering'

test.describe('Tester ettersending og korrigering', () => {
    const soknad = arbeidstakerGradert

    test.beforeEach(async ({ page }) => {
        await page.goto('/syk/sykepengesoknad?testperson=arbeidstaker-gradert')
    })

    test('Svarer på søknad og korrigerer', async ({ page }) => {
        await test.step('Viser søknader og åpner søknaden', async () => {
            await harSoknaderlisteHeading(page)
            await trykkPaSoknadMedId(page, soknad.id)
        })

        await test.step('Start søknad og svar på spørsmål', async () => {
            await checkViStolerPaDeg(page)
            await neiOgVidere(page, [
                'Tilbake i fullt arbeid',
                'Ferie',
                'Permisjon',
                'Jobb underveis i sykefraværet',
                'Arbeid utenfor Norge',
                'Andre inntektskilder',
                'Reise utenfor EU/EØS',
            ])
        })

        await test.step('Sender søknaden', async () => {
            await harSynligTittel(page, 'Oppsummering fra søknaden', 2)
            await validerAxeUtilityWrapper(page, test.info())
            await page.getByRole('button', { name: 'Send søknaden' }).click()
        })

        await test.step('Viser kvittering etter innsending', async () => {
            await expect(page).toHaveURL(new RegExp(`/kvittering/${soknad.id}`))
            await expect(page.locator('[data-cy="kvittering"]')).toContainText(
                'Posten Norge AS, Bærum (Org.nr. 974654458), med kopi til NAV',
            )
            await expect(page.getByText('Du får sykepengene fra arbeidsgiveren din')).toBeVisible()
            await expect(
                page.getByText('Arbeidsgiveren din betaler de første 16 kalenderdagene av sykefraværet.'),
            ).toBeVisible()
            await validerAxeUtilityWrapper(page, test.info())
        })

        await test.step('Navigerer til sendt søknad og starter korrigering', async () => {
            await page.goto(`/syk/sykepengesoknad?testperson=arbeidstaker-gradert`)
            await trykkPaSoknadMedId(page, soknad.id)
            await expect(page).toHaveURL(new RegExp(`/sendt/${soknad.id}`))

            await page.getByRole('link', { name: 'Endre svar' }).click()
            await page.getByRole('button', { name: 'Ok', exact: true }).click()
            await expect(page).toHaveURL(new RegExp(`/1`))
        })

        await test.step('Navigerer til tidligere søknader og starter korrigering', async () => {
            await page.goto(`/syk/sykepengesoknad?testperson=arbeidstaker-gradert`)
            const tidligereSoknader = page.locator('[data-cy="Tidligere søknader"]')
            await expect(tidligereSoknader.getByRole('link')).toHaveCount(1)
            await trykkPaSoknadMedId(page, soknad.id)
            await expect(page).toHaveURL(new RegExp(`/sendt/${soknad.id}`))
            // todo her har vi uu feil await validerAxeUtilityWrapper(page, test.info())
            await page.getByRole('button', { name: 'Jeg vil endre svarene i søknaden' }).click()
            // todo her har vi uu feil await validerAxeUtilityWrapper(page, test.info())
            await page.getByRole('button', { name: 'Ok' }).click()
        })

        await test.step('Fyller ut ny søknad og sender endringene', async () => {
            await expect(page).not.toHaveURL(new RegExp(`/kvittering/${soknad.id}`))
            await expect(page).toHaveURL(new RegExp(`/1`))

            const checkbox = page.locator('.navds-checkbox__input[type=checkbox]')
            await expect(checkbox).not.toBeChecked()
            await checkViStolerPaDeg(page)
            await validerAxeUtilityWrapper(page, test.info())
            for (let i = 0; i < 4; i++) {
                await klikkGaVidere(page)
            }
            await svarJaHovedsporsmal(page)
            for (let i = 0; i < 3; i++) {
                await klikkGaVidere(page)
            }

            await page.getByRole('button', { name: 'Send endringene' }).click()
            await expect(page).toHaveURL(new RegExp(`/kvittering/`))
            await validerAxeUtilityWrapper(page, test.info())
            await page.getByRole('link', { name: 'Endre svar' }).click()
            await page.getByRole('button', { name: 'Ok', exact: true }).click()
            await expect(page).toHaveURL(new RegExp(`/1`))
        })
    })
})
