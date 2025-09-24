import { test, expect } from '@playwright/test'

import { behandlingsdager } from '../src/data/mock/data/soknad/behandlingsdager'
import { validerAxeUtilityWrapper } from './uuvalidering'

async function checkViStolerPaDeg(page, gaVidere = true) {
    await page
        .getByRole('checkbox', {
            name: /Jeg bekrefter at jeg vil svare så riktig som jeg kan./i,
        })
        .check()
    if (gaVidere) {
        await page.getByText('Start søknad').click()
    }
}

async function klikkGaVidere(page, forventFeil = false, skipFocusCheck = false) {
    const currentUrl = page.url()
    const currentPathParam = parseInt(currentUrl.split('/').pop()!, 10)

    await page.getByRole('button', { name: 'Gå videre' }).click()
    if (forventFeil) return

    await expect(page).not.toHaveURL(currentUrl)

    const newUrl = page.url()
    const newPathParam = parseInt(newUrl.split('/').pop()!, 10)
    expect(newPathParam).toEqual(currentPathParam + 1)

    if (!skipFocusCheck) {
        await expect(page.locator('#maincontent')).toBeFocused()
    }
}

async function klikkTilbake(page) {
    const currentUrl = page.url()
    const currentPathParam = parseInt(currentUrl.split('/').pop()!, 10)

    await page.getByRole('button', { name: 'Tilbake' }).click()

    await expect(page).not.toHaveURL(currentUrl)

    const newUrl = page.url()
    const newPathParam = parseInt(newUrl.split('/').pop()!, 10)
    expect(newPathParam).toEqual(currentPathParam - 1)

    await expect(page.locator('#maincontent')).toBeFocused()
}

async function sjekkIntroside(page) {
    await expect(
        page.getByText(
            'Her kan du søke om sykepenger mens du er sykmeldt. ' +
                'Sykepenger skal erstatte inntekten din når du ikke kan jobbe som ' +
                'normalt, på grunn av din egen sykdom eller skade.',
        ),
    ).toBeVisible()
    const sykepengerLink = page.getByRole('link', { name: 'nav.no/sykepenger' })
    await expect(sykepengerLink).toHaveAttribute('href', 'https://www.nav.no/sykepenger')
    await expect(page.getByText('Før du søker')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Meld fra til NAV her' })).toHaveAttribute(
        'href',
        'https://innboks.nav.no/s/beskjed-til-oss?category=Beskjed-sykepenger',
    )
    await expect(page.getByRole('link', { name: 'Sjekk de oppdaterte saksbehandlingstidene' })).toHaveAttribute(
        'href',
        'https://www.nav.no/saksbehandlingstider#sykepenger',
    )
    await page.getByText('Hvordan behandler vi personopplysninger').click()
    await expect(
        page.getByRole('link', { name: 'Les mer om hvordan NAV behandler personopplysningene dine' }),
    ).toHaveAttribute('href', 'https://www.nav.no/sykepenger-og-personopplysninger')
    await page.getByText('Vi lagrer svarene underveis').click()
    await expect(
        page.getByText(
            'Vi lagrer svarene dine mens du fyller ut, så du kan ta pauser ' +
                'underveis. Søknader som ikke blir sendt inn lagrer vi i 4 måneder før de ' +
                'slettes automatisk.',
        ),
    ).toBeVisible()
    await expect(
        page.getByText('Det er viktig at du gir oss riktige opplysninger slik at vi kan behandle saken din.'),
    ).toBeVisible()
    await expect(
        page.getByRole('link', { name: 'Les mer om viktigheten av å gi riktige opplysninger' }),
    ).toHaveAttribute('href', 'https://www.nav.no/endringer')
}

async function svarNeiHovedsporsmal(page) {
    await page.getByRole('radio', { name: 'Nei' }).first().check()
    await expect(page.getByRole('radio', { name: 'Nei' }).first()).toBeChecked()
}

async function sporsmalOgSvar(page, sporsmal: string, svar: string) {
    const question = page.getByText(sporsmal)
    await expect(question).toBeVisible()
    const answer = question.locator('xpath=following-sibling::*').first()
    await expect(answer).toHaveText(new RegExp(svar))
}

test.describe('Tester behandlingsdagersøknad', () => {
    const soknad = behandlingsdager

    test('Full behandlingsdager flow', async ({ page }) => {
        await test.step('Initial navigation', async () => {
            await page.goto('/syk/sykepengesoknad?testperson=behandlingsdager')
        })

        await test.step('Laster startside', async () => {
            await expect(page.getByRole('heading', { level: 1 })).toHaveText('Søknader')
            await page.locator(`a[href*=${soknad.id}]`).click()
        })

        await test.step('Søknad ANSVARSERKLARING - steg 1', async () => {
            await expect(page).toHaveURL(new RegExp(`${soknad.id}/1`))

            await sjekkIntroside(page)
            await checkViStolerPaDeg(page)
            await validerAxeUtilityWrapper(page, test.info())
        })

        await test.step('Søknad ENKELTSTAENDE_BEHANDLINGSDAGER - steg 2', async () => {
            await expect(page).toHaveURL(new RegExp(`${soknad.id}/2`))

            await expect(
                page.getByText(
                    'Du kan bare få én behandlingsdag i løpet av en uke. Trenger du flere ' +
                        'slike dager, ber du legen om en gradert sykmelding i stedet.',
                ),
            ).toBeVisible()
            await expect(
                page.getByText(
                    'Hvilke dager måtte du være helt borte fra jobben på grunn av behandling ' +
                        'mellom 1. - 24. april 2020?',
                ),
            ).toBeVisible()
            await page.getByRole('button', { name: 'onsdag 1' }).nth(0).click()
            await page.getByRole('button', { name: 'fredag 10' }).nth(0).click()
            await page.getByRole('button', { name: 'torsdag 16' }).nth(0).click()
            await page.getByRole('button', { name: 'onsdag 15' }).nth(0).click()
            await page.getByRole('button', { name: 'onsdag 1' }).nth(0).click()

            await validerAxeUtilityWrapper(page, test.info())

            await klikkGaVidere(page)
        })

        await test.step('Søknad FERIE - steg 3', async () => {
            await expect(page).toHaveURL(new RegExp(`${soknad.id}/3`))

            await expect(page.getByRole('heading', { name: 'Ferie' })).toBeVisible()
            await svarNeiHovedsporsmal(page)

            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('Søknad ANDRE_INNTEKTSKILDER - steg 4', async () => {
            await expect(page).toHaveURL(new RegExp(`${soknad.id}/4`))

            await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').check()

            await expect(page.getByText('Hvilke andre inntektskilder har du?')).toBeVisible()
            await expect(page.locator('.undersporsmal .navds-checkbox label[for="687382"]')).toHaveText(
                /andre arbeidsforhold/,
            )
            await page.locator('input[type=checkbox]#\\36 87382').check()

            await page.locator('input[type=radio]#\\36 87383_0 ').check()
            await expect(
                page.getByText(
                    'Du må sende egen sykepengesøknad for dette. ' +
                        'Det betyr også at legen må skrive en sykmelding for hvert arbeidsforhold du er sykmeldt fra.',
                ),
            ).toBeVisible()

            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('Tilbake og videre', async () => {
            await expect(page.getByRole('heading', { name: 'Oppsummering', exact: true })).toBeVisible()

            await validerAxeUtilityWrapper(page, test.info())
            await klikkTilbake(page)

            await expect(page.getByRole('heading', { name: 'Andre inntektskilder', exact: true })).toBeVisible()

            await validerAxeUtilityWrapper(page, test.info())
            await klikkGaVidere(page)
        })

        await test.step('Søknad TIL_SLUTT - steg 4', async () => {
            await expect(page).toHaveURL(new RegExp(`${soknad.id}/5`))
            await expect(page.getByRole('heading', { name: 'Oppsummering fra søknaden', exact: true })).toBeVisible()
            await expect(page.locator('.navds-guide-panel__content')).toHaveText(
                /Nå kan du se over at alt er riktig før du sender inn søknaden. Ved behov kan du endre opplysningene inntil 12 måneder etter innsending./,
            )

            await expect(page.getByRole('heading', { name: 'Oppsummering fra søknaden', exact: true })).toBeVisible()
            await sporsmalOgSvar(page, 'Søknaden sendes til', 'NAV')
            await sporsmalOgSvar(page, '1. – 3. april', 'Ikke til behandling')
            await sporsmalOgSvar(page, '6. – 10. april', '10. april')
            await sporsmalOgSvar(page, '13. – 17. april', '15. april')
            await sporsmalOgSvar(page, '20. – 24. april', 'Ikke til behandling')

            await validerAxeUtilityWrapper(page, test.info())
            await page.getByText('Send søknaden').click()
        })

        await test.step('Søknad kvittering', async () => {
            await expect(page).toHaveURL(new RegExp('/kvittering/'))
            const kvittering = page.locator('[data-cy="kvittering"]')
            await expect(kvittering).toContainText('Hva skjer videre?')
            await expect(kvittering).toContainText('Før NAV kan behandle søknaden')
            await expect(kvittering).toContainText('NAV behandler søknaden')
            await expect(kvittering).toContainText('Når blir pengene utbetalt')
            await validerAxeUtilityWrapper(page, test.info())
        })
    })
})
