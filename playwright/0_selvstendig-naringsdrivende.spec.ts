import { expect, Page, test } from '@playwright/test'

import {
    klikkGaVidere,
    svarDato,
    sporsmalOgSvar,
    svarNeiHovedsporsmal,
    sjekkMainContentFokus,
    modalIkkeAktiv,
    svarRadioSporsmal,
    harFeilISkjemaet,
    svarJaHovedsporsmal,
    harFlereFeilISkjemaet,
    svarCheckboxSporsmal,
    harSynligTittel,
} from './utilities'

const SELVSTENDIG_NARINGSDRIVENDE_URL =
    '/syk/sykepengesoknad/soknader/bd6f6207-3888-4210-a4c0-cbe6806b5d00/8?testperson=selvstendig-naringsdrivende'
const SELVSTENDIG_NARINGSDRIVENDE_UTEN_SIGRUN_URL =
    '/syk/sykepengesoknad/soknader/2faff926-5261-42e5-927b-02e4aa44a7ad/8?testperson=selvstendig-naringsdrivende-uten-sigrun'
const FRAVAR_FOR_SYKMELDING_URL =
    '/syk/sykepengesoknad/soknader/2faff926-5261-42e5-927b-02e4aa44a7ad/7?testperson=selvstendig-naringsdrivende-uten-sigrun'

test.describe('Tester selvstendig næringsdrivende søknad spørsmål om virksomhet med data fra Sigrun', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(SELVSTENDIG_NARINGSDRIVENDE_URL)
    })

    test('skal vise Sigrun-data og fullføre søknad', async ({ page }) => {
        await fellesInnholdForVisningAvSigrunData(page)
        await verifiserSigrunData(page)
        await fellesInnholdEtterVisningAvSigrunData(page)

        await klikkGaVidere(page, false, true)
        await sjekkMainContentFokus(page)

        await fullforSoknad(page)
        await verifiserKvittering(page)
    })
})

test.describe('Tester selvstendig næringsdrivende søknad spørsmål om virksomhet uten data fra Sigrun', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(SELVSTENDIG_NARINGSDRIVENDE_UTEN_SIGRUN_URL)
    })

    test('skal ikke vise Sigrun-data og fullføre søknad', async ({ page }) => {
        await fellesInnholdForVisningAvSigrunData(page)
        await verifiserIngenSigrunData(page)
        await fellesInnholdEtterVisningAvSigrunData(page)

        await klikkGaVidere(page, true, true)

        await fullforSoknad(page)

        await modalIkkeAktiv(page)
        await verifiserKvittering(page)
    })
})

test.describe('Tester spørsmål om fravær før sykmeldingen', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(FRAVAR_FOR_SYKMELDING_URL)
    })

    test('skal vise fravær før sykmelding og kunne svare nei', async ({ page }) => {
        await harSynligTittel(page, 'Fravær før du ble sykmeldt', 2)
        await expect(page.getByText('Som utgangspunkt må du ha jobbet')).toBeVisible()
        await expect(page.getByText('Det kan være vi trenger flere')).toBeVisible()

        await klikkGaVidere(page, true, true)
        await harFeilISkjemaet(page, 'Du må svare på om du hadde fravær før sykmeldingen din')
        await svarNeiHovedsporsmal(page)
    })
})

async function verifiserSigrunData(page: Page) {
    await expect(page.getByText('Datoen er første dag i det første av tre av de ferdiglignede årene.')).toBeVisible()

    await expect(
        page.getByText('Har du hatt mer enn 25 prosent endring i årsinntekten din som følge av den varige endringen?'),
    ).toBeVisible()

    await expect(
        page.getByText('Din gjennomsnittlige årsinntekt på sykmeldingstidspunktet: 450 000 kroner.'),
    ).toBeVisible()

    await expect(
        page.getByText(
            'Har du en årsinntekt som gjør at du tjener mindre enn 337 500 kroner eller mer enn 562 500 kroner?',
        ),
    ).toBeVisible()

    await page.getByText('Hvordan har vi kommet frem til 450 000 kroner?').click()
    await expect(page.getByText('Vi henter informasjon om inntekt fra Skatteetaten.')).toBeVisible()
    await expect(page.getByText('2020: 400 000 kroner')).toBeVisible()
    await expect(page.getByText('2021: 450 000 kroner')).toBeVisible()
    await expect(page.getByText('2022: 500 000 kroner')).toBeVisible()
}

async function verifiserIngenSigrunData(page: Page) {
    await expect(page.getByText('Datoen er første dag i det første av tre av de ferdiglignede årene.')).toBeHidden()

    await expect(
        page.getByText('Har du hatt mer enn 25 prosent endring i årsinntekten din som følge av den varige endringen?'),
    ).toBeVisible()

    await expect(
        page.getByText('Din gjennomsnittlige årsinntekt på sykmeldingstidspunktet: 450 000 kroner.'),
    ).toBeHidden()

    await expect(
        page.getByText(
            'Har du en årsinntekt som gjør at du tjener mindre enn 337 500 kroner eller mer enn 562 500 kroner?',
        ),
    ).toBeHidden()

    await expect(page.getByText('Hvordan har vi kommet frem til 450 000 kroner?')).toBeHidden()

    await page.locator('span').filter({ hasText: 'Spørsmålet forklart' }).last().click()
    await expect(page.getByText('Sykepenger til selvstendig næringsdrivende')).toBeVisible()
    await expect(page.getByText('Det kan likevel gjøres unntak')).toBeVisible()
    await expect(page.getByText('Vi skjønner at det noen ganger ')).toBeVisible()
}

async function fellesInnholdForVisningAvSigrunData(page: Page) {
    await klikkGaVidere(page, true)
    await harFeilISkjemaet(page, 'Du må svare på om virksomheten har blitt avviklet og slettet')
    await svarJaHovedsporsmal(page)
    await expect(page.getByText('Når ble virksomheten avviklet?')).toBeVisible()
    await klikkGaVidere(page, true)
    await harFeilISkjemaet(page, 'Datoen følger ikke formatet dd.mm.åååå')
    await svarNeiHovedsporsmal(page)

    await klikkGaVidere(page, true)
    await harFeilISkjemaet(page, 'Du må svare på om du er ny i arbeidslivet')
    await svarRadioSporsmal(page, 'Er du ny i arbeidslivet etter 1. januar 2019?', 'Ja')
    await expect(page.getByText('Du har oppgitt at du er ny i arbeidslivet.')).toBeVisible()
    await klikkGaVidere(page, true)
    await harFeilISkjemaet(page, 'Datoen følger ikke formatet dd.mm.åååå')
    await svarRadioSporsmal(page, 'Er du ny i arbeidslivet etter 1. januar 2019?', 'Nei')

    await klikkGaVidere(page, true)
    await harFeilISkjemaet(page, 'Du må svare på om det har skjedd en varig endring')

    await verifiserBeregningsInfo(page)
    await verifiserVarigEndringInfo(page)

    await svarRadioSporsmal(
        page,
        'Har det skjedd en varig endring i arbeidssituasjonen eller virksomheten din i mellom 1. januar 2019 og frem til sykmeldingstidspunktet?',
        'Nei',
    )
    await svarRadioSporsmal(
        page,
        'Har det skjedd en varig endring i arbeidssituasjonen eller virksomheten din i mellom 1. januar 2019 og frem til sykmeldingstidspunktet?',
        'Ja',
    )
}

async function verifiserBeregningsInfo(page: Page) {
    await expect(page.getByText('Beregning av sykepengegrunnlaget')).toBeVisible()
    await expect(
        page.getByText(
            'Sykepenger for selvstendig næringsdrivende baseres vanligvis på gjennomsnittlig årsinntekt de tre siste ferdiglignede årene.',
        ),
    ).toBeVisible()
    await expect(
        page.getByText('Hvis du ikke har tre ferdiglignede år, vil sykepengegrunnlaget fastsettes ved skjønn.'),
    ).toBeVisible()

    await page.getByText('Hva betyr ferdiglignet inntekt?').click()
    await expect(
        page.getByText(
            'Ferdiglignet inntekt betyr den endelige inntekten som er beregnet og godkjent av skattemyndighetene etter at selvangivelsen eller skattemeldingen er gjennomgått.',
        ),
    ).toBeVisible()
}

async function verifiserVarigEndringInfo(page: Page) {
    await expect(page.getByText('Varig endring i din arbeidssituasjon eller virksomhet')).toBeVisible()
    await expect(page.getByText('Eksempler på varig endring')).toBeVisible()
    await expect(page.getByText('Avsluttet eller startet andre arbeidsforhold ved siden av virksomheten')).toBeVisible()
}

async function fellesInnholdEtterVisningAvSigrunData(page: Page) {
    await klikkGaVidere(page, true)

    await harFlereFeilISkjemaet(page, 2, [
        'Du må svare på hvilken endring som har skjedd',
        'Du må svare på om du har hatt mer enn 25 prosent endring i årsinntekten din',
    ])

    await svarCheckboxSporsmal(page, 'Hvilken endring har skjedd?', 'Endret markedssituasjon')

    await harFeilISkjemaet(page, 'Du må svare på om du har hatt mer enn 25 prosent endring i årsinntekten din')

    await svarRadioSporsmal(
        page,
        'Har du hatt mer enn 25 prosent endring i årsinntekten din som følge av den varige endringen?',
        'Ja',
    )
    await expect(
        page.getByText(
            'Etter du har sendt inn søknaden trenger vi dokumentasjon på inntekten din etter den varige endringen.',
        ),
    ).toBeVisible()
    await klikkGaVidere(page, true)
    await harFeilISkjemaet(page, 'Datoen følger ikke formatet dd.mm.åååå')

    await svarDato(page, 'Når skjedde den siste varige endringen?', '12.03.2020')
}

async function fullforSoknad(page: Page) {
    const oppsummeringContainer = page.locator('.navds-form-summary, form')

    await sporsmalOgSvar(oppsummeringContainer, 'Har du avviklet virksomheten din før du ble sykmeldt?', 'Nei')
    await sporsmalOgSvar(oppsummeringContainer, 'Er du ny i arbeidslivet etter 1. januar 2019?', 'Nei')
    await sporsmalOgSvar(
        oppsummeringContainer,
        'Har det skjedd en varig endring i arbeidssituasjonen eller virksomheten din i mellom 1. januar 2019 og frem til sykmeldingstidspunktet?',
        'Ja',
    )
    await sporsmalOgSvar(oppsummeringContainer, 'Hvilken endring har skjedd?', 'Endret markedssituasjon')
    await sporsmalOgSvar(
        oppsummeringContainer,
        'Har du hatt mer enn 25 prosent endring i årsinntekten din som følge av den varige endringen?',
        'Ja',
    )
    await sporsmalOgSvar(oppsummeringContainer, 'Når skjedde den siste varige endringen?', '12.03.2020')

    await page.getByRole('button', { name: 'Send' }).click()
    await page.getByText('Send søknaden').click()
}

async function verifiserKvittering(page: Page) {
    await expect(page.getByText('Søknaden er sendt til NAV')).toBeVisible()
    await expect(
        page.getByText('Du må sende inn dokumentasjon på inntekten din før vi kan behandle saken.'),
    ).toBeVisible()
}
