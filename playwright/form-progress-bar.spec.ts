import { test, expect } from './fixtures'
import { checkViStolerPaDeg, klikkTilbake, neiOgVidere } from './utilities'

test.describe('Tester form progress bar', () => {
    const soknadId = 'bc250797-147c-4050-b193-920c508902aa'
    const testpersonQuery = '?testperson=reisetilskudd'
    const baseUrl = `/syk/sykepengesoknad/soknader/${soknadId}/1${testpersonQuery}`

    test('Full flyt for form progress bar', async ({ page }) => {
        await test.step('Introsiden har ingen form progress', async () => {
            await page.goto(baseUrl)
            await expect(page.locator('.navds-progress-bar')).toBeHidden()
            await checkViStolerPaDeg(page)
        })

        await test.step('Første spørsmål har form progress, og ingen navigerbare', async () => {
            await expect(page.locator('.navds-progress-bar')).toBeVisible()
            await expect(page.getByText('Steg 1 av 14')).toBeVisible()
            await page.getByRole('button', { name: 'Vis alle steg' }).click()
            const stepper = page.locator('.navds-stepper')
            await expect(stepper.locator('span.navds-stepper__circle--success')).toHaveCount(0)
            await expect(stepper.locator('div.navds-stepper__step')).toHaveCount(14)
            await expect(stepper.locator('a.navds-stepper__step')).toHaveCount(0)
            await neiOgVidere(page, [
                'Fravær før sykmeldingen',
                'Tilbake i fullt arbeid',
                'Ferie',
                'Permisjon',
                'Jobb underveis i sykefraværet',
                'Arbeid utenfor Norge',
            ])
        })

        await test.step('Vi har besvart en del spørsmål og en del er checked', async () => {
            await expect(page.getByText('Steg 7 av 14')).toBeVisible()
            const stepper = page.locator('.navds-stepper')
            await expect(stepper.locator('span.navds-stepper__circle--success')).toHaveCount(6)
            await expect(stepper.locator('div.navds-stepper__step')).toHaveCount(8)
            await expect(stepper.locator('a.navds-stepper__step')).toHaveCount(6)
        })

        await test.step('Vi går tilbake en med å klikke tilbake knappen', async () => {
            await klikkTilbake(page)
            await expect(page.getByText('Steg 6 av 14')).toBeVisible()
            await klikkTilbake(page)
            await expect(page.getByText('Steg 5 av 14')).toBeVisible()
            const stepper = page.locator('.navds-stepper')
            await expect(stepper.locator('span.navds-stepper__circle--success')).toHaveCount(6)
            await expect(stepper.locator('div.navds-stepper__step')).toHaveCount(8)
            await expect(stepper.locator('a.navds-stepper__step')).toHaveCount(6)
        })

        await test.step('Vi navigerer tilbake til start', async () => {
            await page.getByRole('link', { name: 'Fravær før sykmeldingen' }).click()
            await expect(page.getByText('Steg 1 av 14')).toBeVisible()
            const stepper = page.locator('.navds-stepper')
            await expect(stepper.locator('span.navds-stepper__circle--success')).toHaveCount(6)
            await expect(stepper.locator('div.navds-stepper__step')).toHaveCount(8)
            await expect(stepper.locator('a.navds-stepper__step')).toHaveCount(6)
        })

        await test.step('Vi navigerer til Andre inntektskilder', async () => {
            await page.getByRole('link', { name: 'Andre inntektskilder' }).click()
            await expect(page.getByText('Steg 7 av 14')).toBeVisible()
            const stepper = page.locator('.navds-stepper')
            await expect(stepper.locator('span.navds-stepper__circle--success')).toHaveCount(6)
            await expect(stepper.locator('div.navds-stepper__step')).toHaveCount(8)
            await expect(stepper.locator('a.navds-stepper__step')).toHaveCount(6)
        })

        await test.step('Vi besvarer litt videre og endre på kvittering', async () => {
            await neiOgVidere(page, [
                'Andre inntektskilder',
                'Reise utenfor EU/EØS',
                'Reisetilskudd',
                'Før du fikk sykmelding',
                'Reise med bil',
            ])
            const stepper = page.locator('.navds-stepper')
            await expect(stepper.locator('span.navds-stepper__circle--success')).toHaveCount(11)
            await expect(stepper.locator('div.navds-stepper__step')).toHaveCount(2)
            await expect(stepper.locator('a.navds-stepper__step')).toHaveCount(12)
        })

        await test.step('Kvittering er litt rar siden vi kan gå til neste uten å svare', async () => {
            await expect(page.getByText('Steg 12 av 14')).toBeVisible()
            await page.getByRole('link', { name: 'Utbetaling' }).click()
            await expect(page.getByText('Steg 13 av 14')).toBeVisible()
            await neiOgVidere(page, ['Utbetaling'])
            const stepper = page.locator('.navds-stepper')
            await expect(stepper.locator('span.navds-stepper__circle--success')).toHaveCount(12)
            await expect(stepper.locator('div.navds-stepper__step')).toHaveCount(1)
            await expect(stepper.locator('a.navds-stepper__step')).toHaveCount(13)
        })
    })
})
