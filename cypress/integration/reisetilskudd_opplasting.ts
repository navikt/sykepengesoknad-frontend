import { nyttReisetilskudd } from '../../src/data/mock/data/reisetilskudd'

describe('Tester utfylling av kvittering', () => {
    const reisetilskudd = nyttReisetilskudd

    before(() => {
        cy.visit(`http://localhost:8080/soknader/${reisetilskudd.id}/4`)
    })

    describe('Opplasting reisetilskudd', () => {
        it('URL er riktig', () => {
            cy.url().should('include', `/soknader/${reisetilskudd.id}/4`)
        })

        it('Laster inn veilederpanel spar-tid', () => {
            cy.get('.spar-tid').should('be.visible')
            cy.get('.spar-tid .nav-veilederpanel__content h2').should('be.visible').and('have.text', 'Spar tid med mobilen')
            cy.get('.spar-tid .nav-veilederpanel__content').contains('Fyller du ut fra telefonen, kan du ta bilde av kvitteringene og bruke dem direkte i søknaden.')
        })

        it('Legger inn taxi kvittering', () => {
            cy.get('.fler-vedlegg').click()

            cy.contains('Legg til reiseutgift')

            cy.get('select[name=transportmiddel]').select('TAXI')

            cy.get('input[name=belop_input]').type('1234')

            cy.get('.filopplasteren input[type=file]').attachFile('kvittering.jpg')

            cy.get('.lagre-kvittering')
                .contains('Bekreft')
                .click()
        })

        it('Fil list oppdateres med kvittering', () => {
            cy.get('.fil_liste')

            cy.get('.transport').contains('Taxi')
            cy.get('.belop').contains('1 234 kr')

            cy.get('.sumlinje').contains('1 utgifter på til sammen')
            cy.get('.sumlinje .belop').contains('1 234 kr')
        })

        it('Endring av kvittering',  () => {
            cy.contains('Taxi').click()
            cy.contains('Endre reiseutgift')
            cy.get('.alertstripe--info').contains('Du kan foreløpig ikke redigere utgifter som du har lagt til. Men du kan slette den som er feil, og legge inn på nytt.')
            cy.get('select[name=transportmiddel]').should('have.attr', 'disabled')
            cy.get('input[name=belop_input]').should('have.attr', 'disabled')
            cy.get('.filopplasteren input[type=file]').should('not.exist')
            cy.get('.knapperad').within(() => {
                cy.contains('Tilbake')
                cy.contains('Slett')
                cy.contains('Bekreft').should('not.exist')
            })
            cy.get('.lukknapp').click()
        })

        it('Åpner og lukker modal', () => {
            cy.get('.fler-vedlegg').click()
            cy.get('.lagre-kvittering').contains('Tilbake').click()
        })

        it('Feilmeldinger når ingenting er valgt', () => {
            cy.get('.fler-vedlegg').click()
            cy.get('.lagre-kvittering').contains('Bekreft').click()

            cy.get('.skjemaelement__feilmelding').contains('Du må velge transportmiddel')
            cy.get('.skjemaelement__feilmelding').contains('Du må skrive inn beløp')
            cy.get('.skjemaelement__feilmelding').contains('Du må laste opp kvittering')
        })

        describe('Transportmiddel feilmeldinger', () => {
            it('Ugyldig valg', () => {
                cy.get('select[name=transportmiddel]').select('')
                cy.get('.lagre-kvittering').contains('Bekreft').click()
                cy.get('.skjemaelement__feilmelding').contains('Du må velge transportmiddel')
            })

            it('Velger egen bil', () => {
                cy.get('select[name=transportmiddel]').should('have.class', 'skjemaelement__input--harFeil')
                cy.get('select[name=transportmiddel]').select('TAXI')
                cy.get('.lagre-kvittering').contains('Bekreft').click()
                cy.get('select[name=transportmiddel]').should('not.have.class', 'skjemaelement__input--harFeil')
            })
        })

        describe('Beløp feilmeldinger', () => {
            it('Negative beløp', () => {
                cy.get('input[name=belop_input]').type('-100')
                cy.get('.lagre-kvittering').contains('Bekreft').click()
                cy.get('.skjemaelement__feilmelding').contains('Beløp kan ikke være negativt')
            })

            it('Høyere beløp enn maks', () => {
                cy.get('input[name=belop_input]').clear().type('1000000000')
                cy.get('.lagre-kvittering').contains('Bekreft').click()
                cy.get('.skjemaelement__feilmelding').contains('Beløp kan ikke være større enn 10 000')
            })

            it('Kan ikke skrive inn med 3 desimaler', () => {
                cy.get('input[name=belop_input]').clear().type('100.253')
                cy.get('.lagre-kvittering').contains('Bekreft').click()
                cy.get('input[name=belop_input]').invoke('val').should((val) => {
                    expect(val).to.be.eq('100.25')
                })
            })

            it('Gyldig beløp med 2 desimaler', () => {
                cy.get('input[name=belop_input]').clear().type('100.30')
                cy.get('.lagre-kvittering').contains('Bekreft').click()
                cy.get('input[name=belop_input]').should('not.have.class', 'skjemaelement__input--harFeil')
            })

            it('Gyldig beløp uten desimaler', () => {
                cy.get('input[name=belop_input]').clear().type('99')
                cy.get('.lagre-kvittering').contains('Bekreft').click()
                cy.get('input[name=belop_input]').should('not.have.class', 'skjemaelement__input--harFeil')
            })
        })

        describe('Kvittering feilmeldinger', () => {
            it('Legger inn gyldig kvittering', () => {
                cy.get('.filopplasteren input[type=file]').attachFile('kvittering.jpg')
                cy.get('.lagre-kvittering').contains('Bekreft').click()
            })
        })
    })

})
