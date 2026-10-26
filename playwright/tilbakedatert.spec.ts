import { test, expect } from './utils/fixtures'

test.describe('Tester søknader tilhørende tilbakedaterte sykmeldinger', () => {
    const testpersonQuery = '?testperson=tilbakedateringer'

    test('Tilbakedatering under behandling', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/9205cc51-145b-4bda-8e99-aeaade949daf/1${testpersonQuery}`)
        await expect(page.getByRole('heading', { name: 'Viktig informasjon' })).toBeVisible()
        await expect(
            page.getByText(
                'Vanligvis starter sykemeldingen den dagen du besøker legen, men i ditt tilfelle har legen angitt en tidligere startdato. NAV må vurdere om det er en gyldig grunn for at sykemeldingen din starter før du var i kontakt med legen, og vil ta med dette i vurderingen når de går igjennom søknaden din.',
            ),
        ).toBeVisible()
    })

    test('Tilbakedatering avvist', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/9205cc51-145b-4bda-8e99-aeaade949daa/1${testpersonQuery}`)
        await expect(page.getByRole('heading', { name: 'Viktig informasjon' })).toBeVisible()
        await expect(
            page.getByText(
                'Vanligvis starter sykemeldingen den dagen du besøker legen, men i ditt tilfelle har legen angitt en tidligere startdato.',
            ),
        ).toBeVisible()
        await expect(
            page.getByText(
                'NAV har kommet til at det ikke er noen gyldig grunn til at sykmeldingen startet før dere hadde kontakt.',
            ),
        ).toBeVisible()
    })
})
