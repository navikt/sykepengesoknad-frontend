import { arbeidstaker } from '../src/data/mock/data/soknad/arbeidstaker'
import { sendtArbeidsledig } from '../src/data/mock/data/soknad/arbeidsledig-sendt'
import { foranArbeidstakerMedOppholdKvittering } from '../src/data/mock/data/soknad/soknader-integration'

import { test, expect } from './utils/fixtures'
import { harSynligTittel } from './utils/utilities'

test.describe('Tester å åpne søknaden direkte fra sykefravaer', () => {
    const soknad = arbeidstaker

    test('Vi kan gå direkte til søknaden fra sykefravaer', async ({ page }) => {
        await test.step('Navigerer til søknaden', async () => {
            await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}`)
            await expect(page).toHaveURL(new RegExp(`/syk/sykepengesoknad/soknader/${soknad.id}/1`))
        })
    })

    test('Åpner en sendt søknad på en annen siden og sendes til sendt-side', async ({ page }) => {
        await test.step('Navigerer til sendt søknad', async () => {
            await page.goto(`/syk/sykepengesoknad/soknader/${sendtArbeidsledig.id}?testperson=integrasjon-soknader`)
            await expect(page).toHaveURL(
                new RegExp(`/syk/sykepengesoknad/kvittering/${sendtArbeidsledig.id}\\?testperson=integrasjon-soknader`),
            )
            await harSynligTittel(page, 'Søknad om sykepenger', 1)
            await expect(page.getByText('NAV behandler søknaden din')).toBeVisible()
        })

        await test.step('Forsøker å åpne en spesifikk side i sendt søknad', async () => {
            await page.goto(`/syk/sykepengesoknad/soknader/${sendtArbeidsledig.id}/3?testperson=integrasjon-soknader`)
            await expect(page).toHaveURL(
                new RegExp(`/syk/sykepengesoknad/kvittering/${sendtArbeidsledig.id}\\?testperson=integrasjon-soknader`),
            )
            await harSynligTittel(page, 'Søknad om sykepenger', 1)
            await expect(page.getByText('NAV behandler søknaden din')).toBeVisible()
        })
    })

    test('Går direkte til en sendt arbeidstaker søknad og innholdet i kvitteringen blir lastet inn', async ({
        page,
    }) => {
        await test.step('Navigerer til kvittering for sendt søknad', async () => {
            await page.goto(
                `/syk/sykepengesoknad/kvittering/${foranArbeidstakerMedOppholdKvittering.id}?testperson=integrasjon-soknader`,
            )
            await expect(page).toHaveURL(
                new RegExp(
                    `/syk/sykepengesoknad/kvittering/${foranArbeidstakerMedOppholdKvittering.id}\\?testperson=integrasjon-soknader`,
                ),
            )
            await harSynligTittel(page, 'Søknad om sykepenger', 1)
            await expect(page.getByText('Søknaden er sendt')).toBeVisible()
            await expect(page.getByText('Du får sykepengene fra arbeidsgiveren din')).toBeVisible()
        })
    })

    test('Hvis vi går til /soknader sendes vi til listevisning', async ({ page }) => {
        await test.step('Navigerer til listevisning', async () => {
            await page.goto('/syk/sykepengesoknad/soknader/')
            await expect(page).toHaveURL(new RegExp(`/syk/sykepengesoknad/soknader`))
            await expect(page.getByText('Nye søknader')).toBeVisible()
        })
    })

    test('Direkte navigering til en utgått søknad ender på listevisningen', async ({ page }) => {
        await test.step('Navigerer til en gyldig søknad', async () => {
            await page.goto(`/syk/sykepengesoknad/soknader/${soknad.id}`)
            await expect(page).toHaveURL(new RegExp(`/syk/sykepengesoknad/soknader/${soknad.id}/1`))
        })

        await test.step('Navigerer til en utgått søknad', async () => {
            await page.goto('/syk/sykepengesoknad/soknader/df1371a4-2773-41c2-a895-49f561424aaa/1?testperson=utgatt')
            await expect(page).toHaveURL(new RegExp(`/syk/sykepengesoknad\\?testperson=utgatt`))
        })
    })
})
