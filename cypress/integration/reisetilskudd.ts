import { nyttReisetilskudd } from '../../src/data/mock/data/reisetilskudd'

describe('Teste førsteside i reisetilskuddsøknaden', () => {


    before(() => {
        cy.visit('http://localhost:8080')
    })

    describe('Landingside og listevisning', () => {
        it('Laster startside', () => {
            cy.get('.typo-sidetittel').should('be.visible').and('have.text', 'Søknader')
        })

        it('Søknad har forventa tekst', () => {
            cy.get(`article[aria-labelledby*=${nyttReisetilskudd.id}]`)
                .should('include.text', 'Søknad om reisetilskudd')

        })

        it('Ved klikk så åpnes søknaden om reisetilskudd', () => {
            cy.get(`article[aria-labelledby*=${nyttReisetilskudd.id}]`).click()
            cy.url().should('equal', `http://localhost:8080/soknader/${nyttReisetilskudd.id}/1`)
        })

    })

    describe('Ansvarserklæring - Reisetilskudd', () => {
        it('URL er riktig', () => {
            cy.url().should('include', `/soknader/${nyttReisetilskudd.id}/1`)
        })

        it('Skal ha egen folketrygloven tekst', () => {
            cy.get('.nav-veilederpanel').contains('Ifølge folketrygdloven kan du få reisetilskudd hvis du har rett til sykepenger. Reisetilskuddet kommer da i stedet for sykepengene.')
        })

        it('Laster inn hvem kan få reisetilskudd', () => {
            cy.get('.om-reisetilskudd').should('be.visible')
            cy.get('.om-reisetilskudd .ekspanderbartPanel__tittel')
                .should('be.visible')
                .and('have.text', 'Om reisetilskudd')
                .click()
                .click()

            cy.get('.typo-element').contains('Hva dekker reisetilskuddet')
            cy.get('.typo-normal').contains('Reisetilskuddet dekker nødvendige ekstra reiseutgifter til og fra jobben mens du er syk, altså reiseutgifter utover det du har til vanlig.')

            cy.get('.typo-element').contains('De første 16 dagene')
            cy.get('.typo-element').contains('Legg ved kvitteringer')
            cy.get('.typo-normal').contains('Du må legge ved bilde av kvitteringene dine når du søker NAV om å dekke utgiftene. Fyller du ut fra telefonen, kan du ta bilde av kvitteringene og bruke dem direkte i søknaden.')
        })

        it('Bekrefter ansvarserklæring', () => {
            cy.get('.skjemaelement__label').click({ force: true })
            cy.contains('Gå videre').click()
        })
    })

    describe('Før du fikk sykmelding - Reisetilskudd', () => {
        it('URL er riktig', () => {
            cy.url().should('include', `/soknader/${nyttReisetilskudd.id}/2`)
            cy.get('.sporsmal__tittel').should('have.text', 'Før du fikk sykmelding')
        })

        it('Tester beløp valget', () => {
            cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })
            cy.get(':nth-child(2) > .skjemaelement__label').click({ force: true })
            cy.get('#5fb4961f-90d5-4893-9821-24b3a68cf3e1').focus().type('1000', { delay: 500, force: true })
            cy.get('#5fb4961f-90d5-4893-9821-24b3a68cf3e1').should('have.value', '1000')
            cy.contains('Gå videre').click()
        })

        it('Beløpet er riktig når vi går frem og tilbake', () => {
            cy.url().should('include', `${nyttReisetilskudd.id}/3`)
            cy.contains('Tilbake').click()
            cy.url().should('include', `${nyttReisetilskudd.id}/2`)
            cy.get('#5fb4961f-90d5-4893-9821-24b3a68cf3e1').should('have.value', '1000')

            cy.contains('Gå videre').click()
        })

    })

    describe('Reise med bil - Reisetilskudd', () => {
        it('URL er riktig', () => {
            cy.url().should('include', `/soknader/${nyttReisetilskudd.id}/3`)
            cy.get('.sporsmal__tittel').should('have.text', 'Reise med bil')
        })

        it('Fyller ut', () => {
            cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })
            cy.get('.undersporsmal > :nth-child(1)').should('have.text', 'Hvilke dager reiste du med bil?')
            cy.get('.undersporsmal > .kriterie--ja > h3').should('have.text', 'Hadde du utgifter til bompenger?')

            cy.get('.skjema__dager').contains('01').click({ force: true }) // alt dette er flaky >:(
            // cy.get('.skjema__dager').contains('04').click({ force: true })
            // cy.get('.skjema__dager').contains('05').click({ force: true })
            // cy.get('.skjema__dager').contains('06').click({ force: true })
            // cy.get('.skjema__dager').contains('07').click({ force: true })
            // cy.get('.skjema__dager').contains('10').click({ force: true })

            cy.get('.undersporsmal > .kriterie--ja > .radioContainer > input[value=JA]').click({ force: true })

            cy.get('#616cc0cb-434e-4114-a68b-b5708e033e9e').focus().type('1000')

            cy.contains('Gå videre').click()
        })

        it('Beløpet er riktig når vi går frem og tilbake', () => {
            cy.url().should('include', `${nyttReisetilskudd.id}/4`)
            cy.contains('Tilbake').click()
            cy.url().should('include', `${nyttReisetilskudd.id}/3`)
            cy.get('#616cc0cb-434e-4114-a68b-b5708e033e9e').should('have.value', '1000')

            cy.contains('Gå videre').click()
        })

    })

    describe('Opplasting - Reisetilskudd', () => {
        it('URL er riktig', () => {
            cy.url().should('include', `/soknader/${nyttReisetilskudd.id}/4`)
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

        it('Endring av kvittering', () => {
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

            it('Går videre', () => {
                cy.contains('Gå videre').click()
            })
        })
    })

    describe('Utbetaling - Reisetilskudd', () => {
        it('URL er riktig', () => {
            cy.url().should('include', `/soknader/${nyttReisetilskudd.id}/5`)
            cy.get('.sporsmal__tittel').should('have.text', 'Utbetaling')
        })

        it('Arbeidsgiveren legger ut for reisene', () => {
            cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })
            cy.contains('Gå videre').click()
        })
    })

    describe('Til slutt - Reisetilskudd', () => {
        it('URL er riktig', () => {
            cy.url().should('include', `/soknader/${nyttReisetilskudd.id}/6`)
            cy.get('.sporsmal__tittel').should('have.text', 'Til slutt')
        })

        it('Oppsummering inneholder riktig informasjon', () => {
            cy.get('.oppsummering').click()
            cy.get('.utvidbar__innhold > :nth-child(4)').should('include.text', 'Last opp kvitteringer for reiseutgifter til jobben fra 1. februar til 18. mars 2021')
            cy.get('.utvidbar__innhold > :nth-child(4)').should('include.text', 'Du lastet opp 2 utgifter på til sammen')
            cy.get('.skjemaelement__label').should('contain', 'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.')
            cy.get('.skjemaelement__label').click({ force: true })

            cy.contains('Send søknaden').click()
        })
    })

    describe('Kvittering - Reisetilskudd', () => {
        it('URL er riktig', () => {
            cy.url().should('include', `/kvittering/${nyttReisetilskudd.id}`)
        })

        it('Hva skjer videre', () => {
            cy.get('.hva-skjer')
                .should('contain', 'Hva skjer videre?')
                .and('contain', 'NAV behandler søknaden din')
                .and('contain', 'Når blir pengene utbetalt?')
        })
    })
})
