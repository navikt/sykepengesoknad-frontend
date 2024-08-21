import { checkViStolerPaDeg, klikkGaVidere, setPeriodeFraTil, sjekkIntroside } from '../../support/utilities'
import { frilanser } from '../../../src/data/mock/data/soknad/frilanser'

describe('Tester frilansersøknad', () => {
    //-----
    // Sykmelding: baf4a9ab-cc9b-42af-bba3-67cd6ca06388, frilanser - 100%
    // Søknad: a8e40578-682b-4a04-bfda-b7768af2ae13, fom: 1.4.20, tom: 24.4.20
    //-----
    const soknad = frilanser

    before(() => {
        cy.visit('/syk/sykepengesoknad?testperson=frilanser')
    })

    it('Laster startside', function () {
        cy.get('.navds-heading--large').should('be.visible').and('have.text', 'Søknader')
        cy.get(`a[href*=${soknad.id}]`).click()
    })

    it('Søknad ANSVARSERKLARING - steg 1', function () {
        cy.url().should('include', `${soknad.id}/1`)

        sjekkIntroside()
        checkViStolerPaDeg()
    })

    it('Søknad TILBAKE_I_ARBEID - steg 2', function () {
        cy.url().should('include', `${soknad.id}/2`)

        // Test spørsmål
        cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()
        cy.contains('Når begynte du å jobbe igjen?')
        cy.get('.navds-date__field-button').click()
        cy.get('.rdp-day').contains('20').click()

        klikkGaVidere()
    })

    it('Søknad ARBEID_UNDERVEIS_100_PROSENT - steg 3', function () {
        cy.url().should('include', `${soknad.id}/3`)

        // Test spørsmål
        cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()

        // Underspørsmål 1
        cy.contains('Oppgi arbeidsmengde i timer eller prosent')
        // Svarer prosent
        cy.get('.undersporsmal input[value=Prosent]').click()
        cy.contains('Oppgi hvor mange prosent av din normale arbeidstid du jobbet i perioden 1. - 24. april 2020?')
        cy.get('.undersporsmal .navds-text-field__input#b68db08b-9ad1-38e5-bcdd-2c98963c2b8d').type('21')

        // Underspørsmål 2
        cy.contains('Jobber du vanligvis 37,5 timer i uka?')
        cy.get('input[type=radio]#9163fd91-7e4f-3474-ae32-405f18004af0_0').click()

        klikkGaVidere()
    })

    it('Søknad ANDRE_INNTEKTSKILDER - steg 4', function () {
        cy.url().should('include', `${soknad.id}/4`)

        // Test spørsmål
        cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()

        // Svarer JA
        // Underspørsmål nivå 1 - checkbox
        cy.contains('Hvilke inntektskilder har du?')
        cy.get('.undersporsmal .navds-checkbox label[for=687440]').should('include.text', 'arbeidsforhold').click()
        // Underspørsmål nivå 2 - radio
        cy.get('input[type=radio]#687441_0').click()
        cy.contains(
            'Du må sende egen sykepengesøknad for dette. ' +
                'Det betyr også at legen må skrive en sykmelding for hvert arbeidsforhold du er sykmeldt fra.',
        )

        klikkGaVidere()
    })

    it('Søknad UTLAND - steg 5', function () {
        cy.url().should('include', `${soknad.id}/5`)

        // Test spørsmål
        cy.contains('Har du vært utenfor EU/EØS mens du var sykmeldt 1. - 24. april 2020?')
        cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()

        // Underspørsmål 1
        cy.contains('Når var du utenfor EU/EØS?')

        setPeriodeFraTil(14, 22)

        klikkGaVidere()
    })

    it('Søknad ARBEID_UTENFOR_NORGE - steg 6', function () {
        cy.url().should('include', `${soknad.id}/6`)

        // Test spørsmål
        cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()
        cy.contains('Har du arbeidet i utlandet i løpet av de siste 12 månedene?')

        klikkGaVidere()
    })

    it('Søknad VAER_KLAR_OVER_AT - steg 7', function () {
        cy.url().should('include', `${soknad.id}/7`)
        cy.get('.navds-checkbox__label').click()
        cy.contains(
            'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.',
        )

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
