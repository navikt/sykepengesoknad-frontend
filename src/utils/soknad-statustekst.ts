import { Soknad } from '../types/types';
import { RSSoknadstatus } from '../types/rs-types/rs-soknadstatus';
import { formaterOrgnr, getLedetekst } from './utils';
import { tilLesbarDatoMedArstall } from './datoUtils';

const hentSoknadStatustekst = (soknad: Soknad) => {
    const soknadSendtTilNav = soknad.sendtTilNAVDato !== null;
    const soknadSendtTilArbeidsgiver = soknad.sendtTilArbeidsgiverDato !== null;
    const nokkel = soknad.status === RSSoknadstatus.KORRIGERT
        ? 'sykepengesoknad.status-2.KORRIGERT'
        : soknadSendtTilNav && soknadSendtTilArbeidsgiver
            ? 'sykepengesoknad.status-2.SENDT.til-arbeidsgiver-og-nav'
            : soknadSendtTilNav && !soknadSendtTilArbeidsgiver
                ? 'sykepengesoknad.status-2.SENDT.til-nav'
                : 'sykepengesoknad.status-2.SENDT.til-arbeidsgiver';
    const args = {
        '%ARBEIDSGIVER%': soknad.arbeidsgiver && soknad.arbeidsgiver.navn
            ? soknad.arbeidsgiver.navn
            : soknad.arbeidsgiver
                ? soknad.arbeidsgiver
                : null,
        '%ORGNR%': soknad.arbeidsgiver && soknad.arbeidsgiver.orgnummer ? formaterOrgnr(soknad.arbeidsgiver.orgnummer) : null,
        '%SENDTTILARBEIDSGIVERDATO%': soknadSendtTilArbeidsgiver ? tilLesbarDatoMedArstall(soknad.sendtTilArbeidsgiverDato) : null,
        '%SENDTTILNAVDATO%': soknadSendtTilNav ? tilLesbarDatoMedArstall(soknad.sendtTilNAVDato) : null,
    };
    return getLedetekst(nokkel, args);
};

export default hentSoknadStatustekst;
