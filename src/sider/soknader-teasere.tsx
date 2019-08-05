import React from 'react';
import { Soknad } from '../types/types';
import { Innholdstittel } from 'nav-frontend-typografi';
import Infotekst from 'nav-frontend-typografi/lib/infotekst';
import SykepengesoknadTeaser from './sykepengesoknad-teaser';

interface SoknaderTeasereProps {
    soknader: Soknad[],
    className: string,
    tittel: string,
    tomListeTekst?: string,
    id: string
}

const SoknaderTeasere = ({ soknader, className, tittel, tomListeTekst, id }: SoknaderTeasereProps) => {
    return (
        <div className="blokk--l">
            <header className="inngangspanelerHeader">
                <Innholdstittel className="inngangspanelerHeader__tittel" tag="h2">{tittel}</Innholdstittel>
            </header>
            <div id={id} className={className || 'js-content'}>
                {soknader.length
                    ?
                    soknader.map((soknad, idx) => {
                            return <SykepengesoknadTeaser key={idx} soknad={soknad} />;
                        }
                    )
                    :
                    <Infotekst className="panel">{tomListeTekst}</Infotekst>
                }
            </div>
        </div>
    );
};

export default SoknaderTeasere;
