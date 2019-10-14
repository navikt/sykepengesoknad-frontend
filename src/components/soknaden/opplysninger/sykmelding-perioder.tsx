import React from 'react';
import { sorterPerioderEldsteFoerst } from '../../../utils/sykmelding-utils';
import { SykmeldingPeriode } from '../../../types/types';
import { getDuration } from '../../../utils/dato-utils';
import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi';
import dayjs from 'dayjs';
import { useAppStore } from '../../../data/stores/app-store';
import tekster from './opplysninger-tekster';

const SykmeldingPerioder = () => {
    const { sykmelding } = useAppStore();

    return (
        sykmelding !== undefined
            ? <div className="sykmelding-perioder">
                {sorterPerioderEldsteFoerst(sykmelding.mulighetForArbeid.perioder).map((periode: SykmeldingPeriode, index: number) => {
                    const fom = dayjs(periode.fom).format('D. MMM');
                    const tom = dayjs(periode.tom).format('D. MMM YYYY');
                    const dager = getDuration(periode.fom, periode.tom) + ' dager';

                    return (
                        <div className="avsnitt" key={index}>
                            <EtikettLiten tag="h3" className="avsnitt-hode">{tekster['periode.tittel']}</EtikettLiten>
                            <Normaltekst><strong>{fom} - {tom}</strong> &bull; {dager}</Normaltekst>
                        </div>
                    );
                })}
            </div>
            : null
    );
};

export default SykmeldingPerioder;
