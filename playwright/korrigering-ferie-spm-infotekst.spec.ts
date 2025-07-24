import { arbeidstakerTilKorrigering } from '../src/data/mock/data/soknad/soknader-integration'

import { test, expect } from './fixtures'

test.describe('Ved korrigering av ferie forsvinner Bjørn', () => {
    const soknad = arbeidstakerTilKorrigering
    const testpersonQuery = '?testperson=integrasjon-soknader'

    test('Vi kan gå direkte til søknaden fra sykefravaer', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}/3${testpersonQuery}`)
        await expect(page).toHaveURL(
            new RegExp(`/syk/sykepengesoknad/soknader/${soknad.id}/3\\?testperson=integrasjon-soknader`),
        )
        await expect(page.getByText('Tok du ut feriedager i tidsrommet 1. - 24. april 2020?')).toBeVisible()
        await expect(
            page.getByText('Syns du det er vanskelig å svare på om du har tatt ut ferie eller ikke'),
        ).toBeHidden()
    })
})
