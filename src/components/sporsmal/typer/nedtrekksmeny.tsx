import { useFormContext } from 'react-hook-form'
import { Select } from '@navikt/ds-react'

import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { landlisteEøs, landlisteUtenforEøs } from '../landvelger/landliste'

const Nedtrekksmeny = ({ sporsmal }: SpmProps) => {
    const {
        formState: {},
    } = useFormContext()

    const alleLand = [...landlisteUtenforEøs, ...landlisteEøs].sort()
    return (
        <Select className="mt-4" label={sporsmal.sporsmalstekst}>
            <option value="">Velg land</option>
            {alleLand.map((land, index) => (
                <option key={index} value={land.toLowerCase()}>
                    {land}
                </option>
            ))}
        </Select>
    )
}

export default Nedtrekksmeny
