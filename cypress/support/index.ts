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

import { SvarEnums } from '../../src/types/enums'
import { RSSporsmal } from '../../src/types/rs-types/rs-sporsmal'
import { RSSvartype } from '../../src/types/rs-types/rs-svartype'

beforeEach(() => {
    cy.window().then((win) => {
        cy.spy(win, 'fetch').as('winFetch')
    })
})

afterEach(() => {
    cy.get('@winFetch').should((a: any) => {
        lyttTilNettverksKall(a)
    })
})

const lyttTilNettverksKall = (a: any) => {
    const spy = a ? a['getCalls']() : []
    for (const call of spy) {
        const { args } = call
        const url = args[0]
        const req = args[1]

        if (url.includes('sporsmal')) {
            const headers = req['headers']
            const sporsmal = JSON.parse(req['body']) as RSSporsmal
            expect(headers['Content-Type'], '/sporsmal').to.eql('application/json')
            expect(headers['X-App-Started-Timestamp'], '/sporsmal').not.to.be.undefined
            svarFormat(sporsmal)
        } else if (url.includes('/finnMottaker')) {
            const headers = req['headers']
            expect(headers['Content-Type'], '/finnMottaker').to.eql('application/json')
            expect(headers['X-App-Started-Timestamp'], '/finnMottaker').not.to.be.undefined
        } else if (url.includes('/send')) {
            const headers = req['headers']
            expect(headers['Content-Type'], '/send').to.eql('application/json')
            expect(headers['X-App-Started-Timestamp'], '/send').not.to.be.undefined
        } else if (url.includes('/gjenapne')) {
            const headers = req['headers']
            expect(headers['Content-Type'], '/gjenapne').to.eql('application/json')
            expect(headers['X-App-Started-Timestamp'], '/gjenapne').not.to.be.undefined
        } else {
            cy.log('Sjekker ikke kallet til', url)
        }
    }
}

const svarFormat = (sporsmal: RSSporsmal) => {
    if (sporsmal.svar[0]) {
        switch (sporsmal.svartype) {
            case RSSvartype.CHECKBOX_PANEL:
                expect(sporsmal.svar[0].verdi).to.match(RegExp(`(${SvarEnums.CHECKED}|${SvarEnums.UNCHECKED})`),
                    `Svar format ${sporsmal.svartype}`)
                break
            case RSSvartype.JA_NEI:
                expect(sporsmal.svar[0].verdi).to.match(RegExp(`(${SvarEnums.JA}|${SvarEnums.NEI}|)`),
                    `Svar format ${sporsmal.svartype}`)
                break
            case RSSvartype.RADIO_GRUPPE_UKEKALENDER:
                expect(sporsmal.svar[0].verdi).to.match(RegExp('(Ikke til behandling|\\d{4}-\\d{2}-\\d{2})'),
                    `Svar format ${sporsmal.svartype}`)
                break
            case RSSvartype.CHECKBOX:
                expect(sporsmal.svar[0].verdi).to.match(RegExp(`(${SvarEnums.CHECKED}|)`),
                    `Svar format ${sporsmal.svartype}`)
                break
            case RSSvartype.DATO:
                expect(sporsmal.svar[0].verdi).to.match(RegExp('(\\d{4}-\\d{2}-\\d{2})'),
                    `Svar format ${sporsmal.svartype}`)
                break
            case RSSvartype.DATOER:
                expect(sporsmal.svar[0].verdi).to.match(RegExp('(\\d{4}-\\d{2}-\\d{2})'),
                    `Svar format ${sporsmal.svartype}`)
                break
            case RSSvartype.KVITTERING:
                expect(sporsmal.svar[0].verdi).to.match(RegExp('{"blobId":"\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12}","belop":\\d+,"typeUtgift":"\\w+","opprettet":"\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d{3}Z"}'),
                    `Svar format ${sporsmal.svartype}`)
                break
            case RSSvartype.PERIODER:
                expect(sporsmal.svar[0].verdi).to.match(RegExp('{"fom":"\\d{4}-\\d{2}-\\d{2}","tom":"\\d{4}-\\d{2}-\\d{2}"}'),
                    `Svar format ${sporsmal.svartype}`)
                break
            case RSSvartype.TALL:
            case RSSvartype.KILOMETER:
            case RSSvartype.PROSENT:
            case RSSvartype.TIMER:
                expect(sporsmal.svar[0].verdi).to.match(RegExp('\\d+|'),
                    `Svar format ${sporsmal.svartype}`)
                break
            case RSSvartype.BELOP:
                expect(sporsmal.svar[0].verdi).to.match(RegExp('\\d+|'),
                    `Svar format ${sporsmal.svartype}`)
                if (sporsmal.id == '5fb4961f-90d5-4893-9821-24b3a68cf3e1') {
                    // Tester at frontend poster med øre
                    expect(sporsmal.svar[0].verdi).to.eq('100000')
                }
                break
            case RSSvartype.RADIO:
                expect(sporsmal.svar[0].verdi).to.match(RegExp(`(${SvarEnums.CHECKED}|)`),
                    `Svar format ${sporsmal.svartype}`)
                break
            case RSSvartype.LAND:
                expect(sporsmal.svar[0].verdi).to.match(RegExp('\\S+'),
                    `Svar format ${sporsmal.svartype}`)
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
                expect(true, `Mangler format på sporsmal ${sporsmal.svartype}`)
                    .to.be.false
        }
    }

    if (!sporsmal.kriterieForVisningAvUndersporsmal || sporsmal.kriterieForVisningAvUndersporsmal === sporsmal.svar[0].verdi) {
        for (const uspm of sporsmal.undersporsmal) {
            svarFormat(uspm)
        }
    }
}
