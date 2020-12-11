import { arbeidstakerGradert } from '../../src/data/mock/data/soknader-opplaering'

describe('Tester arbeidstakersøknad - gradert 50%', () => {

    const soknad = arbeidstakerGradert

    before(() => {
        cy.visit('http://localhost:8080')
    })

    it('Laster startside', function() {
        cy.get('.typo-sidetittel').should('be.visible').and('have.text', 'Søknader om sykepenger')
        cy.get(`#soknader-list-til-behandling article a[href*=${soknad.id}]`).click()
    })


    it('Søknad ANSVARSERKLARING - steg 1', function() {
        cy.url().should('include', `${soknad.id}/1`)

        // Sykmelding
        cy.contains('1. april - 24. april 2020 • 24 dager')
        cy.contains('POSTEN NORGE AS, BÆRUM')
        cy.contains('50 % sykmeldt')
        cy.contains('Opplysninger fra sykmeldingen').click()

        // Godkjenne ANSVARSERKLARING
        cy.contains('Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige.')
            .click({ force: true })

        cy.contains('Gå videre').click()
    })


    it('Tilbake til ANSVARSERKLARING og frem igjen', function() {
        cy.url().should('include', `${soknad.id}/2`)
        cy.contains('Tilbake').click()
        cy.url().should('include', `${soknad.id}/1`)
        cy.contains('Gå videre').click()
    })


    it('Søknad PERMITTERT_NAA - steg 2', function() {
        cy.url().should('include', `${soknad.id}/2`)

        // Sjekk at sykmelding er minimert
        cy.get('.sykmelding-perioder').should('not.be.visible')

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })
        cy.contains('Velg første dag i permitteringen')
        cy.get('.undersporsmal .skjemaelement__input.form-control').focus()
        cy.get('.flatpickr-calendar').contains('20').click({ force: true })

        // Gå til neste, så tilbake å svar nei
        cy.contains('Gå videre').click()
        cy.url().should('include', `${soknad.id}/3`)
        cy.contains('Tilbake').click()
        cy.get('.inputPanelGruppe__inner label:nth-child(2) > input[value=NEI]').click({ force: true })

        cy.contains('Gå videre').click()
    })


    it('Søknad PERMITTERT_PERIODE - steg 3', function() {
        cy.url().should('include', `${soknad.id}/3`)

        // Hovedspørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })

        // Periode 1
        cy.get('.skjemaelement__input.form-control#687295_t_0').focus()
        cy.get('.flatpickr-calendar.open').contains('4').click({ force: true })
        cy.get('.flatpickr-calendar.open').contains('5').click({ force: true })

        // Periode 2
        cy.contains('+ Legg til ekstra periode').click()
        cy.get('.skjemaelement__input.form-control#687295_t_1').focus()
        cy.get('.flatpickr-calendar.open').contains('11').click({ force: true })
        cy.get('.flatpickr-calendar.open').contains('12').click({ force: true })
        cy.get('.skjemaelement__input#687295_1')
            .should('exist')
            .and('have.value', '11.04.2020   -    12.04.2020')

        // Periode 3
        cy.contains('+ Legg til ekstra periode').click()
        cy.get('.skjemaelement__input.form-control#687295_t_2').focus()
        cy.get('.flatpickr-calendar.open').contains('18').click({ force: true })
        cy.get('.flatpickr-calendar.open').contains('19').click({ force: true })
        cy.get('.skjemaelement__input#687295_2')
            .should('exist')
            .and('have.value', '18.04.2020   -    19.04.2020')

        // Fjern periode 2, id oppdateres
        cy.get('.skjemaelement__input.form-control#687295_t_1')
            .siblings()
            .contains('Slett periode')
            .click({ force: true })
        cy.get('.skjemaelement__input.form-control#687295_t_1')
            .should('exist')
            .and('have.value', '18.04.2020   -    19.04.2020')
        cy.get('.skjemaelement__input.form-control#687295_t_2')
            .should('not.exist')

        // Fjern periode 3
        cy.get('.skjemaelement__input.form-control#687295_t_1')
            .siblings()
            .contains('Slett periode')
            .click({ force: true })
        cy.get('.skjemaelement__input.form-control#687295_t_1')
            .should('not.exist')

        cy.contains('Gå videre').click()
    })


    it('Søknad EGENMELDINGER - steg 4', function() {
        cy.url().should('include', `${soknad.id}/4`)

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })
        cy.get('.undersporsmal .skjemaelement__input#687298').click()

        cy.contains('Hvilke dager var du syk med egenmelding? Du trenger bare oppgi dager før 1. april 2020.')
        cy.get('.undersporsmal .skjemaelement__input.form-control').focus()
        cy.get('.flatpickr-calendar').contains('11').click({ force: true })
        cy.get('.flatpickr-calendar').contains('22').click({ force: true })

        cy.contains('Gå videre').click()
    })


    it('Søknad TILBAKE_I_ARBEID - steg 5', function() {
        cy.url().should('include', `${soknad.id}/5`)

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })
        cy.contains('Når begynte du å jobbe igjen?')
        cy.get('.undersporsmal .skjemaelement__input.form-control').focus()
        cy.get('.flatpickr-calendar').contains('20').click({ force: true })

        cy.contains('Gå videre').click()
    })


    it('Søknad FERIE_V2 - steg 6', function() {
        cy.url().should('include', `${soknad.id}/6`)

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })
        cy.contains('Når tok du ut ferie?')
        cy.get('.undersporsmal .skjemaelement__input.form-control').focus()
        cy.get('.flatpickr-calendar').contains('16').click({ force: true })
        cy.get('.flatpickr-calendar').contains('23').click({ force: true })

        cy.contains('Gå videre').click()
    })


    it('Søknad PERMISJON_V2 - steg 7', function() {
        cy.url().should('include', `${soknad.id}/7`)

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })
        cy.contains('Når tok du permisjon?')
        cy.get('.undersporsmal .skjemaelement__input.form-control').focus()
        cy.get('.flatpickr-calendar').contains('14').click({ force: true })
        cy.get('.flatpickr-calendar').contains('22').click({ force: true })

        cy.contains('Gå videre').click()
    })


    it('Søknad UTLAND_V2 - steg 8', function() {
        cy.url().should('include', `${soknad.id}/8`)

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })
        cy.contains('Når var du utenfor EØS?')
        cy.get('.undersporsmal .skjemaelement__input.form-control').focus()
        cy.get('.flatpickr-calendar').contains('14').click({ force: true })
        cy.get('.flatpickr-calendar').contains('22').click({ force: true })

        cy.contains('Gå videre').click()
    })


    it('Søknad ARBEID_UTENFOR_NORGE - steg 9', function() {
        cy.url().should('include', `${soknad.id}/9`)

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })
        cy.contains('Utfører du arbeid andre steder enn i Norge?')

        cy.contains('Gå videre').click()
    })


    it('Søknad JOBBET_DU_GRADERT - steg 10', function() {
        cy.url().should('include', `${soknad.id}/10`)

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })

        // Underspørsmål 1
        cy.contains('Hvor mange timer i uken jobber du vanligvis når du er frisk? Varierer det, kan du oppgi gjennomsnittet.')
        cy.get('.undersporsmal .skjemaelement__input#687312').focus().type('12')

        // Underspørsmål 2
        cy.contains('Hvor mye jobbet du totalt 1. - 24. april 2020 hos POSTEN NORGE AS, BÆRUM?')
        // Svarer prosent
        cy.get('.undersporsmal .skjemaelement__input.radioknapp[value=prosent]').focus().click({ force: true })
        cy.get('.undersporsmal .skjemaelement__input#687315').focus().type('51')
        // Svarer timer
        cy.get('.undersporsmal .skjemaelement__input.radioknapp[value=timer]').focus().click({ force: true })
        // Ferie/permisjon/tilbake i arbeid dekker alle datoer fra dag 14.
        // Gradkalkulatoren dermed vil regne ut at man har hatt 9 arbeidsdager i denne perioden
        // 12 timer * (9 dager/7) * 0.5 (50% sykefraværsgrad) = 7,71 timer, så vi prøver litt lavere enn det
        cy.get('.undersporsmal .skjemaelement__input#687317').focus().type('7.7')

        cy.contains('Gå videre').click()

        // Feilmelding
        cy.contains('Timene du skrev inn tyder på at du har jobbet mindre enn 50 %. Du må enten svare nei på spørsmålet over eller endre antall timer her.')

        // Endre timer til 7.8, som er mer enn 7.71
        cy.get('.undersporsmal .skjemaelement__input#687317').focus().type('{selectall}').type('7.8')

        cy.contains('Gå videre').click()
    })


    it('Søknad ANDRE_INNTEKTSKILDER - steg 11', function() {
        cy.url().should('include', `${soknad.id}/11`)

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })

        // Svarer JA
        // Underspørsmål nivå 1 - checkbox
        cy.contains('Hvilke andre inntektskilder har du?')
        cy.get('.undersporsmal .checkboxgruppe label[for=687320]').should('include.text', 'andre arbeidsforhold')
        cy.get('.undersporsmal .checkboxgruppe .checkboks#687320').click({ force: true })
        // Underspørsmål nivå 2 - radio
        cy.get('.undersporsmal .checkboxgruppe .radioContainer .radioknapp#687321_0').click({ force: true })
        cy.contains('Du må sende egen sykepengesøknad for dette. ' +
            'Det betyr også at legen må skrive en sykmelding for hvert arbeidsforhold du er sykmeldt fra.')

        // Svarer NEI
        // Underspørsmål nivå 1 - checkbox
        cy.contains('Hvilke andre inntektskilder har du?')
        cy.get('.undersporsmal .checkboxgruppe label[for=687322]').should('include.text', 'selvstendig næringsdrivende')
        cy.get('.undersporsmal .checkboxgruppe .checkboks#687322').click({ force: true })
        // Underspørsmål nivå 2 - radio
        cy.get('.undersporsmal .checkboxgruppe .radioContainer .radioknapp#687323_1').click()

        cy.contains('Gå videre').click()
    })

    it('Søknad UTDANNING - steg 12', function() {
        cy.url().should('include', `${soknad.id}/12`)

        // Test spørsmål
        cy.get('.inputPanelGruppe__inner label:first-child > input[value=JA]').click({ force: true })

        // Underspørsmål 1
        cy.contains('Når startet du på utdanningen?')
        cy.get('.undersporsmal .skjemaelement__input.form-control').focus()
        cy.get('.flatpickr-calendar').contains('10').click({ force: true })

        // Underspørsmål 2 - dato
        cy.contains('Er utdanningen et fulltidsstudium?')
        // Underspørsmål 2 - radio
        cy.get('.undersporsmal .skjemaelement .radioContainer .radioknapp#687333_0').click({ force: true })

        cy.contains('Gå videre').click()
    })


    it('Søknad ANSVARSERKLARING - steg 13', function() {
        cy.url().should('include', `${soknad.id}/13`)
        cy.get('.skjemaelement__label').click({ force: true })
        cy.contains('Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.')
        cy.contains('Søknaden sendes til POSTEN NORGE AS, BÆRUM.')

        cy.contains('Send søknaden').click()
    })

    it('Søknad kvittering', () => {
        cy.url().should('include', `/kvittering/${soknad.id}`)
        cy.get('.hva-skjer')
            .should('contain', 'Hva skjer videre?')
            .and('contain', 'Du får sykepengene fra arbeidsgiveren din')
    })
})
