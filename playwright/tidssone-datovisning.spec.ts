import { arbeidstaker } from '../src/data/mock/data/soknad/arbeidstaker'
import { arbeidsledigKvittering } from '../src/data/mock/data/soknad/soknader-integration'
import { nyttReisetilskudd } from '../src/data/mock/data/soknad/arbeidstaker-reisetilskudd'
import { behandlingsdager as behandlingsdagerSoknad } from '../src/data/mock/data/soknad/behandlingsdager'

import { test, expect } from './utils/fixtures'
import {
    checkViStolerPaDeg,
    harSoknaderlisteHeading,
    trykkPaSoknadMedId,
    klikkGaVidere,
    klikkTilbake,
    svarRadioGruppe,
    svarFritekst,
    svarJaHovedsporsmal,
} from './utils/utilities'

/**
 * Tidssone-tester som verifiserer at datoer håndteres korrekt i vest-tidssoner.
 *
 * Kjerneproblemet: `new Date('2020-01-01')` = UTC midnight.
 * I UTC-5 (New York): getDate() = 31 (desember 2019), getFullYear() = 2019.
 *
 * Buggen: DatePicker brukte `new Date(sporsmal.min)` for fromDate.
 * Med min='2020-01-01' i NYC ble fromDate = 2019-12-31 → desember navigerbar.
 * Fix: Bruker TZDate med eksplisitt Europe/Oslo tidssone.
 */

const arbeidstakerId = arbeidstaker.id
const arbeidsledigId = arbeidsledigKvittering.id
const forventDagValgt = (dagNavnOgNummer: string) => `button[aria-label="${dagNavnOgNummer}"][aria-pressed="true"]`

test.describe('Tidssone: periodevisning', () => {
    test.describe('New York (UTC-5)', () => {
        test.use({ timezoneId: 'America/New_York' })

        test('Periodevisning i søknadslisten er korrekt', async ({ page }) => {
            await page.goto('/syk/sykepengesoknad')
            await harSoknaderlisteHeading(page)

            const soknadLink = page.locator(`[data-cy="link-listevisning-${arbeidstakerId}"]`)
            await expect(soknadLink).toContainText('1. april – 24. mai 2020')
        })

        test('Manuell dato-input viser riktig periode', async ({ page }) => {
            await page.goto('/syk/sykepengesoknad')
            await harSoknaderlisteHeading(page)
            await trykkPaSoknadMedId(page, arbeidstakerId)

            await checkViStolerPaDeg(page)

            await page.locator('[data-cy="ja-nei-stor"] input[value="JA"]').click()
            await expect(page.getByText('Når begynte du å jobbe igjen?')).toBeVisible()

            const datoInput = page.locator('.aksel-date__field-input')
            await datoInput.fill('01.04.2020')
            await datoInput.blur()

            await expect(page.getByText('1. – 24. april 2020', { exact: false })).toBeVisible()
        })
    })

    test.describe('Oslo (kontroll)', () => {
        test.use({ timezoneId: 'Europe/Oslo' })

        test('Periodevisning i søknadslisten er korrekt', async ({ page }) => {
            await page.goto('/syk/sykepengesoknad')
            await harSoknaderlisteHeading(page)

            const soknadLink = page.locator(`[data-cy="link-listevisning-${arbeidstakerId}"]`)
            await expect(soknadLink).toContainText('1. april – 24. mai 2020')
        })
    })

    test.describe('Thailand (UTC+7)', () => {
        test.use({ timezoneId: 'Asia/Bangkok' })

        test('Periodevisning i søknadslisten er korrekt', async ({ page }) => {
            await page.goto('/syk/sykepengesoknad')
            await harSoknaderlisteHeading(page)

            const soknadLink = page.locator(`[data-cy="link-listevisning-${arbeidstakerId}"]`)
            await expect(soknadLink).toContainText('1. april – 24. mai 2020')
        })
    })
})

test.describe('Tidssone: DatePicker fromDate-grense', () => {
    /**
     * Verifiserer at DatePicker korrekt begrenser navigering til måneder
     * utenfor min/max-intervallet, uavhengig av brukerens tidssone.
     *
     * Mock: arbeidsledigKvittering → FRISKMELDT_START (min='2020-01-01', max='2020-01-10')
     */
    test.describe('New York (UTC-5)', () => {
        test.use({ timezoneId: 'America/New_York' })

        test('DatePicker blokkerer navigering forbi januar 2020', async ({ page }) => {
            await page.goto(`/syk/sykepengesoknad/soknader/${arbeidsledigId}/1?testperson=integrasjon-soknader`)

            await checkViStolerPaDeg(page)

            await page.getByRole('radio', { name: 'Nei' }).click()
            await expect(page.getByText('Fra hvilken dato trengte du ikke lenger sykmeldingen?')).toBeVisible()

            const openButton = page.getByRole('button', { name: 'Åpne datovelger' })
            await openButton.click()

            await expect(page.getByRole('grid')).toBeVisible()

            // fromDate skal være 1. januar 2020 → forrige-knapp skal være deaktivert
            const prevButton = page.getByRole('button', { name: /Forrige måned|Go to previous month/i })
            await expect(prevButton).toBeDisabled()
        })
    })

    test.describe('Oslo (kontroll)', () => {
        test.use({ timezoneId: 'Europe/Oslo' })

        test('DatePicker blokkerer navigering forbi januar 2020', async ({ page }) => {
            await page.goto(`/syk/sykepengesoknad/soknader/${arbeidsledigId}/1?testperson=integrasjon-soknader`)

            await checkViStolerPaDeg(page)

            await page.getByRole('radio', { name: 'Nei' }).click()
            await expect(page.getByText('Fra hvilken dato trengte du ikke lenger sykmeldingen?')).toBeVisible()

            const openButton = page.getByRole('button', { name: 'Åpne datovelger' })
            await openButton.click()

            await expect(page.getByRole('grid')).toBeVisible()

            const prevButton = page.getByRole('button', { name: /Forrige måned|Go to previous month/i })
            await expect(prevButton).toBeDisabled()
        })
    })

    test.describe('Thailand (UTC+7)', () => {
        test.use({ timezoneId: 'Asia/Bangkok' })

        test('DatePicker blokkerer navigering forbi januar 2020', async ({ page }) => {
            await page.goto(`/syk/sykepengesoknad/soknader/${arbeidsledigId}/1?testperson=integrasjon-soknader`)

            await checkViStolerPaDeg(page)

            await page.getByRole('radio', { name: 'Nei' }).click()
            await expect(page.getByText('Fra hvilken dato trengte du ikke lenger sykmeldingen?')).toBeVisible()

            const openButton = page.getByRole('button', { name: 'Åpne datovelger' })
            await openButton.click()

            await expect(page.getByRole('grid')).toBeVisible()

            const prevButton = page.getByRole('button', { name: /Forrige måned|Go to previous month/i })
            await expect(prevButton).toBeDisabled()
        })
    })
})

test.describe('Tidssone: DATOER-kalender persistering', () => {
    test.describe('New York (UTC-5)', () => {
        test.use({ timezoneId: 'America/New_York' })

        test('Valgte bildager forblir markert etter gå videre og tilbake', async ({ page }) => {
            await page.goto(`/syk/sykepengesoknad/soknader/${nyttReisetilskudd.id}/3?testperson=reisetilskudd`)

            await svarJaHovedsporsmal(page)

            await page.getByRole('button', { name: 'mandag 4' }).click()
            await expect(page.locator(forventDagValgt('mandag 4'))).toBeVisible()
            await page.getByRole('button', { name: 'tirsdag 5' }).click()
            await expect(page.locator(forventDagValgt('tirsdag 5'))).toBeVisible()
            await page.getByRole('button', { name: 'onsdag 6' }).click()
            await expect(page.locator(forventDagValgt('onsdag 6'))).toBeVisible()

            await expect(page.locator(forventDagValgt('mandag 4'))).toBeVisible()
            await expect(page.locator(forventDagValgt('tirsdag 5'))).toBeVisible()
            await expect(page.locator(forventDagValgt('onsdag 6'))).toBeVisible()

            await svarRadioGruppe(page, /bompenger/i, 'Nei')
            await svarFritekst(page, 'kilometer', '10')

            await klikkGaVidere(page)
            await klikkTilbake(page)

            await expect(page.locator(forventDagValgt('mandag 4'))).toBeVisible()
            await expect(page.locator(forventDagValgt('tirsdag 5'))).toBeVisible()
            await expect(page.locator(forventDagValgt('onsdag 6'))).toBeVisible()
        })
    })

    test.describe('Oslo (UTC+1)', () => {
        test.use({ timezoneId: 'Europe/Oslo' })

        test('Valgte bildager forblir markert etter gå videre og tilbake', async ({ page }) => {
            await page.goto(`/syk/sykepengesoknad/soknader/${nyttReisetilskudd.id}/3?testperson=reisetilskudd`)

            await svarJaHovedsporsmal(page)

            await page.getByRole('button', { name: 'mandag 4' }).click()
            await expect(page.locator(forventDagValgt('mandag 4'))).toBeVisible()
            await page.getByRole('button', { name: 'tirsdag 5' }).click()
            await expect(page.locator(forventDagValgt('tirsdag 5'))).toBeVisible()
            await page.getByRole('button', { name: 'onsdag 6' }).click()
            await expect(page.locator(forventDagValgt('onsdag 6'))).toBeVisible()

            await expect(page.locator(forventDagValgt('mandag 4'))).toBeVisible()
            await expect(page.locator(forventDagValgt('tirsdag 5'))).toBeVisible()
            await expect(page.locator(forventDagValgt('onsdag 6'))).toBeVisible()

            await svarRadioGruppe(page, /bompenger/i, 'Nei')
            await svarFritekst(page, 'kilometer', '10')

            await klikkGaVidere(page)
            await klikkTilbake(page)

            await expect(page.locator(forventDagValgt('mandag 4'))).toBeVisible()
            await expect(page.locator(forventDagValgt('tirsdag 5'))).toBeVisible()
            await expect(page.locator(forventDagValgt('onsdag 6'))).toBeVisible()
        })
    })

    test.describe('Thailand (UTC+7)', () => {
        test.use({ timezoneId: 'Asia/Bangkok' })

        test('Valgte bildager forblir markert etter gå videre og tilbake', async ({ page }) => {
            await page.goto(`/syk/sykepengesoknad/soknader/${nyttReisetilskudd.id}/3?testperson=reisetilskudd`)

            await svarJaHovedsporsmal(page)

            await page.getByRole('button', { name: 'mandag 4' }).click()
            await expect(page.locator(forventDagValgt('mandag 4'))).toBeVisible()
            await page.getByRole('button', { name: 'tirsdag 5' }).click()
            await expect(page.locator(forventDagValgt('tirsdag 5'))).toBeVisible()
            await page.getByRole('button', { name: 'onsdag 6' }).click()
            await expect(page.locator(forventDagValgt('onsdag 6'))).toBeVisible()

            await expect(page.locator(forventDagValgt('mandag 4'))).toBeVisible()
            await expect(page.locator(forventDagValgt('tirsdag 5'))).toBeVisible()
            await expect(page.locator(forventDagValgt('onsdag 6'))).toBeVisible()

            await svarRadioGruppe(page, /bompenger/i, 'Nei')
            await svarFritekst(page, 'kilometer', '10')

            await klikkGaVidere(page)
            await klikkTilbake(page)

            await expect(page.locator(forventDagValgt('mandag 4'))).toBeVisible()
            await expect(page.locator(forventDagValgt('tirsdag 5'))).toBeVisible()
            await expect(page.locator(forventDagValgt('onsdag 6'))).toBeVisible()
        })
    })
})

test.describe('Tidssone: periode-komp fromDate-grense', () => {
    const åpnePeriodeKalender = async (page: import('@playwright/test').Page) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${arbeidstaker.id}/3`)
        await page.locator('[data-cy="ja-nei-stor"] input[value="JA"]').click()
        const periodeLocator = page.locator('[data-cy="periode"]').first()
        await periodeLocator.locator('.aksel-date__field-button').first().click()
        await expect(page.getByRole('grid')).toBeVisible()
    }

    test.describe('New York (UTC-5)', () => {
        test.use({ timezoneId: 'America/New_York' })

        test('DatePicker blokkerer navigering forbi april 2020', async ({ page }) => {
            await åpnePeriodeKalender(page)
            const prevButton = page.getByRole('button', { name: /Forrige måned|Go to previous month/i })
            await expect(prevButton).toBeDisabled()
        })
    })

    test.describe('Oslo (kontroll)', () => {
        test.use({ timezoneId: 'Europe/Oslo' })

        test('DatePicker blokkerer navigering forbi april 2020', async ({ page }) => {
            await åpnePeriodeKalender(page)
            const prevButton = page.getByRole('button', { name: /Forrige måned|Go to previous month/i })
            await expect(prevButton).toBeDisabled()
        })
    })

    test.describe('Thailand (UTC+7)', () => {
        test.use({ timezoneId: 'Asia/Bangkok' })

        test('DatePicker blokkerer navigering forbi april 2020', async ({ page }) => {
            await åpnePeriodeKalender(page)
            const prevButton = page.getByRole('button', { name: /Forrige måned|Go to previous month/i })
            await expect(prevButton).toBeDisabled()
        })
    })
})

test.describe('Tidssone: periode-komp datoer persistering', () => {
    const velgPeriodeOgNavigerTilbake = async (page: import('@playwright/test').Page) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${arbeidstaker.id}/3`)
        await page.locator('[data-cy="ja-nei-stor"] input[value="JA"]').click()
        const periodeLocator = page.locator('[data-cy="periode"]').first()
        await periodeLocator.locator('.aksel-date__field-button').first().click()
        await periodeLocator.locator('[data-day="2020-04-05"]').click()
        await periodeLocator.locator('[data-day="2020-04-10"]').click()
        await klikkGaVidere(page)
        await klikkTilbake(page)
    }

    test.describe('New York (UTC-5)', () => {
        test.use({ timezoneId: 'America/New_York' })

        test('Valgt periode forblir etter gå videre og tilbake', async ({ page }) => {
            await velgPeriodeOgNavigerTilbake(page)
            const fomInput = page.locator('[id$="_fom"]').first()
            const tomInput = page.locator('[id$="_tom"]').first()
            await expect(fomInput).toHaveValue('05.04.2020')
            await expect(tomInput).toHaveValue('10.04.2020')
        })
    })

    test.describe('Oslo (kontroll)', () => {
        test.use({ timezoneId: 'Europe/Oslo' })

        test('Valgt periode forblir etter gå videre og tilbake', async ({ page }) => {
            await velgPeriodeOgNavigerTilbake(page)
            const fomInput = page.locator('[id$="_fom"]').first()
            const tomInput = page.locator('[id$="_tom"]').first()
            await expect(fomInput).toHaveValue('05.04.2020')
            await expect(tomInput).toHaveValue('10.04.2020')
        })
    })

    test.describe('Thailand (UTC+7)', () => {
        test.use({ timezoneId: 'Asia/Bangkok' })

        test('Valgt periode forblir etter gå videre og tilbake', async ({ page }) => {
            await velgPeriodeOgNavigerTilbake(page)
            const fomInput = page.locator('[id$="_fom"]').first()
            const tomInput = page.locator('[id$="_tom"]').first()
            await expect(fomInput).toHaveValue('05.04.2020')
            await expect(tomInput).toHaveValue('10.04.2020')
        })
    })
})

test.describe('Tidssone: behandlingsdager kalender persistering', () => {
    const velgDagOgNavigerTilbake = async (page: import('@playwright/test').Page) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${behandlingsdagerSoknad.id}/2?testperson=behandlingsdager`)
        await page.getByRole('button', { name: 'torsdag 16' }).first().click()
        await expect(page.locator('button[aria-label="torsdag 16"][aria-pressed="true"]')).toBeVisible()
        await klikkGaVidere(page)
        await klikkTilbake(page)
    }

    test.describe('New York (UTC-5)', () => {
        test.use({ timezoneId: 'America/New_York' })

        test('Valgt behandlingsdag forblir markert etter gå videre og tilbake', async ({ page }) => {
            await velgDagOgNavigerTilbake(page)
            await expect(page.locator('button[aria-label="torsdag 16"][aria-pressed="true"]')).toBeVisible()
        })
    })

    test.describe('Oslo (kontroll)', () => {
        test.use({ timezoneId: 'Europe/Oslo' })

        test('Valgt behandlingsdag forblir markert etter gå videre og tilbake', async ({ page }) => {
            await velgDagOgNavigerTilbake(page)
            await expect(page.locator('button[aria-label="torsdag 16"][aria-pressed="true"]')).toBeVisible()
        })
    })

    test.describe('Thailand (UTC+7)', () => {
        test.use({ timezoneId: 'Asia/Bangkok' })

        test('Valgt behandlingsdag forblir markert etter gå videre og tilbake', async ({ page }) => {
            await velgDagOgNavigerTilbake(page)
            await expect(page.locator('button[aria-label="torsdag 16"][aria-pressed="true"]')).toBeVisible()
        })
    })
})

test.describe('Tidssone: aar-maaned-komp persistering', () => {
    const selvstendigId = 'ffa7c5d2-4766-4450-a521-3ecc5842d015'
    const testperson = 'selvstendig-naringsdrivende'

    const velgMaanedOgNavigerTilbake = async (page: import('@playwright/test').Page) => {
        await page.goto(`/syk/sykepengesoknad/soknader/${selvstendigId}/11?testperson=${testperson}`)
        await page.getByRole('radio', { name: 'Ja' }).click()
        await page.getByRole('checkbox', { name: 'Jobbet mindre i en virksomhet' }).click()
        const monthInput = page.getByLabel('Når skjedde endringen?')
        await monthInput.fill('januar 2024')
        await klikkGaVidere(page)
        await klikkTilbake(page)
    }

    test.describe('New York (UTC-5)', () => {
        test.use({ timezoneId: 'America/New_York' })

        test('Valgt måned forblir korrekt etter gå videre og tilbake', async ({ page }) => {
            await velgMaanedOgNavigerTilbake(page)
            await expect(page.getByLabel('Når skjedde endringen?')).toHaveValue('januar 2024')
        })
    })

    test.describe('Oslo (kontroll)', () => {
        test.use({ timezoneId: 'Europe/Oslo' })

        test('Valgt måned forblir korrekt etter gå videre og tilbake', async ({ page }) => {
            await velgMaanedOgNavigerTilbake(page)
            await expect(page.getByLabel('Når skjedde endringen?')).toHaveValue('januar 2024')
        })
    })

    test.describe('Thailand (UTC+7)', () => {
        test.use({ timezoneId: 'Asia/Bangkok' })

        test('Valgt måned forblir korrekt etter gå videre og tilbake', async ({ page }) => {
            await velgMaanedOgNavigerTilbake(page)
            await expect(page.getByLabel('Når skjedde endringen?')).toHaveValue('januar 2024')
        })
    })
})
