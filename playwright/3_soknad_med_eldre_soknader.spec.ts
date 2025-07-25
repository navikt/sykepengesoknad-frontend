import { test, expect } from '@playwright/test'
import { svarNeiHovedsporsmal, klikkGaVidere } from './utilities'

test.describe('Eldre søknader', () => {
  test.describe('soknad med en eldre søknad', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/syk/sykepengesoknad?testperson=en-eldre-usendt-soknad')
    })

    test('Laster startside', async ({ page }) => {
      await expect(page.locator('.navds-heading--large')).toBeVisible()
      await expect(page.locator('.navds-heading--large')).toHaveText('Søknader')
      await page.locator(`a[href*="e6e53c43-3b64-48be-b9d1-39d95198e528"]`).click()
    })

    test('Viser advarsel om at det finnes eldre søknad', async ({ page }) => {
      // Repeat navigation to reach this state
      await expect(page.locator('.navds-heading--large')).toBeVisible()
      await expect(page.locator('.navds-heading--large')).toHaveText('Søknader')
      await page.locator(`a[href*="e6e53c43-3b64-48be-b9d1-39d95198e528"]`).click()

      await expect(page).toHaveURL(/e6e53c43-3b64-48be-b9d1-39d95198e528\/1/)

      await expect(page.getByText('Du har en eldre søknad du må velge om du skal bruke, før du kan begynne på denne.')).toBeVisible()

      await page.getByText('Gå til eldste søknad').click()
    })

    test('Vi ender på den eldste søknaden', async ({ page }) => {
      // Repeat navigation to reach this state
      await expect(page.locator('.navds-heading--large')).toBeVisible()
      await expect(page.locator('.navds-heading--large')).toHaveText('Søknader')
      await page.locator(`a[href*="e6e53c43-3b64-48be-b9d1-39d95198e528"]`).click()
      await page.getByText('Gå til eldste søknad').click()

      await expect(page).toHaveURL(/e6e53c43-3b64-48be-b9d1-39d95198e523\/1/)
    })
  })

  test.describe('soknad med to eldre søknad', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/syk/sykepengesoknad?testperson=to-eldre-usendte-soknader')
    })

    test('Laster startside', async ({ page }) => {
      await expect(page.locator('.navds-heading--large')).toBeVisible()
      await expect(page.locator('.navds-heading--large')).toHaveText('Søknader')
      await page.locator(`a[href*="e6e53c43-3b64-48be-b9d1-39d95198e521"]`).click()
    })

    test('Viser advarsel om at det finnes eldre søknader', async ({ page }) => {
      // Repeat navigation to reach this state
      await expect(page.locator('.navds-heading--large')).toBeVisible()
      await expect(page.locator('.navds-heading--large')).toHaveText('Søknader')
      await page.locator(`a[href*="e6e53c43-3b64-48be-b9d1-39d95198e521"]`).click()

      await expect(page).toHaveURL(/e6e53c43-3b64-48be-b9d1-39d95198e521\/1/)

      await expect(page.getByText('Du har to eldre søknader du må velge om du skal bruke, før du kan begynne på denne.')).toBeVisible()

      await page.getByText('Gå til eldste søknad').click()
    })

    test('Vi ender på den eldste søknaden', async ({ page }) => {
      // Repeat navigation to reach this state
      await expect(page.locator('.navds-heading--large')).toBeVisible()
      await expect(page.locator('.navds-heading--large')).toHaveText('Søknader')
      await page.locator(`a[href*="e6e53c43-3b64-48be-b9d1-39d95198e521"]`).click()
      await page.getByText('Gå til eldste søknad').click()

      await expect(page).toHaveURL(/e6e53c43-3b64-48be-b9d1-39d95198e529\/1/)
    })

    test('Vi har lenke til neste søknad', async ({ page }) => {
      // Repeat navigation and fill out first søknad to reach this state
      await expect(page.locator('.navds-heading--large')).toBeVisible()
      await expect(page.locator('.navds-heading--large')).toHaveText('Søknader')
      await page.locator(`a[href*="e6e53c43-3b64-48be-b9d1-39d95198e521"]`).click()
      await page.getByText('Gå til eldste søknad').click()
      await fyllUtSoknad(page)

      await expect(page.getByText('Du har to søknader du må velge om du skal bruke.')).toBeVisible()
      await page.getByText('Gå til neste søknad').click()
    })

    test('Vi har lenke til neste søknad (second)', async ({ page }) => {
      // Repeat navigation and fill out first two søknader to reach this state
      await expect(page.locator('.navds-heading--large')).toBeVisible()
      await expect(page.locator('.navds-heading--large')).toHaveText('Søknader')
      await page.locator(`a[href*="e6e53c43-3b64-48be-b9d1-39d95198e521"]`).click()
      await page.getByText('Gå til eldste søknad').click()
      await fyllUtSoknad(page)
      await page.getByText('Gå til neste søknad').click()
      await fyllUtSoknad(page)

      await expect(page.getByText('Du har en søknad du må velge om du skal bruke.')).toBeVisible()
      await page.getByText('Gå til søknaden').click()
    })

    test('Siden har en Ferdig-knapp', async ({ page }) => {
      // Repeat navigation and fill out all three søknader to reach this state
      await expect(page.locator('.navds-heading--large')).toBeVisible()
      await expect(page.locator('.navds-heading--large')).toHaveText('Søknader')
      await page.locator(`a[href*="e6e53c43-3b64-48be-b9d1-39d95198e521"]`).click()
      await page.getByText('Gå til eldste søknad').click()
      await fyllUtSoknad(page)
      await page.getByText('Gå til neste søknad').click()
      await fyllUtSoknad(page)
      await page.getByText('Gå til søknaden').click()
      await fyllUtSoknad(page)

      await expect(page.getByRole('button', { name: 'Ferdig' })).toBeVisible()
    })
  })
})

async function fyllUtSoknad(page: any) {
  await page.getByText('Jeg bekrefter at jeg vil svare så riktig som jeg kan.').click()

  await page.getByText('Start søknad').click()

  await svarNeiHovedsporsmal(page)
  await klikkGaVidere(page)

  await page.getByText('Send søknaden').click()
}