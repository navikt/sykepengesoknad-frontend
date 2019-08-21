import {fraInputdatoTilJSDato} from '@navikt/digisyfo-npm';
import {RSSvartype} from '../types/rs-types/rs-svartype';
import {SvarEnums, TagTyper} from "../types/enums";
import {Soknad, Sporsmal} from '../types/types';

const fraJSDatoTilBackendDato = (jsDato: any) => {
    return jsDato.toJSON().substr(0, 10);
};

const fraInputDatoTilBackendDato = (inputdato: any) => {
    return fraJSDatoTilBackendDato(fraInputdatoTilJSDato(inputdato));
};

const tilPeriodesvar = ({perioder, konverterPerioder}: { perioder: any, konverterPerioder: any }) => {
    return perioder
        .filter((periode :any) => {
            return konverterPerioder
                ? periode.tom && periode.tom
                : true;
        })
        .map((periode :any) => {
            return {
                verdi: JSON.stringify({
                    fom: konverterPerioder ? fraInputDatoTilBackendDato({inputdato: periode.fom}) : periode.fom,
                    tom: konverterPerioder ? fraInputDatoTilBackendDato({inputdato: periode.tom}) : periode.tom,
                }),
                avgittAv: periode.avgittAv,
            };
        });
};

const tilDatoSvar = (svar :any) => {
    return svar
        ? svar.svarverdier.map((s :any) => {
            return {
                ...s,
                verdi: fraInputDatoTilBackendDato({inputdato: s.verdi}),
            };
        })
        : [];
};

const tilBackendMinMax = (minMax :any) => {
    return minMax && typeof minMax.getFullYear === 'function'
        ? fraJSDatoTilBackendDato(minMax)
        : minMax;
};

const populerSporsmalMedSvar = ({sporsmal, svarFraSkjema, options}: { sporsmal: any, svarFraSkjema: any, options: any }) => {
    const svar = (() => {
        const {PERIODER, DATO, RADIO, RADIO_GRUPPE, RADIO_GRUPPE_TIMER_PROSENT, CHECKBOX} = RSSvartype;
        switch (sporsmal.svartype) {
            case PERIODER: {
                return tilPeriodesvar({perioder: svarFraSkjema, konverterPerioder: options.konverterPerioder});
            }
            case DATO: {
                return tilDatoSvar(svarFraSkjema);
            }
            case RADIO_GRUPPE:
            case RADIO_GRUPPE_TIMER_PROSENT: {
                return [];
            }
            case RADIO:
            case CHECKBOX: {
                return svarFraSkjema
                    ? svarFraSkjema.svarverdier.filter((svarverdi :any) => {
                        return svarverdi.verdi === SvarEnums.CHECKED;
                    })
                    : [];
            }
            default: {
                return svarFraSkjema
                    ? svarFraSkjema.svarverdier
                    : [];
            }
        }
    })();

    return {
        ...sporsmal,
        min: tilBackendMinMax(sporsmal.min),
        max: tilBackendMinMax(sporsmal.max),
        svar,
    };
};

const erUndersporsmalStilt = (sporsmal: Sporsmal, values: any) => {
    const svarValue = values[sporsmal.tag];
    const svarverdiliste = svarValue && svarValue.svarverdier ? svarValue.svarverdier : [];
    const svarverdistrenger = svarverdiliste.map((svarverdi :any) => {
        return svarverdi.verdi;
    });
    const {CHECKBOX_GRUPPE, IKKE_RELEVANT, RADIO_GRUPPE, RADIO_GRUPPE_TIMER_PROSENT} = RSSvartype;
    return sporsmal.svartype === CHECKBOX_GRUPPE
        || sporsmal.svartype === IKKE_RELEVANT
        || sporsmal.svartype === RADIO_GRUPPE
        || sporsmal.svartype === RADIO_GRUPPE_TIMER_PROSENT
        || svarverdistrenger.indexOf(sporsmal.kriterieForVisningAvUndersporsmal) > -1;
};

const settMinMax = (sporsmal: Sporsmal): Sporsmal => {
    const {DATO, PERIODER} = RSSvartype;
    switch (sporsmal.svartype) {
        case DATO:
        case PERIODER: {
            return {
                ...sporsmal,
                min: tilBackendMinMax(sporsmal.min),
                max: tilBackendMinMax(sporsmal.max),
                undersporsmal: sporsmal.undersporsmal.map(settMinMax),
            };
        }
        default: {
            return {
                ...sporsmal,
                undersporsmal: sporsmal.undersporsmal.map(settMinMax),
            };
        }
    }
};

const whipeSvar = (sporsmalsliste: Sporsmal[]): Sporsmal[] => {
    return sporsmalsliste.map((sporsmal) => {
        const {HVOR_MYE_PROSENT, HVOR_MYE_TIMER} = TagTyper;
        const svar = sporsmal.tag.indexOf(HVOR_MYE_PROSENT) > -1
            || sporsmal.tag.indexOf(HVOR_MYE_TIMER) > -1
            ? sporsmal.svar
            : [];
        return {
            ...settMinMax(sporsmal),
            svar,
            undersporsmal: whipeSvar(sporsmal.undersporsmal),
        };
    });
};

const populerSporsmalsliste = (sporsmalsliste: Sporsmal[], values: any, options: any): Sporsmal[] => {
    return sporsmalsliste.map((sporsmal) => {
        const svarValue = values[sporsmal.tag];
        const undersporsmalErStilt = erUndersporsmalStilt(sporsmal, values);
        const populertSporsmal = populerSporsmalMedSvar({sporsmal: sporsmal, svarFraSkjema: svarValue, options: options});
        const populertSporsmalMinMax = settMinMax(populertSporsmal);
        return {
            ...populertSporsmalMinMax,
            undersporsmal: undersporsmalErStilt
                ? populerSporsmalsliste(populertSporsmal.undersporsmal, values, options)
                : whipeSvar(sporsmal.undersporsmal),
        };
    });
};

const populerSoknadMedSvar = (soknad: Soknad, values: any, optionsParam = {}) => {
    const options = {
        konverterPerioder: true,
        ...optionsParam,
    };
    const sporsmal = populerSporsmalsliste(soknad.sporsmal, values, options);

    return {
        ...soknad,
        sporsmal,
    };
};

export const populerSoknadMedSvarUtenKonvertertePerioder = (soknad: Soknad, values: {} ) => {
    return populerSoknadMedSvar(soknad, values, {
        konverterPerioder: false,
    });
};

export default populerSoknadMedSvar;
