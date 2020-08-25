import './landvelger.less'

import React, { useState } from 'react'

import { Forslag } from './Forslag'
import { tilForslagsliste } from './forslagUtils'
import landliste from './landliste'
import NavAutosuggest from './NavAutosuggest'
import { ValgteTags } from './ValgteTags'

interface LandvelgerComponentProps {
    verdierInn: string[];
    name: string;
    id: string;
    onChange: (verdier: string[]) => void;
}

const LandvelgerComponent = ({ verdierInn, id, onChange }: LandvelgerComponentProps) => {
    const [ verdier, setVerdier ] = useState(verdierInn)

    const onAdd = (verdi: Forslag) => {
        const nyeVerdier = [ ...verdier, verdi.text ]
        setVerdier(nyeVerdier)
        onChange(nyeVerdier)
    }

    const onDelete = (idx: number) => {
        const nyeVerdier: string[] = []
        verdier
            .filter((v, i) => i !== idx)
            .forEach((v) => nyeVerdier.push(v))

        setVerdier(nyeVerdier)
        onChange(nyeVerdier)
    }

    return (<div className={'landvelger'}>
        <NavAutosuggest
            onAdd={onAdd}
            id={id}
            forslagsliste={tilForslagsliste(landliste, verdier)}
        />
        <ValgteTags verdier={verdier} handleDelete={onDelete} />
    </div>)
}

export default LandvelgerComponent
