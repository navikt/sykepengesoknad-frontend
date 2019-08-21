import React, {useState} from 'react';
import {getLedetekst} from '@navikt/digisyfo-npm';
import {Sykmelding} from '../../../types/types';
import EndreArbeidssituasjonLightbox from './endre-arbeidssituasjon-lightbox';

interface EndreArbeidssituasjonProps {
    sykmelding: Sykmelding,
    angreBekreftSykmelding: () => void,
    angreBekreftSykmeldingFeilet: boolean,
    vis: boolean,
}

const EndreArbeidssituasjon = ({ sykmelding, angreBekreftSykmelding, angreBekreftSykmeldingFeilet, vis }: EndreArbeidssituasjonProps) => {
    const [visLightbox, setVisLightbox] = useState(false);
    const onClose = () => {};

    // TODO: vis, angreBekreftSykmeldingFeilet og angrerBekreftSykmelding må settes på global state (useAppStore)
/*
    const vis = kanEndreSykmeldingArbeidssituasjon(soknad, sykmelding);
    const angreBekreftSykmeldingFeilet = state.dineSykmeldinger.angreBekreftSykmeldingFeilet;
    const angrerBekreftSykmelding = state.dineSykmeldinger.angrerBekreftSykmelding;
*/

    const  toggleLightbox = (e: any) => {
        e.preventDefault();
        setVisLightbox(!visLightbox)
    };

    return vis
        ? (
            <>
                <EndreArbeidssituasjonLightbox
                    isOpen={visLightbox}
                    onClose={onClose}
                    sykmelding={sykmelding}
                    angreBekreftSykmelding={angreBekreftSykmelding}
                    angreBekreftSykmeldingFeilet={angreBekreftSykmeldingFeilet}
                />
                <button type="button" className="lenke" onClick={toggleLightbox}>
                    {getLedetekst('din-sykmelding.gjenapne.apne-lightbox')}
                </button>
            </>
        )
        : null;
};

export default EndreArbeidssituasjon;
