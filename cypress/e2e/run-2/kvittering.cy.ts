import {
    arbeidsledigKvittering,
    arbeidstakerDeltPeriodeForsteUtenforArbeidsgiverperiodeKvittering,
    arbeidstakerInnenforArbeidsgiverperiodeKvittering,
    arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvittering,
    arbeidstakerMedOppholdKvittering,
    arbeidstakerUtenforArbeidsgiverperiodeKvittering,
    arbeidstakerUtenOppholdForsteUtenforArbeidsgiverperiodeKvittering,
    arbeidstakerUtenOppholdKvittering,
    selvstendigKvittering,
    sendtArbeidsledigKvittering,
} from '../../../src/data/mock/data/soknad/soknader-integration'
import {
    checkViStolerPaDeg,
    klikkGaVidere,
    setPeriodeFraTil,
    sjekkMainContentFokus,
    svarCheckboxPanel,
    svarNeiHovedsporsmal,
    svarCombobox,
    svarJaHovedsporsmal,
} from '../../support/utilities'
import { inlineForklaringer } from '../../support/sjekkInlineForklaringKvittering'
import 'cypress-real-events'

describe('Tester kvittering', () => {
    context('Arbeidsledig', () => {
        it('Nylig sendt', () => {
            // Velg søknad
            cy.visit('/syk/sykepengesoknad?testperson=integrasjon-soknader')

            cy.get(`a[href*=${arbeidsledigKvittering.id}]`).click()

            checkViStolerPaDeg()
            svarJaHovedsporsmal()
            klikkGaVidere()
            cy.contains(
                'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.',
            ).click()
            cy.contains('Send søknaden').click()

            // Sendt datoer
            cy.get('[data-cy="sendt-nav"]')
            cy.get('[data-cy="sendt-arbeidsgiver"]').should('not.exist')

            cy.url().should('include', `/kvittering/${arbeidsledigKvittering.id}`)

            // Hva skjer videre
            cy.get('[data-cy="kvittering-panel"]')
                .should('contain', 'Hva skjer videre?')
                .and('contain', 'NAV behandler søknaden din')
                .and(
                    'contain',
                    'Saksbehandlingstiden regnes fra NAV har mottatt all nødvendig dokumentasjon. Etter dette må du regne med å vente minst fire uker før søknaden er behandlet. Sjekk saksbehandlingstidene',
                )
                .and('contain', 'Når blir pengene utbetalt?')
                .and(
                    'contain',
                    'Du får vanligvis utbetalt sykepengene enten innen den 25. i måneden, eller innen fem dager etter at vi har sendt deg svar på søknaden din. Hvis søknaden din gjelder dager i to ulike kalendermåneder, kan utbetalingen bli delt i to. Les mer om når du kan forvente å få pengene.',
                )

            // Oppsummering minimert
            cy.get('[data-cy="oppsummering-fra-søknaden"]  .navds-expansioncard__header-button').should(
                'have.attr',
                'aria-expanded',
                'false',
            )

            // Opplysninger minimert
            cy.get('[data-cy="opplysninger-fra-sykmeldingen"] .navds-expansioncard__header-button').should(
                'have.attr',
                'aria-expanded',
                'false',
            )

            // Knapperad ( Endre, Ettersend)
            cy.contains('Jeg vil endre svarene i søknaden').should('exist')
        })

        it('Etter 30 dager', () => {
            cy.visit('/syk/sykepengesoknad?testperson=integrasjon-soknader')

            cy.get(`[data-cy="Tidligere søknader"]  a[href*=${sendtArbeidsledigKvittering.id}]`).click()

            // Sendt datoer
            cy.get('[data-cy="sendt-nav"]').contains('Mottatt: Torsdag 23. april, kl 11:56')
            cy.get('[data-cy="sendt-arbeidsgiver"]').should('not.exist')

            cy.url().should('include', `/sendt/${sendtArbeidsledigKvittering.id}`)
            // Hva skjer videre skal ikke finnes
            cy.get('[data-cy="kvittering-panel"]').should('not.exist')

            // Oppsummering ekspandert
            cy.get('[data-cy="oppsummering-fra-søknaden"]  .navds-expansioncard__header-button').should(
                'have.attr',
                'aria-expanded',
                'true',
            )
            // Opplysninger minimert

            cy.get('[data-cy="opplysninger-fra-sykmeldingen"] .navds-expansioncard__header-button').should(
                'have.attr',
                'aria-expanded',
                'false',
            )

            // Knapperad ( Endre, Ettersend)
            cy.contains('Jeg vil endre svarene i søknaden').should('exist')
        })
    })

    context('Utland', () => {
        it('Nylig sendt', () => {
            cy.visit('/syk/sykepengesoknad?testperson=integrasjon-soknader')

            // Velg søknad
            cy.get('[data-cy="Nye søknader"]')
                .findByRole('link', { name: 'Søknad om å beholde sykepenger utenfor EU/EØS' })
                .click()

            //Start søknad
            cy.findByRole('button', { name: 'Start søknaden' }).should('exist').click()

            // Svar og send
            svarCombobox('Hvilke(t) land skal du reise til?', 'Søre fran', 'Søre franske territorier')
            cy.get('.navds-combobox__button-toggle-list').click()
            klikkGaVidere()

            setPeriodeFraTil(14, 22)

            klikkGaVidere()

            svarNeiHovedsporsmal()
            klikkGaVidere()
            cy.contains(
                'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.',
            ).click()
            cy.contains('Send søknaden').click()

            // Sendt datoer
            cy.get('[data-cy="sendt-nav"]')
            cy.get('[data-cy="sendt-arbeidsgiver"]').should('not.exist')

            // Hva skjer videre
            cy.get('[data-cy="kvittering-panel"]')
                .should('contain', 'Hva skjer videre?')
                .and('contain', 'Du får svar på om du kan reise')
                .and(
                    'contain',
                    'NAV vurderer om reisen vil forlenge sykefraværet ditt eller hindre planlagte aktiviteter.',
                )
                .and('contain', 'Risiko ved å reise før du har mottatt svar')
                .and('contain', 'Du kan risikere at sykepengene stanses i perioden du er på reise.')
                .and('contain', 'Sykepengene kan beregnes etter et lavere grunnlag når du er tilbake.')
                .and('contain', 'Du kan få avslag på videre sykepenger hvis reisen varer fire uker eller mer.')
                .and('contain', 'Les mer om sykepenger når du er på reise.')
                .and('contain', 'Du søker om sykepenger')
                .and(
                    'contain',
                    'Etter at sykefraværsperioden er over, søker du om sykepenger på vanlig måte. Du får en melding fra NAV når søknaden er klar til å fylles ut.',
                )
                .and('not.contain', 'NAV behandler søknaden din')
                .and(
                    'not.contain',
                    'Saksbehandlingstiden regnes fra NAV har mottatt all nødvendig dokumentasjon. Etter dette må du regne med å vente minst fire uker før søknaden er behandlet. Sjekk saksbehandlingstidene',
                )

            // Oppsummering minimert
            cy.get('[data-cy="oppsummering-fra-søknaden"]  .navds-expansioncard__header-button').should(
                'have.attr',
                'aria-expanded',
                'false',
            )

            // Knapperad finnes ikke
            cy.contains('Jeg vil endre svarene i søknaden').should('not.exist')
            cy.contains('Jeg vil at søknaden skal behandles av NAV').should('not.exist')
            cy.contains('Jeg vil sende en kopi av søknaden til arbeidsgiveren min').should('not.exist')
        })
    })

    context('Selvstendig', () => {
        it('Nylig sendt', () => {
            cy.visit('/syk/sykepengesoknad?testperson=integrasjon-soknader')

            // Velg søknad
            cy.get(`a[href*=${selvstendigKvittering.id}]`).click()

            checkViStolerPaDeg()
            svarNeiHovedsporsmal()
            klikkGaVidere()
            cy.get('[data-cy="bekreftCheckboksPanel"]').click()
            cy.contains('Send søknaden').click()

            // Sendt datoer
            cy.get('[data-cy="sendt-nav"]')
            cy.get('[data-cy="sendt-arbeidsgiver"]').should('not.exist')

            const kvitteringURL = `/kvittering/${selvstendigKvittering.id}`
            cy.url().should('include', kvitteringURL)

            // Hva skjer videre
            cy.get('[data-cy="kvittering-panel"]')
                .should('contain', 'Hva skjer videre?')
                .and('contain', 'NAV behandler søknaden din')
                .and(
                    'contain',
                    'Saksbehandlingstiden regnes fra NAV har mottatt all nødvendig dokumentasjon. Etter dette må du regne med å vente minst fire uker før søknaden er behandlet. Sjekk saksbehandlingstidene',
                )
                .and('contain', 'Når blir pengene utbetalt?')
                .and(
                    'contain',
                    'Du får vanligvis utbetalt sykepengene enten innen den 25. i måneden, eller innen fem dager etter at vi har sendt deg svar på søknaden din. Hvis søknaden din gjelder dager i to ulike kalendermåneder, kan utbetalingen bli delt i to. Les mer om når du kan forvente å få pengene.',
                )

            // Oppsummering minimert
            cy.get('[data-cy="oppsummering-fra-søknaden"]  .navds-expansioncard__header-button').should(
                'have.attr',
                'aria-expanded',
                'false',
            )

            // Opplysninger minimert
            cy.get('[data-cy="opplysninger-fra-sykmeldingen"] .navds-expansioncard__header-button').should(
                'have.attr',
                'aria-expanded',
                'false',
            )

            // Knapperad ( Endre, Ettersend)
            cy.contains('Jeg vil endre svarene i søknaden').should('exist')
            cy.contains('Jeg vil at søknaden skal behandles av NAV').should('not.exist')
            cy.contains('Jeg vil sende en kopi av søknaden til arbeidsgiveren min').should('not.exist')
        })
    })

    context('Arbeidstaker', () => {
        it('Innenfor arbeidsgiverperiode', () => {
            cy.visit('/syk/sykepengesoknad?testperson=integrasjon-soknader')
            cy.get(`a[href*=${arbeidstakerInnenforArbeidsgiverperiodeKvittering.id}]`).click()
            besvarSoknad()

            const kvitteringURL = `/kvittering/${arbeidstakerInnenforArbeidsgiverperiodeKvittering.id}`

            cy.location('pathname').should('include', kvitteringURL)

            cy.url().should('include', kvitteringURL)

            inntil16dagerKvittering()

            // Ettersending til nav vises ikke i kvittering
            cy.contains('Jeg vil at søknaden skal behandles av NAV').should('not.exist')
            cy.visit('/syk/sykepengesoknad?testperson=integrasjon-soknader')
            cy.get(`a[href*=${arbeidstakerInnenforArbeidsgiverperiodeKvittering.id}]`).click()
            cy.url().should('include', `/sendt/${arbeidstakerInnenforArbeidsgiverperiodeKvittering.id}`)

            // Ettersend
            cy.contains('Jeg vil at søknaden skal behandles av NAV').click()
            cy.contains(
                'Vanligvis behandles søknaden bare av NAV hvis det samlede sykefraværet er 16 dager eller mer. Denne søknaden er beregnet til å være kortere. Hvis arbeidsgiveren din eller NAV har bedt deg sende den likevel, gjør du det her.',
            )
            cy.contains('Send søknaden til NAV').click()
            cy.contains('Jeg vil at søknaden skal behandles av NAV').should('not.exist')

            over16dagerKvittering()
        })

        it('Utenfor arbeidsgiverperiode', () => {
            cy.visit('/syk/sykepengesoknad?testperson=integrasjon-soknader')
            cy.location('pathname').should('include', '/syk/sykepengesoknad')
            cy.get(`a[href*=${arbeidstakerUtenforArbeidsgiverperiodeKvittering.id}]`).click()
            besvarSoknad()

            const kvitteringURL = `/kvittering/${arbeidstakerUtenforArbeidsgiverperiodeKvittering.id}`

            cy.location('pathname').should('include', kvitteringURL)

            cy.url().should('include', kvitteringURL)

            over16dagerKvittering()
        })

        it('Delt periode og første utenfor arbeidsgiverperiode', () => {
            cy.visit('/syk/sykepengesoknad?testperson=integrasjon-soknader')
            cy.location('pathname').should('include', '/syk/sykepengesoknad')

            cy.get(`a[href*=${arbeidstakerDeltPeriodeForsteUtenforArbeidsgiverperiodeKvittering.id}]`).click()
            besvarSoknad()

            const kvitteringURL = `/kvittering/${arbeidstakerDeltPeriodeForsteUtenforArbeidsgiverperiodeKvittering.id}`

            cy.location('pathname').should('include', kvitteringURL)

            cy.url().should('include', kvitteringURL)

            over16dagerKvittering()
        })

        it('Oppfølgende periode uten opphold og første utenfor arbeidsgiverperiode', () => {
            cy.visit('/syk/sykepengesoknad?testperson=integrasjon-soknader')
            cy.location('pathname').should('include', '/syk/sykepengesoknad')

            cy.get(`a[href*=${arbeidstakerUtenOppholdForsteUtenforArbeidsgiverperiodeKvittering.id}]`).click()
            besvarSoknad()
            cy.location('pathname').should(
                'include',
                `/kvittering/${arbeidstakerUtenOppholdForsteUtenforArbeidsgiverperiodeKvittering.id}`,
            )

            cy.url().should(
                'include',
                `/kvittering/${arbeidstakerUtenOppholdForsteUtenforArbeidsgiverperiodeKvittering.id}`,
            )
            over16dagerKvittering()
        })

        it('Oppfølgende periode uten opphold', () => {
            cy.visit('/syk/sykepengesoknad?testperson=integrasjon-soknader')
            cy.location('pathname').should('include', '/syk/sykepengesoknad')

            cy.get(`a[href*=${arbeidstakerUtenOppholdKvittering.id}]`).click()
            besvarSoknad()
            const kvitteringURL = `/kvittering/${arbeidstakerUtenOppholdKvittering.id}`
            utenOppholdKvittering()
            cy.location('pathname').should('include', kvitteringURL)

            cy.url().should('include', kvitteringURL)
        })

        it('Oppfølgende periode 16 eller mindre dager og første utenfor arbeidsgiverperiode', () => {
            cy.visit('/syk/sykepengesoknad?testperson=integrasjon-soknader')

            cy.get(`a[href*=${arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvittering.id}]`).click()
            besvarSoknad()

            over16dagerKvittering()
            const kvitteringURL = `/kvittering/${arbeidstakerMedOppholdForsteUtenforArbeidsgiverperiodeKvittering.id}`
            cy.url().should('include', kvitteringURL)
        })

        it('Oppfølgende periode 16 eller mindre dager', () => {
            cy.clearCookies()
            cy.visit('/syk/sykepengesoknad?testperson=integrasjon-soknader')

            cy.get(`a[href*=${arbeidstakerMedOppholdKvittering.id}]`).click()
            besvarSoknad()

            const forventetUrl = `/kvittering/${arbeidstakerMedOppholdKvittering.id}`
            cy.url().should('include', forventetUrl)
            medOppholdKvittering()
        })
    })
})

const besvarSoknad = () => {
    checkViStolerPaDeg()
    svarNeiHovedsporsmal()
    klikkGaVidere()
    svarCheckboxPanel()
    cy.contains('Send søknaden').click()
    sjekkMainContentFokus()
    cy.get('[data-cy="kvittering"]')
}

const inntil16dagerKvittering = () => {
    // Sendt datoer
    cy.get('[data-cy="sendt-nav"]').should('not.exist')
    cy.get('[data-cy="sendt-arbeidsgiver"]')

    // Hva skjer videre
    cy.get('[data-cy="kvittering"]')
        .should('contain', 'Hva skjer videre?')
        .and('contain', 'Du får sykepengene fra arbeidsgiveren din')
        .and(
            'contain',
            'Arbeidsgiveren din betaler de første 16 kalenderdagene av sykefraværet. Hvis du mener sykefraværet har vart lenger enn det, kan du sende søknaden til NAV. Noen arbeidsplasser fortsetter å utbetale sykepenger fra dag 17, men da får de penger tilbake fra NAV.',
        )
        .and('not.contain', 'Før NAV kan behandle søknaden')
        .and('not.contain', 'NAV behandler søknaden')
        .and('not.contain', 'Når blir pengene utbetalt')

    // Oppsummering minimert
    cy.get('[data-cy="oppsummering-fra-søknaden"]  .navds-expansioncard__header-button').should(
        'have.attr',
        'aria-expanded',
        'false',
    )

    // Opplysninger minimert
    cy.get('[data-cy="opplysninger-fra-sykmeldingen"] .navds-expansioncard__header-button').should(
        'have.attr',
        'aria-expanded',
        'false',
    )

    // Knapperad ( Endre, Ettersend)
    cy.contains('Jeg vil endre svarene i søknaden').should('exist')
    cy.contains('Jeg vil at søknaden skal behandles av NAV').should('not.exist')
    cy.contains('Jeg vil sende en kopi av søknaden til arbeidsgiveren min').should('not.exist')
}

const over16dagerKvittering = () => {
    // Sendt datoer
    cy.get('[data-cy="sendt-nav"]')
    cy.get('[data-cy="sendt-arbeidsgiver"]')

    // Hva skjer videre
    cy.get('[data-cy="kvittering"]')
        .should('contain', 'Hva skjer videre?')
        .and('contain', 'Før NAV kan behandle søknaden')
        .and('contain', 'Når sykefraværet ditt er lengre enn 16 kalenderdager')
        .and('contain', 'NAV behandler søknaden')
        .and(
            'contain',
            'Saksbehandlingstiden regnes fra NAV har mottatt all nødvendig dokumentasjon. Etter dette må du regne med å vente minst fire uker før søknaden er behandlet. Sjekk saksbehandlingstidene',
        )
        .and('contain', 'Når blir pengene utbetalt')
        .and(
            'contain',
            'Hvis du får sykepenger fra arbeidsgiveren din, vil du vanligvis få sykepenger til samme tid som du ellers får lønn.',
        )
        .and(
            'contain',
            'Hvis du får sykepenger utbetalt fra NAV, får du vanligvis utbetalt sykepengene enten innen den 25. i måneden, eller innen fem dager etter at vi har sendt deg svar på søknaden din. Hvis søknaden din gjelder dager i to ulike kalendermåneder, kan utbetalingen bli delt i to. Les mer om når du kan forvente å få pengene.',
        )
        .and('not.contain', 'Du får sykepengene fra arbeidsgiveren din')

    // Behandlingstider lenke
    cy.contains('Sjekk saksbehandlingstidene').should(
        'have.attr',
        'href',
        'https://www.nav.no/saksbehandlingstider#sykepenger',
    )

    inlineForklaringer()
    // Oppsummering minimert
    cy.get('[data-cy="oppsummering-fra-søknaden"]  .navds-expansioncard__header-button').should(
        'have.attr',
        'aria-expanded',
        'false',
    )

    // Opplysninger minimert
    cy.get('[data-cy="opplysninger-fra-sykmeldingen"] .navds-expansioncard__header-button').should(
        'have.attr',
        'aria-expanded',
        'false',
    )

    // Knapperad ( Endre, Ettersend)
    cy.contains('Jeg vil endre svarene i søknaden').should('exist')
    cy.contains('Jeg vil at søknaden skal behandles av NAV').should('not.exist')
    cy.contains('Jeg vil sende en kopi av søknaden til arbeidsgiveren min').should('not.exist')
}

const utenOppholdKvittering = () => {
    // Sendt datoer
    cy.get('[data-cy="sendt-nav"]')
    cy.get('[data-cy="sendt-arbeidsgiver"]').should('not.exist')

    // Hva skjer videre
    cy.get('[data-cy="kvittering"]')
        .should('contain', 'Hva skjer videre?')
        .and('contain', 'NAV behandler søknaden')
        .and(
            'contain',
            'Saksbehandlingstiden regnes fra NAV har mottatt all nødvendig dokumentasjon. Etter dette må du regne med å vente minst fire uker før søknaden er behandlet. Sjekk saksbehandlingstidene',
        )
        .and('contain', 'Når blir pengene utbetalt')
        .and(
            'contain',
            'Hvis du får sykepenger fra arbeidsgiveren din, vil du vanligvis få sykepenger til samme tid som du ellers får lønn.',
        )
        .and(
            'contain',
            'Hvis du får sykepenger utbetalt fra NAV, får du vanligvis utbetalt sykepengene enten innen den 25. i måneden, eller innen fem dager etter at vi har sendt deg svar på søknaden din. Hvis søknaden din gjelder dager i to ulike kalendermåneder, kan utbetalingen bli delt i to. Les mer om når du kan forvente å få pengene.',
        )
        .and('not.contain', 'Før NAV kan behandle søknaden')
        .and('not.contain', 'Du får sykepengene fra arbeidsgiveren din')

    // Behandlingstider lenke
    cy.contains('Sjekk saksbehandlingstidene').should(
        'have.attr',
        'href',
        'https://www.nav.no/saksbehandlingstider#sykepenger',
    )

    // Oppsummering minimert
    cy.get('[data-cy="oppsummering-fra-søknaden"]  .navds-expansioncard__header-button').should(
        'have.attr',
        'aria-expanded',
        'false',
    )

    // Opplysninger minimert
    cy.get('[data-cy="opplysninger-fra-sykmeldingen"] .navds-expansioncard__header-button').should(
        'have.attr',
        'aria-expanded',
        'false',
    )

    // Knapperad ( Endre, Ettersend)
    cy.contains('Jeg vil endre svarene i søknaden').should('exist')
    cy.contains('Jeg vil at søknaden skal behandles av NAV').should('not.exist')
    cy.contains('Jeg vil sende en kopi av søknaden til arbeidsgiveren min').should('exist')
}

const medOppholdKvittering = () => {
    // Sendt datoer
    cy.get('[data-cy="sendt-nav"]')
    cy.get('[data-cy="sendt-arbeidsgiver"]').should('not.exist')

    // Hva skjer videre
    cy.get('[data-cy="kvittering"]')
        .should('contain', 'Viktig informasjon')
        .and('contain', 'Før NAV kan behandle søknaden')
        .and(
            'contain',
            'Du har vært friskmeldt inntil 16 dager siden sist du søkte om sykepenger. Da må arbeidsgiver sende oss inntektsmelding på nytt. Hør gjerne med arbeidsgiveren din hvis du er usikker på om den er sendt.',
        )
        .and('contain', 'Hvorfor inntektsmeldingen må sendes på nytt?')
        .and('contain', 'NAV behandler søknaden')
        .and(
            'contain',
            'Saksbehandlingstiden regnes fra NAV har mottatt all nødvendig dokumentasjon. Etter dette må du regne med å vente minst fire uker før søknaden er behandlet. Sjekk saksbehandlingstidene',
        )
        .and('contain', 'Når blir pengene utbetalt')
        .and(
            'contain',
            'Hvis du får sykepenger fra arbeidsgiveren din, vil du vanligvis få sykepenger til samme tid som du ellers får lønn.',
        )
        .and(
            'contain',
            'Hvis du får sykepenger utbetalt fra NAV, får du vanligvis utbetalt sykepengene enten innen den 25. i måneden, eller innen fem dager etter at vi har sendt deg svar på søknaden din. Hvis søknaden din gjelder dager i to ulike kalendermåneder, kan utbetalingen bli delt i to. Les mer om når du kan forvente å få pengene.',
        )
        .and('not.contain', 'Du får sykepengene fra arbeidsgiveren din')

    // Inntekstmelding
    cy.contains('Hvorfor inntektsmeldingen må sendes på nytt?').click()
    cy.get('.navds-body-long').should(
        'contain',
        'Lønn eller arbeidstid kan ha endret seg siden du var syk forrige gang. Dette får vi bare informasjon om gjennom inntektsmeldingen.',
    )

    // Behandlingstider lenke
    cy.contains('Sjekk saksbehandlingstidene').should(
        'have.attr',
        'href',
        'https://www.nav.no/saksbehandlingstider#sykepenger',
    )

    // Oppsummering minimert
    cy.get('[data-cy="oppsummering-fra-søknaden"]  .navds-expansioncard__header-button').should(
        'have.attr',
        'aria-expanded',
        'false',
    )

    // Opplysninger minimert
    cy.get('[data-cy="opplysninger-fra-sykmeldingen"] .navds-expansioncard__header-button').should(
        'have.attr',
        'aria-expanded',
        'false',
    )

    // Knapperad ( Endre, Ettersend)
    cy.contains('Jeg vil endre svarene i søknaden').should('exist')
    cy.contains('Jeg vil at søknaden skal behandles av NAV').should('not.exist')
    cy.contains('Jeg vil sende en kopi av søknaden til arbeidsgiveren min').should('exist')
}
