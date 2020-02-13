import { Sporsmal } from '../../types/types';
import { SvarEnums } from '../../types/enums';
import { empty, PERIODE_SKILLE } from '../../utils/constants';
import { RSSvartype } from '../../types/rs-types/rs-svartype';

const hentVerdier = (sporsmal: Sporsmal, verdier: Record<string, any>) => {
    let verdi = verdier[sporsmal.id];
    if (verdi === undefined) {
        verdi = Object.entries(verdier)
            .filter(([ key ]) => key.startsWith(sporsmal.id))
            .map(([ key ]) => verdier[key])
            .filter((verdi) => verdi !== empty);
    }
    return verdi;
};

export const settSvar = (sporsmal: Sporsmal, verdier: Record<string, any>): void => {
    const verdi = hentVerdier(sporsmal, verdier);
    if (verdi === undefined) {
        return;
    }
    switch (sporsmal.svartype) {
        case RSSvartype.CHECKBOX_PANEL:
        case RSSvartype.CHECKBOX:
        case RSSvartype.CHECKBOX_GRUPPE:
            checkboxSvar(sporsmal, verdi);
            break;
        case RSSvartype.RADIO_GRUPPE:
        case RSSvartype.RADIO_GRUPPE_TIMER_PROSENT:
        case RSSvartype.RADIO_GRUPPE_UKEKALENDER:
            radiogruppeSvar(sporsmal, verdi);
            break;
        case RSSvartype.RADIO:
            break;
        case RSSvartype.DATO:
            datoSvar(sporsmal, verdi);
            break;
        case RSSvartype.PERIODE:
        case RSSvartype.PERIODER:
            periodeSvar(sporsmal, verdi);
            break;
        default:
            sporsmal.svarliste = {
                sporsmalId: sporsmal.id,
                svar: [ { verdi: verdi ? verdi.toString() : '' } ]
            };
    }

    sporsmal.undersporsmal.forEach((spm) => {
        settSvar(spm, verdier);
    });
};

const checkboxSvar = (sporsmal: Sporsmal, verdi: any) => {
    sporsmal.svarliste = {
        sporsmalId: sporsmal.id,
        svar: [ { verdi: verdi ? SvarEnums.CHECKED : '' } ]
    };
};

const radiogruppeSvar = (sporsmal: Sporsmal, verdi: any) => {
    sporsmal.undersporsmal.forEach(uspm => {
        const erValgt = (uspm.sporsmalstekst === verdi);
        uspm.svarliste = {
            sporsmalId: uspm.id,
            svar: [ { verdi: erValgt ? SvarEnums.CHECKED : '' } ]
        };
    });
};

const datoSvar = (sporsmal: Sporsmal, verdi: any) => {
    if (Array.isArray(verdi)) {
        sporsmal.svarliste = {
            sporsmalId: sporsmal.id,
            svar: verdi.map(element => {
                return { verdi: element.toString() }
            }),
        };
    }
};

const periodeSvar = (sporsmal: Sporsmal, verdi: any) => {
    if (Array.isArray(verdi)) {
        sporsmal.svarliste = {
            sporsmalId: sporsmal.id,
            svar: verdi
                .filter((periode) => periode[0] !== undefined && periode[1] !== undefined)
                .map((periode) => {
                    return { verdi: periode[0].toString() + PERIODE_SKILLE + periode[1].toString() }
                }),
        };
    }
};
