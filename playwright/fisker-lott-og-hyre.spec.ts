import { fiskerLottOgHyre } from '../src/data/mock/data/soknad/fisker-lott-og-hyre'
import { test } from './utils/fixtures'
import {
    apneReadmore,
    checkViStolerPaDeg,
    harSynligTekst,
    harSynligTittel,
    klikkGaVidere,
    neiOgVidere,
} from './utils/utilities'

test.describe('Fisker med lott og hyre', () => {
    test('Går gjennom hele søknaden', async ({ page }) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${fiskerLottOgHyre.id}/1?testperson=fisker`)
        await checkViStolerPaDeg(page)

        await harSynligTekst(page, 'Sykmeldt som: fisker med lott og hyre')
        await harSynligTekst(page, 'Periode: 1. – 24. april 2020 (100%)')

        await neiOgVidere(page, ['Tilbake i fullt arbeid', 'Ferie', 'Permisjon', 'Arbeid mens du var syk'])

        await test.step('Opprettholdt lottinntekt', async () => {
            await harSynligTekst(page, 'Hadde du lottinntekt selv om du var 100 % sykmeldt og ikke jobbet selv?')

            await apneReadmore(page, 'Spørsmålet forklart', [
                'Svar ja hvis inntekten ikke skyldtes at du selv jobbet mens du var sykmeldt.',
                'lottinntekt som ikke faller bort selv om du var sykmeldt',
                'Svar nei hvis:',
                'du har mottatt forskudd på lott som senere kommer til fradrag fordi du var sykmeldt',
            ])

            await page.getByRole('radio', { name: 'Ja' }).click()
            await klikkGaVidere(page)
        })

        await neiOgVidere(page, [
            'Andre inntektskilder',
            'Reise utenfor EU/EØS',
            'Opphold i utlandet',
            'Virksomheten din',
            'Ny i arbeidslivet',
            'Endringer i arbeidsituasjonen din',
        ])

        await harSynligTittel(page, 'Oppsummering fra søknaden', 2)
        await harSynligTekst(page, 'Hadde du lottinntekt selv om du var 100 % sykmeldt og ikke jobbet selv?')
        await page.getByRole('button', { name: 'Send søknaden' }).click()
        await test.step('Kvittering', async () => {
            await harSynligTittel(page, 'Søknaden er sendt', 2)
            await harSynligTittel(page, 'Hva skjer videre?', 2)
            await harSynligTekst(page, 'Hadde du lottinntekt selv om du var 100 % sykmeldt og ikke jobbet selv?')
        })
    })
})
