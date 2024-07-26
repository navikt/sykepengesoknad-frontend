import { klikkGaVidere, klikkTilbake } from '../../support/utilities'
import { nyttReisetilskudd } from '../../../src/data/mock/data/soknad/arbeidstaker-reisetilskudd'

describe('Teste førsteside i reisetilskuddsøknaden', () => {
    before(() => {
        cy.clearCookies()
        cy.visit('/syk/sykepengesoknad?testperson=reisetilskudd')
    })

    describe('Landingside og listevisning', () => {
        it('Laster startside', () => {
            cy.get('.navds-heading--large').should('be.visible').and('have.text', 'Søknader')
        })

        it('Søknad har forventa tekst', () => {
            cy.get(`a[href*=${nyttReisetilskudd.id}]`).should('include.text', 'Søknad om reisetilskudd')
        })

        it('Ved klikk så åpnes søknaden om reisetilskudd', () => {
            cy.get(`a[href*=${nyttReisetilskudd.id}]`).click()
            cy.url().should(
                'contain',
                Cypress.config().baseUrl + `/syk/sykepengesoknad/soknader/${nyttReisetilskudd.id}/1`,
            )
        })
    })

    describe('Ansvarserklæring - Reisetilskudd', () => {
        it('URL er riktig', () => {
            cy.url().should('include', `/syk/sykepengesoknad/soknader/${nyttReisetilskudd.id}/1`)
        })

        it('Laster inn hvem kan få reisetilskudd', () => {
            cy.get('[data-cy="om-reisetilskudd"]').should('be.visible').click()

            cy.get('.navds-label').contains('Hva dekker reisetilskuddet')
            cy.get('.navds-body-long').contains(
                'Reisetilskuddet dekker nødvendige ekstra reiseutgifter til og fra jobben mens du er syk, altså reiseutgifter utover det du har til vanlig.',
            )

            cy.get('.navds-label').contains('De første 16 dagene')
            cy.get('.navds-label').contains('Legg ved kvitteringer')
            cy.get('.navds-body-long').contains(
                'Du må legge ved bilde av kvitteringene dine når du søker NAV om å dekke utgiftene. Fyller du ut fra telefonen, kan du ta bilde av kvitteringene og bruke dem direkte i søknaden.',
            )
        })

        it('Bekrefter ansvarserklæring', () => {
            cy.get('.navds-checkbox__label').click()
            cy.contains('Start søknad').click()
        })
    })

    describe('Før du fikk sykmelding - Reisetilskudd', () => {
        it('URL er riktig', () => {
            cy.url().should('include', `/syk/sykepengesoknad/soknader/${nyttReisetilskudd.id}/2`)
            cy.get('[data-cy="sporsmal-tittel"]').should('have.text', 'Før du fikk sykmelding')
        })

        it('Tester beløp valget', () => {
            cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()
            cy.get('input[type=checkbox]#1566426').click()
            cy.get('#1566427').type('1000', { delay: 100 })
            cy.get('#1566427').should('have.value', '1000')
            klikkGaVidere()
        })

        it('Beløpet er riktig når vi går frem og tilbake', () => {
            klikkTilbake()
            cy.get('#1566427').should('have.value', '1000')

            klikkGaVidere()
        })
    })

    describe('Reise med bil - Reisetilskudd', () => {
        it('URL er riktig', () => {
            cy.url().should('include', `/syk/sykepengesoknad/soknader/${nyttReisetilskudd.id}/3`)
            cy.get('[data-cy="sporsmal-tittel"]').should('have.text', 'Reise med bil')
        })

        it('Svar ja på hovedspørsmålet', () => {
            cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()
            cy.get('.undersporsmal > :nth-child(1) > :nth-child(1)').should(
                'have.text',
                'Hvilke dager reiste du med bil i perioden 23. desember 2020 - 7. januar 2021?',
            )
        })

        it('Minst en dag må velges', () => {
            klikkGaVidere(true)
            cy.get('[data-cy="feil-lokal"]').contains('Du må oppgi minst en dag')
        })

        it('Fyller ut', () => {
            cy.get('[aria-label="mandag 4"]').click()
            cy.get('[aria-label="tirsdag 5"]').click()
            cy.get('[aria-label="onsdag 6"]').click()

            cy.get('input[type=radio]#1566446_0').click()
            cy.get('#1566447').type('1000')
            cy.get('#1566448').type('42')

            klikkGaVidere()
        })

        it('Beløpet er riktig når vi går frem og tilbake', () => {
            klikkTilbake()

            cy.get('[aria-label="mandag 4"]').should('have.class', 'rdp-day_selected')
            cy.get('[aria-label="tirsdag 5"]').should('have.class', 'rdp-day_selected')
            cy.get('[aria-label="onsdag 6"]').should('have.class', 'rdp-day_selected')
            cy.get('[aria-label="torsdag 7"]').should('not.have.class', 'rdp-day_selected')

            cy.get('#1566447').should('have.value', '1000')

            klikkGaVidere()
        })
    })

    describe('Opplasting - Reisetilskudd', () => {
        it('URL er riktig', () => {
            cy.url().should('include', `/syk/sykepengesoknad/soknader/${nyttReisetilskudd.id}/4`)
        })

        it('Laster bjørn med info', () => {
            cy.contains('Du må laste opp kvittering')
        })

        it('Legger inn taxi kvittering', () => {
            cy.get('button').contains('Legg til reiseutgift').click()
            cy.get('select[name=transportmiddel]').select('TAXI')
            cy.get('#transportmiddel').contains('Taxi')

            cy.get('input[name=belop_input]').type('1234')
            cy.get('[data-cy="filopplasteren"] input[type=file]').attachFile('kvittering.jpg')
            cy.get('button').contains('Bekreft').click()
        })

        it('Fil list oppdateres med kvittering', () => {
            cy.get('.navds-table').within(() => {
                cy.contains('Taxi')
                cy.contains('1.234 kr')
                cy.contains('1 utgift på til sammen')
                cy.contains('1.234 kr')
            })
        })

        it('Endring av kvittering', () => {
            cy.get('.navds-table').within(() => {
                cy.contains('Taxi')
                cy.get('.navds-table__toggle-expand-button').click()
            })
            cy.get('.navds-table__expanded-row-content').find('img[alt="kvittering for taxi"]').should('be.visible')
        })

        it('Sletting av kvittering i liste', () => {
            cy.get('.navds-table').contains('Taxi')
            cy.contains('button', 'Slett').click()
            cy.findByRole('dialog').within(() => {
                cy.contains('Vil du slette kvitteringen?')
                cy.contains('Ja, jeg er sikker').click()
            })
            cy.contains('Vil du slette kvitteringen?').should('not.exist')
            cy.get('.sumlinje').should('not.exist')
        })

        it('Legger inn gyldig kvittering', () => {
            cy.get('button').contains('Legg til reiseutgift').click()
            cy.get('body').findByRole('dialog', { name: 'Legg til reiseutgift' }).should('have.attr', 'open')

            cy.get('[data-cy="filopplasteren"] input[type=file]').attachFile('kvittering.jpg')
            cy.get('input[name=belop_input]').type('99')
            cy.get('select[name=transportmiddel]').select('PARKERING')

            cy.get('button').should('be.visible').contains('Bekreft').click()

            cy.get('.navds-table').within(() => {
                cy.contains('Parkering')
                cy.contains('99 kr')
                cy.contains('1 utgift på til sammen')
            })
        })

        describe('Beholder verdier når vi går frem og tilbake', () => {
            it('Går frem og tilbake', () => {
                klikkGaVidere()
                klikkTilbake()
                cy.get('.navds-table').within(() => {
                    cy.contains('Parkering')
                    cy.contains('99 kr')
                    cy.contains('1 utgift på til sammen')
                })

                klikkGaVidere()
            })
        })
    })

    describe('Utbetaling - Reisetilskudd', () => {
        it('URL er riktig', () => {
            cy.url().should('include', `/soknader/${nyttReisetilskudd.id}/5`)
            cy.get('[data-cy="sporsmal-tittel"]').should('have.text', 'Utbetaling')
        })

        it('Arbeidsgiveren legger ut for reisene', () => {
            cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()
            klikkGaVidere()
        })
    })

    describe('Oppsummering - Reisetilskudd', () => {
        it('URL er riktig', () => {
            cy.url().should('include', `/soknader/${nyttReisetilskudd.id}/6`)
            cy.get('[data-cy="sporsmal-tittel"]').should('have.text', 'Oppsummering fra søknaden')
        })

        it('Bekreftelsespunktene er riktige', () => {
            const bekreftelser = [
                'Retten til reisetilskudd gjelder bare hvis du trenger midlertidig transport til og fra arbeidsstedet på grunn av helseplager.',
                'Du kan få reisetilskudd hvis du i utgangspunktet har rett til sykepenger.',
                'NAV kan innhente flere opplysninger som er nødvendige for å behandle søknaden.',
                'NAV kan holde igjen eller kreve tilbake penger hvis du gir uriktige eller ufullstendige opplysninger.',
                'Det å gi feil opplysninger kan være straffbart.',
                'Fristen for å søke reisetilskudd er som hovedregel 3 måneder.',
                'Du kan endre svarene i denne søknaden opp til 12 måneder etter du sendte den inn første gangen.',
            ]

            bekreftelser.forEach((bekreftelse) => {
                cy.contains(bekreftelse)
            })
            cy.contains('Du kan lese mer om rettigheter og plikter på')
                .find('a')
                .should('have.attr', 'href', 'https://www.nav.no/reisetilskudd')
        })

        it('Oppsummering inneholder riktig informasjon', () => {
            cy.get('[data-cy="oppsummering-fra-søknaden"]').within(() => {
                cy.contains('Last opp kvitteringer for reiser til og fra jobben mellom 1. - 24. april 2020.')
                cy.contains('Du lastet opp 1 kvittering på 99 kr')
            })
            cy.get('.navds-checkbox__label').should(
                'contain',
                'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.',
            )
            cy.get('[data-cy="bekreftCheckboksPanel"]').click()

            cy.contains('Send søknaden').click()
        })
    })

    describe('Kvittering - Reisetilskudd', () => {
        it('URL er riktig', () => {
            cy.url().should('include', `/kvittering/${nyttReisetilskudd.id}`)
        })

        it('Hva skjer videre', () => {
            cy.get('[data-cy="kvittering-panel"]')
                .should('contain', 'Hva skjer videre?')
                .and('contain', 'NAV behandler søknaden din')
                .and(
                    'contain',
                    'Saksbehandlingstiden regnes fra NAV har mottatt all nødvendig dokumentasjon. Etter dette må du regne med å vente minst fire uker før søknaden er behandlet.',
                )
        })
    })
})
