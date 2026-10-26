import { test } from './utils/fixtures'
import { harSynligTekst, harSynligTittel } from './utils/utilities'

test.describe('Tester søknader tilhørende person over 70', () => {
    const testpersonQuery = '?testperson=over-70'
    const soknadId = 'df1371a4-2773-41c2-a895-49f56142496c'

    test('Person over 70', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${soknadId}/1${testpersonQuery}`)
        await harSynligTittel(page, 'Viktig informasjon', 1)
        await harSynligTekst(page, 'Når du har passert 70 år, har du ikke lenger rett til sykepenger.')
        await harSynligTekst(
            page,
            'Hvis du ikke skal søke om sykepenger, kan du avbryte søknaden. Hvis du likevel ønsker å søke, kan vi ikke hindre deg i dette.',
        )
    })
})
