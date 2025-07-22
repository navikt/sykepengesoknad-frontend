import { delvisUtfylltArbeidsledig } from '../src/data/mock/data/soknad/soknader-integration'

import { test, expect } from './fixtures'
import { klikkTilbake, trykkPaSoknadMedId } from './utilities'

test('Tester delvis utfylt søknad', async ({ page }) => {
    const delvisUtfyltSoknad = delvisUtfylltArbeidsledig

    await test.step('Navigerer til søknadssiden', async () => {
        await page.goto('/syk/sykepengesoknad?testperson=integrasjon-soknader')
        await expect(page.getByRole('heading', { level: 1, name: 'Søknader' })).toBeVisible()
    })

    await test.step('Går til første ubesvarte spørsmål', async () => {
        await trykkPaSoknadMedId(page, delvisUtfyltSoknad.id)
        await expect(page).toHaveURL(new RegExp(`${delvisUtfyltSoknad.id}/3`))

        await expect(page.getByRole('radio', { name: 'Ja' })).not.toBeChecked()
        await expect(page.getByRole('radio', { name: 'Nei' })).not.toBeChecked()
    })

    await test.step('Forrige spørsmål er besvart', async () => {
        await klikkTilbake(page)
        await expect(page.getByRole('heading', { level: 2, name: 'Arbeid utenfor Norge' })).toBeVisible()
        await expect(page.getByRole('radio', { name: 'Nei' })).toBeChecked()
    })
})
