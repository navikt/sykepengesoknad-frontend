import { test } from './utils/fixtures'
import { checkViStolerPaDeg, harSynligTekst, harSynligTittel, neiOgVidere } from './utils/utilities'
import { fiskerHyre } from '../src/data/mock/data/soknad/fisker-hyre'

test.describe('Fisker med hyre', () => {
    test('Går gjennom hele søknaden', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${fiskerHyre.id}/1?testperson=fisker`)
        await checkViStolerPaDeg(page)

        await harSynligTekst(page, 'Sykmeldt som: fisker med hyre')
        await harSynligTekst(page, 'Periode: 1. – 24. april 2020 (100%)')

        await neiOgVidere(page, [
            'Tilbake i fullt arbeid',
            'Ferie',
            'Permisjon',
            'Arbeid mens du var syk',
            'Andre inntektskilder',
            'Reise utenfor EU/EØS',
        ])

        await harSynligTittel(page, 'Oppsummering fra søknaden', 2)
        await page.getByRole('button', { name: 'Send søknaden' }).click()
        await test.step('Kvittering', async () => {
            await harSynligTittel(page, 'Søknaden er sendt', 2)
            await harSynligTittel(page, 'Hva skjer videre?', 2)
        })
    })
})
