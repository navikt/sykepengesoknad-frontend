import { checkViStolerPåDeg, klikkTilbake, neiOgVidere } from '../../support/utilities'
import 'cypress-real-events'

describe('Tester form progress bar', () => {
    before(() => {
        cy.visit(`syk/sykepengesoknad/soknader/bc250797-147c-4050-b193-920c508902aa/1?testperson=reisetilskudd`)
    })

    it('Introsiden har ingen form progress', function () {
        // ingen form progress
        cy.get('.navds-progress-bar').should('not.exist')
        checkViStolerPåDeg()
    })

    it('Første spørsmål har form progress, og ingen navigerbare', function () {
        cy.get('.navds-progress-bar').should('exist').and('be.visible')
        cy.contains('Steg 1 av 14')
        cy.findByRole('button', { name: 'Vis alle steg' }).click()
        // Finn
        cy.get('.navds-stepper').within(() => {
            cy.get('span.navds-stepper__circle--success').should('have.length', 0)
            cy.get('div.navds-stepper__step').should('have.length', 14)
            cy.get('a.navds-stepper__step').should('have.length', 0)
        })
        neiOgVidere([
            'Fravær før sykmeldingen',
            'Tilbake i fullt arbeid',
            'Ferie',
            'Permisjon',
            'Jobb underveis i sykefraværet',
            'Arbeid utenfor Norge',
        ])
    })

    it('Vi har besvart en del spørsmål og en del er checked', function () {
        cy.contains('Steg 7 av 14')
        cy.get('.navds-stepper').within(() => {
            cy.get('span.navds-stepper__circle--success').should('have.length', 6)
            cy.get('div.navds-stepper__step').should('have.length', 8)
            cy.get('a.navds-stepper__step').should('have.length', 6)
        })
    })

    it('Vi går tilbake en med å klikke tilbake knappen', function () {
        klikkTilbake()
        cy.contains('Steg 6 av 14')
        klikkTilbake()
        cy.contains('Steg 5 av 14')

        cy.get('.navds-stepper').within(() => {
            cy.get('span.navds-stepper__circle--success').should('have.length', 6)
            cy.get('div.navds-stepper__step').should('have.length', 8)
            cy.get('a.navds-stepper__step').should('have.length', 6)
        })
    })

    it('Vi navigerer tilbake til start', function () {
        cy.findByRole('link', { name: 'Fravær før sykmeldingen' }).click()
        cy.contains('Steg 1 av 14')

        cy.get('.navds-stepper').within(() => {
            cy.get('span.navds-stepper__circle--success').should('have.length', 6)
            cy.get('div.navds-stepper__step').should('have.length', 8)
            cy.get('a.navds-stepper__step').should('have.length', 6)
        })
    })

    it('Vi navigerer til Andre inntektskilder', function () {
        cy.findByRole('link', { name: 'Andre inntektskilder' }).click()
        cy.contains('Steg 7 av 14')

        cy.get('.navds-stepper').within(() => {
            cy.get('span.navds-stepper__circle--success').should('have.length', 6)
            cy.get('div.navds-stepper__step').should('have.length', 8)
            cy.get('a.navds-stepper__step').should('have.length', 6)
        })
    })

    it('Vi besvarer litt videre og endre på kvittering', function () {
        neiOgVidere([
            'Andre inntektskilder',
            'Reise til utlandet',
            'Reisetilskudd',
            'Før du fikk sykmelding',
            'Reise med bil',
        ])

        cy.get('.navds-stepper').within(() => {
            cy.get('span.navds-stepper__circle--success').should('have.length', 11)
            cy.get('div.navds-stepper__step').should('have.length', 2)
            cy.get('a.navds-stepper__step').should('have.length', 12)
        })
    })

    it('Kvittering er litt rar siden vi kan gå til neste uten å svare', function () {
        cy.contains('Steg 12 av 14')

        cy.findByRole('link', { name: 'Utbetaling' }).click()
        cy.contains('Steg 13 av 14')

        neiOgVidere(['Utbetaling'])

        cy.get('.navds-stepper').within(() => {
            cy.get('span.navds-stepper__circle--success').should('have.length', 12)
            cy.get('div.navds-stepper__step').should('have.length', 1)
            cy.get('a.navds-stepper__step').should('have.length', 13)
        })
    })
})
