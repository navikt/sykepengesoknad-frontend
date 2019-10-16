import React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';

interface SporsmalTekstProps {
    tag: string,
    tekst: string,
    htmlFor?: string,
}

const SporsmalTekst = ({ tag = 'h3', tekst, ...rest }: SporsmalTekstProps) => {
    return tekst !== null
        ? <Innholdstittel tag={tag} className="skjema__sporsmal" {...rest}>{tekst}</Innholdstittel>
        : null;
};

export default SporsmalTekst;
