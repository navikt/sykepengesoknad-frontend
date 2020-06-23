
describe('Tester kvittering', () => {
    //-----
    // Arbeidsledig, Frilanser og Annet (sendt, etter 30 dager)
    // Utland (sendt, etter 30 dager)
    // Selvstendig Næringsdrivende (sendt, etter 30 dager)
    // Arbeidstaker (intill 16 dager, mer enn 16 dager, oppfølgende periode uten opphold, oppfølgende periode med 16 eller mindre dager opphold, etter 30 dager)
    //-----

    // TODO: const arbeidsledigSoknad = arbeidsledigKvitteringMock
    // TODO: const arbeidsledigEtter30Dager = sendtArbeidsledigKvitteringMock
    // TODO: const utlandSoknad = oppholdUtlandKvitteringMock
    // TODO: const selvstendig = selvstendigKvitteringMock
    // TODO: const arbeidstakerInnenforArbeidsgiverperiode = arbeidsgiverInnenforArbeidsgiverperiodeKvitteringMock
    // TODO: const arbeidstakerUtenforArbeidsgiverperiode = arbeidstakerUtenforArbeidsgiverperiodeKvitteringMock
    // TODO: const arbeidstakerOppfolgendeUtenOpphold = arbeidstakerOppfolgendeUtenOppholdKvitteringMock
    // TODO: const arbeidstakerOppfolgendeMedOpphold = arbeidstakerOppfolgendeMedOppholdKvitteringMock

    before(() => {
        cy.visit('http://localhost:8080')
    })

    context.skip('Arbeidsledig', () => {
        it('Nylig sendt', () => {
            // TODO: Fyll ut søknad

            cy.url().should('include', '/kvittering/')

            // Sendt datoer
            cy.get('.kvittering .alertstripe--suksess')
                .should('contain', 'Søknaden er sendt til NAV')
                .and('not.contain', 'Org.nr')

            // TODO: Stemmer ikke helt overens med skisser i trello
            // Hva skjer videre
            cy.get('.alertstripe .opplysninger .alertstripe--info')
                .should('contain', 'Hva skjer videre?')
                .and('contain', 'NAV behandler søknaden din')
                .and('contain', 'Saksbehandlingstid avhenger av hvilket fylke du bor i og om det er førstegangs-søknad eller søknad om forlengelse.')
                .and('contain', 'Når blir pengene utbetalt?')
                .and('contain', 'Det er ulike regler for sykepenger avhengig av hva slags arbeid du har eller hvilken situasjon du er i.')

            // TODO: Skal ligge under Hva skjer
            // Knapperad ( Endre, Ettersend)
            cy.contains('Endre søknad').should('exsist')
            cy.contains('Send til NAV').should('exsist')
            cy.contains('Send til Arbeidsgiver').should('not.exsist')

            // Oppsummering minimert
            cy.get('.utvidbar .ekspander .lilla #utvidbar__toggle')
                .should('contain', 'Oppsummering fra søknaden')
                .and('have.attr', 'aria-expanded', 'false')

            // Opplysninger minimert
            cy.get('.utvidbar .ekspander #utvidbar__toggle')
                .should('contain', 'Opplysninger fra sykmeldingen')
                .and('have.attr', 'aria-expanded', 'false')
        })

        it('Etter 30 dager', () => {
            // TODO: Gå inn på søknad

            cy.url().should('include', '/kvittering/')

            // Sendt datoer
            cy.get('.kvittering .alertstripe--suksess')
                .should('contain', 'Søknaden er sendt til NAV')
                .and('not.contain', 'Org.nr')

            // Hva skjer videre skal ikke finnes
            cy.get('.alertstripe .opplysninger .alertstripe--info')
                .should('not.exist')

            // Knapperad ( Endre, Ettersend)
            cy.contains('Endre søknad').should('exsist')
            cy.contains('Send til NAV').should('exsist')
            cy.contains('Send til Arbeidsgiver').should('not.exsist')

            // Oppsummering ekspandert
            cy.get('.utvidbar .ekspander .lilla #utvidbar__toggle')
                .should('contain', 'Oppsummering fra søknaden')
                .and('have.attr', 'aria-expanded', 'true')

            // Opplysninger minimert
            cy.get('.utvidbar .ekspander #utvidbar__toggle')
                .should('contain', 'Opplysninger fra sykmeldingen')
                .and('have.attr', 'aria-expanded', 'false')
        })
    })

    context.skip('Utland', () => {
        it('Nylig sendt', () => {
            // Samme som arbeidsledig (annen tekst Hva skjer)
            // Ingen knapperad
            // Ingen sykmelding
        })

        it('Etter 30 dager', () => {
            // Samme som arbeidsledig (annen tekst Hva skjer)
            // Ingen knapperad
            // Ingen sykmelding

            // TODO: Denne dekkes av Arbeidsledig og Utland
        })
    })

    context.skip('Selvstendig', () => {
        it('Nylig sendt', () => {
            // Samme som arbeidsledig (annen tekst Hva skjer)
        })

        it('Etter 30 dager', () => {
            // Samme som arbeidsledig (annen tekst Hva skjer)

            // TODO: Denne dekkes av Arbeidsledig og Selvstendig
        })
    })

    context.skip('Arbeidstaker', () => {
        it('Innenfor arbeidsgiverperiode', () => {
            // Samme som arbeidsledig (annen tekst Hva skjer)
            // Trenger ikke inntektsmelding
        })

        it('Utenfor arbeidsgiverperiode', () => {
            // Samme som arbeidsledig (annen tekst Hva skjer)
            // Inntektsmelding
        })

        it('Oppfølgende periode uten opphold', () => {
            // Samme som arbeidsledig (annen tekst Hva skjer)
            // Trenger ikke inntektsmelding
        })

        it('Oppfølgende periode 16 eller mindre dager', () => {
            // Samme som arbeidsledig (annen tekst Hva skjer)
            // Inntektsmelding
        })

        it('Etter 30 dager', () => {
            // Samme som arbeidsledig (annen tekst Hva skjer)

            // TODO: Denne dekkes av Arbeidsledig og Arbeidstaker
        })
    })
})
