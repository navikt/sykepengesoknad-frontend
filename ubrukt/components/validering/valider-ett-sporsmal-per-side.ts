import { RSSoknadstype } from '../../../src/types/rs-types/rs-soknadstype';
import { Soknad, SvarVerdi } from '../../../src/types/types';
import { erSisteSide, hentSporsmalForOppsummering } from '../sporsmal/ett-sporsmal/ett-sporsmal-per-side-utils';
import validerSporsmal from './valider-sporsmal';
import validerGraderteArbeidssporsmal from './valider-graderte-arbeidssporsmal';

export const validerDenneSiden = (values: SvarVerdi[], soknad: Soknad, sidenummer: number) => {
    const sporsmal = erSisteSide(soknad, sidenummer)
        ? hentSporsmalForOppsummering(soknad)
        : [soknad.sporsmal[sidenummer - 1]];
    const resultat = validerSporsmal(sporsmal, values);
    const arbeidssporsmalFeilmeldinger = soknad.soknadstype === RSSoknadstype.ARBEIDSTAKERE
        ? validerGraderteArbeidssporsmal(sporsmal, values, soknad)
        : {};
    return {
        ...resultat,
        ...arbeidssporsmalFeilmeldinger,
    };
};

export const validerForegaendeSider = (values: SvarVerdi[], soknad: Soknad, sidenummer: number) => {
    const sporsmal = soknad.sporsmal.filter((spm, index) => {
        return (index + 1) < sidenummer;
    });
    const arbeidssporsmalFeilmeldinger = soknad.soknadstype === RSSoknadstype.ARBEIDSTAKERE
        ? validerGraderteArbeidssporsmal(sporsmal, values, soknad)
        : {};
    return {
        ...validerSporsmal(sporsmal, values),
        ...arbeidssporsmalFeilmeldinger,
    };
};
