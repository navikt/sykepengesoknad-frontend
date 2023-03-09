import React, { useState } from 'react'

import { TagTyper } from '../../../types/enums'

import { Forslag } from './Forslag'
import { tilForslagsliste } from './forslagUtils'
import { landlisteEøs, landlisteUtenforEøs } from './landliste'
import NavAutosuggest from './NavAutosuggest'
import { ValgteTags } from './ValgteTags'

interface LandvelgerComponentProps {
    verdierInn: string[]
    name: string
    sporsmalId: string
    onChange: (verdier: string[]) => void
    tag: TagTyper
}

const LandvelgerComponent = ({ verdierInn, sporsmalId, onChange, tag }: LandvelgerComponentProps) => {
    const [verdier, setVerdier] = useState(verdierInn)

    const onAdd = (verdi: Forslag) => {
        const nyeVerdier = [...verdier, verdi.text]
        setVerdier(nyeVerdier)
        onChange(nyeVerdier)
    }

    const landListe = () => {
        if (tag == TagTyper.LAND) {
            return landlisteUtenforEøs
        }
        if (tag == TagTyper.UTENLANDSK_SYKMELDING_TRYGD_HVILKET_LAND) {
            return landlisteEøs
        }
        throw new Error('Ugyldig tag for landvelger: ' + tag)
    }

    const onDelete = (idx: number) => {
        const nyeVerdier: string[] = []
        verdier.filter((v, i) => i !== idx).forEach((v) => nyeVerdier.push(v))

        setVerdier(nyeVerdier)
        onChange(nyeVerdier)
    }

    return (
        <div className="landvelger">
            <NavAutosuggest
                onAdd={onAdd}
                sporsmalId={sporsmalId}
                forslagsliste={tilForslagsliste(landListe(), verdier)}
            />
            <ValgteTags verdier={verdier} handleDelete={onDelete} />
        </div>
    )
}

export default LandvelgerComponent
