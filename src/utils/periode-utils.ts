import { Soknad, Sykmelding, TidsPeriode } from '../types/types';
import { RSSoknadsperiode } from '../types/rs-types/rs-soknadsperiode';
import { fraInputdatoTilJSDato } from './dato-utils';

const ETT_DOGN = 1000 * 60 * 60 * 24;

const erPafolgendeDager = (a: Date, b: Date) => {
    return b.getTime() - a.getTime() === 86400000;
};

export const datoErHelgedag = (dato: Date) => {
    const LORDAG = 6;
    const SONDAG = 0;
    return dato.getDay() === LORDAG || dato.getDay() === SONDAG;
};

export const erGyldigPeriode = (periode: TidsPeriode) => {
    try {
        fraInputdatoTilJSDato(periode.fom);
        fraInputdatoTilJSDato(periode.tom);
    } catch (e) {
        return false;
    }
    return true;
};

export const erGyldigePerioder = (perioder: TidsPeriode[]) => {
    return perioder.reduce((acc, p) => {
        return erGyldigPeriode(p) && acc;
    }, true);
};

export const periodeErHelg = (periode: TidsPeriode) => {
    let fom;
    let tom;
    try {
        fom = fraInputdatoTilJSDato(periode.fom);
    } catch (e) {
        return false;
    }
    try {
        tom = fraInputdatoTilJSDato(periode.tom);
    } catch (e) {
        return false;
    }
    return !!(datoErHelgedag(fom) && datoErHelgedag(tom) &&
        (erPafolgendeDager(fom, tom) || fom.getTime() === tom.getTime()));

};

export const perioderErHelg = (perioder: TidsPeriode[]) => {
    return perioder.length > 0 && perioder.reduce((acc, periode) => {
        return acc && periodeErHelg(periode);
    }, true);
};

export const periodeOverlapperMedPerioder = (periode_: TidsPeriode, perioder_: TidsPeriode[]): boolean => {
    if (!erGyldigePerioder(perioder_) || !erGyldigPeriode(periode_)) {
        return false;
    }

/*
    const periode = tilDatePeriode(periode_);
    const perioder = perioder_.map(tilDatePeriode);
*/

    return false;

/*
    return perioder.reduce((acc, p) => {
        return periodeOverlapperMedPerioder(periode, p) || acc;
    }, false);
*/
};

export const perioderOverlapperMedPerioder = (perioderA: TidsPeriode[], perioderB: TidsPeriode[]) => {
    if (!perioderA || !perioderB || perioderA.length === 0 || perioderB.length === 0) {
        return false;
    }
    const bools = perioderA.map((periode) => {
        return periodeOverlapperMedPerioder(periode, perioderB);
    });

    return bools.reduce((acc, bool) => {
        return acc && bool;
    }, true);
};

export const harOverlappendePerioder = (perioder: TidsPeriode[]) => {
    const gyldigePerioder = perioder.filter(erGyldigPeriode);
    if (gyldigePerioder.length === 0) {
        return false;
    }
    const overlappingsinfo = gyldigePerioder.map((p, index) => {
        const perioderUtenDennePerioden = gyldigePerioder.filter((p2, index2) => {
            return index !== index2;
        });
        return periodeOverlapperMedPerioder(p, perioderUtenDennePerioden);
    });
    return overlappingsinfo.reduce((acc, bool) => {
        return acc || bool;
    }, false);
};

export const antallVirkedagerIPeriode = (periode: RSSoknadsperiode) => {
    const start = periode.fom.getTime();
    const slutt = periode.tom.getTime();
    let antallVirkedager = 0;

    for (let i = start; i <= slutt; i += ETT_DOGN) {
        const d = new Date(i);
        if (!datoErHelgedag(d)) {
            antallVirkedager += 1;
        }
    }
    return antallVirkedager;
};

export const antallVirkedagerIPerioder = (perioder: TidsPeriode[], startdato: Date) => {
    const virkedager = new Set();
    perioder.forEach((periode) => {
        const start = periode.fom.getTime();
        const slutt = periode.tom.getTime();
        for (let i = start; i <= slutt; i += ETT_DOGN) {
            const d = new Date(i);
            if (!datoErHelgedag(d) && (!startdato || d.getTime() >= startdato.getTime())) {
                virkedager.add(d.getTime());
            }
        }
    });
    return virkedager.size;
};

export const tilDager = (perioder: TidsPeriode[]) => {
    const dager: Date[] = [];
    perioder.forEach((periode) => {
        for (let i = periode.fom.getTime(); i <= periode.tom.getTime(); i += ETT_DOGN) {
            dager.push(new Date(i));
        }
    });
    return dager;
};

export const tidligsteFom = (perioder: TidsPeriode[]) => {
    return perioder.map((p) => { return p.fom; }).sort((p1, p2) => {
        if (p1 > p2) {
            return 1;
        } else if (p1 < p2) {
            return -1;
        } return 0;
    })[0];
};

export const senesteTom = (perioder: TidsPeriode[]) => {
    return perioder.map((p) => { return p.tom; }).sort((p1, p2) => {
        if (p1 < p2) {
            return 1;
        } else if (p1 > p2) {
            return -1;
        } return 0;
    })[0];
};

export const tilDatePeriode = (periode: any) => {
    let fom;
    let tom;
    try {
        fom = fraInputdatoTilJSDato(periode.fom);
    } catch (e) {
        fom = periode.fom;
    }
    try {
        tom = fraInputdatoTilJSDato(periode.tom);
    } catch (e) {
        tom = periode.tom;
    }
    return { fom, tom };
};

export const periodeOverlapperMedPeriode = (periodeA_: TidsPeriode, periodeB_: TidsPeriode) => {
    const periodeA = tilDatePeriode(periodeA_);
    const periodeB = tilDatePeriode(periodeB_);
    try {
        const forstePeriode = periodeA.fom.getTime() < periodeB.fom.getTime() ? periodeA : periodeB;
        const andrePeriode = periodeA.fom.getTime() < periodeB.fom.getTime() ? periodeB : periodeA;
        return forstePeriode.tom.getTime() >= andrePeriode.fom.getTime();
    } catch (e) {
        return false;
    }
};

export const erOppdelt = (soknad: Soknad, sykmelding: Sykmelding) => {
    if (!sykmelding) {
        return false;
    }

    const tomSykmelding = senesteTom(sykmelding.mulighetForArbeid.perioder);
    const fomSykmelding = tidligsteFom(sykmelding.mulighetForArbeid.perioder);

    return !(soknad.fom.getTime() === fomSykmelding.getTime()
        && soknad.tom.getTime() === tomSykmelding.getTime());
};
