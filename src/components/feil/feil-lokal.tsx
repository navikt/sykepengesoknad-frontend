import { Normaltekst } from 'nav-frontend-typografi'
import React from 'react'
import { useForm } from 'react-hook-form'

import { Sporsmal } from '../../types/types'
import { hentFeilmelding } from '../sporsmal/sporsmal-utils'
import Vis from '../vis'

interface FeilProps {
    sporsmal: Sporsmal;
}

const FeilLokal = ({ sporsmal }: FeilProps) => {
    const { formState: { errors } } = useForm()
    const feilmelding = hentFeilmelding(sporsmal, errors[sporsmal.id])

    return (
        <div role="alert" aria-live="assertive">
            <Vis hvis={errors[sporsmal.id]}
                render={() =>
                    <Normaltekst tag="span" className="skjemaelement__feilmelding">
                        {feilmelding.lokal}
                    </Normaltekst>
                }
            />
        </div>
    )
}

export default FeilLokal
