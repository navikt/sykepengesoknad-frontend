import { expect, test, type Page } from '@playwright/test'

import {
    harFlereFeilISkjemaet,
    harSynligTekst,
    klikkGaVidere,
    sporsmalOgSvar,
    svarCheckboxSporsmal,
    svarNeiHovedsporsmal,
    svarRadioSporsmal,
} from './utils/utilities'

type GhostSoknad = {
    readonly id: string
    readonly testperson: string
    readonly steg: number
    readonly antallSporsmalEtterGhost: number
}

const ghostSporsmal =
    'Har du jobbet noe mer i disse enn du vanligvis gjør, mens du var sykemeldt i perioden 1. april - 24. mai 2020?'
const annenInntektSporsmal = 'Har du hatt annen inntekt eller oppdrag?'
const ghostFeilmelding = 'Du må svare på om du har jobbet mer enn du pleier i et eller flere arbeidsforhold'

async function gjennomforGhostFlyt(page: Page, soknad: GhostSoknad) {
    await page.goto(
        `/syk/sykepengesoknad/soknader/${soknad.id}/${soknad.steg}?testperson=${soknad.testperson}&id=${soknad.id}`,
    )

    await test.step('Viser ghost-inntekter og validerer obligatorisk svar', async () => {
        await harSynligTekst(page, 'Andre arbeidsforhold vi har registrert på deg:')
        await harSynligTekst(page, 'Ruter')
        await harSynligTekst(page, 'Blomsterbutikken AS')
        await harSynligTekst(
            page,
            'Bensinstasjonen med det veldig lange navnet, Stavanger (ved det røde huset som ligger ved Shell)',
        )

        await klikkGaVidere(page, true)
        await harFlereFeilISkjemaet(page, 2, [ghostFeilmelding, 'Du må svare på om du har annen inntekt eller oppdrag'])
    })

    await test.step('Svarer på ghost-inntekter og annen inntekt', async () => {
        await svarRadioSporsmal(page, ghostSporsmal, 'Ja')
        await svarCheckboxSporsmal(page, 'Hvilke jobbet du mer i?', 'Ruter')
        await harSynligTekst(page, annenInntektSporsmal)

        await svarRadioSporsmal(page, annenInntektSporsmal, 'Ja')
        await svarCheckboxSporsmal(page, 'Hva slags arbeid eller inntekt gjelder dette?', 'Styreverv')
        await klikkGaVidere(page)
    })

    await test.step('Går til oppsummering', async () => {
        for (let index = 0; index < soknad.antallSporsmalEtterGhost; index++) {
            await svarNeiHovedsporsmal(page)
            await klikkGaVidere(page)
        }

        const oppsummering = page.getByRole('region', { name: 'Oppsummering fra søknaden' })
        await sporsmalOgSvar(oppsummering, ghostSporsmal, 'Ja')
        await sporsmalOgSvar(oppsummering, 'Hvilke jobbet du mer i?', 'Ruter')
        await sporsmalOgSvar(oppsummering, annenInntektSporsmal, 'Ja')
        await sporsmalOgSvar(oppsummering, 'Hva slags arbeid eller inntekt gjelder dette?', 'Styreverv')
    })

    await test.step('Sender søknaden og ser kvittering', async () => {
        await page.getByRole('button', { name: 'Send søknaden' }).click()
        await expect(page).toHaveURL(new RegExp(`/kvittering/${soknad.id}`))
        await expect(page.getByText('Søknaden er sendt')).toBeVisible()
    })
}

test.describe('Ghost-inntekter for selvstendig næringsdrivende', () => {
    test('Fullfører søknad med ghost-inntekter', async ({ page }) => {
        await gjennomforGhostFlyt(page, {
            id: 'c1a5f746-d910-4f45-8c23-81e2c4f8a639',
            testperson: 'selvstendig-naringsdrivende',
            steg: 6,
            antallSporsmalEtterGhost: 2,
        })
    })
})

test.describe('Ghost-inntekter for frilanser', () => {
    test('Fullfører søknad med ghost-inntekter', async ({ page }) => {
        await gjennomforGhostFlyt(page, {
            id: '8d5fa75e-b13e-4ac4-b0e7-cc644647a2c8',
            testperson: 'frilanser',
            steg: 4,
            antallSporsmalEtterGhost: 2,
        })
    })
})
