import {
    checkViStolerPaDeg,
    klikkGaVidere,
    setPeriodeFraTil,
    sjekkIntroside,
    sporsmalOgSvar,
} from '../../support/utilities'
import { arbeidsledig } from '../../../src/data/mock/data/soknad/arbeidsledig'

describe('Tester arbeidsledigsøknad', () => {
    const soknad = arbeidsledig

    before(() => {
        cy.visit('/syk/sykepengesoknad?testperson=arbeidsledig')
    })

    it('Laster startside', () => {
        cy.get('.navds-heading--large').should('be.visible').and('have.text', 'Søknader')
        cy.get(`a[href*=${soknad.id}]`).click()
    })

    it('Søknad ANSVARSERKLARING', () => {
        cy.url().should('include', `${soknad.id}/1`)
        sjekkIntroside()
        checkViStolerPaDeg()
    })

    it('Søknad FRISKMELDT', () => {
        cy.url().should('include', `${soknad.id}/2`)

        // Test spørsmål
        cy.get('[data-cy="ja-nei-stor"] input[value=NEI]').click()
        cy.contains('Fra hvilken dato trengte du ikke lenger sykmeldingen?')
        cy.get('.navds-date__field-button').click()
        cy.get('.rdp-day').contains('10').click()
        klikkGaVidere()
    })

    it('Søknad ANDRE_INNTEKTSKILDER', () => {
        cy.url().should('include', `${soknad.id}/3`)

        // Test spørsmål
        cy.contains('Har du hatt inntekt mens du har vært sykmeldt i perioden 1. - 24. april 2020?')
        cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()

        // Når ingen velges så dukker bare 1 feilmelding opp
        klikkGaVidere(true)
        cy.contains('Det er 1 feil i skjemaet')
        cy.contains('Du må oppgi hvilke inntektskilder du har')

        // Svarer JA
        // Underspørsmål nivå 1 - checkbox
        cy.contains('Hvilke inntektskilder har du hatt?')
        cy.get('.undersporsmal .navds-checkbox label[for=687404]').should('include.text', 'andre arbeidsforhold')
        cy.get('input[type=checkbox]#687404').click()
        // Underspørsmål nivå 2 - radio
        cy.get('input[type=radio]#687405_0').click()
        cy.contains(
            'Du må sende egen sykepengesøknad for dette. ' +
                'Det betyr også at legen må skrive en sykmelding for hvert arbeidsforhold du er sykmeldt fra.',
        )

        klikkGaVidere()
    })

    it('Søknad OPPHOLD_UTENFOR_EOS', () => {
        cy.url().should('include', `${soknad.id}/4`)

        // Test spørsmål
        cy.contains('Var du på reise utenfor EU/EØS mens du var sykmeldt 1. - 24. april 2020?')
        cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()

        // Underspørsmål 1
        cy.contains('Når var du utenfor EU/EØS?')
        setPeriodeFraTil(17, 24)

        klikkGaVidere()
    })

    it('Søknad TIL_SLUTT', () => {
        cy.url().should('include', `${soknad.id}/5`)

        cy.get('.navds-guide-panel__content').contains(
            'Nå kan du se over at alt er riktig før du sender inn søknaden. Ved behov kan du endre opplysningene inntil 12 måneder etter innsending.',
        )

        cy.get('[data-cy="oppsummering-fra-søknaden"]').within(() => {
            sporsmalOgSvar('Brukte du hele sykmeldingen fram til 24. april 2020?', 'Nei')
                .children()
                .within(() => {
                    sporsmalOgSvar('Fra hvilken dato trengte du ikke lenger sykmeldingen?', '10.04.2020')
                })
            sporsmalOgSvar('Har du hatt inntekt mens du har vært sykmeldt i perioden 1. - 24. april 2020?', 'Ja')
                .children()
                .within(() => {
                    sporsmalOgSvar('Hvilke inntektskilder har du hatt?', 'andre arbeidsforhold')
                        .children()
                        .within(() => {
                            sporsmalOgSvar('Er du sykmeldt fra dette?', 'Ja')
                        })
                })
        })
        cy.contains('Søknaden sendes til').should('not.exist')
        cy.contains('Send søknaden').click()
    })

    it('Søknad kvittering', () => {
        cy.url().should('include', `/kvittering/${soknad.id}`)
        // Hva skjer videre
        cy.get('[data-cy="kvittering-panel"]')
            .should('contain', 'Hva skjer videre?')
            .and('contain', 'NAV behandler søknaden din')
            .and('contain', 'Når blir pengene utbetalt?')
    })
})
