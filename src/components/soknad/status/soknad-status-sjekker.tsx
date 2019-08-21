import React from 'react';
import {Soknad} from '../../../types/types';
import {RSSoknadstatus} from '../../../types/rs-types/rs-soknadstatus';
import {RSSoknadstype} from '../../../types/rs-types/rs-soknadstype';
import KvitteringSelvstendige from '../../kvittering/kvittering-selvstendige';
import KvitteringArbeidstakere from '../../kvittering/kvittering-arbeidstakersoknad';
import StartIgjen from '../../../sider/start-igjen';

const soknadErSendt = (soknad: Soknad) => {
    return [RSSoknadstatus.SENDT].indexOf(soknad.status) > -1;
};

interface SoknadStatusSjekkerProps {
    soknad: Soknad,
    skjemasvar: {},
    valider: () => void,
    sidenummer: number,
}

const SoknadStatusSjekker = ({ soknad, skjemasvar, valider, sidenummer }: SoknadStatusSjekkerProps) => {
    const feilmeldinger = valider ? valider() : {};

    if (soknadErSendt(soknad)
        && (soknad.soknadstype === RSSoknadstype.SELVSTENDIGE_OG_FRILANSERE ||
            soknad.soknadstype === RSSoknadstype.ARBEIDSTAKERE)) {
        return soknad.soknadstype === RSSoknadstype.SELVSTENDIGE_OG_FRILANSERE
            ? <KvitteringSelvstendige />
            : <KvitteringArbeidstakere soknad={soknad} />;
    }
    //if (true) {//Object.keys(feilmeldinger).length > 0) {
        return <StartIgjen soknad={soknad} />;
    //};
    //return <EttSporsmalPerSide form={getSoknadSkjemanavn(soknad.id)} />
};

export default SoknadStatusSjekker;
