import { klikkGaVidere, modalAktiv, modalIkkeAktiv, sjekkMainContentFokus } from '../../support/utilities'
import { nyttReisetilskudd } from '../../../src/data/mock/data/soknad/arbeidstaker-reisetilskudd'

describe('Teste førsteside i reisetilskuddsøknaden', () => {
    before(() => {
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

        it('Skal ha egen folketrygloven tekst', () => {
            cy.get('.frist-sykepenger').click()
            cy.contains(
                'Ifølge folketrygdloven kan du få reisetilskudd hvis du har rett til sykepenger. Reisetilskuddet kommer da i stedet for sykepengene.',
            )
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
            cy.contains('Gå videre').click()
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
            cy.contains('Gå videre').click()
        })

        it('Beløpet er riktig når vi går frem og tilbake', () => {
            cy.url().should('include', `${nyttReisetilskudd.id}/3`)
            cy.contains('Tilbake').click()
            cy.url().should('include', `${nyttReisetilskudd.id}/2`)
            cy.get('#1566427').should('have.value', '1000')

            cy.contains('Gå videre').click()
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
            cy.contains('Gå videre').click()
            cy.get('[data-cy="feil-lokal"]').contains('Du må oppgi minst en dag')
        })

        it('Fyller ut', () => {
            cy.get('[aria-label="4. januar (mandag)"]').click()
            cy.get('[aria-label="5. januar (tirsdag)"]').click()
            cy.get('[aria-label="6. januar (onsdag)"]').click()

            cy.get('input[type=radio]#1566446_0').click()
            cy.get('#1566447').type('1000')
            cy.get('#1566448').type('42')

            cy.contains('Gå videre').click()
        })

        it('Beløpet er riktig når vi går frem og tilbake', () => {
            cy.url().should('include', `${nyttReisetilskudd.id}/4`)
            cy.contains('Tilbake').click()

            cy.url().should('include', `${nyttReisetilskudd.id}/3`)
            cy.get('[aria-label="4. januar (mandag)"]').should('have.class', 'rdp-day_selected')
            cy.get('[aria-label="5. januar (tirsdag)"]').should('have.class', 'rdp-day_selected')
            cy.get('[aria-label="6. januar (onsdag)"]').should('have.class', 'rdp-day_selected')
            cy.get('[aria-label="7. januar (torsdag)"]').should('not.have.class', 'rdp-day_selected')

            cy.get('#1566447').should('have.value', '1000')

            cy.contains('Gå videre').click()
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
            cy.get('button').contains('Legg til dokumentasjon').click()
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

        it('Åpner og lukker modal', () => {
            cy.get('body').findByRole('dialog', { name: 'Legg til dokumentasjon' }).should('not.exist')

            cy.get('button').contains('Legg til dokumentasjon').click()
            cy.get('body').findByRole('dialog', { name: 'Legg til dokumentasjon' }).should('have.attr', 'open')
            cy.get('.navds-modal').contains('Tilbake').click()
            cy.get('body').findByRole('dialog', { name: 'Legg til dokumentasjon' }).should('not.exist')
        })

        it('Feilmeldinger når ingenting er valgt', () => {
            modalIkkeAktiv()
            cy.get('button').contains('Legg til dokumentasjon').click()
            modalAktiv()

            cy.get('.navds-modal').contains('Bekreft').should('be.visible').click()

            cy.get('[data-cy="opplasting-form"]').contains('Du må velge transportmiddel').should('be.visible')
            cy.get('[data-cy="opplasting-form"]').contains('Du må skrive inn beløp').should('be.visible')
            cy.get('[data-cy="opplasting-form"]').contains('Du må laste opp kvittering').should('be.visible')
            cy.get('.navds-modal').contains('Tilbake').should('be.visible').click()
            modalIkkeAktiv()
        })

        describe('Transportmiddel feilmeldinger', () => {
            it('Ugyldig valg', () => {
                modalIkkeAktiv()
                cy.get('button').should('be.visible').contains('Legg til dokumentasjon').click()
                modalAktiv()

                cy.get('select[name=transportmiddel]').should('be.visible').select('')
                cy.get('.navds-modal').contains('Bekreft').should('be.visible').click()
                modalAktiv()
                cy.get('body').findByRole('dialog', { name: 'Legg til dokumentasjon' }).should('have.attr', 'open')
                cy.get('[data-cy="opplasting-form"]').contains('Du må velge transportmiddel').should('be.visible')
            })

            it('Velger parkering', () => {
                cy.get('[data-cy="opplasting-form"]').contains('Du må velge transportmiddel')
                cy.get('select[name=transportmiddel]').select('PARKERING')
                cy.get('#transportmiddel').contains('Parkering')
                cy.get('.navds-modal').contains('Bekreft').click()
                cy.get('[data-cy="opplasting-form"]').contains('Du må velge transportmiddel').should('not.exist')
            })
        })

        describe('Beløp feilmeldinger', () => {
            it('Negative beløp', () => {
                cy.get('input[name=belop_input]').type('-100')
                cy.get('.navds-modal').contains('Bekreft').click()
                cy.get('[data-cy="opplasting-form"]').contains('Beløp kan ikke være negativt')
            })

            it('Høyere beløp enn maks', () => {
                cy.get('input[name=belop_input]').clear()
                cy.get('input[name=belop_input]').type('1000000000')
                cy.get('.navds-modal').contains('Bekreft').click()
                cy.get('[data-cy="opplasting-form"]').contains('Beløp kan ikke være større enn 10 000')
            })

            it('Kan ikke skrive inn med 3 desimaler', () => {
                cy.get('input[name=belop_input]').clear()
                cy.get('input[name=belop_input]').type('100.253')
                cy.get('.navds-modal').contains('Bekreft').click()
                cy.get('input[name=belop_input]')
                    .invoke('val')
                    .should((val) => {
                        expect(val).to.be.eq('100.25')
                    })
            })

            it('Gyldig beløp med 2 desimaler', () => {
                cy.get('input[name=belop_input]').clear()
                cy.get('input[name=belop_input]').type('100.30')
                cy.get('.navds-modal').contains('Bekreft').click()
                cy.get('[data-cy="opplasting-form"]')
                    .contains('Beløp kan ikke være større enn 10 000')
                    .should('not.exist')
            })

            it('Gyldig beløp uten desimaler', () => {
                cy.get('input[name=belop_input]').clear()
                cy.get('input[name=belop_input]').type('99')
                cy.get('.navds-modal').contains('Bekreft').click()
                cy.get('[data-cy="opplasting-form"]')
                    .contains('Beløp kan ikke være større enn 10 000')
                    .should('not.exist')
            })
        })

        describe('Kvittering feilmeldinger', () => {
            it('Legger inn gyldig kvittering', () => {
                cy.get('[data-cy="filopplasteren"] input[type=file]').attachFile('kvittering.jpg')

                cy.get('button').should('be.visible').contains('Bekreft').click()

                cy.get('.navds-table').within(() => {
                    cy.contains('Parkering')
                    cy.contains('99 kr')
                    cy.contains('1 utgift på til sammen')
                })
            })
        })

        describe('Beholder verdier når vi går frem og tilbake', () => {
            it('Går frem og tilbake', () => {
                klikkGaVidere()

                cy.contains('Tilbake').click()
                sjekkMainContentFokus()
                cy.url().should('include', `/soknader/${nyttReisetilskudd.id}/4`)
                cy.get('.navds-table').within(() => {
                    cy.contains('Parkering')
                    cy.contains('99 kr')
                    cy.contains('1 utgift på til sammen')
                })

                cy.contains('Gå videre').click()
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
            cy.contains('Gå videre').click()
        })
    })

    describe('Til slutt - Reisetilskudd', () => {
        it('URL er riktig', () => {
            cy.url().should('include', `/soknader/${nyttReisetilskudd.id}/6`)
            cy.get('[data-cy="sporsmal-tittel"]').should('have.text', 'Til slutt')
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
            cy.get('.oppsummering').click()
            cy.get('.navds-expansioncard__content-inner > :nth-child(4)').should(
                'include.text',
                'Last opp kvitteringer for reiser til og fra jobben mellom 1. - 24. april 2020.',
            )
            cy.get('.navds-expansioncard__content-inner > :nth-child(4)').should(
                'include.text',
                'Du lastet opp 1 kvittering på 99 kr',
            )
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
