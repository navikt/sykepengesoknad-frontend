import React from 'react';
import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi';
import { useAppStore } from '../../data/stores/app-store';
import Vis from '../vis';
import { tilLesbarDatoMedArstall } from '../../utils/dato-utils';
import { getLedetekst, tekst } from '../../utils/tekster';

const Status = () => {
    const { valgtSoknad } = useAppStore();

    return (
        <div className='avsnitt'>
            <EtikettLiten tag='h3' className='avsnitt-hode'>{tekst('kvittering.status')}</EtikettLiten>
            <Vis hvis={valgtSoknad!.sendtTilNAVDato}>
                <Normaltekst>
                    {getLedetekst(tekst('soknad.teaser.status.SENDT.til-nav'), {
                        '%DATO%':  tilLesbarDatoMedArstall(valgtSoknad!.sendtTilNAVDato) })}
                </Normaltekst>
            </Vis>
            <Vis hvis={valgtSoknad!.sendtTilArbeidsgiverDato}>
                <Normaltekst>
                    {getLedetekst(tekst('soknad.teaser.status.SENDT.til-arbeidsgiver'), {
                        '%DATO%': tilLesbarDatoMedArstall(valgtSoknad!.sendtTilArbeidsgiverDato),
                        '%ARBEIDSGIVER%': valgtSoknad!.arbeidsgiver ? valgtSoknad!.arbeidsgiver.navn : '' })}
                </Normaltekst>
            </Vis>
        </div>
    );
};

export default Status;
