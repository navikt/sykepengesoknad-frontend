import { soknaderOpplaering } from '../../../src/data/mock/data/opplaering'
import { Soknad } from '../../../src/types/types'
import { getFomFraSoknad, senesteSendtDato } from '../../../src/utils/sorter-soknader'
import { soknaderIntegration } from '../../../src/data/mock/personas'

const articleTilSoknad = (articles: any) => {
    const soknader: Soknad[] = []
    articles.map((idx: any) => {
        const id = articles[idx].attributes['aria-labelledby'].value.split('soknader-header-')[1]
        const rsSoknad = soknaderIntegration.find((s) => s.id === id) || soknaderOpplaering.find((s) => s.id === id)
        if (rsSoknad) soknader.push(new Soknad(rsSoknad))
    })
    return soknader
}

describe('Tester sortering av søknader', () => {
    it('Laster startside', function () {
        cy.visit('http://localhost:8080/syk/sykepengesoknad?testperson=alle-soknader')
        cy.get('.navds-heading--xlarge').should('be.visible').and('have.text', 'Søknader')
    })

    it('Nye søknader sorteres etter tidligste tom dato', function () {
        cy.get('#soknader-list-til-behandling article').then((articles: any) => {
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
        cy.get('#soknader-sendt article').then((articles: any) => {
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
        cy.get('#soknader-sendt article').then((articles: any) => {
            const soknader = articleTilSoknad(articles)
            let forrigeSoknad = soknader[0]
            soknader.forEach((sok: Soknad) => {
                assert.isTrue(getFomFraSoknad(forrigeSoknad).getTime() >= getFomFraSoknad(sok).getTime())
                forrigeSoknad = sok
            })
        })
    })

    it('Sorter etter Sendt', function () {
        cy.get('select').contains('Dato')
        cy.get('#soknader-sendt article').eq(0).contains('27. mai – 11. juni 2020')
        cy.get('#soknader-sendt article').eq(1).contains('23. mai – 7. juni 2020')

        cy.get('select').select('Sendt')
        cy.get('select').contains('Sendt')

        cy.get('#soknader-sendt article').eq(0).contains('27. mai – 11. juni 2020')
        cy.get('#soknader-sendt article').eq(1).contains('25. – 27. mars 2020')
        cy.get('#soknader-sendt article').then((articles: any) => {
            const soknader = articleTilSoknad(articles)
            let forrigeSoknad = soknader[0]
            soknader.forEach((sok: Soknad) => {
                assert.isTrue(senesteSendtDato(sok) <= senesteSendtDato(forrigeSoknad))
                forrigeSoknad = sok
            })
        })
    })
})
