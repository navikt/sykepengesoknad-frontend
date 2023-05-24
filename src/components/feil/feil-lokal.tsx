import { BodyShort } from '@navikt/ds-react'
import React from 'react'
import { useFormContext } from 'react-hook-form'

import { Sporsmal } from '../../types/types'
import { hentFeilmelding } from '../sporsmal/sporsmal-utils'
import Vis from '../vis'

interface FeilProps {
    sporsmal: Sporsmal
}

const FeilLokal = ({ sporsmal }: FeilProps) => {
    const {
        formState: { errors },
    } = useFormContext()
    const feilmelding = hentFeilmelding(sporsmal, errors[sporsmal.id])

    return (
        <div role="alert" aria-live="assertive">
            <Vis
                hvis={errors[sporsmal.id]}
                render={() => (
                    <BodyShort as="span" className={'mt-2 block font-bold text-surface-danger'} data-cy="feil-lokal">
                        {feilmelding.lokal}
                    </BodyShort>
                )}
            />
        </div>
    )
}

export default FeilLokal
