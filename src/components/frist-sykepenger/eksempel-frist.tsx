import { BodyShort } from '@navikt/ds-react'
import React from 'react'

interface EksempelKalenderProps {
    normalTekst: string
    boldTekst: string
    mndEn: string
    mndTo: string
    mndTre: string
    mndFire: string
}

const EksempelFrist = ({ normalTekst, boldTekst, mndEn, mndTo, mndTre, mndFire }: EksempelKalenderProps) => {
    return (
        <div className="eksempel-container">
            <BodyShort>
                {normalTekst}
                <strong>{boldTekst}</strong>
            </BodyShort>
            <div className="maned-container">
                <div>{mndEn}</div>
                <div>{mndTo}</div>
                <div>{mndTre}</div>
                <div>{mndFire}</div>
            </div>
        </div>
    )
}

export default EksempelFrist
