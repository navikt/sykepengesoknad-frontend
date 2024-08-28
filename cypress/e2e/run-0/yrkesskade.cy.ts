import {
    checkViStolerPaDeg,
    klikkGaVidere,
    neiOgVidere,
    sporsmalOgSvar,
    svarJaHovedsporsmal,
} from '../../support/utilities'
import 'cypress-real-events'

describe('Tester yrkesskadesspørsmål', () => {
    before(() => {
        cy.clearCookies()
        cy.visit('/syk/sykepengesoknad?testperson=yrkesskade-v2')
    })
    it('Laster listevisng', function () {
        cy.findByRole('heading', { name: 'Søknader', level: 1 }).should('be.visible')
        cy.findByRole('link', { name: /søknad om sykepenger/i }).click()
    })

    it('Svarer på spørsmål før yrkesskade', function () {
        checkViStolerPaDeg()

        neiOgVidere([
            'Tilbake i fullt arbeid',
            'Ferie',
            'Permisjon',
            'Jobb underveis i sykefraværet',
            'Arbeid utenfor Norge',
        ])

        neiOgVidere(['Andre inntektskilder', 'Reise til utlandet'])
    })

    it('Kommer til spørsmål om yrkesskade', function () {
        cy.get('main').findByRole('heading', { name: 'Yrkesskade', level: 2 }).should('be.visible')

        cy.findByText('Registrerte yrkesskader:')
            .should('be.visible')
            .then((p) => {
                cy.wrap(p).next('ul').should('exist')
                cy.wrap(p).next('ul').children('li').should('have.length', 2)

                const expectedTexts = [
                    'Skadedato 1. januar 2020 (Vedtaksdato 5. april 2021)',
                    'Skadedato 2. april 1997 (Vedtaksdato 3. desember 1999)',
                ]
                cy.wrap(p)
                    .next('ul')
                    .children('li')
                    .each(($li, index) => {
                        cy.wrap($li).should('contain', expectedTexts[index]).and('be.visible')
                    })
            })
    })

    it('Har forventa hjelpetekst', function () {
        cy.get('main').findByRole('button', { name: 'Spørsmålet forklart' }).click()
        // denne funker ikke? Må ha en cy.get inne i it først?? cy.findByRole('button', { name: 'Spørsmålet forklart' }).click()

        cy.get('main')
            .findByRole('button', { name: 'Spørsmålet forklart' })
            .next()
            .within(() => {
                cy.findByText(
                    'Svar ja, hvis det nylig er sendt inn en skademelding som påvirker dette sykefraværet.',
                ).should('be.visible')
            })
    })

    it('Svarer ja og går videre', function () {
        svarJaHovedsporsmal()
        klikkGaVidere(true)
    })

    it('Men får feilmelding', function () {
        cy.get('form')
            .findByRole('alert')
            .within(() => {
                cy.findByRole('region', { name: 'Det er 1 feil i skjemaet' })
                    .should('be.visible')
                    .within(() => {
                        cy.findByRole('heading', { name: 'Det er 1 feil i skjemaet', level: 2 }).scrollIntoView()
                        cy.contains('Du må velge minst en skadedato').should('be.visible')

                        cy.findByText('Du må velge minst en skadedato').should('be.visible')
                        cy.findByRole('link', { name: /Du må velge minst en skadedato/i })
                            .should('be.visible')
                            .click()
                    })
            })
    })

    it('Vi velger to med keyboard og går videre med enter', function () {
        cy.realPress('Space')
        cy.realPress('Tab')
        cy.realPress('Space')
        cy.realPress('Enter')
    })

    it('Vi ser de valgte skadedatoene i oppsummeringa', function () {
        cy.get('[data-cy="oppsummering-fra-søknaden"]').within(() => {
            sporsmalOgSvar(
                'Hvilken skadedato skyldes dette sykefraværet? Du kan velge flere.',
                'Skadedato 2. april 1997 (Vedtaksdato 3. desember 1999)',
            )
            sporsmalOgSvar(
                'Hvilken skadedato skyldes dette sykefraværet? Du kan velge flere.',
                'Skadedato 1. januar 2020 (Vedtaksdato 5. april 2021)',
            )
        })
    })
})
