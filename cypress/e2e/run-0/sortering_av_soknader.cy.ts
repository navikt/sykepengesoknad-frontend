import { Soknad } from '../../../src/types/types'
import { rsToSoknad } from '../../../src/types/mapping'
import { soknaderIntegration } from '../../../src/data/mock/data/soknad/soknader-integration'

const articleTilSoknad = (articles: any) => {
    const soknader: Soknad[] = []
    articles.map((idx: any) => {
        const id = articles[idx].attributes['data-cy']?.value.split('-listevisning-')[1]
        const rsSoknad = soknaderIntegration.find((s) => s.id === id)
        if (rsSoknad) soknader.push(rsToSoknad(rsSoknad))
    })
    return soknader
}
const getFomFraSoknad = (soknad: Soknad): Date => {
    return soknad.fom! || soknad.opprettetDato
}

const senesteSendtDato = (soknad: Soknad) => {
    const arb = soknad.sendtTilArbeidsgiverDato?.getTime() || 0
    const nav = soknad.sendtTilNAVDato?.getTime() || 0
    return arb > nav ? arb : nav
}
describe('Tester sortering av søknader', () => {
    it('Laster startside', function () {
        cy.visit('/syk/sykepengesoknad?testperson=integrasjon-soknader')
        cy.get('.navds-heading--large').should('be.visible').and('have.text', 'Søknader')
    })

    it('Nye søknader sorteres etter tidligste tom dato', function () {
        cy.get('[data-cy="Nye søknader"] .navds-link-panel').then((articles: any) => {
            const soknader = articleTilSoknad(articles)
            let forrigeSoknad = soknader[0]
            soknader.forEach((sok: Soknad) => {
                assert.isTrue(getFomFraSoknad(forrigeSoknad).getTime() <= getFomFraSoknad(sok).getTime())
                forrigeSoknad = sok
            })
        })
    })

    it('Sorter etter Status', function () {
        cy.get('select').select('Status')
        cy.get('[data-cy="Tidligere søknader"] .navds-link-panel').then((articles: any) => {
            const soknader = articleTilSoknad(articles)
            let forrigeSoknad = soknader[0]
            soknader.forEach((sok: Soknad) => {
                assert.isTrue(forrigeSoknad.status <= sok.status)
                forrigeSoknad = sok
            })
        })
    })

    it('Sorter etter Dato', function () {
        cy.get('select').select('Dato')
        cy.get('[data-cy="Tidligere søknader"] .navds-link-panel').then((articles: any) => {
            const soknader = articleTilSoknad(articles)
            let forrigeSoknad = soknader[0]
            soknader.forEach((sok: Soknad) => {
                assert.isTrue(getFomFraSoknad(forrigeSoknad).getTime() >= getFomFraSoknad(sok).getTime())
                forrigeSoknad = sok
            })
        })

        cy.get('select').contains('Dato')
        cy.get('[data-cy="Tidligere søknader"] .navds-link-panel').eq(0).contains('27. mai – 11. juni 2020')
        cy.get('[data-cy="Tidligere søknader"] .navds-link-panel').eq(1).contains('23. mai – 7. juni 2020')
    })

    it('Sorter etter Sendt', function () {
        cy.get('select').select('Sendt')
        cy.get('select').contains('Sendt')

        cy.get('[data-cy="Tidligere søknader"] .navds-link-panel').eq(0).contains('27. mai – 11. juni 2020')
        cy.get('[data-cy="Tidligere søknader"] .navds-link-panel').eq(1).contains('25. – 27. mars 2020')
        cy.get('[data-cy="Tidligere søknader"] .navds-link-panel').then((articles: any) => {
            const soknader = articleTilSoknad(articles)
            let forrigeSoknad = soknader[0]
            soknader.forEach((sok: Soknad) => {
                assert.isTrue(senesteSendtDato(sok) <= senesteSendtDato(forrigeSoknad))
                forrigeSoknad = sok
            })
        })
    })
})
