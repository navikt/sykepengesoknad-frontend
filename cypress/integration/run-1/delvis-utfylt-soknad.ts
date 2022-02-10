import { delvisUtfylltArbeidsledig, selvstendigKvittering } from '../../../src/data/mock/data/soknader-integration'
import { tekst } from '../../../src/utils/tekster'

describe('Tester delvis utfylt søknad', () => {

    const delvisUtfyltSoknad = delvisUtfylltArbeidsledig
    const ikkeUtfyltSoknad = selvstendigKvittering

    before(() => {
        cy.visit('http://localhost:8080/syk/sykepengesoknad')
    })

    it('Laster startside', () => {
        cy.get('.typo-sidetittel').should('be.visible').and('have.text', 'Søknader')
    })

    it('Delvis utfylt søknad markert som delvis utfylt', () => {
        cy.get(`#soknader-list-til-behandling article a[href*=${delvisUtfyltSoknad.id}] .inngangspanel__status`)
            .contains(tekst('soknad.teaser.delvis-utfylt.tekst'))
    })

    it('Ny søknad er ikke markert som delvis utfylt', () => {
        cy.get(`#soknader-list-til-behandling article a[href*=${ikkeUtfyltSoknad.id}] .inngangspanel__status`)
            .should('not.exist')
        cy.get(`#soknader-list-til-behandling article a[href*=${delvisUtfyltSoknad.id}]`).click()
    })

    it('Søknad ANSVARSERKLARING - steg 1', () => {
        cy.url().should('include', `${delvisUtfyltSoknad.id}/1`)
        cy.contains('Gå videre').click()
    })

    it('Søknad ARBEID_UTENFOR_NORGE - Gå videre direkte - steg 2', () => {
        cy.url().should('include', `${delvisUtfyltSoknad.id}/2`)
        cy.get('.inputPanel--checked').contains('Nei')

        cy.contains('Gå videre').click()
    })

    it('Søknad PERMITTERT_PERIODE er utfylt med ja og periode - steg 2', () => {
        cy.url().should('include', `${delvisUtfyltSoknad.id}/3`)
        cy.get('.inputPanel--checked').contains('Ja')
        cy.get('.skjemaelement__label').contains('Fra og med')
        cy.get('.skjemaelement__label').contains('Til og med')
    })
})
