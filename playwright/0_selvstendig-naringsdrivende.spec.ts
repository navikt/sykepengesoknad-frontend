import { expect, Page, test } from '@playwright/test'

import {
    svarRadioGruppe,
    klikkGaVidere,
    svarDato,
    sporsmalOgSvar,
    svarNeiHovedsporsmal,
    sjekkMainContentFokus,
    modalIkkeAktiv,
    modalAktiv,
    svarFritekst,
} from './utilities'

export async function harFeilISkjemaet(page: Page, errorMessage: string) {
    const errorLocator = page.getByText(errorMessage).first()
    await expect(errorLocator).toBeVisible()
}

export async function harFlereFeilISkjemaet(page: Page, count: number, errorMessages: string[]) {
    for (const message of errorMessages) {
        await harFeilISkjemaet(page, message)
    }
    const allErrors = page.locator('.navds-error-message') // Assuming error class; adjust if needed
    await expect(allErrors).toHaveCount(count)
}

export async function svarJaHovedsporsmal(page: Page) {
    const radioButton = page.locator('form').getByRole('radio', { name: 'Ja' }).first()
    await radioButton.click()
    await expect(radioButton).toBeChecked()
}

export async function svarCheckboxSporsmal(page: Page, groupName: string, checkboxName: string) {
    const group = page.getByRole('group', { name: groupName })
    const checkbox = group.getByRole('checkbox', { name: checkboxName })
    await checkbox.check()
    await expect(checkbox).toBeChecked()
}

export async function svarRadioSporsmal(page: Page, question: string, answer: string) {
    await svarRadioGruppe(page, question, answer)
}

test.describe('Tester selvstendig naringsdrivende søknad med data fra Sigrun', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(
            '/syk/sykepengesoknad/soknader/bd6f6207-3888-4210-a4c0-cbe6806b5d00/7?testperson=selvstendig-naringsdrivende',
        )
    })

    test('Virksomheten din', async ({ page }) => {
        await fellesInnholdFørVisningAvSigrunData(page)

        await expect(
            page.getByText('Datoen er første dag i det første av tre av de ferdiglignede årene.'),
        ).toBeVisible()

        await expect(
            page.getByText(
                'Har du hatt mer enn 25 prosent endring i årsinntekten din som følge av den varige endringen?',
            ),
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

        await fellesInnholdEtterVisningAvSigrunData(page)

        await klikkGaVidere(page, false, true)

        await tilSlutt(page)

        await kvitteringen(page)
    })
})

test.describe('Tester selvstendig naringsdrivende søknad uten data fra Sigrun', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(
            '/syk/sykepengesoknad/soknader/2faff926-5261-42e5-927b-02e4aa44a7ad/7?testperson=selvstendig-naringsdrivende-uten-sigrun',
        )
    })

    test('Virksomheten din', async ({ page }) => {
        await fellesInnholdFørVisningAvSigrunData(page)

        await expect(page.getByText('Datoen er første dag i det første av tre av de ferdiglignede årene.')).toBeHidden()

        await expect(
            page.getByText(
                'Har du hatt mer enn 25 prosent endring i årsinntekten din som følge av den varige endringen?',
            ),
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

        await fellesInnholdEtterVisningAvSigrunData(page)

        await klikkGaVidere(page, true, true)

        await tilSlutt(page)

        await modalIkkeAktiv(page)
        await kvitteringen(page)
    })
})

async function fellesInnholdFørVisningAvSigrunData(page: Page) {
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

    await expect(page.getByText('Varig endring i din arbeidssituasjon eller virksomhet')).toBeVisible()
    await expect(page.getByText('Eksempler på varig endring')).toBeVisible()
    await expect(page.getByText('Avsluttet eller startet andre arbeidsforhold ved siden av virksomheten')).toBeVisible()
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

async function tilSlutt(page: Page) {
    const summaryContainer = page.locator('.navds-form-summary, form')

    await sporsmalOgSvar(summaryContainer, 'Har du avviklet virksomheten din før du ble sykmeldt?', 'Nei')
    await sporsmalOgSvar(summaryContainer, 'Er du ny i arbeidslivet etter 1. januar 2019?', 'Nei')
    await sporsmalOgSvar(
        summaryContainer,
        'Har det skjedd en varig endring i arbeidssituasjonen eller virksomheten din i mellom 1. januar 2019 og frem til sykmeldingstidspunktet?',
        'Ja',
    )
    await sporsmalOgSvar(summaryContainer, 'Hvilken endring har skjedd?', 'Endret markedssituasjon')
    await sporsmalOgSvar(
        summaryContainer,
        'Har du hatt mer enn 25 prosent endring i årsinntekten din som følge av den varige endringen?',
        'Ja',
    )
    await sporsmalOgSvar(summaryContainer, 'Når skjedde den siste varige endringen?', '12.03.2020')

    await flexjarSurvey(page)

    await page.getByText('Send søknaden').click()
}

export async function flexjarSurvey(page: Page) {
    await modalAktiv(page)
    await expect(
        page.getByText('Hvis du hadde fått dette spørsmålet, hvor enkelt eller vanskelig hadde det vært å svare på?'),
    ).toBeVisible()
    await page.getByRole('radio', { name: 'Veldig enkelt' }).click()
    await svarFritekst(page, 'Vil du forklare hvorfor? (valgfritt)', 'Fordi det er enkelt å svare på')
    await page.getByRole('button', { name: 'Send tilbakemelding' }).click()
    await expect(page.getByText('Takk for tilbakemeldingen!')).toBeVisible()
    await page.getByRole('button', { name: 'Lukk vindu' }).click()
}

async function kvitteringen(page: Page) {
    await expect(page.getByText('Søknaden er sendt til NAV')).toBeVisible()
    await expect(
        page.getByText('Du må sende inn dokumentasjon på inntekten din før vi kan behandle saken.'),
    ).toBeVisible()
    await expect(page.getByText('Skattemelding/Næringsspesifikasjon hvis den er klar')).toBeVisible()
}
