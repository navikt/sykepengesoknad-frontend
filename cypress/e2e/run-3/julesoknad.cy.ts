import 'cypress-real-events'
import { julesoknadPerson } from '../../../src/data/mock/data/personas/personas'
import { checkViStolerPaDeg, klikkGaVidere } from '../../support/utilities'

describe('Julesøkand med informasjon på introside og kvittering', () => {
    const soknad = julesoknadPerson.soknader[0]

    before(() => {
        cy.visit(`/syk/sykepengesoknad/soknader/${soknad.id}/1?testperson=julesoknad`)
        cy.get('.navds-heading--large').should('be.visible')
    })

    it('Informasjon om Julesøknad på Introside', () => {
        cy.contains(
            'For å kunne få sykepenger før jul, kan du søke tidligere enn vanlig. Da må du fylle ut søknaden med opplysninger om hvordan du tror sykmeldingsperioden fremover vil bli.',
        )
        checkViStolerPaDeg()
    })

    it('Søknad TILBAKE_I_ARBEID ', function () {
        cy.url().should('include', `${soknad.id}/2`)
        cy.get('[data-cy="ja-nei-stor"] input[value=NEI]').click()
        klikkGaVidere()
    })

    it('Søknad TIL_SLUTT', function () {
        cy.contains('Send søknaden').click()
    })

    it('Søknad kvittering', () => {
        cy.contains('Endre søknaden hvis situasjonen din endrer seg')
        cy.contains(
            'Endringer i situasjonen din mens du er sykmeldt kan påvirke hva du får utbetalt. Når sykmeldingsperioden er over bør du sjekke at søknaden fortsatt stemmer. Du kan oppdatere svarene dine i 12 måneder etter du har sendt inn søknaden.',
        )
    })
})
