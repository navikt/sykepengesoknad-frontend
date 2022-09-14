import { oppholdUtland, soknaderOpplaering as soknader } from '../../../src/data/mock/data/soknader-opplaering'
import { RSSoknad } from '../../../src/types/rs-types/rs-soknad'

describe('Tester søknad om å beholde sykepenger utenfor EU/EØS/Storbritannia', () => {
    const soknad = soknader.find((sok: RSSoknad) => sok.id === oppholdUtland.id)!

    before(() => {
        cy.visit('http://localhost:8080/syk/sykepengesoknad')
    })

    it('Laster startside og velger søknad', function () {
        cy.get('.navds-heading--xlarge').should('be.visible').and('have.text', 'Søknader')
        cy.get(`#soknader-list-til-behandling article a[href*=${soknad.id}]`).should(
            'include.text',
            'Søknad om å beholde sykepenger utenfor EU/EØS/Storbritannia'
        )
        cy.get(`#soknader-list-til-behandling article a[href*=${soknad.id}]`).click()
    })

    it('Velger periode for utenlandsopphold', function () {
        cy.url().should('include', `${soknad.id}/1`)

        cy.contains('Opplysninger fra sykmeldingen').should('not.exist')
        cy.contains('Når skal du reise?')

        cy.get('#1_0 .fom .ds-datepicker__calendarButton').click()
        cy.get('.DayPicker-Day').contains('17').click()
        cy.get('#1_0 .tom .ds-datepicker__calendarButton').click()
        cy.get('.DayPicker-Day').contains('24').click()

        cy.contains('Gå videre').click()
    })

    it('Velger land', function () {
        cy.url().should('include', `${soknad.id}/2`)
        cy.get('.skjemaelement__input').click({ force: true })
        cy.contains('Afghanistan').click({ force: true })
        cy.contains('Albania').should('not.exist')
        cy.get('.etikett__slett').click({ force: true })

        cy.contains('Gå videre').click({ force: true })
        cy.contains('Du må velge ett land')
        cy.contains('Det er 1 feil i skjemaet')
        cy.contains(
            'Du må oppgi et land utenfor EU/EØS/Storbritannia. Innenfor EU/EØS/Storbritannia trenger du ikke søke.'
        )

        cy.contains('Hvilket land skal du reise til?')
        cy.get('.skjemaelement__input').type('Fransk', { force: true })
        cy.contains('Fransk Polynesia')
        cy.contains('Søre franske territorier').click({ force: true })
        cy.get('.etikett__slett').click({ force: true })
        cy.contains('Du må velge ett land')
        cy.contains('Det er 1 feil i skjemaet')

        cy.get('.skjemaelement__input').type('Fransk', { force: true })
        cy.contains('Fransk Polynesia')
        cy.contains('Søre franske territorier').click({ force: true })

        cy.get('.skjemaelement__input').type('De')
        cy.contains('De forente arabiske emirater')
        cy.contains('De okkuperte palestinske områdene').click({ force: true })

        cy.get('.skjemaelement__input').type('R')
        cy.contains('Amerikansk Samoa').click({ force: true })
        cy.contains('Amerikansk Samoa')
        cy.get(':nth-child(3) > .etikett__slett').click({ force: true })
        cy.contains('Amerikansk Samoa').should('not.exist')

        cy.contains('Gå videre').click({ force: true })
    })

    it('Går tilbake og frem', function () {
        cy.contains('Tilbake').click({ force: true })
        cy.contains('Gå videre').click({ force: true })
    })

    it('Oppgir arbeidsgiver', function () {
        cy.url().should('include', `${soknad.id}/3`)

        cy.contains('Har du arbeidsgiver?')
        cy.contains('Ja').click({ force: true })

        cy.contains('Er du 100 % sykmeldt?').siblings().contains('Ja').click()

        cy.contains('Har du avtalt med arbeidsgiveren din at du skal ta ut feriedager i hele perioden?')
            .siblings()
            .contains('Nei')
            .click()

        cy.contains('Gå videre').click({ force: true })
    })

    it('Oppsummering fra søknaden', function () {
        cy.url().should('include', `${soknad.id}/4`)

        cy.contains('Oppsummering fra søknaden').click()

        cy.get('.oppsummering .oppsummering__seksjon')
            .contains('Når skal du reise?')
            .siblings()
            .should('contain', '17. – 24. desember 2020')

        cy.get('.oppsummering .oppsummering__seksjon')
            .contains('Hvilket land skal du reise til?')
            .siblings()
            .should('contain', 'Søre franske territorier')
            .and('contain', 'De okkuperte palestinske områdene')

        cy.get('.oppsummering .oppsummering__seksjon')
            .contains('Har du arbeidsgiver?')
            .siblings()
            .should('contain', 'Ja')
            .get('.oppsummering__undersporsmalsliste')
            .within(() => {
                cy.contains('Er du 100 % sykmeldt?').siblings().should('contain', 'Ja')

                cy.contains('Har du avtalt med arbeidsgiveren din at du skal ta ut feriedager i hele perioden?')
                    .siblings()
                    .should('contain', 'Nei')
            })
    })

    it('Sender søknaden', function () {
        cy.url().should('include', `${soknad.id}/4`)

        cy.contains('Bekreft opplysninger')
        cy.contains('Før du reiser ber vi deg bekrefte')
        cy.contains('Jeg bekrefter de to punktene ovenfor').click({
            force: true,
        })

        cy.contains('Send søknaden').click({ force: true })
    })

    it('Viser kvittering', function () {
        cy.url().should('include', `kvittering/${soknad.id}`)
        // Hva skjer videre
        cy.get('.opplysninger.navds-alert--info')
            .should('contain', 'Hva skjer videre?')
            .and('contain', 'Du får svar på om du kan reise')
            .and('contain', 'Risiko ved reise før du har mottatt svar')
            .and('contain', 'Les mer om sykepenger når du er på reise.')
            .and('contain', 'Du søker om sykepenger')

        cy.contains('Gå til neste søknad')
    })
})
