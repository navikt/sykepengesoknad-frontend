import { RSSoknadstype } from './rs-soknadstype';
import { RSSoknadstatus } from './rs-soknadstatus';
import { RSSporsmal, sporsmalToRS } from './rs-sporsmal';
import { Arbeidsgiver, Soknad } from '../types';
import { RSSoknadsperiode } from './rs-soknadsperiode';

export interface RSSoknad {
    id: string;
    sykmeldingId?: string;
    soknadstype: RSSoknadstype;
    status: RSSoknadstatus;
    fom?: string;
    tom?: string;
    avbruttDato?: string;
    opprettetDato: string;
    sendtTilNAVDato?: string;
    sendtTilArbeidsgiverDato: string;
    arbeidsgiver: Arbeidsgiver;
    sporsmal: RSSporsmal[];
    soknadPerioder: RSSoknadsperiode[];
}

export const soknadToRS = (soknad: Soknad): RSSoknad => {
    const rsSoknad = {} as RSSoknad;
    rsSoknad.id = soknad.id;
    rsSoknad.sykmeldingId = soknad.sykmeldingId;
    rsSoknad.soknadstype = soknad.soknadstype;
    rsSoknad.status = soknad.status;
    rsSoknad.fom = localDateEllerNull(soknad.fom);
    rsSoknad.tom = localDateEllerNull(soknad.tom);
    rsSoknad.avbruttDato = localDateEllerNull(soknad.avbruttDato);
    rsSoknad.opprettetDato = localDateTimeEllerNull(soknad.opprettetDato);
    rsSoknad.sendtTilNAVDato = localDateTimeEllerNull(soknad.sendtTilNAVDato);
    rsSoknad.sendtTilArbeidsgiverDato = localDateTimeEllerNull(soknad.sendtTilArbeidsgiverDato);
    rsSoknad.arbeidsgiver = soknad.arbeidsgiver;
    rsSoknad.sporsmal = soknad.sporsmal.map(spm => {
        return sporsmalToRS(spm);
    });
    rsSoknad.soknadPerioder = soknad.soknadPerioder;

    return rsSoknad;
};

const localDateEllerNull = (dato: Date) => {
    return dato ? dato.toLocaleDateString() : null;
};

const localDateTimeEllerNull = (dato: Date) => {
    return dato ? dato.toDateString() : null;
};
