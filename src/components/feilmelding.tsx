import { Heading } from '@navikt/ds-react'
import React, { ReactNode } from 'react'

interface FeilmeldingProps {
    tittel?: string
    melding?: string
    children?: ReactNode
}

const Feilmelding = ({
    tittel = 'Beklager, det oppstod en feil',
    melding = 'Vennligst prøv igjen litt senere.',
    children,
}: FeilmeldingProps) => {
    return (
        <div className="panel">
            <div className="hode hode--feil">
                <Heading size="medium" level="1" className="hode__tittel">
                    {tittel}
                </Heading>
                <p className="hode__melding">{children || melding}</p>
            </div>
        </div>
    )
}

export default Feilmelding
