import React, { useState } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { getLedetekst, tilLesbarDatoMedArstall, tilLesbarPeriodeMedArstall } from '@navikt/digisyfo-npm';
import {
    InngangspanelHeader,
    InngangspanelIkon,
    InngangspanelUndertekst,
} from './inngangspanel';
import { Soknad } from '../types/types';
import Lightbox from '../components/lightbox';

interface SoknadLightboxProps {
    soknad: Soknad,
    onClose: () => void
}

const SoknadLightbox = ({ soknad, onClose }: SoknadLightboxProps) => {
    return (
        <Lightbox onClose={onClose}>
            <h3 className="modal__tittel">{getLedetekst('soknader.teaser.fremtidig.dato-tittel')}</h3>
            <p>{
                getLedetekst('soknader.teaser.fremtidig.dato-info', {
                    '%DATO%': tilLesbarDatoMedArstall(soknad.tom),
                })
            }</p>
            <div className="knapperad">
                <Knapp onClick={onClose}>Lukk</Knapp>
            </div>
        </Lightbox>
    );
};

interface FremtidigSoknadTeaserProps {
    soknad: Soknad
}

const FremtidigSoknadTeaser = ({ soknad }: FremtidigSoknadTeaserProps) => {
    const [vis, setVis] = useState(false);

    return (
        <article aria-labelledby={`soknader-header-${soknad.id}`}>
            <button className="inngangspanel inngangspanel--inaktivt"
                onClick={(e) => {
                    e.preventDefault();
                    setVis(true);
                }}>
                <InngangspanelIkon ikon={`${process.env.REACT_APP_CONTEXT_ROOT}/img/svg/soknader.svg`}/>
                <div className="inngangspanel__innhold">
                    <InngangspanelHeader
                        id={`soknad-header-${soknad.id}`}
                        meta={getLedetekst('soknad.teaser.dato.fremtidig', { '%DATO%': tilLesbarDatoMedArstall(soknad.tom) })}
                        tittel={getLedetekst('soknad.teaser.tittel')}
                        status={getLedetekst(`soknad.teaser.status.${soknad.status}`)}/>
                    <p className="inngangspanel__tekst">
                        {
                            getLedetekst('soknad.teaser.tekst', {
                                '%PERIODE%': tilLesbarPeriodeMedArstall(soknad.fom, soknad.tom),
                            })
                        }
                    </p>
                    {
                        soknad.arbeidsgiver
                            ? (<InngangspanelUndertekst>
                                {soknad.arbeidsgiver.navn}
                            </InngangspanelUndertekst>)
                            : null
                    }
                </div>
            </button>
            {
                vis
                    ? <SoknadLightbox
                        soknad={soknad}
                        onClose={() => setVis(false)}/>
                    : null
            }
        </article>
    );
};

export default FremtidigSoknadTeaser;
