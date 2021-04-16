import { Normaltekst } from 'nav-frontend-typografi'
import React from 'react'
import { useFormContext } from 'react-hook-form'

import { Sporsmal } from '../../types/types'
import { hentFeilmelding } from '../sporsmal/sporsmal-utils'
import VisBlock from '../vis-block'

interface FeilProps {
    sporsmal: Sporsmal;
}

const FeilLokal = ({ sporsmal }: FeilProps) => {
    const { errors } = useFormContext()
    const feilmelding = hentFeilmelding(sporsmal, errors[sporsmal.id])

    return (
        <div role="alert" aria-live="assertive">
            <VisBlock hvis={errors[sporsmal.id]}
                render={() => {
                    return (
                        <Normaltekst tag="span" className="skjemaelement__feilmelding">
                            {feilmelding.lokal}
                        </Normaltekst>
                    )
                }}
            />
        </div>
    )
}

export default FeilLokal
