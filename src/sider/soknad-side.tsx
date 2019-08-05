import * as React from 'react';
import Banner from '../components/banner/banner';
import { Brodsmule, Soknad } from '../types/types';
import { RSSoknadstatus } from '../types/rs-types/rs-soknadstatus';
import { ReactNode } from 'react';
import { getLedetekst } from '@navikt/digisyfo-npm';

interface SoknadSideProps {
    soknad: Soknad,
    children?: ReactNode,
}

const soknadSkalUtfylles = (soknad: Soknad) => {
    return soknad && (soknad.status === RSSoknadstatus.NY || soknad.status === RSSoknadstatus.UTKAST_TIL_KORRIGERING);
};

const brodsmuler: Brodsmule[] = [{
    tittel: getLedetekst('landingsside.sidetittel'),
    sti: '/sykefravaer',
    erKlikkbar: true,
}, {
    tittel: getLedetekst('soknader.sidetittel'),
    sti: '/soknader',
    erKlikkbar: false
}];

const SoknadSide = ({ soknad, children }: SoknadSideProps): any => {
    return (
        soknadSkalUtfylles(soknad)
            ? <>
                <Banner soknad={soknad} brodsmuler={brodsmuler}/>
                <div className="begrensning begrensning--soknad">
                    {children}
                </div>
            </>
            : children
    )
};

export default SoknadSide;
