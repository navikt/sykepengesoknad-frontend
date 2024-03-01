import React from 'react'
import { useState } from 'react'
import { UNSAFE_Combobox } from '@navikt/ds-react'

import { beskyttetSideUtenProps } from '../auth/beskyttetSide'

export default function Page() {
    return <Example />
}

export const getServerSideProps = beskyttetSideUtenProps
const initialOptions = [
    'Norge',
    'Sverige',
    'Danmark',
    'Finland',
    'Island',
    'Storbritannia',
    'Tyskland',
    'Frankrike',
    'Spania',
    'Portugal',
    'Italia',
    'Hellas',
    'Kroatia',
    'Tyrkia',
]

const Example = () => {
    const [selectedOptions, setSelectedOptions] = useState([] as string[])

    return (
        <div>
            <UNSAFE_Combobox
                label="Hvilke land har du besøkt de siste 6 ukene? Velg opptil flere."
                isMultiSelect
                shouldAutocomplete
                shouldShowSelectedOptions={true}
                onToggleSelected={(option: string, isSelected: boolean) => {
                    if (isSelected) {
                        setSelectedOptions([...selectedOptions, option])
                    } else {
                        setSelectedOptions(selectedOptions.filter((o) => o !== option))
                    }
                }}
                selectedOptions={selectedOptions}
                options={initialOptions}
            />
        </div>
    )
}
