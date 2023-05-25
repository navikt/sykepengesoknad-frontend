import { BodyShort } from '@navikt/ds-react'
import React from 'react'

interface AvkryssetProps {
    tekst: string
}

const Avkrysset = ({ tekst }: AvkryssetProps) => {
    return (
        <div className="oppsummering__avkrysset mt-2 flex">
            <img
                src="/syk/sykepengesoknad/static/check-box-1.png"
                alt="Avkrysset"
                aria-hidden={true}
                className="min-h-4 mr-2 mt-0.5 flex h-4 max-h-4 w-4"
            />
            <BodyShort>{tekst}</BodyShort>
        </div>
    )
}

export default Avkrysset
