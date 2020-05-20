import React from 'react';
import { sorterPerioderEldsteFoerst } from '../../../utils/sykmelding-utils';
import { SykmeldingPeriode } from '../../../types/types';
import { getDuration } from '../../../utils/dato-utils';
import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi';
import dayjs from 'dayjs';
import { useAppStore } from '../../../data/stores/app-store';
import Bjorn from '../../sporsmal/bjorn/bjorn';
import Vis from '../../vis';
import { erOppdelt } from '../../../utils/periode-utils';
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype';
import { tekst } from '../../../utils/tekster';

const SykmeldingPerioder = () => {
    const { valgtSoknad, valgtSykmelding } = useAppStore();
    const visBjorn = valgtSoknad.soknadstype === RSSoknadstype.ARBEIDSLEDIG || valgtSoknad.soknadstype === RSSoknadstype.SELVSTENDIGE_OG_FRILANSERE;

    if (!valgtSykmelding) {
        return null;
    }

    return (
        <div className='sykmelding-perioder'>
            {sorterPerioderEldsteFoerst(valgtSykmelding.mulighetForArbeid.perioder).map((periode: SykmeldingPeriode, index: number) => {
                const fom = dayjs(periode.fom).format('D. MMM');
                const tom = dayjs(periode.tom).format('D. MMM YYYY');
                const dager = getDuration(periode.fom, periode.tom) + ' dager';

                return (
                    <div className='avsnitt' key={index}>
                        <EtikettLiten tag='h3' className='avsnitt-hode'>{tekst('din-sykmelding.periode.tittel')}</EtikettLiten>
                        <Normaltekst><strong>{fom} - {tom}</strong> &bull; {dager}</Normaltekst>
                    </div>
                );
            })}
            <Vis hvis={erOppdelt(valgtSoknad, valgtSykmelding) && visBjorn}>
                <Bjorn className='' nokkel='sykepengesoknad.sykmelding-utdrag.oppdelt.bjorn' />
            </Vis>
        </div>
    );
};

export default SykmeldingPerioder;
