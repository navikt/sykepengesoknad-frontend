import { test, expect } from '@playwright/test'

import { gradertReisetilskudd } from '../src/data/mock/data/soknad/arbeidstaker-reisetilskudd-gradert'

import { apneReadmore } from './utils/utilities'
import { validerAxeUtilityWrapper } from './uuvalidering'

test.describe('Teste gradert reisetilskudd med ReadMore-hjelpetekster', () => {
    test.beforeEach(async ({ page }) => {
        await page.context().clearCookies()
    })

    test('TILBAKE_I_ARBEID_GRADERT_REISETILSKUDD ReadMore', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${gradertReisetilskudd.id}/3?testperson=reisetilskudd`)

        await test.step('Tilbake i arbeid - Gradert reisetilskudd', async () => {
            await expect(page.locator('[data-cy="sporsmal-tittel"]')).toHaveText('Tilbake i fullt arbeid')

            await apneReadmore(page, 'Spørsmålet forklart', [
                'Du kan begynne å jobbe fullt igjen før sykmeldingen er slutt.',
                'NAV trenger opplysninger om du var tilbake i fullt arbeid',
                'Svar ja, hvis du var fullt tilbake på jobb i løpet av perioden',
                'Svar nei, dersom du kun var delvis tilbake på jobb',
            ])

            await validerAxeUtilityWrapper(page, test.info())
        })
    })

    test('BRUKTE_REISETILSKUDDET ReadMore', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${gradertReisetilskudd.id}/10?testperson=reisetilskudd`)

        await test.step('Brukte reisetilskuddet - Gradert reisetilskudd', async () => {
            await expect(page.getByText('Hadde du ekstra reiseutgifter mens du var sykmeldt?')).toBeVisible()

            await apneReadmore(page, 'Spørsmålet forklart', [
                'Har du hatt ekstra reiseutgifter til og fra jobben mens du var sykmeldt',
                'kan du ha rett til reisetilskudd',
                'Svar nei, dersom du ikke har hatt noen ekstra utgifter',
            ])

            await validerAxeUtilityWrapper(page, test.info())
        })
    })
})
