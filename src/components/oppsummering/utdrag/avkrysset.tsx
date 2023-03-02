import { BodyShort } from '@navikt/ds-react'
import React from 'react'

interface AvkryssetProps {
    tekst: string
}

const Avkrysset = ({ tekst }: AvkryssetProps) => {
    return (
        <div className="oppsummering__avkrysset">
            <img src="/syk/sykepengesoknad/static/check-box-1.png"
                 alt="Avkrysset"
                 aria-hidden={true}
            />
            <BodyShort>{tekst}</BodyShort>
        </div>
    )
}

export default Avkrysset
