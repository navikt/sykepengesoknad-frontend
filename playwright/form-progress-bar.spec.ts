import { test, expect } from './utils/fixtures'
import { checkViStolerPaDeg, klikkTilbake, neiOgVidere, harSynligTekst } from './utils/utilities'

test.describe('Tester form progress bar', () => {
    const soknadId = 'bc250797-147c-4050-b193-920c508902aa'
    const testpersonQuery = '?testperson=reisetilskudd'
    const baseUrl = `/syk/sykepengesoknad/soknader/${soknadId}/1${testpersonQuery}`

    test('Full flyt for form progress bar', async ({ page }) => {
        await test.step('Introsiden har ingen form progress', async () => {
            await page.goto(baseUrl)
            await expect(page.getByText('Steg')).toBeHidden()
            await checkViStolerPaDeg(page)
        })

        await test.step('Første spørsmål har form progress, og ingen navigerbare', async () => {
            await harSynligTekst(page, 'Steg 1 av 13')
            await page.getByRole('button', { name: 'Vis alle steg' }).click()
            const stepper = page.locator('.aksel-stepper')
            await expect(stepper.locator('[data-completed="true"]')).toHaveCount(0)
            await expect(stepper.locator('li[data-interactive="false"]')).toHaveCount(13)
            await expect(stepper.getByRole('link')).toHaveCount(0)
            await neiOgVidere(page, [
                'Tilbake i fullt arbeid',
                'Ferie',
                'Permisjon',
                'Arbeid mens du var syk',
                'Arbeid utenfor Norge',
            ])
        })

        await test.step('Vi har besvart en del spørsmål og en del er checked', async () => {
            await harSynligTekst(page, 'Steg 6 av 13')
            const stepper = page.locator('.aksel-stepper')
            await expect(stepper.locator('[data-completed="true"]')).toHaveCount(5)
            await expect(stepper.locator('li[data-interactive="false"]')).toHaveCount(8)
            await expect(stepper.getByRole('link')).toHaveCount(5)
        })

        await test.step('Vi går tilbake en med å klikke tilbake knappen', async () => {
            await klikkTilbake(page)
            await harSynligTekst(page, 'Steg 5 av 13')
            await klikkTilbake(page)
            await harSynligTekst(page, 'Steg 4 av 13')
            const stepper = page.locator('.aksel-stepper')
            await expect(stepper.locator('[data-completed="true"]')).toHaveCount(5)
            await expect(stepper.locator('li[data-interactive="false"]')).toHaveCount(8)
            await expect(stepper.getByRole('link')).toHaveCount(5)
        })

        await test.step('Vi navigerer tilbake til start', async () => {
            await page.getByRole('link', { name: 'Tilbake i fullt arbeid' }).click()
            await harSynligTekst(page, 'Steg 1 av 13')
            const stepper = page.locator('.aksel-stepper')
            await expect(stepper.locator('[data-completed="true"]')).toHaveCount(5)
            await expect(stepper.locator('li[data-interactive="false"]')).toHaveCount(8)
            await expect(stepper.getByRole('link')).toHaveCount(5)
        })

        await test.step('Vi navigerer til Andre inntektskilder', async () => {
            await page.getByRole('link', { name: 'Andre inntektskilder' }).click()
            await harSynligTekst(page, 'Steg 6 av 13')
            const stepper = page.locator('.aksel-stepper')
            await expect(stepper.locator('[data-completed="true"]')).toHaveCount(5)
            await expect(stepper.locator('li[data-interactive="false"]')).toHaveCount(8)
            await expect(stepper.getByRole('link')).toHaveCount(5)
        })

        await test.step('Vi besvarer litt videre og endre på kvittering', async () => {
            await neiOgVidere(page, [
                'Andre inntektskilder',
                'Reise utenfor EU/EØS',
                'Reisetilskudd',
                'Før du fikk sykmelding',
                'Reise med bil',
            ])
            const stepper = page.locator('.aksel-stepper')
            await expect(stepper.locator('[data-completed="true"]')).toHaveCount(10)
            await expect(stepper.locator('li[data-interactive="false"]')).toHaveCount(2)
            await expect(stepper.getByRole('link')).toHaveCount(11)
        })

        await test.step('Kvittering er litt rar siden vi kan gå til neste uten å svare', async () => {
            await harSynligTekst(page, 'Steg 11 av 13')
            await page.getByRole('link', { name: 'Utbetaling' }).click()
            await harSynligTekst(page, 'Steg 12 av 13')
            await neiOgVidere(page, ['Utbetaling'])
            const stepper = page.locator('.aksel-stepper')
            await expect(stepper.locator('[data-completed="true"]')).toHaveCount(11)
            await expect(stepper.locator('li[data-interactive="false"]')).toHaveCount(1)
            await expect(stepper.getByRole('link')).toHaveCount(12)
        })
    })
})
