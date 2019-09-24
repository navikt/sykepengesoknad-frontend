import React, { useState } from 'react';
import { getLedetekst } from '@navikt/digisyfo-npm';
import { Sykmelding } from '../../../../src/types/types';
import EndreArbeidssituasjonLightbox from './endre-arbeidssituasjon-lightbox';
import { kanEndreSykmeldingArbeidssituasjon } from '../../../../src/utils/sykmelding-utils';
import { useAppStore } from '../../../../src/stores/app-store';
import Vis from '../../../../src/utils/vis';

interface EndreArbeidssituasjonProps {
    sykmelding: Sykmelding,
}

const EndreArbeidssituasjon = ({ sykmelding }: EndreArbeidssituasjonProps) => {
    const [visLightbox, setVisLightbox] = useState(false);
    const { soknad, vis, setVis, angrerBekreftSykmelding } = useAppStore();

    // TODO: vis, angreBekreftSykmeldingFeilet og angrerBekreftSykmelding må settes på global state (useAppStore)
    setVis(kanEndreSykmeldingArbeidssituasjon(sykmelding, soknad));

    const toggleLightbox = (e: any) => {
        e.preventDefault();
        setVisLightbox(!visLightbox)
    };

    return (
        <Vis hvis={vis}>
            <EndreArbeidssituasjonLightbox
                onClose={() => {
                }}
                isOpen={visLightbox}
                sykmelding={sykmelding}
                angreBekreftSykmelding={() => ''}
                angrerBekreftSykmelding={angrerBekreftSykmelding}
            />
            <button type="button" className="lenke" onClick={toggleLightbox}>
                {getLedetekst('din-sykmelding.gjenapne.apne-lightbox')}
            </button>
        </Vis>
    );
};

export default EndreArbeidssituasjon;
