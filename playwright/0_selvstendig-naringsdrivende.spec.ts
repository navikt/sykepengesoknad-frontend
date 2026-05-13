import { expect, test } from '@playwright/test'

import {
    klikkGaVidere,
    svarNeiHovedsporsmal,
    harFeilISkjemaet,
    svarJaHovedsporsmal,
    harSynligTittel,
} from './utils/utilities'
import { validerAxeUtilityWrapper } from './uuvalidering'

const FRAVAR_FOR_SYKMELDING_URL =
    '/syk/sykepengesoknad/soknader/bd6f6207-3888-4210-a4c0-cbe6806b5d00/2?testperson=selvstendig-naringsdrivende'

test.describe('Tester spørsmål om fravær før sykmeldingen', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(FRAVAR_FOR_SYKMELDING_URL)
    })

    test('skal vise fravær før sykmelding og kunne svare nei', async ({ page }) => {
        await harSynligTittel(page, 'Fravær før du ble sykmeldt', 2)
        await page.getByRole('button', { name: 'Spørsmålet forklart' }).click()
        await expect(page.getByText('Som utgangspunkt må du ha jobbet')).toBeVisible()

        await validerAxeUtilityWrapper(page, test.info())
        await klikkGaVidere(page, true, true)
        await harFeilISkjemaet(page, 'Du må svare på om du hadde fravær før sykmeldingen din')

        await svarJaHovedsporsmal(page)
        await expect(page.getByText('Det kan være vi trenger flere')).toBeVisible()
        await svarNeiHovedsporsmal(page)
    })
})
