import { Systemtittel } from 'nav-frontend-typografi'
import React, { ReactNode } from 'react'

interface FeilmeldingProps {
    tittel?: string;
    melding?: string;
    children?: ReactNode;
}

const Feilmelding = (
    {
        tittel = 'Beklager, det oppstod en feil',
        melding = 'Vennligst prøv igjen litt senere.',
        children
    }: FeilmeldingProps) => {
    return (
        <div className="panel">
            <div className="hode hode--feil">
                <Systemtittel tag="h1" className="hode__tittel">{tittel}</Systemtittel>
                <p className="hode__melding">{children || melding}</p>
            </div>
        </div>
    )
}

export default Feilmelding
