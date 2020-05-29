import { Sporsmal } from '../../types/types';
import { SvarEnums } from '../../types/enums';
import { empty } from '../../utils/constants';
import { RSSvartype } from '../../types/rs-types/rs-svartype';
import { tilBackendDato } from '../../utils/dato-utils';

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
            radiogruppeSvar(sporsmal, verdi);
            break;
        case RSSvartype.DATO:
            datoSvar(sporsmal, verdi);
            break;
        case RSSvartype.PERIODE:
        case RSSvartype.PERIODER:
            periodeSvar(sporsmal, verdi);
            break;
        case RSSvartype.BEHANDLINGSDAGER:
            sporsmal.undersporsmal.forEach(uspm => {
                settSvar(uspm, verdier);
            });
            break;
        case RSSvartype.RADIO:
        case RSSvartype.IKKE_RELEVANT:
        case RSSvartype.INFO_BEHANDLINGSDAGER:
            // Skal ikke ha svarverdi
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
        svar: [ { verdi: (verdi === SvarEnums.CHECKED || verdi === true ? SvarEnums.CHECKED : undefined) as any } ]
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
                return { verdi: tilBackendDato(element) }
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
                    return { verdi: JSON.stringify({ fom: tilBackendDato(periode[0]), tom: tilBackendDato(periode[1]) }) }
                }),
        };
    }
};
