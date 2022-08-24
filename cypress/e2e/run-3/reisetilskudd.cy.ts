import { nyttReisetilskudd } from '../../../src/data/mock/data/reisetilskudd'

describe('Teste førsteside i reisetilskuddsøknaden', () => {
    before(() => {
        cy.visit('http://localhost:8080/syk/sykepengesoknad')
    })

    describe('Landingside og listevisning', () => {
        it('Laster startside', () => {
            cy.get('.navds-heading--xlarge').should('be.visible').and('have.text', 'Søknader')
        })

        it('Søknad har forventa tekst', () => {
            cy.get(`article[aria-labelledby*=${nyttReisetilskudd.id}]`).should(
                'include.text',
                'Søknad om reisetilskudd'
            )
        })

        it('Ved klikk så åpnes søknaden om reisetilskudd', () => {
            cy.get(`article[aria-labelledby*=${nyttReisetilskudd.id}]`).click()
            cy.url().should('equal', `http://localhost:8080/syk/sykepengesoknad/soknader/${nyttReisetilskudd.id}/1`)
        })
    })

    describe('Ansvarserklæring - Reisetilskudd', () => {
        it('URL er riktig', () => {
            cy.url().should('include', `/syk/sykepengesoknad/soknader/${nyttReisetilskudd.id}/1`)
        })

        it('Skal ha egen folketrygloven tekst', () => {
            cy.get('.frist-sykepenger').click()
            cy.contains(
                'Ifølge folketrygdloven kan du få reisetilskudd hvis du har rett til sykepenger. Reisetilskuddet kommer da i stedet for sykepengene.'
            )
        })

        it('Laster inn hvem kan få reisetilskudd', () => {
            cy.get('.om-reisetilskudd .navds-accordion__header')
                .should('be.visible')
                .and('have.text', 'Om reisetilskudd')
                .click()

            cy.get('.navds-label').contains('Hva dekker reisetilskuddet')
            cy.get('.navds-body-long').contains(
                'Reisetilskuddet dekker nødvendige ekstra reiseutgifter til og fra jobben mens du er syk, altså reiseutgifter utover det du har til vanlig.'
            )

            cy.get('.navds-label').contains('De første 16 dagene')
            cy.get('.navds-label').contains('Legg ved kvitteringer')
            cy.get('.navds-body-long').contains(
                'Du må legge ved bilde av kvitteringene dine når du søker NAV om å dekke utgiftene. Fyller du ut fra telefonen, kan du ta bilde av kvitteringene og bruke dem direkte i søknaden.'
            )
        })

        it('Bekrefter ansvarserklæring', () => {
            cy.get('.navds-checkbox__label').click({ force: true })
            cy.contains('Gå videre').click()
        })
    })

    describe('Før du fikk sykmelding - Reisetilskudd', () => {
        it('URL er riktig', () => {
            cy.url().should('include', `/syk/sykepengesoknad/soknader/${nyttReisetilskudd.id}/2`)
            cy.get('.sporsmal__tittel').should('have.text', 'Før du fikk sykmelding')
        })

        it('Tester beløp valget', () => {
            cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })
            cy.get(':nth-child(1) > .skjemaelement__label').click({
                force: true,
            })
            cy.get('#1566427').focus().type('1000', { delay: 500, force: true })
            cy.get('#1566427').should('have.value', '1000')
            cy.contains('Gå videre').click()
        })

        it('Beløpet er riktig når vi går frem og tilbake', () => {
            cy.url().should('include', `${nyttReisetilskudd.id}/3`)
            cy.contains('Tilbake').click({ force: true })
            cy.url().should('include', `${nyttReisetilskudd.id}/2`)
            cy.get('#1566427').should('have.value', '1000')

            cy.contains('Gå videre').click()
        })
    })

    describe('Reise med bil - Reisetilskudd', () => {
        it('URL er riktig', () => {
            cy.url().should('include', `/syk/sykepengesoknad/soknader/${nyttReisetilskudd.id}/3`)
            cy.get('.sporsmal__tittel').should('have.text', 'Reise med bil')
        })

        it('Svar ja på hovedspørsmålet', () => {
            cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })
            cy.get('.undersporsmal > :nth-child(1)').should(
                'have.text',
                'Hvilke dager reiste du med bil i perioden 23. desember 2020 - 7. januar 2021?'
            )
        })

        it('Minst en dag må velges', () => {
            cy.contains('Gå videre').click()
            cy.get('.skjemaelement__feilmelding').contains('Du må oppgi en dag')
        })

        it('Fyller ut', () => {
            // Grense før
            cy.get('.kalenderuke')
                .first()
                .within(() => {
                    cy.get('.ukenr').contains('52')
                    cy.get('.kalenderdag.foran').contains('22')
                    cy.get('.kalenderdag.inni').contains('23')
                })

            // Valg av dager
            cy.get('.skjema__dager').contains('24').click({ force: true })
            cy.get('.skjema__dager').contains('25').click({ force: true })
            cy.get('.skjema__dager').contains('25').click({ force: true })

            // Grense etter
            cy.get('.kalenderuke')
                .last()
                .within(() => {
                    cy.get('.ukenr').contains('1')
                    cy.get('.kalenderdag.inni').contains('07')
                    cy.get('.kalenderdag.etter').contains('08')
                })

            cy.get('.undersporsmal > .kriterie--ja > .radioContainer > input[value=JA]').click({ force: true })
            cy.get('#1566447').focus().type('1000')
            cy.get('#1566448').focus().type('42')

            cy.contains('Gå videre').click()
        })

        it('Beløpet er riktig når vi går frem og tilbake', () => {
            cy.url().should('include', `${nyttReisetilskudd.id}/4`)
            cy.contains('Tilbake').click({ force: true })
            cy.url().should('include', `${nyttReisetilskudd.id}/3`)
            cy.get('#1566447').should('have.value', '1000')

            cy.contains('Gå videre').click()
        })
    })

    describe('Opplasting - Reisetilskudd', () => {
        it('URL er riktig', () => {
            cy.url().should('include', `/syk/sykepengesoknad/soknader/${nyttReisetilskudd.id}/4`)
        })

        it('Laster bjørn med info', () => {
            cy.contains('Du må laste opp kvitteringer hvis du har hatt ekstra utgifter til')
        })

        it('Legger inn taxi kvittering', () => {
            cy.get('.fler-vedlegg').click()
            cy.contains('Legg til reiseutgift')
            cy.get('select[name=transportmiddel]').select('TAXI')
            cy.get('input[name=belop_input]').type('1234')
            cy.get('.filopplasteren input[type=file]').attachFile('kvittering.jpg')
            cy.get('.lagre-kvittering').contains('Bekreft').click()
        })

        it('Fil list oppdateres med kvittering', () => {
            cy.get('.fil_liste')

            cy.get('.transport').contains('Taxi')
            cy.get('.belop').contains('1.234 kr')

            cy.get('.sumlinje').contains('1 utgift på til sammen')
            cy.get('.sumlinje .belop').contains('1.234 kr')
        })

        it('Endring av kvittering', () => {
            cy.get('.fil_liste').contains('Taxi').click()
            cy.contains('Endre reiseutgift')
            cy.get('.navds-alert--info').contains(
                'Du kan foreløpig ikke redigere utgifter som du har lagt til. Men du kan slette den som er feil, og legge inn på nytt.'
            )
            cy.get('select[name=transportmiddel]').should('have.attr', 'disabled')
            cy.get('input[name=belop_input]').should('have.attr', 'disabled')
            cy.get('.filopplasteren input[type=file]').should('not.exist')
            cy.get('.knapperad').within(() => {
                cy.contains('Tilbake')
                cy.contains('Slett')
                cy.contains('Bekreft').should('not.exist')
            })
            cy.get('.opplasting_modal > .navds-modal__button').click()
        })

        it('Sletting av kvittering som er valgt', () => {
            cy.get('.fil_liste').contains('Taxi').click()

            cy.get('.knapperad').contains('Slett').click()
            cy.get('.bekreft-dialog').within(() => {
                cy.contains('Vil du slette kvitteringen?')
                cy.contains('Ja, jeg er sikker')
                cy.contains('Lukk').click()
            })
            cy.contains('Vil du slette kvitteringen?').should('not.exist')

            cy.get('.knapperad').contains('Slett').click()

            cy.contains('Ja, jeg er sikker').click()
            cy.get('.sumlinje').should('not.exist')
        })

        it('Sletting av kvittering i liste', () => {
            cy.get('.fler-vedlegg').click()
            cy.contains('Legg til reiseutgift')
            cy.get('select[name=transportmiddel]').select('TAXI')
            cy.get('input[name=belop_input]').type('1234')
            cy.get('.filopplasteren input[type=file]').attachFile('kvittering.jpg')
            cy.get('.lagre-kvittering').contains('Bekreft').click()

            cy.get('.sumlinje').should('exist')
            cy.get('.slette-kvittering').click()
            cy.contains('Ja, jeg er sikker').click()
            cy.get('.sumlinje').should('not.exist')
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
                cy.get('input[name=belop_input]')
                    .invoke('val')
                    .should((val) => {
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
            cy.get('.navds-accordion__content > :nth-child(4)').should(
                'include.text',
                'Last opp kvitteringer for reiser til og fra jobben mellom 1. - 24. april 2020.'
            )
            cy.get('.navds-accordion__content > :nth-child(4)').should(
                'include.text',
                'Du lastet opp 1 utgift på 99 kr'
            )
            cy.get('.navds-checkbox__label').should(
                'contain',
                'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.'
            )
            cy.get('.navds-checkbox__label').click({ force: true })

            cy.contains('Send søknaden').click()
        })
    })

    describe('Kvittering - Reisetilskudd', () => {
        it('URL er riktig', () => {
            cy.url().should('include', `/kvittering/${nyttReisetilskudd.id}`)
        })

        it('Hva skjer videre', () => {
            cy.get('.navds-alert--info')
                .should('contain', 'Hva skjer videre?')
                .and('contain', 'NAV behandler søknaden din')
                .and(
                    'contain',
                    'Saksbehandlingstiden regnes fra NAV har mottatt all nødvendig dokumentasjon. Etter dette må du regne med å vente minst fire uker før søknaden er behandlet. Men saksbehandlingstidene kan variere noe.'
                )
        })
    })
})
