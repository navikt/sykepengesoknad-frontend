import { gradertReisetilskudd } from '../src/data/mock/data/soknad/arbeidstaker-reisetilskudd-gradert'

import { test, expect } from './fixtures'
import { klikkGaVidere, klikkTilbake, svarJaHovedsporsmal, svarRadioGruppe } from './utilities'
import { validerAxeUtilityWrapper } from "./uuvalidering";

test.describe('Tester at riktig antall desimaler sendes til backend', () => {
    test('Oppgir desimaler på svartype TALL og PROSENT', async ({ page }) => {
        await test.step('Navigerer til riktig søknadsside', async () => {
            await page.goto(`/syk/sykepengesoknad/soknader/${gradertReisetilskudd.id}/6?testperson=reisetilskudd`)
        })

        await test.step('Fyller inn verdier for TALL og PROSENT', async () => {
            await svarJaHovedsporsmal(page)
            await page.getByRole('textbox', { name: 'Hvor mange timer i uken' }).fill('37.321')
            await svarRadioGruppe(page, 'Hvor mye jobbet du tilsammen', 'Prosent')
            await page.getByRole('textbox', { name: 'Oppgi prosent' }).fill('50.321')
            await validerAxeUtilityWrapper(page, test.info())
        })

        await test.step('Validerer verdier etter navigasjon', async () => {
            await klikkGaVidere(page)
            await klikkTilbake(page)
            await expect(page.getByRole('textbox', { name: 'Hvor mange timer i uken' })).toHaveValue('37.32')
            await expect(page.getByRole('textbox', { name: 'Oppgi prosent' })).toHaveValue('50')
            await validerAxeUtilityWrapper(page, test.info())
        })
    })

    test('Oppgir desimaler på svartype BELOP og KILOMETER', async ({ page }) => {
        await test.step('Navigerer til riktig søknadsside', async () => {
            await page.goto(`/syk/sykepengesoknad/soknader/${gradertReisetilskudd.id}/12?testperson=reisetilskudd`)
        })

        await test.step('Fyller inn verdier for BELOP og KILOMETER', async () => {
            await svarJaHovedsporsmal(page)
            await page.locator('[aria-label="onsdag 8"]').click()
            await svarRadioGruppe(page, 'Hadde du utgifter til bompenger', 'Ja')
            await page.getByRole('textbox', { name: 'Hvor mye betalte du i' }).fill('500.321')
            await page.getByRole('textbox', { name: 'Hvor mange kilometer er kjø' }).fill('12.321')
            await validerAxeUtilityWrapper(page, test.info())
        })

        await test.step('Validerer verdier etter navigasjon', async () => {
            await klikkGaVidere(page)
            await klikkTilbake(page)
            await expect(page.getByRole('textbox', { name: 'Hvor mye betalte du i' })).toHaveValue('500.32')
            await expect(page.getByRole('textbox', { name: 'Hvor mange kilometer er kjø' })).toHaveValue('12.3')
            await validerAxeUtilityWrapper(page, test.info())
        })
    })

    test('Håndterer at man bruker komma istedenfor punktum', async ({ page }) => {
        await test.step('Navigerer til riktig søknadsside', async () => {
            await page.context().clearCookies()
            await page.goto(`/syk/sykepengesoknad/soknader/${gradertReisetilskudd.id}/6?testperson=reisetilskudd`)
        })

        await test.step('Fyller inn verdier med komma', async () => {
            await svarJaHovedsporsmal(page)
            await page.getByRole('textbox', { name: 'Hvor mange timer i uken' }).fill('36,99')
            await svarRadioGruppe(page, 'Hvor mye jobbet du tilsammen', 'Prosent')
            await page.getByRole('textbox', { name: 'Oppgi prosent' }).fill('50.321wsergergwegr')
            await validerAxeUtilityWrapper(page, test.info())
        })

        await test.step('Validerer verdier etter navigasjon', async () => {
            await klikkGaVidere(page)
            await klikkTilbake(page)
            await expect(page.getByRole('textbox', { name: 'Hvor mange timer i uken' })).toHaveValue('36.99')
            await expect(page.getByRole('textbox', { name: 'Oppgi prosent' })).toHaveValue('50')
            await validerAxeUtilityWrapper(page, test.info())
        })
    })

    test('Legger ikke til desimaler', async ({ page }) => {
        await test.step('Navigerer til riktig søknadsside', async () => {
            await page.context().clearCookies()
            await page.goto(`/syk/sykepengesoknad/soknader/${gradertReisetilskudd.id}/6?testperson=reisetilskudd`)
        })

        await test.step('Fyller inn verdier uten desimaler', async () => {
            await svarJaHovedsporsmal(page)
            await page.getByRole('textbox', { name: 'Hvor mange timer i uken' }).fill('36')
            await svarRadioGruppe(page, 'Hvor mye jobbet du tilsammen', 'Prosent')
            await page.getByRole('textbox', { name: 'Oppgi prosent' }).fill('50.321wsergergwegr')
            await validerAxeUtilityWrapper(page, test.info())
        })

        await test.step('Validerer verdier etter navigasjon', async () => {
            await klikkGaVidere(page)
            await klikkTilbake(page)
            await expect(page.getByRole('textbox', { name: 'Hvor mange timer i uken' })).toHaveValue('36')
            await expect(page.getByRole('textbox', { name: 'Oppgi prosent' })).toHaveValue('50')
            await validerAxeUtilityWrapper(page, test.info())
        })
    })
})
