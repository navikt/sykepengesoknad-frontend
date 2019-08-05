import { senesteTom } from '@navikt/digisyfo-npm';
import { Soknad, Sporsmal } from '../types/types';
import { TagTyper } from '../types/enums';
import { RSSoknadstype } from '../types/rs-types/rs-soknadstype';
import { RSSoknadstatus } from '../types/rs-types/rs-soknadstatus';

const getTomFraSoknad = (soknad: Soknad) => {
    const getTomForUtland = (_soknad: Soknad) => {
        const perioder = _soknad.sporsmal.find((spm: Sporsmal) => spm.tag === TagTyper.PERIODEUTLAND)!
            .svar
            .map((periode) => {
                const jsonPeriode = JSON.parse(periode.verdi);
                return {
                    fom: new Date(jsonPeriode.fom),
                    tom: new Date(jsonPeriode.tom),
                };
            });
        return senesteTom(perioder);
    };

    return soknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND && soknad.status === RSSoknadstatus.SENDT
        ? getTomForUtland(soknad)
        : soknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND && soknad.status === RSSoknadstatus.NY
            ? soknad.opprettetDato
            : soknad.tom;
};

export const sorterEtterPerioder = (soknad1: Soknad, soknad2: Soknad) => {
    const tom1 = getTomFraSoknad(soknad1);
    const tom2 = getTomFraSoknad(soknad2);
    return tom2.getTime() - tom1.getTime();
};

export const sorterEtterOpprettetDato = (soknad1: Soknad, soknad2: Soknad) => {
    return soknad1.opprettetDato.getTime() - soknad2.opprettetDato.getTime() !== 0
        ? soknad1.opprettetDato.getTime() - soknad2.opprettetDato.getTime()
        : soknad1.fom!.getTime() - soknad2.fom!.getTime();
};

export const getTidligsteSendtDato = (soknad: Soknad) => {
    const sendtTilNAVDato = soknad.innsendtDato || soknad.sendtTilNAVDato;
    if (sendtTilNAVDato && soknad.sendtTilArbeidsgiverDato) {
        return sendtTilNAVDato > soknad.sendtTilArbeidsgiverDato
            ? soknad.sendtTilArbeidsgiverDato
            : sendtTilNAVDato;
    }
    return sendtTilNAVDato
        || soknad.sendtTilArbeidsgiverDato;
};

export const sorterEtterSendtDato = (soknad1: Soknad, soknad2: Soknad) => {
    const dato1 = getTidligsteSendtDato(soknad1);
    const dato2 = getTidligsteSendtDato(soknad2);
    return dato2.getTime() - dato1.getTime();
};
