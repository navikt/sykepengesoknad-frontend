import { fraInputdatoTilJSDato } from '@navikt/digisyfo-npm';
import { Feil, SoknadPeriode } from '../../types/types';
import validerPeriode from './valider-periode';

export const erIFortiden = (dato: Date) => {
    const oppgittDato = fraInputdatoTilJSDato(dato);
    const dagensDato = new Date();
    return oppgittDato.getTime() < dagensDato.getTime();
};

/* TODO: Sjekk om denne skal være med i den nye løsningen
export const datoErFoersteSykmeldingsdagEllerSenere = (dato: Date, soknad: Soknad) => {
    const oppgittDato = fraInputdatoTilJSDato(dato);
    const foersteSykmeldingsdato: Date = soknad.syketil;
    return oppgittDato.getTime() >= foersteSykmeldingsdato.getTime();
};
*/

export const harMinstEnPeriode = (perioder: SoknadPeriode[]) => {
    return perioder.filter((periode) => {
        return periode.tom || periode.fom;
    }).length > 0;
};

export const validerDatoerIPerioder = (perioder: SoknadPeriode[], alternativer?: any) => {
    return perioder.map((periode: SoknadPeriode) => {
        const feil = {} as Feil;
        if (!periode.fom) {
            feil.fom = 'Vennligst fyll ut dato';
        }
        if (!periode.tom) {
            feil.tom = 'Vennligst fyll ut dato';
        }
        if (feil.tom || feil.fom) {
            return feil;
        }
        const fom = fraInputdatoTilJSDato(periode.fom);
        const tom = fraInputdatoTilJSDato(periode.tom);
        if (fom.getTime() > tom.getTime()) {
            feil.tom = 'Sluttdato må være etter startdato';
            return feil;
        }
        if (alternativer) {
            const fomFeil = validerPeriode(periode.fom, alternativer);
            const tomFeil = validerPeriode(periode.tom, alternativer);
            if (fomFeil) {
                feil.fom = fomFeil;
            }
            if (tomFeil) {
                feil.tom = tomFeil;
            }
            if (feil.fom || feil.tom) {
                return feil;
            }
        }
        return undefined;
    });
};

export const validerPerioder = (perioder: SoknadPeriode[], alternativer?: any) => {
    if (!perioder) {
        return null;
    }
    const datofeil = validerDatoerIPerioder(perioder, alternativer);
    const faktiskeDatofeil = datofeil.filter((feil) => {
        return feil !== undefined;
    });
    if (faktiskeDatofeil.length > 0) {
        return datofeil;
    }
    return null;
};
