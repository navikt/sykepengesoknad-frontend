import { test } from './utils/fixtures'
import { harSynligTekst, harSynligTittel } from './utils/utilities'

test.describe('Tester søknader tilhørende tilbakedaterte sykmeldinger', () => {
    const testpersonQuery = '?testperson=tilbakedateringer'

    test('Tilbakedatering under behandling', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/9205cc51-145b-4bda-8e99-aeaade949daf/1${testpersonQuery}`)
        await harSynligTittel(page, 'Viktig informasjon', 3)
        await harSynligTekst(
            page,
            'Vanligvis starter sykemeldingen den dagen du besøker legen, men i ditt tilfelle har legen angitt en tidligere startdato. NAV må vurdere om det er en gyldig grunn for at sykemeldingen din starter før du var i kontakt med legen, og vil ta med dette i vurderingen når de går igjennom søknaden din.',
        )
    })

    test('Tilbakedatering avvist', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/9205cc51-145b-4bda-8e99-aeaade949daa/1${testpersonQuery}`)
        await harSynligTittel(page, 'Viktig informasjon', 3)
        await harSynligTekst(
            page,
            'Vanligvis starter sykemeldingen den dagen du besøker legen, men i ditt tilfelle har legen angitt en tidligere startdato.',
        )
        await harSynligTekst(
            page,
            'NAV har kommet til at det ikke er noen gyldig grunn til at sykmeldingen startet før dere hadde kontakt.',
        )
    })
})
