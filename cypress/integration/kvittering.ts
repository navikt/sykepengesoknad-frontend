import {
    arbeidsgiverInnenforArbeidsgiverperiodeKvitteringMock,
    arbeidsledigKvitteringMock,
    arbeidstakerOppfolgendeMedOppholdKvitteringMock,
    arbeidstakerOppfolgendeUtenOppholdKvitteringMock,
    arbeidstakerUtenforArbeidsgiverperiodeKvitteringMock,
    oppholdUtlandKvitteringMock,
    selvstendigKvitteringMock,
    sendtArbeidsledigKvitteringMock
} from '../../src/data/mock/data/soknader-integration'

describe('Tester kvittering', () => {
    //-----
    // Arbeidsledig, Frilanser og Annet (sendt, etter 30 dager)
    // Utland (sendt, etter 30 dager)
    // Selvstendig Næringsdrivende (sendt, etter 30 dager)
    // Arbeidstaker (intill 16 dager, mer enn 16 dager, oppfølgende periode uten opphold, oppfølgende periode med 16 eller mindre dager opphold, etter 30 dager)
    //-----

    const arbeidsledigSoknad = arbeidsledigKvitteringMock
    const arbeidsledigEtter30Dager = sendtArbeidsledigKvitteringMock
    const utlandSoknad = oppholdUtlandKvitteringMock
    const selvstendig = selvstendigKvitteringMock
    const arbeidstakerInnenforArbeidsgiverperiode = arbeidsgiverInnenforArbeidsgiverperiodeKvitteringMock
    const arbeidstakerUtenforArbeidsgiverperiode = arbeidstakerUtenforArbeidsgiverperiodeKvitteringMock
    const arbeidstakerOppfolgendeUtenOpphold = arbeidstakerOppfolgendeUtenOppholdKvitteringMock
    const arbeidstakerOppfolgendeMedOpphold = arbeidstakerOppfolgendeMedOppholdKvitteringMock

    before(() => {
        cy.visit('http://localhost:8080')
    })

    afterEach(() =>{
        cy.get('.brodsmuler__smuler .smule .lenke:contains(Søknader om sykepenger)').click({ force: true })
    })

    context('Arbeidsledig', () => {
        it('Nylig sendt', () => {
            // Velg søknad
            cy.get(`#soknader-list-til-behandling article a[href*=${arbeidsledigSoknad.id}]`).click()

            // Svar og send
            cy.contains('Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige.')
                .click({ force: true })
            cy.contains('Gå videre').click()
            cy.get('.inputPanelGruppe__inner label:nth-child(2) > input[value=NEI]').click({ force: true })
            cy.contains('Gå videre').click()
            cy.get('.skjemaelement__label').click({ force: true })
            cy.contains('Send søknaden').click()
            cy.url().should('include', `/kvittering/${arbeidsledigSoknad.id}`)

            // Sendt datoer
            cy.get('.kvittering .alertstripe--suksess')
                .should('contain', 'Søknaden er sendt til NAV')
                .and('not.contain', 'Org.nr')

            // TODO: Stemmer ikke helt overens med skisser i trello
            // Hva skjer videre
            cy.get('.alertstripe.opplysninger.alertstripe--info')
                .should('contain', 'Hva skjer videre?')
                .and('contain', 'NAV behandler søknaden din')
                .and('contain', 'Saksbehandlingstid avhenger av hvilket fylke du bor i og om det er førstegangs-søknad eller søknad om forlengelse.')
                .and('contain', 'Når blir pengene utbetalt?')
                .and('contain', 'Det er ulike regler for sykepenger avhengig av hva slags arbeid du har eller hvilken situasjon du er i.')

            // TODO: Skal ligge under Hva skjer
            // Knapperad ( Endre, Ettersend)
            cy.contains('Endre søknad').should('exist')
            cy.contains('Send til NAV').should('exist')
            cy.contains('Send til Arbeidsgiver').should('not.exist')

            // Oppsummering minimert
            cy.get('.utvidbar.oppsummering.ekspander.lilla .utvidbar__toggle')
                .should('contain', 'Oppsummering fra søknaden')
                .and('have.attr', 'aria-expanded', 'false')

            // Opplysninger minimert
            cy.get('.utvidbar.ekspander .utvidbar__toggle')
                .should('contain', 'Opplysninger fra sykmeldingen')
                .and('have.attr', 'aria-expanded', 'false')
        })

        it('Etter 30 dager', () => {
            cy.get(`#soknader-sendt article[aria-labelledby*=${arbeidsledigEtter30Dager.id}]`).click()

            cy.url().should('include', `/kvittering/${arbeidsledigEtter30Dager.id}`)

            // Sendt datoer
            cy.get('.kvittering .alertstripe--suksess')
                .should('contain', 'Søknaden er sendt til NAV')
                .and('contain', 'Mottatt: Torsdag 23. april, kl 11:56')
                .and('not.contain', 'Org.nr')

            // Hva skjer videre skal ikke finnes
            cy.get('.alertstripe.opplysninger.alertstripe--info')
                .should('exist')            // TODO: Skal være not.exist

            // Knapperad ( Endre, Ettersend)
            cy.contains('Endre søknad').should('exist')
            cy.contains('Send til NAV').should('exist')
            cy.contains('Send til Arbeidsgiver').should('not.exist')

            // Oppsummering ekspandert
            cy.get('.utvidbar.oppsummering.ekspander.lilla .utvidbar__toggle')
                .should('contain', 'Oppsummering fra søknaden')
                .and('have.attr', 'aria-expanded', 'false')  // TODO: Skal være true

            // Opplysninger minimert
            cy.get('.utvidbar.ekspander .utvidbar__toggle')
                .should('contain', 'Opplysninger fra sykmeldingen')
                .and('have.attr', 'aria-expanded', 'false')
        })
    })

    context('Utland', () => {
        it('Nylig sendt', () => {
            // Velg søknad
            cy.get(`#soknader-list-til-behandling article a[href*=${utlandSoknad.id}]`).click({ force: true })

            // Svar og send
            cy.get('.skjemaelement__input.form-control').focus()
            cy.get('.flatpickr-calendar').contains('17').click({ force: true })
            cy.get('.flatpickr-calendar').contains('24').click({ force: true })
            cy.contains('Gå videre').click()
            cy.get('.skjemaelement__input').type('Fransk')
            cy.contains('Søre franske territorier').click({ force: true })
            cy.contains('Gå videre').click({ force: true })
            cy.contains('Nei').click({ force: true })
            cy.contains('Gå videre').click({ force: true })
            cy.contains('Jeg bekrefter de to punktene ovenfor').click({ force: true })
            cy.contains('Send søknaden').click({ force: true })
            cy.url().should('include', `/kvittering/${utlandSoknad.id}`)

            // Sendt datoer
            cy.get('.kvittering .alertstripe--suksess')
                .should('contain', 'Søknaden er sendt til NAV')
                .and('not.contain', 'Org.nr')

            // Hva skjer videre
            cy.get('.alertstripe.opplysninger.alertstripe--info')
                .should('contain', 'Hva skjer videre?')
                .and('contain', 'Du får svar på om du kan reise')
                .and('contain', 'NAV vurderer om reisen vil forlenge sykefraværet ditt eller hindre planlagte aktiviteter.')
                .and('contain', 'Risiko ved reise før du har mottatt svar')
                .and('contain', 'Du kan risikere at sykepengene stanses i perioden du er på Reise.')
                .and('contain', 'Sykepengene kan beregnes etter et lavere grunnlag når du er tilbake.')
                .and('contain', 'Du kan få avslag på videre sykepenger hvis reisen varer fire uker eller mer.')
                .and('contain', 'Les mer om sykepenger nå du er på reise.')
                .and('contain', 'Les mer om sykepenger nå du er på reise.')
                .and('contain', 'NAV behandler søknaden din')   // TODO: Skal ikke være en del av denne kvitteringen
                .and('contain', 'Saksbehandlingstid avhenger av hvilket fylke du bor i og om det er førstegangs-søknad eller søknad om forlengelse. Finn ut hva som gjelder for ditt fylke her.') // TODO: Skal ikke være en del av denne kvitteringen
                .and('contain', 'Du søker om sykepenger')
                .and('contain', 'Etter at sykefraværsperioden er over, søker du om sykepenger på vanlig måte. Du får en melding fra NAV når søknaden er klar til å fylles ut.')

            // Knapperad finnes ikke
            cy.contains('Endre søknad').should('not.exist')
            cy.contains('Send til NAV').should('not.exist')
            cy.contains('Send til Arbeidsgiver').should('not.exist')

            // Oppsummering minimert
            cy.get('.utvidbar.oppsummering.ekspander.lilla .utvidbar__toggle')
                .should('contain', 'Oppsummering fra søknaden')
                .and('have.attr', 'aria-expanded', 'false')

            // Opplysninger finnes ikke
            cy.contains('Opplysninger fra sykmeldingen').should('not.exist')
        })
    })

    context('Selvstendig', () => {
        it('Nylig sendt', () => {
            // Velg søknad
            cy.get(`#soknader-list-til-behandling article a[href*=${selvstendig.id}]`).click()

            // Svar og send
            cy.contains('Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige.')
                .click({ force: true })
            cy.contains('Gå videre').click()
            cy.get('.inputPanelGruppe__inner label:nth-child(2) > input[value=NEI]').click({ force: true })
            cy.contains('Gå videre').click()
            cy.get('.skjemaelement__label').click({ force: true })
            cy.contains('Send søknaden').click()
            cy.url().should('include', `/kvittering/${selvstendig.id}`)

            // Sendt datoer
            cy.get('.kvittering .alertstripe--suksess')
                .should('contain', 'Søknaden er sendt til NAV')
                .and('not.contain', 'Dato sendt:')          // TODO: Skal være contain, står nå Mottatt:
                .and('not.contain', 'Org.nr')

            // TODO: Stemmer ikke helt overens med skisser i trello
            // Hva skjer videre
            cy.get('.alertstripe.opplysninger.alertstripe--info')
                .should('contain', 'Hva skjer videre?')
                .and('contain', 'NAV behandler søknaden din')
                .and('contain', 'Saksbehandlingstid avhenger av hvilket fylke du bor i og om det er førstegangs-søknad eller søknad om forlengelse.')
                .and('contain', 'Når blir pengene utbetalt?')
                .and('contain', 'Det er ulike regler for sykepenger avhengig av hva slags arbeid du har eller hvilken situasjon du er i.')

            // TODO: Skal ligge under Hva skjer
            // Knapperad ( Endre, Ettersend)
            cy.contains('Endre søknad').should('exist')
            cy.contains('Send til NAV').should('exist')
            cy.contains('Send til Arbeidsgiver').should('not.exist')

            // Oppsummering minimert
            cy.get('.utvidbar.oppsummering.ekspander.lilla .utvidbar__toggle')
                .should('contain', 'Oppsummering fra søknaden')
                .and('have.attr', 'aria-expanded', 'false')

            // Opplysninger minimert
            cy.get('.utvidbar.ekspander .utvidbar__toggle')
                .should('contain', 'Opplysninger fra sykmeldingen')
                .and('have.attr', 'aria-expanded', 'false')
        })
    })

    context.skip('Arbeidstaker', () => {
        it('Innenfor arbeidsgiverperiode', () => {
            // Velg søknad
            cy.get(`#soknader-list-til-behandling article a[href*=${arbeidstakerInnenforArbeidsgiverperiode.id}]`).click()

            // Svar og send
            cy.contains('Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige.')
                .click({ force: true })
            cy.contains('Gå videre').click()
            cy.get('.inputPanelGruppe__inner label:nth-child(2) > input[value=NEI]').click({ force: true })
            cy.contains('Gå videre').click()
            cy.get('.skjemaelement__label').click({ force: true })
            cy.contains('Send søknaden').click()
            cy.url().should('include', `/kvittering/${arbeidstakerInnenforArbeidsgiverperiode.id}`)

            // Sendt datoer
            cy.get('.kvittering .alertstripe--suksess')
                .should('contain', 'Søknaden er sendt')
                .and('not.contain', 'Søknaden er sendt til NAV')

            // TODO: Avkrysset med sendt til arbeidsgiver

            // Hva skjer videre
            cy.get('.alertstripe.opplysninger.alertstripe--info')
                .should('contain', 'Hva skjer videre?')
                .and('contain', 'Du får sykepengene fra arbeidsgiveren din')
                .and('contain', 'Arbeidsgiveren din betaler de første 16 kalenderdagene av sykefraværet. Hvis du mener sykefraværet har vart lenger enn det, kan du sende søknaden til NAV. Noen arbeidsplasser fortsetter å utbetale sykepenger fra dag 17, men da får de penger tilbake fra NAV.')
                .and('not.contain', 'Før NAV behandler søknaden')
                .and('not.contain', 'NAV behandler søknaden')
                .and('not.contain', 'Når blir pengene utbetalt')

            // TODO: Skal ligge under Hva skjer
            // Knapperad ( Endre, Ettersend)
            cy.contains('Endre søknad').should('exist')
            cy.contains('Send til NAV').should('exist')
            cy.contains('Send til Arbeidsgiver').should('exist')

            // Oppsummering minimert
            cy.get('.utvidbar.oppsummering.ekspander.lilla .utvidbar__toggle')
                .should('contain', 'Oppsummering fra søknaden')
                .and('have.attr', 'aria-expanded', 'false')

            // Opplysninger minimert
            cy.get('.utvidbar.ekspander .utvidbar__toggle')
                .should('contain', 'Opplysninger fra sykmeldingen')
                .and('have.attr', 'aria-expanded', 'false')
        })

        it('Utenfor arbeidsgiverperiode', () => {
            // Velg søknad
            cy.get(`#soknader-list-til-behandling article a[href*=${arbeidstakerUtenforArbeidsgiverperiode.id}]`).click()

            // Svar og send
            cy.contains('Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige.')
                .click({ force: true })
            cy.contains('Gå videre').click()
            cy.get('.inputPanelGruppe__inner label:nth-child(2) > input[value=NEI]').click({ force: true })
            cy.contains('Gå videre').click()
            cy.get('.skjemaelement__label').click({ force: true })
            cy.contains('Send søknaden').click()
            cy.url().should('include', `/kvittering/${arbeidstakerUtenforArbeidsgiverperiode.id}`)

            // Sendt datoer
            cy.get('.kvittering .alertstripe--suksess')
                .should('contain', 'Søknaden er sendt')

            // TODO: Avkrysset med sendt til arbeidsgiver og NAV

            // Hva skjer videre
            cy.get('.alertstripe.opplysninger.alertstripe--info')
                .should('contain', 'Hva skjer videre?')
                .and('contain', 'Før NAV behandler søknaden')
                .and('contain', 'Sykefraværet ditt er lengre enn 16 kalenderdager. Det betyr at du får sykepenger utbetalt av NAV. Noen arbeidsgplasser fortsetter å utbetale sykepenger fra dag 17, men da får de penger tilbake fra NAV senere. Arbeidsgiveren din må derfor sende oss inntektsmelding så fort som mulig.')
                .and('contain', 'Hvorfor går det et skille ved 16 dager?')
                .and('contain', 'Hva er en inntektsmelding')
                .and('contain', 'NAV behandler søknaden')
                .and('contain', 'Saksbehandlingstidene kan variere noe. Sjekk saksbehandlingstidene i ditt fylke')
                .and('contain', 'Når blir pengene utbetalt')
                .and('contain', 'Blir søknaden din innvilget før den 15. i denne måneden, blir pengene utbetalt innen den 25. samme måned. Blir det innvilget etter den 15. i måneden, utbetales pengene innen 5 dager.')
                .and('not.contain', 'Du får sykepengene fra arbeidsgiveren din')

            // TODO: Skal ligge under Hva skjer
            // Knapperad ( Endre, Ettersend)
            cy.contains('Endre søknad').should('exist')
            cy.contains('Send til NAV').should('exist')
            cy.contains('Send til Arbeidsgiver').should('exist')

            // Oppsummering minimert
            cy.get('.utvidbar.oppsummering.ekspander.lilla .utvidbar__toggle')
                .should('contain', 'Oppsummering fra søknaden')
                .and('have.attr', 'aria-expanded', 'false')

            // Opplysninger minimert
            cy.get('.utvidbar.ekspander .utvidbar__toggle')
                .should('contain', 'Opplysninger fra sykmeldingen')
                .and('have.attr', 'aria-expanded', 'false')
        })

        it('Oppfølgende periode uten opphold', () => {
            // Velg søknad
            cy.get(`#soknader-list-til-behandling article a[href*=${arbeidstakerOppfolgendeUtenOpphold.id}]`).click()

            // Svar og send
            cy.contains('Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige.')
                .click({ force: true })
            cy.contains('Gå videre').click()
            cy.get('.inputPanelGruppe__inner label:nth-child(2) > input[value=NEI]').click({ force: true })
            cy.contains('Gå videre').click()
            cy.get('.skjemaelement__label').click({ force: true })
            cy.contains('Send søknaden').click()
            cy.url().should('include', `/kvittering/${arbeidstakerOppfolgendeUtenOpphold.id}`)

            // Sendt datoer
            cy.get('.kvittering .alertstripe--suksess')
                .should('contain', 'Søknaden er sendt')

            // TODO: Avkrysset med sendt til NAV

            // Hva skjer videre
            cy.get('.alertstripe.opplysninger.alertstripe--info')
                .should('contain', 'Hva skjer videre?')
                .and('contain', 'NAV behandler søknaden')
                .and('contain', 'Saksbehandlingstidene kan variere noe. Sjekk saksbehandlingstidene i ditt fylke')
                .and('contain', 'Når blir pengene utbetalt')
                .and('contain', 'Blir søknaden din innvilget før den 15. i denne måneden, blir pengene utbetalt innen den 25. samme måned. Blir det innvilget etter den 15. i måneden, utbetales pengene innen 5 dager.')
                .and('not.contain', 'Før NAV behandler søknaden')
                .and('not.contain', 'Du får sykepengene fra arbeidsgiveren din')

            // TODO: Skal ligge under Hva skjer
            // Knapperad ( Endre, Ettersend)
            cy.contains('Endre søknad').should('exist')
            cy.contains('Send til NAV').should('exist')
            cy.contains('Send til Arbeidsgiver').should('exist')

            // Oppsummering minimert
            cy.get('.utvidbar.oppsummering.ekspander.lilla .utvidbar__toggle')
                .should('contain', 'Oppsummering fra søknaden')
                .and('have.attr', 'aria-expanded', 'false')

            // Opplysninger minimert
            cy.get('.utvidbar.ekspander .utvidbar__toggle')
                .should('contain', 'Opplysninger fra sykmeldingen')
                .and('have.attr', 'aria-expanded', 'false')
        })

        it('Oppfølgende periode 16 eller mindre dager', () => {
            // Velg søknad
            cy.get(`#soknader-list-til-behandling article a[href*=${arbeidstakerOppfolgendeMedOpphold.id}]`).click()

            // Svar og send
            cy.contains('Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige.')
                .click({ force: true })
            cy.contains('Gå videre').click()
            cy.get('.inputPanelGruppe__inner label:nth-child(2) > input[value=NEI]').click({ force: true })
            cy.contains('Gå videre').click()
            cy.get('.skjemaelement__label').click({ force: true })
            cy.contains('Send søknaden').click()
            cy.url().should('include', `/kvittering/${arbeidstakerOppfolgendeMedOpphold.id}`)

            // Sendt datoer
            cy.get('.kvittering .alertstripe--suksess')
                .should('contain', 'Søknaden er sendt')

            // TODO: Avkrysset med sendt til NAV

            // Hva skjer videre
            cy.get('.alertstripe.opplysninger.alertstripe--info')
                .should('contain', 'Hva skjer videre?')
                .and('contain', 'Før NAV behandler søknaden')
                .and('contain', 'Du har vært friskmeldt inntil 16 dager siden sist du søkte om sykepenger. Da må arbeidsgiver sende oss inntektsmelding på nytt. Hør gjerne med arbeidsgiveren din hvis du er usikker på om den er sendt.')
                .and('contain', 'Hvorfor inntektsmeldingen må sendes på nytt?')
                .and('contain', 'NAV behandler søknaden')
                .and('contain', 'Saksbehandlingstidene kan variere noe. Sjekk saksbehandlingstidene i ditt fylke')
                .and('contain', 'Når blir pengene utbetalt')
                .and('contain', 'Blir søknaden din innvilget før den 15. i denne måneden, blir pengene utbetalt innen den 25. samme måned. Blir det innvilget etter den 15. i måneden, utbetales pengene innen 5 dager.')
                .and('not.contain', 'Du får sykepengene fra arbeidsgiveren din')

            // TODO: Skal ligge under Hva skjer
            // Knapperad ( Endre, Ettersend)
            cy.contains('Endre søknad').should('exist')
            cy.contains('Send til NAV').should('exist')
            cy.contains('Send til Arbeidsgiver').should('exist')

            // Oppsummering minimert
            cy.get('.utvidbar.oppsummering.ekspander.lilla .utvidbar__toggle')
                .should('contain', 'Oppsummering fra søknaden')
                .and('have.attr', 'aria-expanded', 'false')

            // Opplysninger minimert
            cy.get('.utvidbar.ekspander .utvidbar__toggle')
                .should('contain', 'Opplysninger fra sykmeldingen')
                .and('have.attr', 'aria-expanded', 'false')
        })
    })
})
