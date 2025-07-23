import { test, expect } from './fixtures'
import { avbryterSoknad } from './utilities'

test.describe('Tester opprettelse av opphold utland søknad', () => {
    test('Oppretter søknad', async ({ page }) => {
        // Gå til /syk/sykepengesoknad
        await page.goto('/syk/sykepengesoknad')
        await expect(page.getByText('Søknader').first()).toBeVisible()

        // Gå direkte til /syk/sykepengesoknad/sykepengesoknad-utland
        await page.goto('/syk/sykepengesoknad/sykepengesoknad-utland')

        // Sjekk overskrifter og tekster
        await expect(
            page.getByRole('heading', { level: 1, name: 'Søknad om å beholde sykepenger utenfor EU/EØS' }),
        ).toBeVisible()
        await expect(page.getByText('Du trenger ikke søke hvis du')).toBeVisible()
        await expect(page.getByRole('heading', { level: 2, name: 'Har du allerede vært på reise?' })).toBeVisible()
        await expect(
            page.getByRole('heading', { level: 3, name: 'Er du statsborger i et land utenfor EU/EØS?' }),
        ).toBeVisible()

        // Klikk "Start søknaden"
        await expect(page.getByRole('button', { name: 'Start søknaden' })).toBeVisible()
        await page.getByRole('button', { name: 'Start søknaden' }).click()

        // Sjekk at vi nå er på 1. steg i skjemaet
        await expect(page.getByText('Hvilke(t) land skal du reise til?')).toBeVisible()
        await expect(page.getByText('Du kan velge flere.')).toBeVisible()

        // 'Kan gå tilbake til forside, og starte søknad igjen
        // Klikk "Forrige steg"
        await page.getByText('Forrige steg').click()
        // Forventer at vi er tilbake på /syk/sykepengesoknad-utland
        await expect(page).toHaveURL(/sykepengesoknad-utland/)

        // Klikk "Start søknaden" på nytt
        await expect(page.getByRole('button', { name: 'Start søknaden' })).toBeVisible()
        await page.getByRole('button', { name: 'Start søknaden' }).click()
        // Avbryter søknaden og havner på avbrutt-siden'
        // Sjekk at "Ooops! Her har det skjedd noe rart" IKKE finnes
        await expect(page.getByText('Ooops! Her har det skjedd noe rart')).toBeHidden()

        // Avbryt
        await avbryterSoknad(page)

        // Forventer at vi nå er på /avbrutt/...
        await expect(page).toHaveURL(/avbrutt\//)
        await expect(page.getByText('Søknaden ble avbrutt og fjernet av deg')).toBeVisible()
        await expect(page.getByText('Fjernet søknad om å beholde sykepenger utenfor EU/EØS')).toBeVisible()

        // Sjekk lenke og tekst
        await expect(page.getByRole('link', { name: 'nav.no/sykepenger#utland' })).toBeVisible()
        await expect(
            page.getByText(
                'I utgangspunktet bør du søke før du reiser til land utenfor EU/EØS. Du kan likevel søke om å få beholde sykepengene',
            ),
        ).toBeVisible()
    })

    test('Avbryter en ikke-opprettet opphold utland søknad', async ({ page }) => {
        await page.goto('/syk/sykepengesoknad/sykepengesoknad-utland')

        // Intercept (tilsvarer cy.intercept)
        // Her bruker vi page.route til å mocke respons fra en gitt URL
        await page.route('https://demo.ekstern.dev.nav.no/syk/sykefravaer', async (route) => {
            // Returner en "mocked response"
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ message: 'Mocked response' }),
            })
        })

        // Besøk igjen (eller reload) for å trigge request
        await page.goto('/syk/sykepengesoknad/sykepengesoknad-utland')

        // Avbryt søknad og vent på at requesten går
        // I Cypress: cy.wait('@demoRequest')
        // I Playwright: vent på request
        const [request] = await Promise.all([
            page.waitForRequest('**/sykefravaer'), // wildcard matcher alt på /sykefravaer
            avbryterSoknad(page),
        ])

        // Sjekk at request.url() inneholder den eksterne domenen
        expect(request.url()).toContain('demo.ekstern.dev.nav.no/syk/sykefravaer')
    })
})
