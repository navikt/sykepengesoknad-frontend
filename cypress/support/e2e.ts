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
/* eslint-disable no-undef */
import './commands'
import 'cypress-axe'

import { SvarEnums } from '../../src/types/enums'
import { RSSporsmal } from '../../src/types/rs-types/rs-sporsmal'
import { RSSvartype } from '../../src/types/rs-types/rs-svartype'

beforeEach(() => {
    cy.window().then((win) => {
        cy.spy(win, 'fetch').as('winFetch')
    })
})

afterEach(() => {
    cy.injectAxe()
    cy.configureAxe({
        // prettier-ignore
        rules: [
            { id: 'svg-img-alt', enabled: false },              // Trenger ikke alt tekst på bilder
            // TODO: Se på disse :point_down:
            { id: 'aria-allowed-attr', enabled: false },
            { id: 'nested-interactive', enabled: false },       // Skjermleser klarer å lese opp både progress og navigering mellom stegene
            { id: 'color-contrast', enabled: false },
            { id: 'landmark-one-main', enabled: false },        // Hvorfor godtar den ikke role="dialog" på modalene
            { id: 'aria-input-field-name', enabled: false },    // Kanskje vi må bytte ut LandvelgerComponent

            // Opphold utland bruker periode komp uten h2 heading, sjekker alt annet
            { id: 'heading-order', enabled: true, selector: '*:not(h3:contains("Når skal du reise?"))' },
        ],
    })
    cy.checkA11y(undefined, undefined, terminalLog, false)

    cy.get('@winFetch').should((a: any) => {
        lyttTilNettverksKall(a)
    })
})

function terminalLog(violations: any) {
    cy.task(
        'log',
        `${violations.length} accessibility violation${violations.length === 1 ? '' : 's'} ${
            violations.length === 1 ? 'was' : 'were'
        } detected`
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

const lyttTilNettverksKall = (a: any) => {
    const spy = a ? a['getCalls']() : []
    for (const call of spy) {
        const { args } = call
        const url = args[0]
        const req = args[1]

        // DELETE har ikke body som kan parses til JSON.
        if (url.includes('sporsmal') && req['method'] !== 'DELETE') {
            const headers = req['headers']
            const sporsmal = JSON.parse(req['body']) as RSSporsmal
            expect(headers['Content-Type'], '/sporsmal').to.eql('application/json')
            svarFormat(sporsmal)
        } else if (url.includes('/finnMottaker')) {
            const headers = req['headers']
            expect(headers['Content-Type'], '/finnMottaker').to.eql('application/json')
        } else if (url.includes('/send')) {
            const headers = req['headers']
            expect(headers['Content-Type'], '/send').to.eql('application/json')
        } else if (url.includes('/gjenapne')) {
            const headers = req['headers']
            expect(headers['Content-Type'], '/gjenapne').to.eql('application/json')
        } else {
            cy.log('Sjekker ikke kallet til', url)
        }
    }
}

const svarFormat = (sporsmal: RSSporsmal) => {
    switch (sporsmal.svartype) {
        case RSSvartype.CHECKBOX_PANEL:
            expect(sporsmal.svar[0]?.verdi).to.match(
                RegExp(`(${SvarEnums.CHECKED}|${SvarEnums.UNCHECKED})`),
                `Svar format ${sporsmal.svartype}`
            )
            break
        case RSSvartype.JA_NEI:
            expect(sporsmal.svar[0]?.verdi).to.match(
                RegExp(`(${SvarEnums.JA}|${SvarEnums.NEI}|)`),
                `Svar format ${sporsmal.svartype}`
            )
            break
        case RSSvartype.RADIO_GRUPPE_UKEKALENDER:
            expect(sporsmal.svar[0]?.verdi).to.match(
                RegExp('(Ikke til behandling|\\d{4}-\\d{2}-\\d{2})'),
                `Svar format ${sporsmal.svartype}`
            )
            break
        case RSSvartype.CHECKBOX:
            expect(sporsmal.svar[0]?.verdi).to.match(
                RegExp(`(${SvarEnums.CHECKED}|)`),
                `Svar format ${sporsmal.svartype}`
            )
            break
        case RSSvartype.DATO:
            expect(sporsmal.svar[0]?.verdi).to.match(
                RegExp('(\\d{4}-\\d{2}-\\d{2})'),
                `Svar format ${sporsmal.svartype}`
            )
            break
        case RSSvartype.DATOER:
            expect(sporsmal.svar[0]?.verdi).to.match(
                RegExp('(\\d{4}-\\d{2}-\\d{2})'),
                `Svar format ${sporsmal.svartype}`
            )
            break
        case RSSvartype.KVITTERING:
            expect(sporsmal.svar[0]?.verdi).to.match(
                RegExp(
                    '{"blobId":"\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12}","belop":\\d+,"typeUtgift":"\\w+","opprettet":"\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d{3}Z"}'
                ),
                `Svar format ${sporsmal.svartype}`
            )
            break
        case RSSvartype.PERIODER:
            expect(sporsmal.svar[0]?.verdi).to.match(
                RegExp('{"fom":"\\d{4}-\\d{2}-\\d{2}","tom":"\\d{4}-\\d{2}-\\d{2}"}'),
                `Svar format ${sporsmal.svartype}`
            )
            break
        case RSSvartype.TALL:
        case RSSvartype.KILOMETER:
        case RSSvartype.PROSENT:
        case RSSvartype.TIMER:
            expect(sporsmal.svar[0]?.verdi).to.match(RegExp('\\d+|'), `Svar format ${sporsmal.svartype}`)
            break
        case RSSvartype.BELOP:
            expect(sporsmal.svar[0]?.verdi).to.match(RegExp('\\d+|'), `Svar format ${sporsmal.svartype}`)
            if (sporsmal.id == '5fb4961f-90d5-4893-9821-24b3a68cf3e1') {
                // Tester at frontend poster med øre
                expect(sporsmal.svar[0]?.verdi).to.eq('100000')
            }
            break
        case RSSvartype.RADIO:
            expect(sporsmal.svar[0]?.verdi).to.match(
                RegExp(`(${SvarEnums.CHECKED}|)`),
                `Svar format ${sporsmal.svartype}`
            )
            break
        case RSSvartype.LAND:
            expect(sporsmal.svar[0]?.verdi).to.match(RegExp('\\S+'), `Svar format ${sporsmal.svartype}`)
            break
        case RSSvartype.FRITEKST:
        case RSSvartype.IKKE_RELEVANT:
        case RSSvartype.PERIODE:
        case RSSvartype.RADIO_GRUPPE:
        case RSSvartype.RADIO_GRUPPE_TIMER_PROSENT:
        case RSSvartype.INFO_BEHANDLINGSDAGER:
        case RSSvartype.CHECKBOX_GRUPPE:
            /* Ubesvart eller tags som ikke skal ha svar er på dette formatet:
                sporsmal: {
                    svar: []
                }
            */
            break
        default:
            expect(true, `Mangler format på sporsmal ${sporsmal.svartype}`).to.be.false
    }
    if (
        !sporsmal.kriterieForVisningAvUndersporsmal ||
        sporsmal.kriterieForVisningAvUndersporsmal === sporsmal.svar[0]?.verdi
    ) {
        for (const undersporsmal of sporsmal.undersporsmal) {
            svarFormat(undersporsmal)
        }
    }
}
