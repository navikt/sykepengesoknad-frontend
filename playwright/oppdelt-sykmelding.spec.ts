import { expect, test } from '@playwright/test'

import { arbeidstakerToPerioder } from '../src/data/mock/data/soknad/arbeidstaker-to-perioder'

test.describe('Oppdelt sykmelding', () => {
    test('viser informasjon på introsiden', async ({ page }) => {
        await page.goto(
            `/syk/sykepengesoknad/soknader/${arbeidstakerToPerioder.id}/1?testperson=arbeidstaker-periode-varianter`,
        )

        await expect(
            page.getByText(
                'Siden sykemeldingen går over 31 dager, har vi delt opp søknaden, slik at du kan søke om sykepenger før hele perioden er ferdig. På den måten slipper du å vente lenge på sykepengene dine.',
            ),
        ).toBeVisible()
    })
})
