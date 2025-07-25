import { test, expect } from '@playwright/test'
import { klikkGaVidere, klikkTilbake } from './utilities'
import { nyttReisetilskudd } from '../src/data/mock/data/soknad/arbeidstaker-reisetilskudd'

test.describe('Teste førsteside i reisetilskuddsøknaden', () => {
    test.beforeEach(async ({ page }) => {
        await page.context().clearCookies()
        await page.goto('/syk/sykepengesoknad?testperson=reisetilskudd')
    })

    test.describe('Landingside og listevisning', () => {
        test('Laster startside', async ({ page }) => {
            await expect(page.locator('.navds-heading--large')).toBeVisible()
            await expect(page.locator('.navds-heading--large')).toHaveText('Søknader')
        })

        test('Søknad har forventa tekst', async ({ page }) => {
            await expect(page.locator(`a[href*=${nyttReisetilskudd.id}]`)).toContainText('Søknad om reisetilskudd')
        })

        test('Ved klikk så åpnes søknaden om reisetilskudd', async ({ page }) => {
            await page.locator(`a[href*=${nyttReisetilskudd.id}]`).click()
            await expect(page).toHaveURL(new RegExp(`/syk/sykepengesoknad/soknader/${nyttReisetilskudd.id}/1`))
        })
    })

    test.describe('Ansvarserklæring - Reisetilskudd', () => {
        test.beforeEach(async ({ page }) => {
            // Navigate to the application page since tests are isolated
            await page.locator(`a[href*=${nyttReisetilskudd.id}]`).click()
        })

        test('URL er riktig', async ({ page }) => {
            await expect(page).toHaveURL(new RegExp(`/syk/sykepengesoknad/soknader/${nyttReisetilskudd.id}/1`))
        })

        test('Laster inn hvem kan få reisetilskudd', async ({ page }) => {
            await expect(page.locator('[data-cy="om-reisetilskudd"]')).toBeVisible()
            await page.locator('[data-cy="om-reisetilskudd"]').click()

            await expect(page.locator('.navds-label').getByText('Hva dekker reisetilskuddet')).toBeVisible()
            await expect(page.locator('.navds-body-long').getByText(
                'Reisetilskuddet dekker nødvendige ekstra reiseutgifter til og fra jobben mens du er syk, altså reiseutgifter utover det du har til vanlig.'
            )).toBeVisible()

            await expect(page.locator('.navds-label').getByText('De første 16 dagene')).toBeVisible()
            await expect(page.locator('.navds-label').getByText('Legg ved kvitteringer')).toBeVisible()
            await expect(page.locator('.navds-body-long').getByText(
                'Du må legge ved bilde av kvitteringene dine når du søker NAV om å dekke utgiftene. Fyller du ut fra telefonen, kan du ta bilde av kvitteringene og bruke dem direkte i søknaden.'
            )).toBeVisible()
        })

        test('Bekrefter ansvarserklæring', async ({ page }) => {
            await page.locator('.navds-checkbox__label').click()
            await page.getByText('Start søknad').click()
        })
    })

    test.describe('Før du fikk sykmelding - Reisetilskudd', () => {
        test.beforeEach(async ({ page }) => {
            // Navigate through previous steps
            await page.locator(`a[href*=${nyttReisetilskudd.id}]`).click()
            await page.locator('.navds-checkbox__label').click()
            await page.getByText('Start søknad').click()
        })

        test('URL er riktig', async ({ page }) => {
            await expect(page).toHaveURL(new RegExp(`/syk/sykepengesoknad/soknader/${nyttReisetilskudd.id}/2`))
            await expect(page.locator('[data-cy="sporsmal-tittel"]')).toHaveText('Før du fikk sykmelding')
        })

        test('Tester beløp valget', async ({ page }) => {
            await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
            await page.locator('input[type=checkbox]#1566426').click()
            await page.locator('#1566427').type('1000', { delay: 100 })
            await expect(page.locator('#1566427')).toHaveValue('1000')
            await klikkGaVidere(page)
        })

        test('Beløpet er riktig når vi går frem og tilbake', async ({ page }) => {
            await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
            await page.locator('input[type=checkbox]#1566426').click()
            await page.locator('#1566427').type('1000', { delay: 100 })
            await klikkGaVidere(page)

            await klikkTilbake(page)
            await expect(page.locator('#1566427')).toHaveValue('1000')

            await klikkGaVidere(page)
        })
    })

    test.describe('Reise med bil - Reisetilskudd', () => {
        test.beforeEach(async ({ page }) => {
            // Navigate through previous steps
            await page.locator(`a[href*=${nyttReisetilskudd.id}]`).click()
            await page.locator('.navds-checkbox__label').click()
            await page.getByText('Start søknad').click()
            await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
            await page.locator('input[type=checkbox]#1566426').click()
            await page.locator('#1566427').type('1000', { delay: 100 })
            await klikkGaVidere(page)
        })

        test('URL er riktig', async ({ page }) => {
            await expect(page).toHaveURL(new RegExp(`/syk/sykepengesoknad/soknader/${nyttReisetilskudd.id}/3`))
            await expect(page.locator('[data-cy="sporsmal-tittel"]')).toHaveText('Reise med bil')
        })

        test('Svar ja på hovedspørsmålet', async ({ page }) => {
            await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
            await expect(page.locator('.undersporsmal > :nth-child(1) > :nth-child(1)')).toHaveText(
                'Hvilke dager reiste du med bil i perioden 23. desember 2020 - 7. januar 2021?'
            )
        })

        test('Minst en dag må velges', async ({ page }) => {
            await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
            await klikkGaVidere(page, true)
            await expect(page.locator('[data-cy="feil-lokal"]')).toContainText('Du må oppgi minst en dag')
        })

        test('Fyller ut', async ({ page }) => {
            await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
            await page.locator('[aria-label="mandag 4"]').click()
            await page.locator('[aria-label="tirsdag 5"]').click()
            await page.locator('[aria-label="onsdag 6"]').click()

            await page.locator('input[type=radio]#1566446_0').click()
            await page.locator('#1566447').type('1000')
            await page.locator('#1566448').type('42')

            await klikkGaVidere(page)
        })

        test('Beløpet er riktig når vi går frem og tilbake', async ({ page }) => {
            await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
            await page.locator('[aria-label="mandag 4"]').click()
            await page.locator('[aria-label="tirsdag 5"]').click()
            await page.locator('[aria-label="onsdag 6"]').click()
            await page.locator('input[type=radio]#1566446_0').click()
            await page.locator('#1566447').type('1000')
            await page.locator('#1566448').type('42')
            await klikkGaVidere(page)

            await klikkTilbake(page)

            await expect(page.locator('[aria-label="mandag 4"]')).toHaveClass(/rdp-day_selected/)
            await expect(page.locator('[aria-label="tirsdag 5"]')).toHaveClass(/rdp-day_selected/)
            await expect(page.locator('[aria-label="onsdag 6"]')).toHaveClass(/rdp-day_selected/)
            await expect(page.locator('[aria-label="torsdag 7"]')).not.toHaveClass(/rdp-day_selected/)

            await expect(page.locator('#1566447')).toHaveValue('1000')

            await klikkGaVidere(page)
        })
    })

    test.describe('Opplasting - Reisetilskudd', () => {
        test.beforeEach(async ({ page }) => {
            // Navigate through previous steps
            await page.locator(`a[href*=${nyttReisetilskudd.id}]`).click()
            await page.locator('.navds-checkbox__label').click()
            await page.getByText('Start søknad').click()
            await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
            await page.locator('input[type=checkbox]#1566426').click()
            await page.locator('#1566427').type('1000', { delay: 100 })
            await klikkGaVidere(page)
            await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
            await page.locator('[aria-label="mandag 4"]').click()
            await page.locator('[aria-label="tirsdag 5"]').click()
            await page.locator('[aria-label="onsdag 6"]').click()
            await page.locator('input[type=radio]#1566446_0').click()
            await page.locator('#1566447').type('1000')
            await page.locator('#1566448').type('42')
            await klikkGaVidere(page)
        })

        test('URL er riktig', async ({ page }) => {
            await expect(page).toHaveURL(new RegExp(`/syk/sykepengesoknad/soknader/${nyttReisetilskudd.id}/4`))
        })

        test('Laster bjørn med info', async ({ page }) => {
            await expect(page.getByText('Du må laste opp kvittering')).toBeVisible()
        })

        test('Legger inn taxi kvittering', async ({ page }) => {
            await page.getByRole('button', { name: 'Legg til reiseutgift' }).click()
            await page.locator('select[name=transportmiddel]').selectOption('TAXI')
            await expect(page.locator('#transportmiddel')).toContainText('Taxi')

            await page.locator('input[name=belop_input]').type('1234')
            await page.locator('[data-cy="filopplasteren"] input[type=file]').setInputFiles('playwright/fixtures/kvittering.jpg')
            await page.getByRole('button', { name: 'Bekreft' }).click()
        })

        test('Fil list oppdateres med kvittering', async ({ page }) => {
            await page.getByRole('button', { name: 'Legg til reiseutgift' }).click()
            await page.locator('select[name=transportmiddel]').selectOption('TAXI')
            await page.locator('input[name=belop_input]').type('1234')
            await page.locator('[data-cy="filopplasteren"] input[type=file]').setInputFiles('playwright/fixtures/kvittering.jpg')
            await page.getByRole('button', { name: 'Bekreft' }).click()

            const table = page.locator('.navds-table')
            await expect(table.getByText('Taxi')).toBeVisible()
            await expect(table.getByText('1 234 kr')).toBeVisible()
            await expect(table.getByText('1 utgift på til sammen')).toBeVisible()
            await expect(table.getByText('1 234 kr')).toBeVisible()
        })

        test('Endring av kvittering', async ({ page }) => {
            await page.getByRole('button', { name: 'Legg til reiseutgift' }).click()
            await page.locator('select[name=transportmiddel]').selectOption('TAXI')
            await page.locator('input[name=belop_input]').type('1234')
            await page.locator('[data-cy="filopplasteren"] input[type=file]').setInputFiles('playwright/fixtures/kvittering.jpg')
            await page.getByRole('button', { name: 'Bekreft' }).click()

            const table = page.locator('.navds-table')
            await expect(table.getByText('Taxi')).toBeVisible()
            await table.locator('.navds-table__toggle-expand-button').click()
            await expect(page.locator('.navds-table__expanded-row-content').locator('img[alt="kvittering for taxi"]')).toBeVisible()
        })

        test('Sletting av kvittering i liste', async ({ page }) => {
            await page.getByRole('button', { name: 'Legg til reiseutgift' }).click()
            await page.locator('select[name=transportmiddel]').selectOption('TAXI')
            await page.locator('input[name=belop_input]').type('1234')
            await page.locator('[data-cy="filopplasteren"] input[type=file]').setInputFiles('playwright/fixtures/kvittering.jpg')
            await page.getByRole('button', { name: 'Bekreft' }).click()

            await expect(page.locator('.navds-table').getByText('Taxi')).toBeVisible()
            await page.getByRole('button', { name: 'Slett' }).click()
            const dialog = page.getByRole('dialog')
            await expect(dialog.getByText('Vil du slette kvitteringen?')).toBeVisible()
            await dialog.getByRole('button', { name: 'Ja, jeg er sikker' }).click()
            await expect(page.getByText('Vil du slette kvitteringen?')).not.toBeVisible()
            await expect(page.locator('.sumlinje')).not.toBeVisible()
        })

        test('Legger inn gyldig kvittering', async ({ page }) => {
            await page.getByRole('button', { name: 'Legg til reiseutgift' }).click()
            await expect(page.getByRole('dialog', { name: 'Legg til reiseutgift' })).toHaveAttribute('open', '')

            await page.locator('[data-cy="filopplasteren"] input[type=file]').setInputFiles('playwright/fixtures/kvittering.jpg')
            await page.locator('input[name=belop_input]').type('99')
            await page.locator('select[name=transportmiddel]').selectOption('PARKERING')

            await page.getByRole('button', { name: 'Bekreft' }).click()

            const table = page.locator('.navds-table')
            await expect(table.getByText('Parkering')).toBeVisible()
            await expect(table.getByText('99 kr')).toBeVisible()
            await expect(table.getByText('1 utgift på til sammen')).toBeVisible()
        })

        test('Beholder verdier når vi går frem og tilbake', async ({ page }) => {
            await page.getByRole('button', { name: 'Legg til reiseutgift' }).click()
            await page.locator('[data-cy="filopplasteren"] input[type=file]').setInputFiles('playwright/fixtures/kvittering.jpg')
            await page.locator('input[name=belop_input]').type('99')
            await page.locator('select[name=transportmiddel]').selectOption('PARKERING')
            await page.getByRole('button', { name: 'Bekreft' }).click()

            await klikkGaVidere(page)
            await klikkTilbake(page)

            const table = page.locator('.navds-table')
            await expect(table.getByText('Parkering')).toBeVisible()
            await expect(table.getByText('99 kr')).toBeVisible()
            await expect(table.getByText('1 utgift på til sammen')).toBeVisible()

            await klikkGaVidere(page)
        })
    })

    test.describe('Utbetaling - Reisetilskudd', () => {
        test.beforeEach(async ({ page }) => {
            // Navigate through all previous steps
            await page.locator(`a[href*=${nyttReisetilskudd.id}]`).click()
            await page.locator('.navds-checkbox__label').click()
            await page.getByText('Start søknad').click()
            await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
            await page.locator('input[type=checkbox]#1566426').click()
            await page.locator('#1566427').type('1000', { delay: 100 })
            await klikkGaVidere(page)
            await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
            await page.locator('[aria-label="mandag 4"]').click()
            await page.locator('[aria-label="tirsdag 5"]').click()
            await page.locator('[aria-label="onsdag 6"]').click()
            await page.locator('input[type=radio]#1566446_0').click()
            await page.locator('#1566447').type('1000')
            await page.locator('#1566448').type('42')
            await klikkGaVidere(page)
            await page.getByRole('button', { name: 'Legg til reiseutgift' }).click()
            await page.locator('[data-cy="filopplasteren"] input[type=file]').setInputFiles('playwright/fixtures/kvittering.jpg')
            await page.locator('input[name=belop_input]').type('99')
            await page.locator('select[name=transportmiddel]').selectOption('PARKERING')
            await page.getByRole('button', { name: 'Bekreft' }).click()
            await klikkGaVidere(page)
        })

        test('URL er riktig', async ({ page }) => {
            await expect(page).toHaveURL(new RegExp(`/soknader/${nyttReisetilskudd.id}/5`))
            await expect(page.locator('[data-cy="sporsmal-tittel"]')).toHaveText('Utbetaling')
        })

        test('Arbeidsgiveren legger ut for reisene', async ({ page }) => {
            await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
            await klikkGaVidere(page)
        })
    })

    test.describe('Oppsummering - Reisetilskudd', () => {
        test.beforeEach(async ({ page }) => {
            // Navigate through all previous steps
            await page.locator(`a[href*=${nyttReisetilskudd.id}]`).click()
            await page.locator('.navds-checkbox__label').click()
            await page.getByText('Start søknad').click()
            await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
            await page.locator('input[type=checkbox]#1566426').click()
            await page.locator('#1566427').type('1000', { delay: 100 })
            await klikkGaVidere(page)
            await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
            await page.locator('[aria-label="mandag 4"]').click()
            await page.locator('[aria-label="tirsdag 5"]').click()
            await page.locator('[aria-label="onsdag 6"]').click()
            await page.locator('input[type=radio]#1566446_0').click()
            await page.locator('#1566447').type('1000')
            await page.locator('#1566448').type('42')
            await klikkGaVidere(page)
            await page.getByRole('button', { name: 'Legg til reiseutgift' }).click()
            await page.locator('[data-cy="filopplasteren"] input[type=file]').setInputFiles('playwright/fixtures/kvittering.jpg')
            await page.locator('input[name=belop_input]').type('99')
            await page.locator('select[name=transportmiddel]').selectOption('PARKERING')
            await page.getByRole('button', { name: 'Bekreft' }).click()
            await klikkGaVidere(page)
            await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
            await klikkGaVidere(page)
        })

        test('URL er riktig', async ({ page }) => {
            await expect(page).toHaveURL(new RegExp(`/soknader/${nyttReisetilskudd.id}/6`))
            await expect(page.locator('.navds-guide-panel__content')).toContainText(
                'Nå kan du se over at alt er riktig før du sender inn søknaden. Ved behov kan du endre opplysningene inntil 12 måneder etter innsending.'
            )
        })

        test('Oppsummering inneholder riktig informasjon', async ({ page }) => {
            const oppsummering = page.locator('[data-cy="oppsummering-fra-søknaden"]')
            
            // Check main questions and answers
            await expect(oppsummering.getByText('Brukte du bil eller offentlig transport til og fra jobben før du ble sykmeldt?')).toBeVisible()
            await expect(oppsummering.getByText('Ja')).toBeVisible()
            
            await expect(oppsummering.getByText('Hva slags type transport brukte du?')).toBeVisible()
            await expect(oppsummering.getByText('Offentlig transport')).toBeVisible()
            
            await expect(oppsummering.getByText('Hvor mye betaler du vanligvis i måneden for offentlig transport?')).toBeVisible()
            await expect(oppsummering.getByText('1000 kroner')).toBeVisible()
            
            await expect(oppsummering.getByText('Reiste du med egen bil, leiebil eller kollega til jobben mellom 23. desember 2020 - 7. januar 2021?')).toBeVisible()
            await expect(oppsummering.getByText('Ja')).toBeVisible()
            
            // Check dates
            await expect(oppsummering.getByText('04.01.2021')).toBeVisible()
            await expect(oppsummering.getByText('05.01.2021')).toBeVisible()
            await expect(oppsummering.getByText('06.01.2021')).toBeVisible()
            
            await expect(oppsummering.getByText('Hadde du utgifter til bompenger?')).toBeVisible()
            await expect(oppsummering.getByText('Hvor mye betalte du i bompenger mellom hjemmet ditt og jobben?')).toBeVisible()
            await expect(oppsummering.getByText('1000 kroner')).toBeVisible()
            
            await expect(oppsummering.getByText('Hvor mange kilometer er kjøreturen mellom hjemmet ditt og jobben én vei?')).toBeVisible()
            await expect(oppsummering.getByText('42 kilometer')).toBeVisible()
            
            await expect(oppsummering.getByText('Last opp kvitteringer for reiser til og fra jobben mellom 1. - 24. april 2020.')).toBeVisible()
            await expect(oppsummering.getByText('Du lastet opp 1 kvittering på 99 kr')).toBeVisible()
            
            await expect(oppsummering.getByText('Legger arbeidsgiveren din ut for reisene?')).toBeVisible()

            await page.getByRole('button', { name: 'Send søknaden' }).click()
        })
    })

    test.describe('Kvittering - Reisetilskudd', () => {
        test.beforeEach(async ({ page }) => {
            // Navigate through all previous steps and submit
            await page.locator(`a[href*=${nyttReisetilskudd.id}]`).click()
            await page.locator('.navds-checkbox__label').click()
            await page.getByText('Start søknad').click()
            await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
            await page.locator('input[type=checkbox]#1566426').click()
            await page.locator('#1566427').type('1000', { delay: 100 })
            await klikkGaVidere(page)
            await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
            await page.locator('[aria-label="mandag 4"]').click()
            await page.locator('[aria-label="tirsdag 5"]').click()
            await page.locator('[aria-label="onsdag 6"]').click()
            await page.locator('input[type=radio]#1566446_0').click()
            await page.locator('#1566447').type('1000')
            await page.locator('#1566448').type('42')
            await klikkGaVidere(page)
            await page.getByRole('button', { name: 'Legg til reiseutgift' }).click()
            await page.locator('[data-cy="filopplasteren"] input[type=file]').setInputFiles('playwright/fixtures/kvittering.jpg')
            await page.locator('input[name=belop_input]').type('99')
            await page.locator('select[name=transportmiddel]').selectOption('PARKERING')
            await page.getByRole('button', { name: 'Bekreft' }).click()
            await klikkGaVidere(page)
            await page.locator('[data-cy="ja-nei-stor"] input[value=JA]').click()
            await klikkGaVidere(page)
            await page.getByRole('button', { name: 'Send søknaden' }).click()
        })

        test('URL er riktig', async ({ page }) => {
            await expect(page).toHaveURL(new RegExp(`/kvittering/${nyttReisetilskudd.id}`))
        })

        test('Hva skjer videre', async ({ page }) => {
            const kvitteringPanel = page.locator('[data-cy="kvittering-panel"]')
            await expect(kvitteringPanel).toContainText('Hva skjer videre?')
            await expect(kvitteringPanel).toContainText('NAV behandler søknaden din')
            await expect(kvitteringPanel).toContainText('Saksbehandlingstiden regnes fra Nav har mottatt all nødvendig dokumentasjon.')
        })
    })
})
