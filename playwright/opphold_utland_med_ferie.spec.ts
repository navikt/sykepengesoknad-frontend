import { oppholdUtland } from '../src/data/mock/data/soknad/opphold-utland'

import {
    klikkGaVidere,
    setPeriodeFraTil,
    svarCombobox,
    harSynligTekst,
    harSoknaderlisteHeading,
    svarRadioGruppe,
    svarNeiHovedsporsmal,
    harSynligTittel,
    svarJaHovedsporsmal,
    avbryterSoknad,
} from './utils/utilities'
import { test, expect } from './utils/fixtures'

test.describe('Søknad om å beholde sykepenger utenfor EØS med ferie', () => {
    const soknad = oppholdUtland

    test.beforeEach(async ({ page }) => {
        await page.context().clearCookies()
        await page.goto('/syk/sykepengesoknad?testperson=bare-utland')
    })

    test('Full integrasjonstest for opphold utland med ferie', async ({ page }) => {
        await test.step('Laster startside', async () => {
            await harSoknaderlisteHeading(page)
            await page.getByRole('link', { name: 'Søknad om å beholde sykepenger utenfor EU/EØS' }).click()
        })

        await test.step('Viser infoside og starter søknaden', async () => {
            await harSynligTekst(page, 'Du trenger ikke søke hvis')
            await harSynligTekst(page, 'Søk før du reiser')
            await page.getByRole('button', { name: 'Start søknaden' }).click()
        })

        await test.step('LAND - steg 1', async () => {
            await harSynligTekst(page, 'Hvor skal du reise?')
            await harSynligTekst(page, 'Du kan velge flere land.')
            await svarCombobox(page, 'Hvor skal du reise?', 'Søre', 'Søre franske territorier', true)
            await klikkGaVidere(page)
        })

        await test.step('PERIODEUTLAND - steg 2', async () => {
            await expect(page.getByText('Opplysninger fra sykmeldingen')).toBeHidden()
            await harSynligTekst(page, 'Når skal du reise?')
            await setPeriodeFraTil(page, 17, 24)
            await klikkGaVidere(page)
        })

        await test.step('Vi svarer Ja på arbeidsgiverspørsmålet', async () => {
            await harSynligTittel(page, 'Din jobbsituasjon', 2)
            await svarJaHovedsporsmal(page)
        })

        await test.step('Gå videre forsvinner og bjørn vises når man har avtalt ferie', async () => {
            await harSynligTekst(
                page,
                'Har du avtalt med arbeidsgiveren din at du skal ta ut feriedager i hele perioden?',
            )
            await svarRadioGruppe(page, 'Har du avtalt med arbeidsgiveren din', 'Nei')
            await harSynligTekst(page, 'Gå videre')
            await svarRadioGruppe(page, 'Har du avtalt med arbeidsgiveren din', 'Ja')
            await harSynligTekst(
                page,
                'Du får ikke sykepenger mens du har ferie. Det betyr at du ikke trenger å sende denne søknaden. God tur!',
            )
            await expect(page.getByRole('button', { name: 'Gå videre' })).toBeHidden()
            await expect(page.getByText('Har du avtalt med arbeidsgiveren din')).toBeVisible()
        })

        await test.step('Sykmeldt sporsmalet forsvinner når vi klikker nei', async () => {
            await svarNeiHovedsporsmal(page)
            await expect(page.getByText('Har du avtalt med arbeidsgiveren din')).toBeHidden()
        })

        await test.step('Avbryter søknaden og havner på avbrutt-siden', async () => {
            await avbryterSoknad(page)
            await expect(page).toHaveURL(new RegExp(`avbrutt/${soknad.id}`))
            await harSynligTittel(page, 'Fjernet søknad om å beholde sykepenger utenfor EU/EØS', 1)
            await expect(page.getByRole('link', { name: 'nav.no/sykepenger#utland' })).toBeVisible()
            await harSynligTekst(page, /I utgangspunktet bør du søke før du reiser til land utenfor EU\/EØS/)
        })
    })
})
