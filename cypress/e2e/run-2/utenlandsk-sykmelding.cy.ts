import {
    neiOgVidere,
    svarCheckboxPanel,
    svarCombobox,
    svarFritekst,
    svarJaHovedsporsmal,
    velgDato,
} from '../../support/utilities'
import 'cypress-real-events'

describe('Tester søknad til utenlandsk sykmelding', () => {
    const id = '3708c4de-d16c-4835-841b-a6716b6d39e9'

    before(() => {
        cy.visit(`/syk/sykepengesoknad/soknader/${id}/1?testperson=utenlandsk-sykmelding`)
    })

    it('Ansvarserklæring', function () {
        cy.url().should('include', `${id}/1`)

        cy.contains('Frist for å søke').should('not.exist')
        cy.contains('Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene ').click()
        cy.contains('Gå videre').click()
    })

    it('Bosted', function () {
        cy.url().should('include', `${id}/2`)

        cy.contains('Bosted')
        cy.contains('Bor du i utlandet?')
        cy.contains('Gå videre').click()
        cy.contains('Du må svare på om du bor i utlandet')

        svarJaHovedsporsmal()
        cy.contains('Oppgi utenlandsk kontaktadresse')

        cy.contains('Gå videre').click()

        cy.contains('Du må oppgi et vegnavn')
        cy.contains('Du må oppgi et land')
        cy.contains('Du må oppgi et telefonnummer')

        svarFritekst('Vegnavn og husnummer, evt. postboks', 'Downing Street 10')
        svarFritekst('Land', 'UK')
        svarFritekst('Telefonnummer', '81549300')
        velgDato(4)

        cy.contains('Gå videre').click()
    })

    it('Lønnet arbeid utenfor Norge', function () {
        cy.url().should('include', `${id}/3`)

        cy.contains('Lønnet arbeid utenfor Norge')
        cy.contains('Utfører du lønnet arbeid utenfor Norge?')
        cy.contains('Gå videre').click()
        cy.contains('Du må svare på om du utfører lønnet arbeid utenfor Norge')

        svarJaHovedsporsmal()
        cy.contains('Oppgi nærmere opplysninger om arbeid/virksomhet utenfor Norge')

        cy.contains('Gå videre').click()
        cy.contains('Du må oppgi nærmere opplysninger om arbeidet')

        svarFritekst(
            'Oppgi nærmere opplysninger om arbeid/virksomhet utenfor Norge',
            'Veldig lang tekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekst',
        )
        cy.get(`[data-cy="UTENLANDSK_SYKMELDING_LONNET_ARBEID_UTENFOR_NORGE_FRITEKST"]`)
            .parent()
            .parent()
            .contains('Du kan skrive maks 200 tegn')
        cy.get(`[data-cy="feil-oppsumering"]`).contains('Du kan skrive maks 200 tegn')
        svarFritekst('Oppgi nærmere opplysninger om arbeid/virksomhet utenfor Norge', 'Statsminister i UK')

        cy.contains('Gå videre').click()
    })

    it('Sykepenger i andre EØS-land', function () {
        cy.url().should('include', `${id}/4`)
        cy.contains('Sykepenger i andre EU/EØS-land')
        cy.contains('Har du mottatt sykepenger eller lignende i andre EU/EØS-land i løpet av de siste tre årene?')

        cy.contains('Gå videre').click()
        cy.contains('Du må svare på om du har mottatt sykepenger eller lignende i andre EU/EØS-land')
        svarJaHovedsporsmal()
        cy.contains('I hvilket land?')
        cy.contains('Gå videre').click()
        cy.contains(
            'Du må velge alle andre EU/EØS-land bortsett fra Norge hvor du har mottatt sykepenger eller lignende i løpet av de siste tre årene',
        )
        svarCombobox('I hvilket land?', 'Dan', 'Danmark')
        cy.get('.navds-combobox__button-toggle-list').click()
        cy.contains('Gå videre').click()
    })

    it('Svar nei på resten', function () {
        neiOgVidere([
            'Tilbake i fullt arbeid',
            'Ferie',
            'Permisjon',
            'Jobb underveis i sykefraværet',
            'Arbeid utenfor Norge',
        ])

        neiOgVidere(['Andre inntektskilder', 'Reise til utlandet'])
    })

    it('Vær klar over at', function () {
        cy.url().should('include', `${id}/12`)
        cy.contains('Oppsummering')
        cy.get('section[aria-label="Oppsummering fra søknaden"] button').click()
        cy.contains('Danmark')
        cy.contains('Statsminister i UK')
        cy.contains('Downing Street 10')
        cy.contains('81549300')
        svarCheckboxPanel()
        cy.contains('Send søknaden').click()
        cy.contains('Søknaden er sendt')
    })
})
