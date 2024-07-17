export const setPeriodeFraTil = (fom: number, tom: number, periodeIndex = 0) => {
    // I en periodekomponent med en gitt ID er "fra og med" feltet det første feltet og "til og med" det andre feltet.
    // Henter periode komponentet med riktig id (inkludert 0, 1 osv for hvor i rekken det er)
    // Velger sa riktig kalender dato popup button for dag i måned.
    cy.get(`[data-cy="periode"]`).eq(periodeIndex).find('.navds-date__field-button').eq(0).click()
    cy.get(`[data-cy="periode"]`).eq(periodeIndex).find('.rdp-cell').contains(fom.toString()).click()
    cy.get(`[data-cy="periode"]`).eq(periodeIndex).find('.rdp-cell').contains(tom.toString()).click()
}

/**
 * @param name Navn på inputfeltet, tekst fra label tilhørende inputfeltet
 * @param verdi
 */
export function svarFritekst(name: string, verdi: string) {
    cy.findByRole('textbox', { name: name }).clear()
    cy.findByRole('textbox', { name: name }).type(verdi)
}

export function svarCombobox(
    name: string,
    verdi: string,
    autocompleteVerdi: string = verdi,
    fjernVerdi: boolean = false,
) {
    // Autocomplete
    cy.findByRole('combobox', { name: name }).type(verdi)
    cy.findByRole('combobox', { name: name }).should('have.value', autocompleteVerdi)

    // Valgt land vises
    cy.findByRole('combobox', { name: name }).realPress('Enter')
    cy.findByRole('combobox', { name: name }).should('have.value', '')
    if (!fjernVerdi) {
        cy.get('.navds-combobox__selected-options').contains(autocompleteVerdi)
    }
}

export function svarRadioGruppe(groupName: string, radioName: string) {
    cy.findByRole('group', { name: groupName }).findByRole('radio', { name: radioName }).check()
}

export function svarCheckboxGruppe(groupName: string, checkboxNames: string | string[]) {
    cy.findByRole('group', { name: groupName }).within(() => {
        if (Array.isArray(checkboxNames)) {
            checkboxNames.forEach((checkboxName) => {
                cy.findByRole('checkbox', { name: checkboxName }).check()
            })
        } else {
            cy.findByRole('checkbox', { name: checkboxNames }).check()
        }
    })
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
            name: /Jeg vet at jeg kan miste retten til/i,
        })
        .click()
    if (gåVidere) {
        klikkGaVidere()
    }
}

export function checkJegHarLestOgSend() {
    cy.get('form')
        .findByRole('checkbox', {
            name: 'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.',
        })
        .click()

    cy.findByRole('button', { name: 'Send søknaden' }).click()
}

export function neiOgVidere(titler: string[]) {
    for (let i = 0; i < titler.length; i++) {
        cy.get('h2').contains(titler[i]).should('be.visible')
        svarNeiHovedsporsmal()
        klikkGaVidere()
    }
}

export function velgDato(dato = 10) {
    const className = '.navds-date__field-button'

    cy.get(className).first().click()
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

export function harFeilISkjemaet(feilmelding: string) {
    harFlereFeilISkjemaet(1, [feilmelding])
}

export function harFlereFeilISkjemaet(antall: number, feilmelding: string[]) {
    cy.get('form')
        .findByRole('alert')
        .within(() => {
            cy.findByRole('region', { name: `Det er ${antall} feil i skjemaet` })
                .should('be.visible')
                .within(() => {
                    cy.findByRole('heading', { name: `Det er ${antall} feil i skjemaet`, level: 2 }).scrollIntoView()
                    feilmelding.forEach((melding) => cy.contains(melding).should('be.visible'))
                })
        })
}

export function svarRadioSporsmal(sporsmal: string, svar: string) {
    cy.get('form').within(() => {
        cy.findByRole('group', { name: sporsmal })
            .should('be.visible')
            .within(() => {
                cy.findByRole('radio', { name: svar }).scrollIntoView()
                cy.findByRole('radio', { name: svar }).click()
            })
    })
}

export function svarDato(sporsmal: string, svar: string) {
    cy.get('form').within(() => {
        cy.findByRole('textbox', { name: sporsmal }).type(svar)
    })
}

export function svarCheckboxSporsmal(sporsmal: string, svar: string) {
    cy.get('form').within(() => {
        cy.findByRole('group', { name: sporsmal })
            .should('be.visible')
            .within(() => {
                cy.findByRole('checkbox', { name: svar }).scrollIntoView()
                cy.findByRole('checkbox', { name: svar }).click()
            })
    })
}

export function avbryterSoknad() {
    // Avbryt dialog vises
    cy.contains('Jeg har ikke behov for denne søknaden').as('avbrytSoknad').should('be.visible')
    cy.get('@avbrytSoknad').click()
    modalAktiv()
    cy.contains('Nei, jeg har behov for søknaden').should('be.visible')
    cy.findByRole('button', { name: 'Nei, jeg har behov for søknaden' }).click()
    modalIkkeAktiv()
    cy.contains('Nei, jeg har behov for søknaden').should('not.be.visible')
    cy.contains('Jeg har ikke behov for denne søknaden').should('be.visible').click()
    modalAktiv()
    cy.contains('Fjerner du søknaden vil du ikke få sykepenger basert på denne søknaden.').should('be.visible')
    cy.contains('Ja, jeg er sikker').should('be.visible')

    cy.findByRole('button', { name: 'Ja, jeg er sikker' }).click()
    modalIkkeAktiv()
}
