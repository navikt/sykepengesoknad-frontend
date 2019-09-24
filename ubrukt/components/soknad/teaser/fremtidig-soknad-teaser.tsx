import React, { useState } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { getLedetekst, tilLesbarDatoMedArstall, tilLesbarPeriodeMedArstall } from '@navikt/digisyfo-npm';
import {
    InngangspanelHeader,
    InngangspanelIkon,
    InngangspanelUndertekst,
} from '../../../../src/sider/inngangspanel';
import { Soknad } from '../../../../src/types/types';
import Lightbox from '../../lightbox';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import Vis from '../../../../src/utils/vis';

interface SoknadLightboxProps {
    soknad: Soknad,
    onClose: () => void
}

const SoknadLightbox = ({ soknad, onClose }: SoknadLightboxProps) => {
    return (
        <Lightbox onClose={onClose}>
            <Innholdstittel tag="h3" className="modal__tittel">{getLedetekst('soknader.teaser.fremtidig.dato-tittel')}</Innholdstittel>
            <Normaltekst>{
                getLedetekst('soknader.teaser.fremtidig.dato-info', {
                    '%DATO%': tilLesbarDatoMedArstall(soknad.tom),
                })
            }</Normaltekst>
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

    const teaserPeriode = getLedetekst('soknad.teaser.tekst', {
        '%PERIODE%': tilLesbarPeriodeMedArstall(soknad.fom, soknad.tom),
    });

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
                        status={getLedetekst(`soknad.teaser.status.${soknad.status}`)}
                    />
                    <Vis hvis={teaserPeriode}>
                        <Normaltekst className="inngangspanel__tekst">
                            {teaserPeriode}
                        </Normaltekst>
                    </Vis>
                    <Vis hvis={soknad.arbeidsgiver.navn.length > 0}>
                        <InngangspanelUndertekst>
                            {soknad.arbeidsgiver.navn}
                        </InngangspanelUndertekst>)
                    </Vis>
                </div>
            </button>
            <Vis hvis={vis}>
                <SoknadLightbox soknad={soknad} onClose={() => setVis(false)}/>
            </Vis>
        </article>
    );
};

export default FremtidigSoknadTeaser;
