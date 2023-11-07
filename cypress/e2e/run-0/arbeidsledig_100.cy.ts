import { setPeriodeFraTil } from '../../support/utilities'
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

        // Sykmelding
        cy.contains('1. april - 24. april 2020 (24 dager)')
        cy.contains('100% sykmeldt')
        cy.get('section[aria-label="Opplysninger fra sykmeldingen"] button').click()

        // Godkjenne ANSVARSERKLARING
        cy.contains(
            'Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige. Jeg vet også at NAV kan holde igjen eller kreve tilbake penger, og at å gi feil opplysninger kan være straffbart.',
        ).click()

        cy.contains('Gå videre').click()
    })

    it('Søknad FRISKMELDT', () => {
        cy.url().should('include', `${soknad.id}/2`)

        // Test spørsmål
        cy.get('[data-cy="ja-nei-stor"] input[value=NEI]').click()
        cy.contains('Fra hvilken dato trengte du ikke lenger sykmeldingen?')
        cy.get('.navds-date__field-button').click()
        cy.get('.rdp-day').contains('10').click()
        cy.contains('Gå videre').click()
    })

    it('Søknad ANDRE_INNTEKTSKILDER', () => {
        cy.url().should('include', `${soknad.id}/3`)

        // Test spørsmål
        cy.contains('Har du hatt inntekt mens du har vært sykmeldt i perioden 1. - 24. april 2020?')
        cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()

        // Når ingen velges så dukker bare 1 feilmelding opp
        cy.contains('Gå videre').click()
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

        cy.contains('Gå videre').click()
    })

    it('Søknad ARBEIDSLEDIG_UTLAND', () => {
        cy.url().should('include', `${soknad.id}/4`)

        // Test spørsmål
        cy.contains('Var du på reise utenfor EØS mens du var sykmeldt 1. - 24. april 2020?')
        cy.get('[data-cy="ja-nei-stor"] input[value=JA]').click()

        // Underspørsmål 1
        cy.contains('Når var du utenfor EØS?')
        setPeriodeFraTil(17, 24)

        // Underspørsmål 2
        cy.contains('Har du søkt om å beholde sykepengene for disse dagene?')
        cy.get('input[type=radio]#687424_0').click()

        cy.contains('Gå videre').click()
    })

    it('Søknad TIL_SLUTT', () => {
        cy.url().should('include', `${soknad.id}/5`)
        cy.get('.navds-checkbox__label').click()
        it('Bekreftelsespunktene er riktige', () => {
            const punkter = [
                'Du kan bare få sykepenger hvis det er din egen sykdom eller skade som hindrer deg i å jobbe. Sosiale eller økonomiske problemer gir ikke rett til sykepenger.',
                'Du kan miste retten til sykepenger hvis du nekter å opplyse om din egen arbeidsevne, eller hvis du ikke tar imot behandling eller tilrettelegging.',
                'Retten til sykepenger gjelder bare inntekt du har mottatt som lønn og betalt skatt av på sykmeldingstidspunktet.',
                'NAV kan innhente opplysninger som er nødvendige for å behandle søknaden.',
                'Fristen for å søke sykepenger er som hovedregel 3 måneder',
                'Du kan endre svarene i denne søknaden opp til 12 måneder etter du sendte den inn første gangen.',
            ]

            const lenkerMedTekst = [
                {
                    tekst: 'Du må melde fra til NAV hvis du satt i varetekt, sonet straff eller var under forvaring i sykmeldingsperioden.',
                    url: 'https://www.nav.no/skriv-til-oss',
                },
                {
                    tekst: 'Du må melde fra om studier som er påbegynt etter at du ble sykmeldt, og som ikke er avklart med NAV. Det samme gjelder hvis du begynner å studere mer enn du gjorde før du ble sykmeldt.',
                    url: 'https://www.nav.no/skriv-til-oss',
                },
                {
                    tekst: 'Du kan lese mer om rettigheter og plikter på',
                    url: 'https://www.nav.no/sykepenger',
                },
            ]

            punkter.forEach((punkt) => {
                cy.contains(punkt)
            })

            lenkerMedTekst.forEach(({ tekst, url }) => {
                cy.contains(tekst).find('a').should('have.attr', 'href', url)
            })
        })
        cy.contains(
            'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.',
        )
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
