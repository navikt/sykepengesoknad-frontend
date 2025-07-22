import { delvisUtfyltReisetilskudd } from '../src/data/mock/data/personas/reisetilskuddTestPerson'

import { test, expect } from './fixtures'
import { klikkTilbake, trykkPaSoknadMedId } from './utilities'

test('Tester delvis utfylt søknad med reisetilskudd', async ({ page }) => {
    await test.step('Navigerer til søknadssiden', async () => {
        await page.goto('/syk/sykepengesoknad?testperson=reisetilskudd-test')
        await expect(page.getByRole('heading', { level: 1, name: 'Søknader' })).toBeVisible()
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
        await expect(page.getByText('Beløp')).not.toBeVisible()
    })
})
