export const setPeriodeFraTil = (fom: number, tom: number, periodeIndex = 0) => {
    // i periode komponentet med en gitt ID er fra og med feltet det første og til og med det andre
    // henter periode komponentet med riktig id (inkludert 0, 1 osv for hvor i rekken det er)
    // velger sa riktig kalender dato popup button for dag i mnd

    cy.get(`[data-cy="periode"]`).eq(periodeIndex).find('.navds-date__field-button').eq(0).click()
    cy.get('.rdp-day').contains(fom.toString()).click()
    cy.get(`[data-cy="periode"]`).eq(periodeIndex).find('.navds-date__field-button').eq(0).click() // klikk igjen for å lukke

    cy.get(`[data-cy="periode"]`).eq(periodeIndex).find('.navds-date__field-button').eq(1).click()
    cy.get('.rdp-day').contains(tom.toString()).click()
}

export function svarFritekst(tag: string, verdi: string) {
    cy.get(`[data-cy="${tag}"]`).clear()
    cy.get(`[data-cy="${tag}"]`).type(verdi)
}

export function svarJaHovedsporsmal() {
    cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()
}

export function svarNeiHovedsporsmal() {
    cy.get('[data-cy="ja-nei-stor"] input[value=NEI]').click()
}

export function velgLand(land: string) {
    cy.get('[data-cy="landvelger"] input[type="text"]').type(land)
    cy.contains(land).click()
}

export function svarCheckboxPanel() {
    cy.get('.navds-checkbox__label').click()
}

export function checkViStolerPåDeg() {
    cy.findByRole('checkbox', {
        name: 'Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige. Jeg vet også at NAV kan holde igjen eller kreve tilbake penger, og at å gi feil opplysninger kan være straffbart.',
    }).click()
}

export function velgDato(dato = 10) {
    const className = '.navds-date__field-button'

    cy.get(className).click()
    cy.get('.rdp-day').contains(dato).first().click()
}

export function klikkGaVidere() {
    // Få nåværende URL
    cy.url().then((currentUrl) => {
        // Trekke ut det nåværende path parameteret
        const currentPathParam = parseInt(currentUrl.split('/').pop()!)

        // Klikke "Gå videre"-knappen
        cy.contains('Gå videre').click()
        cy.findByRole('button', { name: 'Gå videre' }).click()

        // Vent til URL har endret seg
        cy.url().should('not.eq', currentUrl)

        // Sjekke om path parameteret er økt med 1
        cy.url().then((newUrl) => {
            const newPathParam = parseInt(newUrl.split('/').pop()!)
            expect(newPathParam).to.eq(currentPathParam + 1)
        })
    })
}
