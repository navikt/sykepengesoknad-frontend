import {
    avbryterSoknad,
    harFlereFeilISkjemaet,
    klikkGaVidere,
    klikkTilbake,
    setPeriodeFraTil,
    sjekkMainContentFokus,
    sporsmalOgSvar,
    svarCombobox,
    svarRadioGruppe,
} from '../../support/utilities'
import { oppholdUtland } from '../../../src/data/mock/data/soknad/opphold-utland'
import 'cypress-real-events'

describe('Tester søknad om å beholde sykepenger utenfor EØS', () => {
    before(() => {
        cy.clearCookies()
    })

    const soknad = oppholdUtland

    before(() => {
        cy.visit('/syk/sykepengesoknad?testperson=bare-utland')
    })

    it('Går til søknad som har påfølgende søknader som må fylles ut', function () {
        cy.get('.navds-heading--large').should('be.visible').and('have.text', 'Søknader')
        cy.get('[data-cy="Nye søknader"]')
            .findByRole('link', { name: 'Søknad om å beholde sykepenger utenfor EU/EØS' })
            .click()
    })

    it('Viser infoside om søknad om å beholde sykepenger utenfor EU/EØS, og starter søknaden', () => {
        cy.contains('Du trenger ikke søke hvis du')
        cy.contains('Har du allerede vært på reise?')
        cy.findByRole('button', { name: 'Start søknaden' }).should('exist').click()
    })

    it('Velger land innenfor EU/EØS og får info om å ikke søke', function () {
        cy.url().should('include', `${soknad.id}/1`)

        klikkGaVidere(true)
        cy.contains('Du må velge minst et alternativ fra menyen')
        cy.contains('Det er 1 feil i skjemaet')
        cy.contains('Du må oppgi hvilket land du skal reise til')

        cy.contains('Hvilke(t) land skal du reise til?')
        cy.contains('Du kan velge flere.')

        svarCombobox('Hvilke(t) land skal du reise til?', 'Hel', 'Hellas', true)
        cy.get('.navds-alert').should(
            'contain.text',
            'Hellas ligger innenfor EU/EØS, så du trenger ikke søke for dette landet.',
        )
        cy.get('.navds-combobox__button-toggle-list').should('have.attr', 'aria-expanded', 'false')

        svarCombobox('Hvilke(t) land skal du reise til?', 'Svei', 'Sveits', true)
        cy.get('.navds-alert').should(
            'contain.text',
            'Hellas og Sveits ligger innenfor EU/EØS, så du trenger ikke søke for disse landene.',
        )
        cy.get('.navds-combobox__button-toggle-list').should('have.attr', 'aria-expanded', 'false')

        svarCombobox('Hvilke(t) land skal du reise til?', 'Lit', 'Litauen', true)
        cy.get('.navds-alert').should(
            'contain.text',
            'Hellas, Sveits og Litauen ligger innenfor EU/EØS, så du trenger ikke søke for disse landene.',
        )
        cy.get('.navds-combobox__button-toggle-list').should('have.attr', 'aria-expanded', 'false')

        klikkGaVidere(true)
    })

    it('Velger land utenfor EU/EØS', function () {
        cy.url().should('include', `${soknad.id}/1`)

        klikkGaVidere(true)
        cy.contains('Du må velge minst et alternativ fra menyen')
        cy.contains('Det er 1 feil i skjemaet')
        cy.contains('Du må oppgi hvilket land du skal reise til')

        cy.contains('Hvilke(t) land skal du reise til?')
        cy.contains('Du kan velge flere.')

        //Velger land med tastatur
        svarCombobox('Hvilke(t) land skal du reise til?', 'Afg', 'Afghanistan')
        cy.get('.navds-combobox__button-toggle-list').should('have.attr', 'aria-expanded', 'true')

        //Velger land med tastatur, og lukker listen manuelt
        svarCombobox('Hvilke(t) land skal du reise til?', 'Fransk', 'Fransk Polynesia')
        cy.contains('.navds-chips__chip-text', 'Fransk Polynesia').parent('button').click()
        cy.get('.navds-combobox__button-toggle-list').should('have.attr', 'aria-expanded', 'false')

        //bruker kun musepeker til å velge land, da lukker listen seg
        cy.findAllByRole('combobox', { name: 'Hvilke(t) land skal du reise til?' }).type('Sør-')
        cy.findByRole('option', { name: 'Sør-Korea' }).click()
        cy.get('.navds-combobox__button-toggle-list').should('have.attr', 'aria-expanded', 'false')

        klikkGaVidere()
    })

    it('Avbryter søknaden og havner på avbrutt-siden', () => {
        avbryterSoknad()
        cy.url().should('include', `avbrutt/${soknad.id}`)
        cy.contains('Fjernet søknad om å beholde sykepenger utenfor EU/EØS')
        cy.findByRole('link', { name: 'nav.no/sykepenger#utland' })
        cy.contains(
            'I utgangspunktet bør du søke før du reiser til land utenfor EU/EØS. Du kan likevel søke om å få beholde sykepengene etter du har reist.',
        )
    })

    it('Gjenåpner søknaden', () => {
        cy.get('button[data-cy="bruk-soknad-likevel"]').click()
        cy.url().should('include', `${soknad.id}/2`)
        cy.contains('Gå videre')
    })

    it('Velger periode for utenlandsopphold', function () {
        cy.url().should('include', `${soknad.id}/2`)
        cy.findByRole('button', { name: 'Tilbake' }).should('exist')

        cy.get('.navds-progress-bar')
            .should('have.attr', 'aria-valuenow', '2')
            .and('have.attr', 'aria-valuemax', '5')
            .and('have.attr', 'aria-valuetext', '2 av 5')

        cy.get('body').findByRole('link', { name: 'Tilbake' }).should('not.exist')
        cy.contains('Når skal du reise?')

        setPeriodeFraTil(17, 24)

        klikkGaVidere()
    })

    it('Går tilbake og frem', function () {
        klikkTilbake()

        sjekkMainContentFokus()
        klikkGaVidere()
    })

    it('Oppgir arbeidsgiver', function () {
        cy.url().should('include', `${soknad.id}/3`)

        cy.contains('Har du arbeidsgiver?').get('[data-cy="ja-nei-stor"] input[value=JA]').click()

        cy.contains('Er du 100 % sykmeldt?')
            .siblings()
            .eq(0)
            .within(() => {
                cy.get('input[value="JA"]').click()
            })

        cy.contains('Har du avtalt med arbeidsgiveren din at du skal ta ut feriedager i hele perioden?')
            .siblings()
            .eq(0)
            .within(() => {
                cy.get('input[value="NEI"]').click()
            })

        klikkGaVidere()
    })

    it('Avklaring i forbindlese med reise', function () {
        klikkGaVidere(true)
        harFlereFeilISkjemaet(2, [
            'Du må svare på om utenlandsoppholdet er avklart med den som sykmeldte deg',
            'Du må svare på om utenlandsoppholdet er avklart med arbeidsgiver eller NAV',
        ])

        function infoBokser(exists: boolean) {
            cy.contains('Du må avklare reisen med sykemelder før du reiser').should(exists ? 'exist' : 'not.exist')
            cy.contains('Du må avklare reisen med arbeidsgiver/NAV før du reiser').should(
                exists ? 'exist' : 'not.exist',
            )
        }

        infoBokser(false)
        svarRadioGruppe('Har du avklart utenlandsoppholdet med den som sykmeldte deg?', 'Nei')
        svarRadioGruppe('Har du avklart utenlandsoppholdet med arbeidsgiveren/NAV?', 'Nei')
        infoBokser(true)
        svarRadioGruppe('Har du avklart utenlandsoppholdet med den som sykmeldte deg?', 'Ja')
        svarRadioGruppe('Har du avklart utenlandsoppholdet med arbeidsgiveren/NAV?', 'Ja')
        infoBokser(false)

        klikkGaVidere()
    })

    it('Søknad TIL_SLUTT', () => {
        cy.url().should('include', `${soknad.id}/5`)
        cy.get('.navds-guide-panel__content').contains(
            'Nå kan du se over at alt er riktig før du sender inn søknaden. Ved behov kan du endre opplysningene inntil 12 måneder etter innsending.',
        )

        cy.get('[data-cy="oppsummering-fra-søknaden"]').within(() => {
            sporsmalOgSvar('Når skal du reise?', '17. – 24. desember 2020')
            sporsmalOgSvar('Hvilke(t) land skal du reise til?', 'Afghanistan').and('contain', 'Sør-Korea')
            sporsmalOgSvar('Har du arbeidsgiver?', 'Ja')
            sporsmalOgSvar('Er du 100 % sykmeldt?', 'Ja')
            sporsmalOgSvar('Har du avtalt med arbeidsgiveren din at du skal ta ut feriedager i hele perioden?', 'Nei')
        })
    })

    it('Sender søknaden', function () {
        cy.url().should('include', `${soknad.id}/5`)

        cy.get('.navds-progress-bar')
            .should('have.attr', 'aria-valuenow', '5')
            .and('have.attr', 'aria-valuemax', '5')
            .and('have.attr', 'aria-valuetext', '5 av 5')

        cy.contains('Send søknaden').click()
    })

    it('Viser kvittering med Ferdig-knapp', function () {
        cy.url().should('include', `kvittering/${soknad.id}`)
        // Hva skjer videre
        cy.get('[data-cy="kvittering-panel"]')
            .should('contain', 'Hva skjer videre?')
            .and('contain', 'Du får svar på om du kan reise')
            .and('contain', 'Risiko ved å reise før du har mottatt svar')
            .and('contain', 'Les mer om sykepenger når du er på reise.')
            .and('contain', 'Du søker om sykepenger')
    })

    it('Går til listevisningen', function () {
        cy.visit('/syk/sykepengesoknad?testperson=bare-utland')
        cy.contains('Søknader')
    })

    it('Navigerer til den sendte søknaden igjen', function () {
        cy.get('[data-cy="Tidligere søknader"]')
            .findByRole('link', { name: 'Søknad om å beholde sykepenger utenfor EU/EØS Sendt til NAV' })
            .click()
    })

    it('Viser sendt side', function () {
        cy.url().should('include', `sendt/${soknad.id}`)
        cy.contains('Oppsummering fra søknaden')
    })
})
