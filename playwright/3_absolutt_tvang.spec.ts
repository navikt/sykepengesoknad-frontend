import { enUsendtSykmelding, toUsendteSykmeldinger } from '../src/data/mock/data/usendte-sykmeldinger'

import { test, expect } from './utils/fixtures'
import { trykkPaSoknadMedId } from './utils/utilities'
import { validerAxeUtilityWrapper } from './uuvalidering'

test.describe('Tester at åpne sykmeldinger må sendes inn', () => {
    test.describe('Tester med en usendt sykmelding', () => {
        test('Laster søknader og viser advarsel om at det finnes sykmelding', async ({ page }) => {
            await page.goto('/syk/sykepengesoknad?testperson=en-usendt-sykmelding')
            await trykkPaSoknadMedId(page, enUsendtSykmelding.soknader[0].id)

            await expect(
                page.getByText(
                    'Du har en sykmelding du må velge om du skal bruke, før du kan begynne på denne søknaden.',
                ),
            ).toBeVisible()

            await expect(page.getByText('Gå til sykmeldingen')).toBeVisible()
        })
    })

    test.describe('Tester med flere usendte sykmeldinger', () => {
        test('Laster søknader og viser advarsel om at det finnes sykmeldinger', async ({ page, uuOptions }) => {
            uuOptions.skipUU = true //vi navigerer ut av appen i denne testen

            await page.goto('/syk/sykepengesoknad?testperson=to-usendte-sykmeldinger')
            await trykkPaSoknadMedId(page, toUsendteSykmeldinger.soknader[0].id)

            await expect(
                page.getByText(
                    'Du har to sykmeldinger du må velge om du skal bruke, før du kan begynne på denne søknaden.',
                ),
            ).toBeVisible()

            const sykmeldingerKnapp = page.getByRole('button', { name: 'Gå til sykmeldingene' })
            await expect(sykmeldingerKnapp).toBeVisible()
            await expect(page.getByText('Gå til sykmeldingen', { exact: true })).toBeHidden()
            await validerAxeUtilityWrapper(page, test.info())

            await sykmeldingerKnapp.click()
            await expect(page).toHaveURL(/\/sykmeldinger$/)
        })
    })
})
