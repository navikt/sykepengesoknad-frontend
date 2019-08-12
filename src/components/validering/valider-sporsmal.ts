import { getLedetekst } from '@navikt/digisyfo-npm';
import { SvarEnums, TagTyper } from '../../types/enums';
import { Sporsmal } from '../../types/types';
import { fjernIndexFraTag, formaterEnkeltverdi, formaterFlereVerdier } from '../sporsmal/field-utils';
import { RSSvartype } from '../../types/rs-types/rs-svartype';
import { validerPerioder } from './validering-utils';
import validerTall from './valider-tall';

const hentSporsmalMedStilteUndersporsmal = (sporsmalsliste: Sporsmal[], values: any) => {
    return sporsmalsliste
        .filter((sporsmal: Sporsmal) => {
            return values[sporsmal.tag] !== undefined;
        })
        .filter((sporsmal) => {
            const verdi = formaterEnkeltverdi(values[sporsmal.tag]);
            const formatertVerdi = verdi === true ? SvarEnums.CHECKED : verdi;
            return (sporsmal.svar && formatertVerdi === sporsmal.kriterieForVisningAvUndersporsmal);
        });
};

export const beregnFeilmeldingnokkelFraTag = (tag: TagTyper, max?: number) => {
    const tagUtenIndex = fjernIndexFraTag(tag);
    return `soknad.feilmelding.${tagUtenIndex.toLowerCase()}${max ? '.max' : ''}`;
};

export const beregnFeilmeldingstekstFraTag = (tag: TagTyper, max?: number) => {
    const nokkel = beregnFeilmeldingnokkelFraTag(tag, max);
    return getLedetekst(nokkel, {
        '%MAX%': max,
    });
};

const verdiErTom = (verdi: string) => {
    return (verdi || verdi === '')
        && verdi.trim
        && verdi.trim() === '';
};

const validerUndersporsmalsliste = (sporsmalsliste: Sporsmal[] = [], values: any = {}, feilmeldingerParam: any = {}) => {
    let feilmeldinger = { ...feilmeldingerParam };
    const sporsmalMedStilteUndersporsmal = hentSporsmalMedStilteUndersporsmal(sporsmalsliste, values);

    sporsmalMedStilteUndersporsmal
        .forEach((sporsmalMedUndersporsmal) => {
            const undersporsmalsliste = sporsmalMedUndersporsmal.undersporsmal;
            undersporsmalsliste.forEach((undersporsmal) => {
                switch (undersporsmal.svartype) {
                    case RSSvartype.CHECKBOX_GRUPPE: {
                        const avkryssedeCheckboxer = undersporsmal.undersporsmal
                            .map((checkboxSporsmal) => {
                                const verdi = values[checkboxSporsmal.tag];
                                return formaterEnkeltverdi(verdi);
                            })
                            .filter((verdi) => {
                                return verdi === true;
                            });

                        if (avkryssedeCheckboxer.length === 0) {
                            feilmeldinger[undersporsmal.tag] = {
                                _error: beregnFeilmeldingstekstFraTag(undersporsmal.tag),
                            };
                        } else {
                            feilmeldinger = validerUndersporsmalsliste(undersporsmal.undersporsmal, values, feilmeldinger);
                        }
                        break;
                    }
                    case RSSvartype.PERIODER: {
                        const periodeFeilmeldinger = validerPerioder(values[undersporsmal.tag]);
                        if (periodeFeilmeldinger) {
                            feilmeldinger[undersporsmal.tag] = periodeFeilmeldinger;
                        }
                        break;
                    }
                    case RSSvartype.TALL: {
                        const feilmelding = validerTall(
                            Number(undersporsmal.min),
                            Number(undersporsmal.max),
                            undersporsmal.tag,
                            values[undersporsmal.tag],
                            undersporsmal.undertekst);
                        if (feilmelding) {
                            feilmeldinger[undersporsmal.tag] = feilmelding;
                        }
                        feilmeldinger = validerUndersporsmalsliste(undersporsmal.undersporsmal, values, feilmeldinger);
                        break;
                    }
                    default: {
                        const verdi = formaterEnkeltverdi(values[undersporsmal.tag]);
                        if (verdiErTom(verdi)) {
                            feilmeldinger[undersporsmal.tag] = beregnFeilmeldingstekstFraTag(undersporsmal.tag);
                        }
                        feilmeldinger = validerUndersporsmalsliste(undersporsmal.undersporsmal, values, feilmeldinger);
                        break;
                    }
                }
            });
        });

    return feilmeldinger;
};

const arrayErTomt = (array: []) => {
    return array.filter((streng) => {
        return verdiErTom(streng);
    }).length === array.length;
};

export default function validerSporsmal(sporsmal: Sporsmal[], values: any) {
    const feilmeldinger: any = {};
    sporsmal
        .filter((s: Sporsmal) => {
            const verdi = s.svartype === RSSvartype.LAND
                ? formaterFlereVerdier(values[s.tag])
                : formaterEnkeltverdi(values[s.tag]);
            return ((values[s.tag] === undefined
                    || verdi === false
                    || (s.svartype === RSSvartype.LAND && arrayErTomt(verdi))
                    || (s.svartype === RSSvartype.FRITEKST && verdiErTom(verdi))
                    || (s.svartype === RSSvartype.FRITEKST && s.max && verdi.length > s.max)
                    || (s.svartype === RSSvartype.PERIODER))
                        && s.svartype !== RSSvartype.IKKE_RELEVANT
            );
        })
        .forEach((s: Sporsmal) => {
            switch (s.svartype) {
                case RSSvartype.PERIODER: {
                    const periodeFeilmeldinger = validerPerioder(values[s.tag], undefined);
                    if (periodeFeilmeldinger) {
                        feilmeldinger[s.tag] = periodeFeilmeldinger;
                    }
                    break;
                }
                case RSSvartype.FRITEKST: {
                    const verdi = formaterEnkeltverdi(values[s.tag]);
                    feilmeldinger[s.tag] = s.max && verdi.length > Number(s.max)
                        ? beregnFeilmeldingstekstFraTag(s.tag, Number(s.max))
                        : beregnFeilmeldingstekstFraTag(s.tag);
                    break;
                }
                default: {
                    feilmeldinger[s.tag] = beregnFeilmeldingstekstFraTag(s.tag);
                    break;
                }
            }
        });
    return validerUndersporsmalsliste(sporsmal, values, feilmeldinger);
}
