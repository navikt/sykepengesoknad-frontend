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


export const LandvelgerComponent = ({ verdierInn, name, id, onChange }: LandvelgerComponentProps) => {

    const [ verdier, setVerdier ] = useState(verdierInn)

    const onAdd = (verdi: Forslag) => {
        const nyeVerdier = [ ...verdier, verdi.text ]
        setVerdier(nyeVerdier)
        if (onChange) {
            onChange(nyeVerdier)
        }
    }

    const onDelete = (idx: number) => {

        const nyeVerdier: string[] = []
        verdier
            .filter((v, i) => i !== idx)
            .forEach((v) => nyeVerdier.push(v))

        setVerdier(nyeVerdier)
        if (onChange) {
            onChange(verdier)
        }

    }

    return (<>
        <NavAutosuggest
            onAdd={onAdd}

            forslagsliste={tilForslagsliste(landliste, verdier)}
        />
        <ValgteTags verdier={verdier} handleDelete={onDelete} />
        <input type={'hidden'} value={verdier} name={name} id={id} />
    </>)
}

const LandvelgerWrapper = () => {


    return (<>
        <LandvelgerComponent
            name={'hei'}
            id={'123'}
            verdierInn={[ 'Djibouti', 'Falklandsøyene' ]}
            onChange={() => {
                // eslint-disable-next-line no-console
                console.log('change')
            }
            }

        />
    </>)
}


export default LandvelgerWrapper
