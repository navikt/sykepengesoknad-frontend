import { DatePicker, Label } from '@navikt/ds-react'
import React from 'react'
import { Controller } from 'react-hook-form'

import FeilLokal from '../../feil/feil-lokal'
import { SpmProps } from '../sporsmal-form/sporsmal-form'

import { tilLokalKalenderDato, tilLokalKalenderDatoEllerStandard, tilOsloDato } from './kalender-dato-utils'

const DagerKomp = ({ sporsmal }: SpmProps) => {
    const labelen = 'dager-kalender-label'
    const minDato = tilLokalKalenderDatoEllerStandard(sporsmal.min, '1900-01-01')
    const maxDato = tilLokalKalenderDatoEllerStandard(sporsmal.max, '2100-01-01')

    return (
        <>
            <Label as="h3">{sporsmal.sporsmalstekst}</Label>

            <div className="dagerKalender axe-exclude">
                <Controller
                    name={sporsmal.id}
                    rules={{
                        validate: (value) => {
                            if (!value || value.length === 0) {
                                return 'Du må oppgi hvilke dager du brukte bil'
                            }
                            return true
                        },
                    }}
                    render={({ field }) => (
                        <DatePicker.Standalone
                            mode="multiple"
                            aria-describedby={labelen}
                            fixedWeeks={false}
                            fromDate={minDato}
                            toDate={maxDato}
                            selected={field.value?.map(tilLokalKalenderDato)}
                            onSelect={(datoerFraKalender) => {
                                field.onChange((datoerFraKalender ?? []).map(tilOsloDato))
                            }}
                        />
                    )}
                />
                <FeilLokal sporsmal={sporsmal} />
            </div>
        </>
    )
}

export default DagerKomp
