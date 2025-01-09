import { expect } from '@playwright/test'

import { oppholdUtland } from '../src/data/mock/data/soknad/opphold-utland'

import {
    avbryterSoknad,
    klikkGaVidere,
    klikkTilbake,
    setPeriodeFraTil,
    sporsmalOgSvar,
    svarCombobox,
    svarRadioGruppe,
} from './utilities'
import { test } from './fixtures'

test.describe('Tester søknad om å beholde sykepenger utenfor EØS', () => {
    const soknad = oppholdUtland // Hentar id eller liknande derifrå

    test('Går til søknad som har påfølgende søknader som må fylles ut', async ({ page }) => {
        await page.goto('/syk/sykepengesoknad?testperson=bare-utland')

        await expect(page.locator('.navds-heading--large')).toBeVisible()
        await expect(page.locator('.navds-heading--large')).toHaveText('Søknader')

        const nyeSoknaderSection = page.locator('[data-cy="Nye søknader"]')
        await expect(nyeSoknaderSection).toBeVisible()

        await nyeSoknaderSection.getByRole('link', { name: 'Søknad om å beholde sykepenger utenfor EU/EØS' }).click()

        const header = page.locator('main').locator('h1').first()
        await expect(header).toBeVisible()

        await expect(header).toContainText('Søknad om å beholde sykepenger utenfor EU/EØS')
    })

    test('Viser infoside og starter søknaden', async ({ page }) => {
        await expect(page.getByText('Du trenger ikke søke hvis du')).toBeVisible()
        await expect(page.getByText('Har du allerede vært på reise?')).toBeVisible()
        // Start søknaden
        await page.getByRole('button', { name: 'Start søknaden' }).click()
    })

    test('Velger land innenfor EU/EØS og får info om å ikke søke', async ({ page }) => {
        await expect(page).toHaveURL(new RegExp(`${soknad.id}/1`))

        // Klikk gå videre utan å fylle inn -> forventa feil
        await klikkGaVidere(page, true)
        await expect(page.getByText('Du må velge minst et alternativ fra menyen')).toBeVisible()
        await expect(page.getByText('Det er 1 feil i skjemaet')).toBeVisible()
        await expect(page.getByText('Du må oppgi hvilket land du skal reise til')).toBeVisible()

        // Velger land innanfor EØS
        await svarCombobox(page, 'Hvilke(t) land skal du reise til?', 'Hel', 'Hellas', true)
        await expect(page.locator('.navds-alert', { hasText: 'ligger innenfor EU/EØS' })).toContainText(
            'Hellas ligger innenfor EU/EØS',
        )

        await svarCombobox(page, 'Hvilke(t) land skal du reise til?', 'Svei', 'Sveits', true)
        await expect(page.locator('.navds-alert', { hasText: 'ligger innenfor EU/EØS' })).toContainText(
            'Hellas og Sveits ligger innenfor EU/EØS',
        )

        await svarCombobox(page, 'Hvilke(t) land skal du reise til?', 'Lit', 'Litauen', true)
        await expect(page.locator('.navds-alert', { hasText: 'ligger innenfor EU/EØS' })).toContainText(
            'Hellas, Sveits og Litauen ligger innenfor EU/EØS',
        )

        await klikkGaVidere(page, true)
    })

    test('Velger land utenfor EU/EØS', async ({ page }) => {
        // Sidan me framleis er på same side (spørsmål 1):
        await expect(page).toHaveURL(new RegExp(`${soknad.id}/1`))

        // Klikk gå videre for å trigge feil
        await klikkGaVidere(page, true)
        await expect(page.getByText('Du må velge minst et alternativ fra menyen')).toBeVisible()

        // Velger Afghanistan
        await svarCombobox(page, 'Hvilke(t) land skal du reise til?', 'Afg', 'Afghanistan')
        // Velger Fransk Polynesia, lukker med chip
        await svarCombobox(page, 'Hvilke(t) land skal du reise til?', 'Fransk', 'Fransk Polynesia')
        await page.locator('.navds-chips__chip-text', { hasText: 'Fransk Polynesia' }).click()

        // Velger Sør-Korea med musepeker
        await page.getByRole('combobox', { name: 'Hvilke(t) land skal du reise til?' }).type('Sør-')
        await page.getByRole('option', { name: 'Sør-Korea' }).click()

        await klikkGaVidere(page)
    })

    test('Avbryter søknaden og havner på avbrutt-siden', async ({ page }) => {
        await avbryterSoknad(page)
        await expect(page).toHaveURL(new RegExp(`avbrutt/${soknad.id}`))
        await expect(page.getByText('Fjernet søknad om å beholde sykepenger utenfor EU/EØS')).toBeVisible()
        await expect(page.getByRole('link', { name: 'nav.no/sykepenger#utland' })).toBeVisible()
        await expect(
            page.getByText(
                'I utgangspunktet bør du søke før du reiser til land utenfor EU/EØS. Du kan likevel søke ...',
            ),
        ).toBeVisible()
    })

    test('Gjenåpner søknaden', async ({ page }) => {
        await page.getByRole('button', { name: 'Gjenoppta søknad' }).click() // Tilpass til riktig data-cy/text
        await expect(page).toHaveURL(new RegExp(`${soknad.id}/2`))
        await expect(page.getByText('Gå videre')).toBeVisible()
    })

    test('Velger periode for utenlandsopphold', async ({ page }) => {
        await expect(page).toHaveURL(new RegExp(`${soknad.id}/2`))
        await setPeriodeFraTil(page, 17, 24)

        await klikkGaVidere(page)
    })

    test('Går tilbake og frem igjen', async ({ page }) => {
        await klikkTilbake(page)
        // sjekkMainContentFokus(page) – om du hadde ein eigen funksjon for å teste fokus
        await klikkGaVidere(page)
    })

    test('Oppgir arbeidsgiver', async ({ page }) => {
        await expect(page).toHaveURL(new RegExp(`${soknad.id}/3`))

        // "Har du arbeidsgiver?" -> JA
        await page.getByRole('radio', { name: 'Ja', exact: true }).check()

        // "Er du 100 % sykmeldt?" -> JA
        await page
            .locator('fieldset', { hasText: 'Er du 100 % sykmeldt?' })
            .getByRole('radio', { name: 'Ja', exact: true })
            .check()

        // "Har du avtalt feriedager?" -> NEI
        await page
            .locator('fieldset', { hasText: 'Har du avtalt med arbeidsgiveren ...' })
            .getByRole('radio', { name: 'Nei', exact: true })
            .check()

        await klikkGaVidere(page)
    })

    test('Avklaring i forbindelse med reise', async ({ page }) => {
        // Klikk "Gå videre" -> forventa feil
        await klikkGaVidere(page, true)

        // 2 feil i skjemaet:
        await expect(page.getByText('Du må svare på om utenlandsoppholdet ... sykmeldte deg')).toBeVisible()
        await expect(page.getByText('Du må svare på om utenlandsoppholdet ... arbeidsgiver eller NAV')).toBeVisible()

        // Radiogruppe: 'Har du avklart utenlandsoppholdet ... sykmeldte deg?' -> 'Nei'
        await svarRadioGruppe(page, 'Har du avklart utenlandsoppholdet med den som sykmeldte deg?', 'Nei')
        // Radiogruppe: 'Har du avklart utenlandsoppholdet ... arbeidsgiveren/NAV?' -> 'Nei'
        await svarRadioGruppe(page, 'Har du avklart utenlandsoppholdet med arbeidsgiveren/NAV?', 'Nei')
        // Info-boksar dukkar opp

        // Sett begge til 'Ja'
        await svarRadioGruppe(page, 'Har du avklart utenlandsoppholdet med den som sykmeldte deg?', 'Ja')
        await svarRadioGruppe(page, 'Har du avklart utenlandsoppholdet med arbeidsgiveren/NAV?', 'Ja')

        await klikkGaVidere(page)
    })

    test('Søknad TIL_SLUTT (oppsummering)', async ({ page }) => {
        await expect(page).toHaveURL(new RegExp(`${soknad.id}/5`))
        await expect(
            page.locator('.navds-guide-panel__content', {
                hasText: 'Nå kan du se over at alt er riktig før du sender inn søknaden.',
            }),
        ).toBeVisible()

        // Oppsummering
        const oppsummering = page.locator('[data-cy="oppsummering-fra-søknaden"]')

        await sporsmalOgSvar(oppsummering, 'Når skal du reise?', '17. – 24. desember 2020')
        await sporsmalOgSvar(oppsummering, 'Hvilke(t) land skal du reise til?', 'Afghanistan')
        await sporsmalOgSvar(oppsummering, 'Har du arbeidsgiver?', 'Ja')
        await sporsmalOgSvar(oppsummering, 'Er du 100 % sykmeldt?', 'Ja')
        await sporsmalOgSvar(
            oppsummering,
            'Har du avtalt med arbeidsgiveren din at du skal ta ut feriedager i hele perioden?',
            'Nei',
        )
    })

    test('Sender søknaden', async ({ page }) => {
        await expect(page).toHaveURL(new RegExp(`${soknad.id}/5`))
        await page.getByRole('button', { name: 'Send søknaden' }).click()
    })

    test('Viser kvittering med Ferdig-knapp', async ({ page }) => {
        await expect(page).toHaveURL(new RegExp(`kvittering/${soknad.id}`))
        const kvitteringPanel = page.locator('[data-cy="kvittering-panel"]')
        await expect(kvitteringPanel).toContainText('Hva skjer videre?')
        await expect(kvitteringPanel).toContainText('Du får svar på om du kan reise')
        await expect(kvitteringPanel).toContainText('Risiko ved å reise før du har mottatt svar')
        await expect(kvitteringPanel).toContainText('Les mer om sykepenger når du er på reise.')
        await expect(kvitteringPanel).toContainText('Du søker om sykepenger')
    })

    test('Går til listevisningen', async ({ page }) => {
        // Gjer som i Cypress, men her: naviger direkte tilbake
        await page.goto('/syk/sykepengesoknad?testperson=bare-utland')
        await expect(page.locator('h1')).toHaveText('Søknader')
    })

    test('Navigerer til den sendte søknaden igjen', async ({ page }) => {
        const tidligere = page.locator('[data-cy="Tidligere søknader"]')
        await expect(tidligere).toBeVisible()
        await tidligere
            .getByRole('link', { name: 'Søknad om å beholde sykepenger utenfor EU/EØS Sendt til NAV' })
            .click()
    })

    test('Viser sendt side', async ({ page }) => {
        await expect(page).toHaveURL(new RegExp(`sendt/${soknad.id}`))
        await expect(page.getByText('Oppsummering fra søknaden')).toBeVisible()
    })
})
