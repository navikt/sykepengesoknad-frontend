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

export function svarFritekst(name: string, verdi: string) {
    cy.findByRole('textbox', { name: name }).clear()
    cy.findByRole('textbox', { name: name }).type(verdi)
}

export function svarCombobox(name: string, verdi: string, autocompleteVerdi: string = verdi) {
    // Autocomplete
    cy.findByRole('combobox', { name: name }).type(verdi)
    cy.findByRole('combobox', { name: name }).should('have.value', autocompleteVerdi)

    // Valgt land vises
    cy.findByRole('combobox', { name: name }).realPress('Enter')
    cy.findByRole('combobox', { name: name }).should('have.value', '')
    cy.get('.navds-combobox__selected-options').contains(autocompleteVerdi)
}

export function svarRadioGruppe(groupName: string, radioName: string) {
    cy.findByRole('group', { name: groupName }).findByRole('radio', { name: radioName }).check()
}

export function svarJaHovedsporsmal() {
    cy.get('form').findAllByRole('radio', { name: 'Ja' }).first().click()
    cy.get('form').findAllByRole('radio', { name: 'Ja' }).first().should('be.checked')
}

export function svarNeiHovedsporsmal() {
    cy.get('form').findAllByRole('radio', { name: 'Nei' }).first().click()
    cy.get('form').findAllByRole('radio', { name: 'Nei' }).first().should('be.checked')
}

export function svarCheckboxPanel() {
    cy.get('.navds-checkbox__label').click()
}

export function checkViStolerPåDeg(gåVidere = true) {
    cy.get('form')
        .findByRole('checkbox', {
            name: 'Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige. Jeg vet også at NAV kan holde igjen eller kreve tilbake penger, og at å gi feil opplysninger kan være straffbart.',
        })
        .click()
    if (gåVidere) {
        klikkGaVidere()
    }
}

export function neiOgVidere(titler: string[]) {
    for (let i = 0; i < titler.length; i++) {
        cy.contains(titler[i]).should('be.visible')
        svarNeiHovedsporsmal()
        klikkGaVidere()
    }
}

export function velgDato(dato = 10) {
    const className = '.navds-date__field-button'

    cy.get(className).click()
    cy.get('.rdp-day').contains(dato).first().click()
}

export function klikkGaVidere(forventFeil = false) {
    // Få nåværende URL
    cy.url().then((currentUrl) => {
        // Trekke ut det nåværende path parameteret
        const currentPathParam = parseInt(currentUrl.split('/').pop()!)

        // Klikke "Gå videre"-knappen
        cy.findByRole('button', { name: 'Gå videre' }).click()
        if (forventFeil) return
        // Vent til URL har endret seg
        cy.url().should('not.eq', currentUrl)

        // Sjekke om path parameteret er økt med 1
        cy.url().then((newUrl) => {
            const newPathParam = parseInt(newUrl.split('/').pop()!)
            expect(newPathParam).to.eq(currentPathParam + 1)
        })
        sjekkMainContentFokus()
    })
}

export function sjekkMainContentFokus() {
    // eslint-disable-next-line cypress/unsafe-to-chain-command
    cy.focused().should('have.id', 'maincontent')
}

export function modalAktiv() {
    cy.get('body').should('have.css', 'overflow', 'hidden')
}
export function modalIkkeAktiv() {
    cy.get('body').should('not.have.css', 'overflow', 'hidden')
}

export function besvarKjenteInntektskilder() {
    const utførtTekst = 'Har du utført noe arbeid ved Ruter i perioden 28. juli - 11. august 2021?'
    cy.contains(utførtTekst).should('not.exist')
    cy.get('#de67459c-c81b-3fd2-b881-be3031e19850').check()
    cy.contains(utførtTekst).should('be.visible')
    cy.get('#350e754c-32ae-315d-963b-9f9dfaad2bd0').check()
    cy.contains(utførtTekst).should('not.exist')
    velgDato(2)
    cy.get('#de67459c-c81b-3fd2-b881-be3031e19851').check()
    cy.get('#1df39124-4883-3b38-9ddb-52a2ac378031_0').check()
    cy.get('#de67459c-c81b-3fd2-b881-be3031e19852').click()
    cy.get('#1df39124-4883-3b38-9ddb-52a2ac378032_1').click()
    cy.get('#7057edf4-8809-3a3c-9bdf-10f65259f822').click()
    cy.contains('Gå videre').click()
}
