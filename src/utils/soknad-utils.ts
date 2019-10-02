import { Soknad } from '../types/types';
import { periodeOverlapperMedPeriode, tidligsteFom, tilDatePeriode } from './periode-utils';
import { erGyldigDatoformat, fraInputdatoTilJSDato } from './datoUtils';

export const filtrerAktuelleAktiviteter = (aktiviteter: any, gjenopptattArbeidFulltUtDato: any) => {
    if (gjenopptattArbeidFulltUtDato && aktiviteter) {
        return aktiviteter
            .filter((aktivitet: any) => {
                return aktivitet.periode.fom < gjenopptattArbeidFulltUtDato;
            })
            .map((aktivitet: any) => {
                const justertTOM = gjenopptattArbeidFulltUtDato <= aktivitet.periode.tom
                    ? new Date(gjenopptattArbeidFulltUtDato.getTime() - (24 * 60 * 60 * 1000))
                    : aktivitet.periode.tom;

                return Object.assign({}, aktivitet, {
                    periode: {
                        fom: aktivitet.periode.fom,
                        tom: justertTOM,
                    },
                });
            });
    }
    return aktiviteter;
};

export const mapAktiviteter = (soknad: any) => {
    const aktiviteter = soknad.aktiviteter
        .filter((aktivitet: any) => {
            return periodeOverlapperMedPeriode(aktivitet.periode, {
                fom: soknad.fom,
                tom: soknad.tom,
            });
        })
        .map((aktivitet: any) => {
            const fom = aktivitet.periode.fom.getTime() < soknad.fom.getTime() ? soknad.fom : aktivitet.periode.fom;
            const tom = aktivitet.periode.tom.getTime() > soknad.tom.getTime() ? soknad.tom : aktivitet.periode.tom;
            return {
                ...aktivitet,
                periode: { fom, tom },
            };
        });
    return {
        ...soknad,
        aktiviteter,
    };
};

export const getTomDato = (sykepengesoknad: any) => {
    const perioder = sykepengesoknad.aktiviteter.map((a: any) => {
        return a.periode;
    });
    if (sykepengesoknad.gjenopptattArbeidFulltUtDato) {
        const tidligsteFomFraPerioder = new Date(tidligsteFom(perioder));
        const gjenopptattArbeidFulltUtDato: Date = new Date(sykepengesoknad.gjenopptattArbeidFulltUtDato);
        if (gjenopptattArbeidFulltUtDato.getTime() === tidligsteFomFraPerioder.getTime()) {
            return gjenopptattArbeidFulltUtDato;
        }
        return new Date(gjenopptattArbeidFulltUtDato.getTime() - (1000 * 60 * 60 * 24));
    }
    return sykepengesoknad.tom;
};

export const getGjenopptattArbeidFulltUtDato = (skjemasoknad: any) => {
    let gjenopptattArbeidFulltUtDato = skjemasoknad.gjenopptattArbeidFulltUtDato;
    if (!skjemasoknad.harGjenopptattArbeidFulltUt || !gjenopptattArbeidFulltUtDato || !erGyldigDatoformat(gjenopptattArbeidFulltUtDato)) {
        gjenopptattArbeidFulltUtDato = null;
    } else {
        try {
            gjenopptattArbeidFulltUtDato = fraInputdatoTilJSDato(gjenopptattArbeidFulltUtDato);
        } catch (e) {
            gjenopptattArbeidFulltUtDato = null;
        }
        if (gjenopptattArbeidFulltUtDato && isNaN(gjenopptattArbeidFulltUtDato.getTime())) {
            gjenopptattArbeidFulltUtDato = null;
        }
    }
    return gjenopptattArbeidFulltUtDato;
};

export const erSendtTilBeggeMenIkkeSamtidig = (soknad: Soknad) => {
    return soknad.sendtTilNAVDato
        && soknad.sendtTilArbeidsgiverDato
        && soknad.sendtTilNAVDato.getTime() !== soknad.sendtTilArbeidsgiverDato.getTime();
};

export const getSendtTilSuffix = (soknad: Soknad) => {
    if (soknad.sendtTilArbeidsgiverDato && soknad.sendtTilNAVDato) {
        return '.til-arbeidsgiver-og-nav';
    }
    if (soknad.sendtTilArbeidsgiverDato) {
        return '.til-arbeidsgiver';
    }
    if (soknad.sendtTilNAVDato) {
        return '.til-nav';
    }
    return '';
};

export const getFeriePermisjonPerioder = (values: any) => {
    let ferieOgPermisjonPerioder: any = [];
    if (values.harHattFeriePermisjonEllerUtenlandsopphold) {
        if (values.harHattFerie) {
            ferieOgPermisjonPerioder = [...ferieOgPermisjonPerioder, ...values.ferie];
        }
        if (values.harHattPermisjon) {
            ferieOgPermisjonPerioder = [...ferieOgPermisjonPerioder, ...values.permisjon];
        }
    }
    return ferieOgPermisjonPerioder.map(tilDatePeriode);
};

export const getGjenopptattArbeidFulltUtDatoFraSkjema = (skjemasoknad: any) => {
    return skjemasoknad.harGjenopptattArbeidFulltUt && skjemasoknad.gjenopptattArbeidFulltUtDato
        ? fraInputdatoTilJSDato(skjemasoknad.gjenopptattArbeidFulltUtDato)
        : null;
};
