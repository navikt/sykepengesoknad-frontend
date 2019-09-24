import React from 'react';
import { Soknad } from '../../../../src/types/types';
import { RSSoknadstype } from '../../../../src/types/rs-types/rs-soknadstype';
import ForsteSoknadIntro from './forste-soknad-intro';
// import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus';
import VidereSoknadIntro from './videre-soknad-intro';
import VidereSelvstendigeSoknadIntro from './videre-selvstendige-soknad-intro';
import ForsteSelvstendigeSoknadIntro from './forste-selvstendig-soknad-intro';

interface SoknadIntroProps {
    soknad: Soknad,
    erForsteSoknad?: boolean,
}

const SoknadIntro = ({ erForsteSoknad, soknad }: SoknadIntroProps) => {
    // const [soknader] = useState<Soknad[]>([]);
/*
    const sendteSoknader = soknader.filter((soknad: Soknad) => {
        return (soknad.soknadstype === RSSoknadstype.ARBEIDSTAKERE || soknad.soknadstype === RSSoknadstype.SELVSTENDIGE_OG_FRILANSERE)
            && soknad.status === RSSoknadstatus.SENDT;
    });
    return sendteSoknader.length === 0;
*/

    switch (soknad.soknadstype) {
        case RSSoknadstype.ARBEIDSTAKERE: {
            return erForsteSoknad
                ? <ForsteSoknadIntro/>
                : <VidereSoknadIntro/>;
        }
        case RSSoknadstype.SELVSTENDIGE_OG_FRILANSERE: {
            return erForsteSoknad
                ? <ForsteSelvstendigeSoknadIntro/>
                : <VidereSelvstendigeSoknadIntro/>;
        }
        default: {
            return null;
        }
    }
};

export default SoknadIntro;
