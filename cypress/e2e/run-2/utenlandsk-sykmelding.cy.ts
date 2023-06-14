import {
    svarCheckboxPanel,
    svarFritekst,
    svarJaHovedsporsmal,
    svarNeiHovedsporsmal,
    velgDato,
    velgLand,
} from '../../support/utilities'

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

        svarFritekst('UTENLANDSK_SYKMELDING_VEGNAVN', 'Downing Street 10')
        svarFritekst('UTENLANDSK_SYKMELDING_LAND', 'UK')
        svarFritekst('UTENLANDSK_SYKMELDING_TELEFONNUMMER', '81549300')
        velgDato(1)

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
        cy.contains('Du må oppgi oppgi nærmere opplysninger om arbeidet')

        svarFritekst(
            'UTENLANDSK_SYKMELDING_LONNET_ARBEID_UTENFOR_NORGE_FRITEKST',
            'Veldig lang tekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekstteksttekst',
        )
        cy.get(`[data-cy="UTENLANDSK_SYKMELDING_LONNET_ARBEID_UTENFOR_NORGE_FRITEKST"]`)
            .parent()
            .parent()
            .contains('Du kan skrive maks 200 tegn')
        cy.get(`[data-cy="feil-oppsumering"]`).contains('Du kan skrive maks 200 tegn')
        svarFritekst('UTENLANDSK_SYKMELDING_LONNET_ARBEID_UTENFOR_NORGE_FRITEKST', 'Statsminister i UK')

        cy.contains('Gå videre').click()
    })

    it('Sykepenger i andre EØS-land', function () {
        cy.url().should('include', `${id}/4`)
        cy.contains('Sykepenger i andre EØS-land')
        cy.contains('Har du mottatt sykepenger eller lignende i andre EØS-land i løpet av de siste tre årene?')

        cy.contains('Gå videre').click()
        cy.contains('Du må svare på om du har mottatt sykepenger eller lignende i andre EØS-land')
        svarJaHovedsporsmal()
        cy.contains('I hvilket land?')
        cy.contains('Gå videre').click()
        cy.contains('Du må oppgi hvilket land du har mottatt sykepenger eller lignende i')
        velgLand('Danmark')
        cy.contains('Gå videre').click()
    })

    it('Svar nei på resten', function () {
        for (let i = 5; i <= 11; i++) {
            cy.url().should('include', `${id}/${i}`)
            svarNeiHovedsporsmal()
            cy.contains('Gå videre').click()
        }
    })

    it('Vær klar over at', function () {
        cy.url().should('include', `${id}/12`)
        cy.contains('Til slutt')
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
