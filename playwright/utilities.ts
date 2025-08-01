import { expect, Locator, Page } from '@playwright/test'

export async function checkViStolerPaDeg(page: Page, gaVidere = true) {
    const checkbox = page
        .locator('form')
        .getByRole('checkbox', { name: 'Jeg bekrefter at jeg vil svare så riktig som jeg kan.' })
    await checkbox.click()

    if (gaVidere) {
        await expect(page.getByRole('button', { name: 'Start søknad' })).toBeVisible()
        await page.getByRole('button', { name: 'Start søknad' }).click()
    }
}

export async function svarJaHovedsporsmal(page: Page) {
    const radioButton = page.locator('form').getByRole('radio', { name: 'Ja' }).first()
    await radioButton.click()
    await expect(radioButton).toBeChecked()
}

export async function svarNeiHovedsporsmal(page: Page) {
    const radioButton = page.locator('form').getByRole('radio', { name: 'Nei' }).first()
    await radioButton.click()
    await expect(radioButton).toBeChecked()
}

export async function neiOgVidere(page: Page, titler: string[]) {
    for (let i = 0; i < titler.length; i++) {
        await harSynligTittel(page, titler[i], 2)
        await svarNeiHovedsporsmal(page)
        await klikkGaVidere(page)
    }
}

export async function klikkGaVidere(page: Page, forventFeil = false, skipFocusCheck = false) {
    const currentUrl = page.url()

    const currentPathParam = parseInt(currentUrl.split('/').pop()!)

    const nextButton = page.getByRole('button', { name: 'Gå videre' })
    await nextButton.click()

    if (forventFeil) return

    await page.waitForURL((url) => url.toString() !== currentUrl)

    const newUrl = page.url()

    const newPathParam = parseInt(newUrl.split('/').pop()!)

    expect(newPathParam).toBe(currentPathParam + 1)

    if (!skipFocusCheck) {
        await sjekkMainContentFokus(page)
    }
}

export async function sjekkMainContentFokus(page: Page) {
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toHaveAttribute('id', 'maincontent')
}

export async function svarCombobox(
    page: Page,
    // Same signaturar som i Cypress-funksjonen:
    name: string,
    verdi: string,
    autocompleteVerdi: string = verdi,
    fjernVerdi: boolean = false,
) {
    const comboBox = page.getByRole('combobox', { name })
    await comboBox.fill(verdi)
    await expect(comboBox).toHaveValue(autocompleteVerdi)

    await comboBox.press('Enter')

    // Verifiser at comboboxen no er tømt
    await expect(comboBox).toHaveValue('')

    //Lukker listen
    await page.locator('.navds-combobox__button-toggle-list').click()

    // Dersom vi ikkje skal fjerne verdien, sjekk at ho er synleg i den valde-lista
    if (!fjernVerdi) {
        await expect(page.locator('.navds-combobox__selected-options')).toContainText(autocompleteVerdi)
    }
}

// Eksempel på korleis du kan implementere desse hjelpefunksjonane:
async function modalIkkeAktiv(page: Page) {
    // Til dømes: vent på at eit modal-element ikkje er synleg
    await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden')
}

async function modalAktiv(page: Page) {
    await expect(page.locator('body')).toHaveCSS('overflow', 'hidden')
}

export async function avbryterSoknad(page: Page) {
    // 1. Avbryt-knappen er synleg før modalen er aktiv
    await modalIkkeAktiv(page)

    await expect(page.getByRole('button', { name: 'Jeg vil slette denne søknaden' })).toBeVisible()
    await page.getByRole('button', { name: 'Jeg vil slette denne søknaden' }).click()

    // 2. No er modalen aktiv, og me ser 'Nei, jeg har behov for søknaden'
    await modalAktiv(page)
    await expect(page.getByText('Nei, jeg har behov for søknaden')).toBeVisible()
    await page.getByRole('button', { name: 'Nei, jeg har behov for søknaden' }).click()

    // 3. Modalen skal vere «lukka» igjen
    await modalIkkeAktiv(page)
    await expect(page.getByText('Nei, jeg har behov for søknaden')).toBeHidden()

    // 4. Klikk på 'Jeg vil slette denne søknaden' endå ein gong
    await expect(page.getByRole('button', { name: 'Jeg vil slette denne søknaden' })).toBeVisible()
    await page.getByRole('button', { name: 'Jeg vil slette denne søknaden' }).click()

    // 5. Ny modalvising med ekstra tekst
    await modalAktiv(page)
    await expect(
        page.getByText('Fjerner du søknaden vil du ikke få sykepenger basert på denne søknaden.'),
    ).toBeVisible()
    await expect(page.getByText('Ja, jeg er sikker')).toBeVisible()

    // 6. Klikk på «Ja, jeg er sikker»
    await page.getByRole('button', { name: 'Ja, jeg er sikker' }).click()
    await modalIkkeAktiv(page)
}

export async function klikkTilbake(page: Page) {
    // 1. Hent nåværende URL
    const currentUrl = page.url()
    // Eksempel på å hente ut siste del av URL-en (f.eks. path param)
    const currentPathParam = parseInt(currentUrl.split('/').pop() ?? '', 10)

    // 2. Klikk på knappen 'Tilbake'
    await page.getByRole('button', { name: 'Tilbake' }).click()

    // 3. Vent til URL faktisk har endret seg
    //    (dvs. ikke lenger er lik currentUrl)
    await page.waitForURL((url) => url.toString() !== currentUrl)

    // 4. Sjekk at path-parametret er redusert med 1
    const newUrl = page.url()
    const newPathParam = parseInt(newUrl.split('/').pop() ?? '', 10)
    expect(newPathParam).toBe(currentPathParam - 1)

    // 5. Kall en eventuell hjelpefunksjon for å sjekke fokus
    await sjekkMainContentFokus(page)
}

export async function setPeriodeFraTil(page: Page, fom: number, tom: number, periodeIndex = 0) {
    // 1. Finn riktig periodekomponent ut frå data-cy="periode"
    const periodeLocator = page.locator('[data-cy="periode"]').nth(periodeIndex)

    // 2. Klikk på kalender-knappen ("fra og med"-felt)
    await periodeLocator.locator('.navds-date__field-button').nth(0).click()

    // 3. Velg dato for fra- og til-dag i kalenderen
    //    Her brukar me `locator('.rdp-cell', { hasText: ... })` for å finne elementet
    await periodeLocator.locator('.rdp-cell', { hasText: fom.toString() }).click()
    await periodeLocator.locator('.rdp-cell', { hasText: tom.toString() }).click()
}

export async function svarRadioGruppe(page: Page, groupName: string | RegExp, radioName: string) {
    // Finn riktig "gruppe" med groupName
    const group = page.getByRole('group', { name: groupName })

    // Finn riktig radio-knapp med radioName og "check" den
    await group.getByRole('radio', { name: radioName }).check()
}

export async function svarFritekst(page: Page, name: string, verdi: string) {
    const textbox = page.getByRole('textbox', { name })
    await textbox.clear()
    await textbox.fill(verdi)
}

export async function sporsmalOgSvar(container: Locator, sporsmal: string, svar: string) {
    // 1. Finn elementet med teksten `sporsmal` *innenfor* container
    const sporsmalLocator = container.getByText(sporsmal)

    // 2. Hent søsknene (i DOM-en) som kommer etter spørsmåls-elementet
    const siblingLocator = sporsmalLocator.locator('xpath=following-sibling::*')

    // 3. Sjekk at minst ett av søskenelementene inneholder `svar`
    await expect(siblingLocator.filter({ hasText: svar })).toBeVisible()
}

export async function harSynligTittel(page: Page, tittelTekst: string, level: number, exact: boolean = false) {
    const locator = page.getByRole('heading', { level, name: tittelTekst, exact: exact })
    await expect(locator).toBeVisible()
    return locator
}

export async function harSynligTekst(page: Page, tekst: string | RegExp) {
    const locator = page.getByText(tekst)
    await expect(locator).toBeVisible()
    return locator
}

export async function fjernAnimasjoner(page: Page) {
    await page.addStyleTag({
        content: `*,
*::before,
*::after {
  transition: none !important;
  animation: none !important;
}`,
    })
}

export const trykkPaSoknadMedId = async (page: Page, soknadId: string) => {
    await page.locator(`a[href*="${soknadId}"]`).click()
}

export const harSoknaderlisteHeading = async (page: Page) => {
    return harSynligTittel(page, 'Søknader', 1)
}
