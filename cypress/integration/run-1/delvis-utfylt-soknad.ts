import {
    delvisUtfylltArbeidsledig,
    selvstendigKvittering,
} from '../../../src/data/mock/data/soknader-integration'
import { tekst } from '../../../src/utils/tekster'

describe('Tester delvis utfylt søknad', () => {
    const delvisUtfyltSoknad = delvisUtfylltArbeidsledig
    const ikkeUtfyltSoknad = selvstendigKvittering

    before(() => {
        cy.visit('http://localhost:8080/syk/sykepengesoknad')
    })

    it('Henter liste med søknader', () => {
        cy.get('.navds-heading--xlarge')
            .should('be.visible')
            .and('have.text', 'Søknader')
    })

    it('En ikke påbegynt søknad er ikke markert som delvis utfylt', () => {
        cy.get(
            `#soknader-list-til-behandling article a[href*=${ikkeUtfyltSoknad.id}] .inngangspanel__status`
        ).should('not.exist')
    })

    it('En påbegynt søknad er markert med delvis utfylt label', () => {
        cy.get(
            `#soknader-list-til-behandling article a[href*=${delvisUtfyltSoknad.id}] .inngangspanel__status`
        ).contains(tekst('soknad.teaser.delvis-utfylt.tekst'))
    })

    it('Går til første ubesvarte spørsmål', () => {
        cy.get(
            `#soknader-list-til-behandling article a[href*=${delvisUtfyltSoknad.id}]`
        ).click()
        cy.url().should('include', `${delvisUtfyltSoknad.id}/4`)
        cy.get('.inputPanel').should('not.be.checked')
    })

    it('Forrige spørsmål er besvart', () => {
        cy.contains('Tilbake').click()
        cy.url().should('include', `${delvisUtfyltSoknad.id}/3`)
        cy.get('.inputPanel--checked').contains('Ja')
        cy.get('.skjemaelement__label').contains('Fra og med')
        cy.get('.skjemaelement__label').contains('Til og med')
    })
})
