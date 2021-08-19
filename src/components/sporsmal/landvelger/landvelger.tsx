import './landvelger.less'

import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { Forslag } from './Forslag'
import { tilForslagsliste } from './forslagUtils'
import landliste from './landliste'
import NavAutosuggest from './NavAutosuggest'
import { ValgteTags } from './ValgteTags'

interface LandvelgerComponentProps {
    verdierInn: string[];
    name: string;
    sporsmalId: string;
    onChange: (verdier: string[]) => void;
}

const LandvelgerComponent = ({ verdierInn, sporsmalId, onChange }: LandvelgerComponentProps) => {
    const [ verdier, setVerdier ] = useState(verdierInn)
    const { setValue } = useFormContext()

    const onAdd = (verdi: Forslag) => {
        const nyeVerdier = [ ...verdier, verdi.text ]
        setVerdier(nyeVerdier)
        setValue(sporsmalId, nyeVerdier)
        onChange(nyeVerdier)
    }

    const onDelete = (idx: number) => {
        const nyeVerdier: string[] = []
        verdier
            .filter((v, i) => i !== idx)
            .forEach((v) => nyeVerdier.push(v))

        setVerdier(nyeVerdier)
        setValue(sporsmalId, nyeVerdier)
        onChange(nyeVerdier)
    }

    return (
        <div className="landvelger">
            <NavAutosuggest
                onAdd={onAdd}
                sporsmalId={sporsmalId}
                forslagsliste={tilForslagsliste(landliste, verdier)}
            />
            <ValgteTags verdier={verdier} handleDelete={onDelete} />
        </div>
    )
}

export default LandvelgerComponent
