import { arbeidstaker } from '../../src/data/mock/data/soknader-opplaering'

describe('Tester ettersending og korrigering', () => {
    //-----
    // Sykmelding: 7e90121c-b64b-4a1c-b7a5-93c9d95aba47, arbeidstaker - 100%
    // Søknad: faba11f5-c4f2-4647-8c8a-58b28ce2f3ef, fom: 1.4.20, tom: 24.4.20
    //-----
    const soknad = arbeidstaker

    before(() => {
        cy.visit('http://localhost:8080')
    })

    it('Laster startside', function() {
        cy.get('.typo-sidetittel').should('be.visible').and('have.text', 'Søknader om sykepenger')
        cy.get(`#soknader-list-til-behandling article a[href*=${soknad.id}]`).click()
    })


    it('Svar på søknad', function() {
        cy.url().should('include', `${soknad.id}/1`)
        cy.get('.skjemaelement__label').click({ force: true })
        cy.contains('Gå videre').click()

        cy.url().should('include', `${soknad.id}/2`)
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })
        cy.contains('Velg første dag i permitteringen')
        cy.get('.undersporsmal .skjemaelement__input.form-control').focus()
        cy.get('.flatpickr-calendar').contains('20').click({ force: true })
        cy.contains('Gå videre').click()

        cy.url().should('include', `${soknad.id}/3`)
        cy.get('.inputPanelGruppe__inner label:nth-child(2) > input[value=NEI]').click({ force: true })
        cy.contains('Gå videre').click()

        cy.url().should('include', `${soknad.id}/4`)
        cy.get('.inputPanelGruppe__inner label:nth-child(2) > input[value=NEI]').click({ force: true })
        cy.contains('Gå videre').click()

        cy.url().should('include', `${soknad.id}/5`)
        cy.get('.inputPanelGruppe__inner label:nth-child(2) > input[value=NEI]').click({ force: true })
        cy.contains('Gå videre').click()

        cy.url().should('include', `${soknad.id}/6`)
        cy.get('.inputPanelGruppe__inner label:nth-child(2) > input[value=NEI]').click({ force: true })
        cy.contains('Gå videre').click()

        cy.url().should('include', `${soknad.id}/7`)
        cy.get('.inputPanelGruppe__inner label:nth-child(2) > input[value=NEI]').click({ force: true })
        cy.contains('Gå videre').click()

        cy.url().should('include', `${soknad.id}/8`)
        cy.get('.inputPanelGruppe__inner label:nth-child(2) > input[value=NEI]').click({ force: true })
        cy.contains('Gå videre').click()

        cy.url().should('include', `${soknad.id}/9`)
        cy.get('.inputPanelGruppe__inner label:nth-child(2) > input[value=NEI]').click({ force: true })
        cy.contains('Gå videre').click()

        cy.url().should('include', `${soknad.id}/10`)
        cy.get('.inputPanelGruppe__inner label:nth-child(2) > input[value=NEI]').click({ force: true })
        cy.contains('Gå videre').click()

        cy.url().should('include', `${soknad.id}/11`)
        cy.get('.skjemaelement__label').click({ force: true })
        cy.contains('Send søknaden').click()
    })

    it('Ettersend', () => {
        cy.url().should('include', `/kvittering/${soknad.id}`)

        // Sendt til
        cy.get('.kvittering .alertstripe--suksess')
            .should('contain', 'Søknaden er sendt til POSTEN NORGE AS, BÆRUM (Org.nr. 974654458)')
            .and('contain', 'Søknaden er sendt til NAV')

        // Ettersend
        cy.contains('Send til NAV').click()
        cy.contains('Hei! Du har allerede sendt denne søknaden og trenger ikke gjøre det på nytt.')
        cy.contains('Send søknaden likevel').click()
    })

    it('Korriger', () => {
        // Endre søknad
        cy.url().should('include', `/kvittering/${soknad.id}`)
        cy.contains('Endre søknad').click()

        // Ny søknad
        cy.url().should('not.include', `/kvittering/${soknad.id}`)
        cy.url().should('include', '/1')
        cy.get('.alertstripe--info')
            .should('contain', 'Rediger det som er feil i søknaden, og send den inn på nytt.')

        // ANSVARSERKLARING er resatt
        cy.get('.skjemaelement__input.checkboks[type=checkbox]').should('not.be.checked')
        cy.get('.skjemaelement__label').click({ force: true })
        cy.get('.skjemaelement__input.checkboks[type=checkbox]').should('be.checked')
        cy.contains('Gå videre').click()

        // Alle andre er satt
        cy.url().should('include', '/2')
        // TODO: Se på mulighet for at mock setter svar ved /korriger
    })

    it('Søknad har teaser', () => {
        cy.get('.brodsmuler__smuler .smule .lenke:contains(Søknader om sykepenger)').click()
        cy.get('.typo-sidetittel').should('be.visible').and('have.text', 'Søknader om sykepenger')

        cy.get(`#soknader-list-til-behandling article a[href*=${soknad.id}]`).should('not.exist')
        cy.get(`#soknader-sendt article a[href*=${soknad.id}]`)
            .should('contain', 'Gjelder perioden 1. – 24. april 2020')
            .and('contain', 'Sendt til POSTEN NORGE AS, BÆRUM og NAV')

        cy.get('#soknader-list-til-behandling article .inngangspanel__status')
            .should('contain', 'Utkast til endring')
    })
})
