import React from 'react';
import { Soknad } from '../../../../src/types/types';
import { RSSoknadstatus } from '../../../../src/types/rs-types/rs-soknadstatus';
import { RSSoknadstype } from '../../../../src/types/rs-types/rs-soknadstype';
import KvitteringSelvstendige from '../../kvittering/kvittering-selvstendige';
import KvitteringArbeidstakere from '../../kvittering/kvittering-arbeidstakersoknad';
import StartIgjen from '../../../../src/sider/start-igjen';
import EttSporsmalPerSide from '../../sporsmal/ett-sporsmal/ett-sporsmal-per-side';

const soknadErSendt = (soknad: Soknad) => {
    return [RSSoknadstatus.SENDT].indexOf(soknad.status) > -1;
};

interface SoknadStatusSjekkerProps {
    soknad: Soknad,
    skjemasvar: {},
    valider: () => void,
    sidenummer: number,
}

const SoknadStatusSjekker = ({ soknad, sidenummer }: SoknadStatusSjekkerProps) => {
    if (soknadErSendt(soknad)
        && (soknad.soknadstype === RSSoknadstype.SELVSTENDIGE_OG_FRILANSERE ||
            soknad.soknadstype === RSSoknadstype.ARBEIDSTAKERE)) {
        return soknad.soknadstype === RSSoknadstype.SELVSTENDIGE_OG_FRILANSERE
            ? <KvitteringSelvstendige />
            : <KvitteringArbeidstakere soknad={soknad} />;
    }
    if (Object.keys([]).length > 0) {
        return <StartIgjen soknad={soknad} />;
    }
    return <EttSporsmalPerSide soknad={soknad} sidenummer={sidenummer} />;
};

export default SoknadStatusSjekker;
