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
    cy.get(`[data-cy="${tag}"]`).type(verdi)
}

export function svarJaHovedsporsmal() {
    cy.get('.radioGruppe-jaNei input[value=JA]').click({ force: true })
}

export function svarNeiHovedsporsmal() {
    cy.get('.radioGruppe-jaNei input[value=NEI]').click({ force: true })
}

export function velgLand(land: string) {
    cy.get('.skjemaelement__input').type(land)
    cy.contains(land).click({ force: true })
}

export function svarCheckboxPanel() {
    cy.get('.navds-checkbox__label').click({ force: true })
}
