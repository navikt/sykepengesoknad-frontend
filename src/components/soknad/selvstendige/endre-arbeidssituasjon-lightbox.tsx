import {getLedetekst} from '@navikt/digisyfo-npm';
import Knapp from 'nav-frontend-knapper';
import React from 'react';
import Lightbox from '../../../components/lightbox';
import {Sykmelding} from '../../../types/types';
import {Normaltekst, Systemtittel} from 'nav-frontend-typografi';
import Feilstripe from '../../feilstripe';

interface EndreArbeidssituasjonLightboxProps {
    isOpen: boolean,
    onClose: () => void,
    angreBekreftSykmelding: (id: string) => void,
    angreBekreftSykmeldingFeilet: boolean,
    angrerBekreftSykmelding?: boolean,
    sykmelding: Sykmelding,
}

const EndreArbeidssituasjonLightbox = (
    {
        isOpen, onClose, angreBekreftSykmelding, angrerBekreftSykmelding, angreBekreftSykmeldingFeilet, sykmelding
    }: EndreArbeidssituasjonLightboxProps) => {
    return isOpen
        ? (
            <Lightbox bredde="m" onClose={onClose}>
                <Systemtittel tag="h3" className="modal__tittel">{getLedetekst('din-sykmelding.arbeidssituasjon.tittel.2')}</Systemtittel>
                <Normaltekst>{getLedetekst('din-sykmelding.gjenapne.lightboks.tekst')}</Normaltekst>
                <Feilstripe vis={angreBekreftSykmeldingFeilet}/>
                <div className="knapperad">
                    <Knapp spinner={angrerBekreftSykmelding}
                        disabled={angrerBekreftSykmelding}
                        onClick={(e) => {
                            e.preventDefault();
                            angreBekreftSykmelding(sykmelding.id);
                        }}
                        type="hoved"
                        className="blokk--s">{getLedetekst('din-sykmelding.gjenapne.lightboks.knapp')}
                    </Knapp>
                    <button className="lenke" onClick={onClose}>{getLedetekst('din-sykmelding.gjenapne.lightboks.lukk')}</button>
                </div>
            </Lightbox>
        )
        : null;
};

export default EndreArbeidssituasjonLightbox;
