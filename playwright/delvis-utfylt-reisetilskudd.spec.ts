import { delvisUtfyltReisetilskudd } from '../src/data/mock/data/personas/reisetilskuddTestPerson'

import { test, expect } from './fixtures'
import { harSoknaderlisteHeading, klikkTilbake, trykkPaSoknadMedId } from './utilities'

test.describe('Delvis utfylt søknad med reisetilskudd', () => {
    test('Full testflyt for delvis utfylt søknad', async ({ page }) => {
        await test.step('Navigerer til søknadssiden', async () => {
            await page.goto('/syk/sykepengesoknad?testperson=reisetilskudd-test')
            await harSoknaderlisteHeading(page)
        })

        await test.step('Går til første ubesvarte spørsmål', async () => {
            await trykkPaSoknadMedId(page, delvisUtfyltReisetilskudd.id)
            await expect(page).toHaveURL(new RegExp(`${delvisUtfyltReisetilskudd.id}/6`))
        })

        await test.step('Forrige spørsmål er besvart', async () => {
            await klikkTilbake(page)
            const radioButton = page.locator('form').getByRole('radio', { name: 'Nei' }).first()
            await expect(radioButton).toBeChecked()
        })

        await test.step('Side for opplasting av kvitteringer er ikke besvart', async () => {
            await klikkTilbake(page)
            await expect(page.getByText('Beløp')).toBeHidden()
        })
    })
})
