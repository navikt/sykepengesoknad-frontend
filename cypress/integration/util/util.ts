/* eslint-disable no-undef */

import { RSSporsmal } from '../../../src/types/rs-types/rs-sporsmal';
import { RSSvartype } from '../../../src/types/rs-types/rs-svartype';
import { SvarEnums } from '../../../src/types/enums';

export const lyttTilNettverksKall = (a: any) => {
    const spy = a ? a[ 'getCalls' ]() : [];
    for (const call of spy) {
        const { args } = call;
        const url = args[ 0 ];
        const req = args[ 1 ];

        if (url.includes('sporsmal')) {
            const headers = req[ 'headers' ];
            const sporsmal = JSON.parse(req[ 'body' ]) as RSSporsmal;
            expect(headers, '/oppdaterSporsmal')
                .to.deep.eq({ 'Content-Type': 'application/json' });
            svarFormat(sporsmal);
        }
        else if(url.includes('finnMottaker')) {
            const headers = req[ 'headers' ];
            expect(headers, '/finnMottaker')
                .to.deep.eq({ 'Content-Type': 'application/json' });
        }
        else {
            cy.log('Sjekker ikke kallet til', url);
        }
    }
};

const svarFormat = (sporsmal: RSSporsmal) => {
    if(sporsmal.svar[0]) {
        switch (sporsmal.svartype) {
            case RSSvartype.CHECKBOX_PANEL:
                expect(sporsmal.svar[ 0 ].verdi).to.match(RegExp(`(${SvarEnums.CHECKED}|${SvarEnums.UNCHECKED})`),
                    `Svar format ${sporsmal.svartype}`)
                break;
            case RSSvartype.JA_NEI:
                expect(sporsmal.svar[ 0 ].verdi).to.match(RegExp(`(${SvarEnums.JA}|${SvarEnums.NEI}|)`),
                    `Svar format ${sporsmal.svartype}`)
                break;
            case RSSvartype.RADIO_GRUPPE_UKEKALENDER:
                expect(sporsmal.svar[ 0 ].verdi).to.match(RegExp('(Ikke til behandling|\\d{4}-\\d{2}-\\d{2})'),
                    `Svar format ${sporsmal.svartype}`)
                break;
            case RSSvartype.CHECKBOX_GRUPPE:
                expect(sporsmal.svar).to.deep.eq([ { verdi: '' } ],
                    `Svar format ${sporsmal.svartype}`)
                break;
            case RSSvartype.CHECKBOX:
                expect(sporsmal.svar[ 0 ].verdi).to.match(RegExp(`(${SvarEnums.CHECKED}|)`),
                    `Svar format ${sporsmal.svartype}`)
                break;
            case RSSvartype.DATO:
                expect(sporsmal.svar[ 0 ].verdi).to.match(RegExp('(\\d{4}-\\d{2}-\\d{2})'),
                    `Svar format ${sporsmal.svartype}`)
                break;
            case RSSvartype.PERIODER:
                expect(sporsmal.svar[ 0 ].verdi).to.match(RegExp('{"fom":"\\d{4}-\\d{2}-\\d{2}","tom":"\\d{4}-\\d{2}-\\d{2}"}'),
                    `Svar format ${sporsmal.svartype}`)
                break;
            case RSSvartype.TALL:
            case RSSvartype.PROSENT:
            case RSSvartype.TIMER:
                expect(sporsmal.svar[ 0 ].verdi).to.match(RegExp('\\d+|'),
                    `Svar format ${sporsmal.svartype}`)
                break;
            case RSSvartype.RADIO:
                expect(sporsmal.svar[ 0 ].verdi).to.match(RegExp(`(${SvarEnums.CHECKED}|)`),
                    `Svar format ${sporsmal.svartype}`)
                break;
            case RSSvartype.FRITEKST:
            case RSSvartype.IKKE_RELEVANT:
            case RSSvartype.LAND:
            case RSSvartype.PERIODE:
            case RSSvartype.RADIO_GRUPPE:
            case RSSvartype.RADIO_GRUPPE_TIMER_PROSENT:
            case RSSvartype.BEHANDLINGSDAGER:
            case RSSvartype.INFO_BEHANDLINGSDAGER:
            /* Ubesvart eller tags som ikke skal ha svar er på dette formatet:
                sporsmal: {
                    svar: []
                }
            */
        }
    }

    for (const uspm of sporsmal.undersporsmal) {
        svarFormat(uspm);
    }
};
