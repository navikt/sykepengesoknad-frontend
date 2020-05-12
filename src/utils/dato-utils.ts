import { Sykmelding } from '../types/types';
import dayjs from 'dayjs';

export const fraInputdatoTilJSDato = (inputDato: any) => {
    const datoSplit = inputDato.split('.');
    let ar = datoSplit[2];
    if (ar.length === 2) {
        ar = `20${ar}`;
    }
    const s = `${ar}-${datoSplit[1]}-${datoSplit[0]}`;
    return new Date(s);
};

export const erGyldigDatoformat = (dato: any) => {
    const d = dato.replace(/\./g, '');
    let s = `${parseInt(d, 10)}`;
    if (dato.startsWith('0')) {
        s = `0${s}`;
    }
    if (dato.trim().length !== 10) {
        return false;
    }
    return s.length === 8;
};

export const erGyldigDato = (dato: any) => {
    const re = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    if (!re.test(dato)) {
        return false;
    }
    return erGyldigDatoformat(dato);
};

const maaneder = [ 'januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember' ];
const SKILLETEGN_PERIODE = '–';

export const langtDatoFormat = (_dato: any) => {
    const dato = new Date(_dato);
    return `${dato.getDate()}. ${maaneder[dato.getMonth()]} ${dato.getFullYear()}`;
};

export const tilBackendDato = (datoArg: string) => {
    const dato = new Date(datoArg);
    let dag: any = dato.getDate();
    let maned: any = dato.getMonth() + 1;
    const ar = dato.getFullYear();
    if (dag < 10) dag = '0' + dag;
    if (maned < 10) maned = '0' + maned;

    return `${ar}-${maned}-${dag}`;
};

export const fraBackendTilDate = (datoArg: string) => {
    const datoer = datoArg.split('-').map((verdi => {
        if (verdi[0] === '0') return parseInt(verdi[1]);
        return parseInt(verdi);
    }));
    return new Date(datoer[0], datoer[1] - 1, datoer[2]);
};

export const tilLesbarDatoUtenAarstall = (datoArg: any) => {
    if (datoArg) {
        const dato = new Date(datoArg);
        const dag = dato.getDate();
        const manedIndex = dato.getMonth();
        const maned = maaneder[manedIndex];
        return `${dag}. ${maned}`;
    }
    return null;
};

export const tilLesbarDatoMedArstall = (datoArg: any) => {
    return datoArg
        ? `${tilLesbarDatoUtenAarstall(new Date(datoArg))} ${new Date(datoArg).getFullYear()}`
        : null;
};

export const tilLesbarPeriodeMedArstall = (fomArg: any, tomArg: any) => {
    const fom = new Date(fomArg);
    const tom = new Date(tomArg);
    const erSammeAar = fom.getFullYear() === tom.getFullYear();
    const erSammeMaaned = fom.getMonth() === tom.getMonth();
    return erSammeAar && erSammeMaaned
        ? `${fom.getDate()}. ${SKILLETEGN_PERIODE} ${tilLesbarDatoMedArstall(tom)}`
        : erSammeAar
            ? `${tilLesbarDatoUtenAarstall(fom)} ${SKILLETEGN_PERIODE} ${tilLesbarDatoMedArstall(tom)}`
            : `${tilLesbarDatoMedArstall(fom)} ${SKILLETEGN_PERIODE} ${tilLesbarDatoMedArstall(tom)}`;
};

export const tilLesbarPeriodeUtenArstall = (fomArg: any, tomArg: any) => {
    const fom = new Date(fomArg);
    const tom = new Date(tomArg);
    const erSammeMaaned = fom.getMonth() === tom.getMonth();
    return erSammeMaaned
        ? `${fom.getDate()}. ${SKILLETEGN_PERIODE} ${tilLesbarDatoUtenAarstall(tom)}`
        : `${tilLesbarDatoUtenAarstall(fom)} ${SKILLETEGN_PERIODE} ${tilLesbarDatoUtenAarstall(tom)}`;
};

export function getDuration(from: Date, to: Date) {
    return Math.round(Math.floor(to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
}

export const fixDateType = (date: any) => {
    return date ? new Date(date) : date;
};

export const fixSykmeldingDatoer = (sykmelding: Sykmelding) => {
    sykmelding.startLegemeldtFravaer = fixDateType(sykmelding.startLegemeldtFravaer);
    sykmelding.identdato = fixDateType(sykmelding.identdato);
    sykmelding.sendtDato = fixDateType(sykmelding.sendtDato);
    sykmelding.diagnose.yrkesskadeDato = fixDateType(sykmelding.diagnose.yrkesskadeDato);
    sykmelding.mulighetForArbeid.perioder.forEach((periode, idx) => {
        sykmelding.mulighetForArbeid.perioder[idx].fom = fixDateType(sykmelding.mulighetForArbeid.perioder[idx].fom);
        sykmelding.mulighetForArbeid.perioder[idx].tom = fixDateType(sykmelding.mulighetForArbeid.perioder[idx].tom);
    });
    sykmelding.friskmelding.antattDatoReturSammeArbeidsgiver = fixDateType(sykmelding.friskmelding.antattDatoReturSammeArbeidsgiver);
    sykmelding.friskmelding.tilbakemeldingReturArbeid = fixDateType(sykmelding.friskmelding.tilbakemeldingReturArbeid);
    sykmelding.friskmelding.utenArbeidsgiverAntarTilbakeIArbeidDato = fixDateType(sykmelding.friskmelding.utenArbeidsgiverAntarTilbakeIArbeidDato);
    sykmelding.friskmelding.utenArbeidsgiverTilbakemelding = fixDateType(sykmelding.friskmelding.utenArbeidsgiverTilbakemelding);
    sykmelding.tilbakedatering.dokumenterbarPasientkontakt = fixDateType(sykmelding.tilbakedatering.dokumenterbarPasientkontakt);
    sykmelding.bekreftelse.utstedelsesdato = fixDateType(sykmelding.bekreftelse.utstedelsesdato);
    return sykmelding;
};

export const ukeDatoListe = (min: string, max: string) => {
    const ukeListe = [];
    let dato = dayjs(min);
    while (dato.toDate() <= dayjs(max).toDate()) {
        ukeListe.push(dato);
        dato = dato.add(1, 'day');
    }
    return ukeListe;
};

export const dayjsToDate = (dato: string) => {
    return dato !== null ? dayjs(dato).toDate() : null
}
