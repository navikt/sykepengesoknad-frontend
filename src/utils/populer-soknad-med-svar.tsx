import { fraInputdatoTilJSDato } from '@navikt/digisyfo-npm';
import { Soknad, Sporsmal } from '../types/types';
import { RSSvartype } from '../types/rs-types/rs-svartype';
import { SvarEnums, TagTyper } from '../types/enums';

const fraJSDatoTilBackendDato = (jsDato: Date) => {
    return jsDato.toJSON().substr(0, 10);
};

const fraInputDatoTilBackendDato = (inputdato: Date) => {
    return fraJSDatoTilBackendDato(fraInputdatoTilJSDato(inputdato));
};

const tilPeriodesvar = (perioder: any, konverterPerioder: any) => {
    return perioder
        .filter((periode: any) => {
            return konverterPerioder
                ? periode.tom && periode.tom
                : true;
        })
        .map((periode: any) => {
            return {
                verdi: JSON.stringify({
                    fom: konverterPerioder ? fraInputDatoTilBackendDato(periode.fom) : periode.fom,
                    tom: konverterPerioder ? fraInputDatoTilBackendDato(periode.tom) : periode.tom,
                }),
                avgittAv: periode.avgittAv,
            };
        });
};

const tilDatoSvar = (svar: any) => {
    return svar
        ? svar.svarverdier.map((s: any) => {
            return {
                ...s,
                verdi: fraInputDatoTilBackendDato(s.verdi),
            };
        })
        : [];
};

const tilBackendMinMax = (minMax: any) => {
    return minMax && typeof minMax.getFullYear === 'function'
        ? fraJSDatoTilBackendDato(minMax)
        : minMax;
};

const populerSporsmalMedSvar = (sporsmal: Sporsmal, svarFraSkjema: any, options: any) => {
    const svar = (() => {
        switch (sporsmal.svartype) {
            case RSSvartype.PERIODER: {
                return tilPeriodesvar(svarFraSkjema, options.konverterPerioder);
            }
            case RSSvartype.DATO: {
                return tilDatoSvar(svarFraSkjema);
            }
            case RSSvartype.RADIO_GRUPPE:
            case RSSvartype.RADIO_GRUPPE_TIMER_PROSENT: {
                return [];
            }
            case RSSvartype.RADIO:
            case RSSvartype.CHECKBOX: {
                return svarFraSkjema
                    ? svarFraSkjema.svarverdier.filter((svarverdi: any) => {
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
    const svarverdistrenger = svarverdiliste.map((svarverdi: any) => {
        return svarverdi.verdi;
    });
    return sporsmal.svartype === RSSvartype.CHECKBOX_GRUPPE
        || sporsmal.svartype === RSSvartype.IKKE_RELEVANT
        || sporsmal.svartype === RSSvartype.RADIO_GRUPPE
        || sporsmal.svartype === RSSvartype.RADIO_GRUPPE_TIMER_PROSENT
        || svarverdistrenger.indexOf(sporsmal.kriterieForVisningAvUndersporsmal) > -1;
};

const settMinMax = (sporsmal: Sporsmal): Sporsmal => {
    switch (sporsmal.svartype) {
        case RSSvartype.DATO:
        case RSSvartype.PERIODER: {
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
        const svar = sporsmal.tag === TagTyper.HVOR_MYE_PROSENT || sporsmal.tag === TagTyper.HVOR_MYE_TIMER
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
        const populertSporsmal = populerSporsmalMedSvar(sporsmal, svarValue, options);
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

export const populerSoknadMedSvarUtenKonvertertePerioder = (soknad: Soknad, values: {}) => {
    return populerSoknadMedSvar(soknad, values, {
        konverterPerioder: false,
    });
};

export default populerSoknadMedSvar;
