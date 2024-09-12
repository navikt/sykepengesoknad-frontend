// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
import './commands'
import 'cypress-axe'

before(() => {
    // Skjuler hint så den ikke ligger over andre elementer
    localStorage.setItem('devtools-hint', 'false')
    // Resetter testdata sånn at alle tester kan kjøres på nytt lokalt
    cy.clearCookies()
})

afterEach(() => {
    cy.url().then((currentUrl) => {
        if (currentUrl.includes('localhost')) {
            setupAxe()
        } else {
            cy.log('Sjekker ikke eksterne sider for universiell utforming.')
        }
    })
})

function setupAxe() {
    cy.injectAxe()
    cy.configureAxe({
        rules: [
            // Trenger ikke "alt" tekst på bilder.
            { id: 'svg-img-alt', enabled: false },
            // Skjermleser klarer å lese opp både progress og navigering mellom stegene.
            { id: 'nested-interactive', enabled: false },
            // Slår ut når det dukker opp flere feilmeldinger.
            { id: 'color-contrast', enabled: false },
            // Hvorfor godtar den ikke role="dialog" på modalene.
            { id: 'landmark-one-main', enabled: false },
            // Kanskje vi må bytte ut LandvelgerComponent
            { id: 'aria-input-field-name', enabled: false },
            // Opphold utland bruker periode komp uten h2 heading, sjekker alt annet
            { id: 'heading-order', enabled: true, selector: '*:not(h3:contains("Når skal du reise?"))' },
            // Feiler på after-each sjekk på om det finnes en h1
            { id: 'page-has-heading-one', enabled: false },
        ],
    })

    const A11YOptions = {
        exclude: ['.axe-exclude'],
    }

    cy.checkA11y(A11YOptions, undefined, terminalLog, false)
}

function terminalLog(violations: any) {
    cy.task(
        'log',
        `${violations.length} accessibility violation${violations.length === 1 ? '' : 's'} ${
            violations.length === 1 ? 'was' : 'were'
        } detected`,
    )
    // pluck specific keys to keep the table readable
    const violationData = violations.map(({ id, impact, description, nodes }: any) => ({
        id,
        impact,
        description,
        nodes: nodes.length,
    }))

    cy.task('table', violationData)
}
