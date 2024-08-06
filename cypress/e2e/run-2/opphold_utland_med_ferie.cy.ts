import { klikkGaVidere, setPeriodeFraTil } from '../../support/utilities'
import { oppholdUtland } from '../../../src/data/mock/data/soknad/opphold-utland'

describe('Tester søknad om å beholde sykepenger utenfor EØS med ferie', () => {
    before(() => {
        cy.clearCookies()
    })

    const soknad = oppholdUtland

    before(() => {
        cy.visit('/syk/sykepengesoknad?testperson=bare-utland')
    })

    it('Laster startside', function () {
        cy.get('.navds-heading--large').should('be.visible').and('have.text', 'Søknader')
        cy.get('[data-cy="Nye søknader"]')
            .findByRole('link', { name: 'Søknad om å beholde sykepenger utenfor EU/EØS' })
            .click()
    })

    it('Viser infoside om søknad om å beholde sykepenger utenfor EU/EØS, og starter søknaden', () => {
        cy.contains('Du trenger ikke søke hvis du enten')
        cy.contains('Har du allerede vært på reise?')
        cy.findByRole('button', { name: 'Start søknaden' }).should('exist').click()
    })

    it('LAND - steg 1', function () {
        cy.url().should('include', `${soknad.id}/1`)

        cy.contains('Hvilke(t) land skal du reise til?')
        cy.contains('Du kan velge flere.')
        cy.findAllByRole('combobox', { name: 'Hvilke(t) land skal du reise til?' }).type('Sør')
        cy.findByRole('option', { name: 'Søre franske territorier' }).click()

        klikkGaVidere()
    })

    it('PERIODEUTLAND - steg 2', function () {
        cy.url().should('include', `${soknad.id}/2`)

        cy.contains('Når skal du reise?')
        setPeriodeFraTil(17, 24)
        klikkGaVidere()
    })

    it('Vi svarer Ja på arbeidsgiverspørsmålet', function () {
        cy.url().should('include', `${soknad.id}/3`)
        cy.contains('Har du arbeidsgiver?')
        cy.get('#acd5a489-2624-40c3-8dd1-a651b41b25aa_0').click()
        cy.contains('Er du 100 % sykmeldt?')
    })

    it('Vi svarer Nei på 100% sykmeldt spørsmålet og får en bjørn', function () {
        cy.get('#2c34b905-6aad-4e13-813f-ef3be73eceba_1').click()
        cy.contains(
            'Det er ikke mulig å ta ut ferie de dagene eller timene du skulle arbeidet og få utbetalt sykepenger for de andre. Men har du spart opp fleksitid, kan du avspasere dagene eller timene du skulle jobbet og få sykepenger for de andre dagene. Eksempel: Er du 50 prosent sykmeldt og ønsker å reise til utlandet noen dager, kan du avspasere halvparten av dagene. Har du ikke nok fleksitid å avspasere, må du ta ut hele feriedager.',
        )
    })

    it('Sykmeldt sporsmalet forsvinner når vi klikker nei', function () {
        cy.get('#acd5a489-2624-40c3-8dd1-a651b41b25aa_1').click()
        cy.contains('Er du 100 % sykmeldt?').should('not.exist')
        cy.get('#acd5a489-2624-40c3-8dd1-a651b41b25aa_0').click()
    })

    it('Gå videre forsvinner og bjørn vises når man har avtalt ferie', function () {
        cy.contains('Har du avtalt med arbeidsgiveren din at du skal ta ut feriedager i hele perioden?')
        cy.contains('Gå videre')

        cy.get('#43389c36-d107-4ad2-a06b-26831bd84bdc_0').click()
        cy.contains(
            'Du får ikke sykepenger mens du har ferie. Det betyr at du ikke trenger å sende denne søknaden. God tur!',
        )

        cy.contains('Gå videre').should('not.exist')
    })

    it('Avbryter søknaden og havner på avbrutt-siden', () => {
        cy.get('button[data-cy="avbryt-soknad"]').click()

        cy.url().should('include', `avbrutt/${soknad.id}`)
        cy.contains('Fjernet søknad om å beholde sykepenger utenfor EU/EØS')
        cy.findByRole('link', { name: 'nav.no/sykepenger#utland' })
        cy.contains(
            'I utgangspunktet bør du søke før du reiser til land utenfor EU/EØS. Du kan likevel søke om å få beholde sykepengene etter du har reist.',
        )
    })
})
