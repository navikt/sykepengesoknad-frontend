import { expect } from '@playwright/test'

import { test } from './fixtures'

test.describe('Tester arbeidssituasjon', () => {
    test('Bruker med flere arbeidsgivere', async ({ page }) => {
        await page.goto('http://localhost:3000/syk/sykefravaer?testperson=default')

        const dinSituasjon = page.getByTestId('din-situasjon')
        const firstEmployer = dinSituasjon.locator(':scope > *').nth(1)
        await expect(firstEmployer).toContainText('Hogwarts School of Witchcraft and Wizardry')
        await firstEmployer.click()

        const arbeidsgiverAccordion = page.getByTestId('arbeidsgiver-accordion').first()
        await page.locator('text=Betaler lønn også etter de 16 første dagene i sykefraværet.').first().waitFor()

        await expect(arbeidsgiverAccordion).toContainText('Betaler lønn også etter de 16 første dagene i sykefraværet.')
        await expect(arbeidsgiverAccordion).toContainText(
            'Arbeidsgiveren har meldt inn at Albus Dumbledore skal følge deg opp mens du er syk.',
        )
        const meldFraOmEndring = arbeidsgiverAccordion.locator('text=Meld fra om endring')
        await meldFraOmEndring.click()

        await expect(page.getByRole('dialog', { name: 'Endre nærmeste leder' })).toBeVisible()
        const bekreftButton = page.getByRole('button', { name: 'Ja, jeg er sikker' })
        await bekreftButton.click()

        await expect(arbeidsgiverAccordion).not.toContainText(
            'Arbeidsgiveren har meldt inn at Albus Dumbledore skal følge deg opp mens du er syk.',
        )

        const secondEmployer = dinSituasjon.locator(':scope > *').nth(2)
        await expect(secondEmployer).toContainText('Diagon Alley')
        await secondEmployer.click()

        const arbeidsgiverAccordion2 = page.getByTestId('arbeidsgiver-accordion').nth(1)
        await expect(arbeidsgiverAccordion2).toContainText(
            'Betaler lønn også etter de 16 første dagene i sykefraværet.',
        )
        await expect(arbeidsgiverAccordion2).toContainText(
            'Arbeidsgiveren har meldt  inn at Severus Snape skal følge deg opp mens du er syk.',
        )
        const meldFraOmEndringSecond = arbeidsgiverAccordion2.locator('text=Meld fra om endring')
        await meldFraOmEndringSecond.click()

        const modal2 = page.getByRole('dialog', { name: 'Endre nærmeste leder' })

        await expect(modal2).toContainText('Endre nærmeste leder')
        const bekreftButtonSecond = modal2.locator('text=Ja, jeg er sikker')
        await bekreftButtonSecond.click()

        await expect(arbeidsgiverAccordion2).not.toContainText(
            'Arbeidsgiveren har meldt inn at Severus Snape skal følge deg opp mens du er syk.',
        )
    })

    test('Avkreft nærmeste leder feiler', async ({ page }) => {
        await page.goto('http://localhost:3000/syk/sykefravaer?testperson=default')

        const dinSituasjon = page.getByTestId('din-situasjon') // locator('[data-testid="din-situasjon"]')
        const employer = dinSituasjon.locator(':scope > *').nth(3)
        await expect(employer).toContainText('Gloucester Cathedral')
        await employer.click()

        const arbeidsgiverAccordion = page.getByTestId('arbeidsgiver-accordion').nth(2)
        await expect(arbeidsgiverAccordion).toContainText(
            'Arbeidsgiveren har meldt inn at Charity Burbage skal følge deg opp mens du er syk.',
        )
        const meldFraOmEndring = arbeidsgiverAccordion.locator('text=Meld fra om endring')
        await meldFraOmEndring.click()

        const modal = page.getByRole('dialog', { name: 'Endre nærmeste leder' }) // page.locator('.navds-modal');
        await expect(modal).toContainText('Endre nærmeste leder')
        const bekreftButton = modal.locator('text=Ja, jeg er sikker')
        await bekreftButton.click()

        await expect(modal).toContainText('Beklager, det oppstod en feil!')
        await expect(modal).toBeVisible()

        const avbrytButton = modal.locator('text=Avbryt')
        await avbrytButton.click()

        await expect(modal).not.toBeVisible()
        await expect(employer).toContainText('Gloucester Cathedral')
    })

    test('Har narmesteleder og kan avkrefte den', async ({ page }) => {
        await page.goto('http://localhost:3000/syk/sykefravaer?testperson=snart-slutt')

        const situasjonInnhold = page.getByTestId('situasjon-innhold') //  locator('[data-testid="situasjon-innhold"]')
        await expect(situasjonInnhold).toContainText('Hogwarts School of Witchcraft and Wizardry')
        await expect(situasjonInnhold).toContainText('Betaler lønn også etter de 16 første dagene i sykefraværet.')
        await expect(situasjonInnhold).toContainText(
            'Arbeidsgiveren har meldt inn at Albus Dumbledore skal følge deg opp mens du er syk.',
        )

        const accordionItem = page
            .locator('.navds-accordion__item')
            .filter({ hasText: 'Slik skal arbeidsgiver hjelpe deg mens du er sykmeldt' })
        await accordionItem.click()

        await situasjonInnhold.locator('text=Meld fra om endring').click()

        const accordionContent = page.locator('.navds-accordion__content')
        await expect(accordionContent).toContainText(
            'Arbeidsgiveren skal legge til rette for at du kan jobbe helt eller delvis selv om du er syk.',
        )
        await expect(accordionContent).toContainText('Er det oppgaver jeg kan gjøre selv om jeg er syk?')
        await expect(accordionContent).toContainText('Kan noe endres på arbeidsplassen for at jeg kan få det til?')

        const modal = page.getByLabel('Endre nærmeste leder')
        await expect(modal).toContainText('Endre nærmeste leder')
        const bekreftButton = modal.locator('text=Ja, jeg er sikker')
        await bekreftButton.click()

        await expect(modal).not.toBeVisible()

        await expect(situasjonInnhold).toContainText('Hogwarts School of Witchcraft and Wizardry')
        await expect(situasjonInnhold).not.toContainText(
            'Arbeidsgiveren har meldt inn at Albus Dumbledore skal følge deg opp mens du er syk.',
        )
        await expect(situasjonInnhold).toContainText('Betaler lønn også etter de 16 første dagene i sykefraværet.')

        await accordionItem.click()
    })

    test('Arbeidsgiver forskutterer ikke', async ({ page }) => {
        await page.goto('http://localhost:3000/syk/sykefravaer?testperson=arbeidsgiver-forskutterer-ikke')

        const situasjonInnhold = page.getByTestId('situasjon-innhold')
        await expect(situasjonInnhold).toContainText('Hogwarts School of Witchcraft and Wizardry')
        await expect(situasjonInnhold).toContainText('Arbeidsgiveren din betaler ikke lønn etter de første 16 dagene.')
        await expect(situasjonInnhold).toContainText(
            'Arbeidsgiveren har meldt inn at Albus Dumbledore skal følge deg opp mens du er syk.',
        )
        await situasjonInnhold.locator('text=Meld fra om endring').click()

        const modal = page.getByLabel('Endre nærmeste leder') // page.locator('.navds-modal'); // const modal = page.locator('.navds-modal');
        await expect(modal).toContainText('Endre nærmeste leder')
        const bekreftButton = modal.locator('text=Ja, jeg er sikker')
        await bekreftButton.click()

        await expect(modal).not.toBeVisible()

        await expect(situasjonInnhold).toContainText('Hogwarts School of Witchcraft and Wizardry')
        await expect(situasjonInnhold).toContainText('Arbeidsgiveren din betaler ikke lønn etter de første 16 dagene.')
        await expect(situasjonInnhold).not.toContainText(
            'Arbeidsgiveren har meldt inn at Albus Dumbledore skal følge deg opp mens du er syk.',
        )
    })
})
