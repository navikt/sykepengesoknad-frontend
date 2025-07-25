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

export function checkViStolerPaDeg(gaVidere = true) {
    cy.get('form')
        .findByRole('checkbox', {
            name: /Jeg bekrefter at jeg vil svare så riktig som jeg kan./i,
        })
        .click()
    if (gaVidere) {
        cy.contains('Start søknad').click()
    }
}

export function heading(heading: string, level = 2) {
    return cy.get('body').findByRole('heading', {
        name: heading,
        level,
    })
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

export function klikkGaVidere(forventFeil = false, skipFocusCheck = false) {
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
        if (!skipFocusCheck) {
            sjekkMainContentFokus()
        }
    })
}

export function klikkTilbake() {
    // Få nåværende URL
    cy.url().then((currentUrl) => {
        // Trekke ut det nåværende path parameteret
        const currentPathParam = parseInt(currentUrl.split('/').pop()!)

        cy.findByRole('button', { name: 'Tilbake' }).click()
        // Vent til URL har endret seg
        cy.url().should('not.eq', currentUrl)

        // Sjekke om path parameteret er sunket med 1
        cy.url().then((newUrl) => {
            const newPathParam = parseInt(newUrl.split('/').pop()!)
            expect(newPathParam).to.eq(currentPathParam - 1)
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
            cy.findByRole('heading', { name: `Det er ${antall} feil i skjemaet`, level: 2 }).scrollIntoView()
            feilmelding.forEach((melding) => cy.contains(melding).should('be.visible'))
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
    modalIkkeAktiv()
    cy.contains('Jeg vil slette denne søknaden').as('avbrytSoknad').should('be.visible')
    cy.get('@avbrytSoknad').click()
    modalAktiv()
    cy.contains('Nei, jeg har behov for søknaden').should('be.visible')
    cy.findByRole('button', { name: 'Nei, jeg har behov for søknaden' }).click()
    modalIkkeAktiv()
    cy.contains('Nei, jeg har behov for søknaden').should('not.be.visible')
    cy.contains('Jeg vil slette denne søknaden').should('be.visible').click()
    modalAktiv()
    cy.contains('Fjerner du søknaden vil du ikke få sykepenger basert på denne søknaden.').should('be.visible')
    cy.contains('Ja, jeg er sikker').should('be.visible')

    cy.findByRole('button', { name: 'Ja, jeg er sikker' }).click()
    modalIkkeAktiv()
}

export function sjekkIntroside() {
    cy.contains(
        'Her kan du søke om sykepenger mens du er sykmeldt. Sykepenger skal erstatte inntekten din når du ikke kan jobbe som normalt, på grunn av din egen sykdom eller skade.',
    )
    cy.contains('For å lese mer om sykepenger, gå til nav.no/sykepenger')
        .children()
        .should('have.attr', 'href', 'https://www.nav.no/sykepenger')
    cy.contains('Før du søker')
    cy.contains('Meld fra til NAV her').and(
        'have.attr',
        'href',
        'https://innboks.nav.no/s/beskjed-til-oss?category=Beskjed-sykepenger',
    )
    cy.contains('Sjekk de oppdaterte saksbehandlingstidene').and(
        'have.attr',
        'href',
        'https://www.nav.no/saksbehandlingstider#sykepenger',
    )
    cy.contains('Hvordan behandler vi personopplysninger').click()
    cy.contains('Les mer om hvordan NAV behandler personopplysningene dine').and(
        'have.attr',
        'href',
        'https://www.nav.no/sykepenger-og-personopplysninger',
    )
    cy.contains('Vi lagrer svarene underveis').click()
    cy.contains(
        'Vi lagrer svarene dine mens du fyller ut, så du kan ta pauser underveis. Søknader som ikke blir sendt inn lagrer vi i 4 måneder før de slettes automatisk.',
    )
    cy.contains('Det er viktig at du gir oss riktige opplysninger slik at vi kan behandle saken din.')
    cy.contains('Les mer om viktigheten av å gi riktige opplysninger').and(
        'have.attr',
        'href',
        'https://www.nav.no/endringer',
    )
}

/**
 * Sjekker spørsmål og svar i oppsummeringen av søknaden
 * @returns svarElement som kan benyttes i underspørsmål
 */
export function sporsmalOgSvar(sporsmal: string, svar: string) {
    return cy.contains(sporsmal).siblings().should('contain', svar)
}

export function mainSkalHaHoyde(hoyde: number) {
    cy.get('main').should(($el) => {
        const mainHoyde = parseInt($el.css('height'), 10)
        expect(mainHoyde).to.equal(hoyde)
    })
}
