import { Label, UNSAFE_DatePicker as DatePicker } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form'

import FeilLokal from '../../feil/feil-lokal'
import { SpmProps } from '../sporsmal-form/sporsmal-form'

const DagerKomp = ({ sporsmal }: SpmProps) => {
    const [verdier, setVerdier] = useState(sporsmal.svarliste.svar.map((i) => new Date(i.verdi)))

    return (
        <>
            <Label as="h3" className="skjema__sporsmal">
                {sporsmal.sporsmalstekst}
            </Label>

            <div className={'dagerKalender'}>
                <Controller
                    name={sporsmal.id}
                    rules={{
                        validate: () => {
                            if (verdier.length === 0) {
                                return 'Du må oppgi hvilke dager du brukte bil'
                            }
                            return true
                        },
                    }}
                    render={({ field }) => (
                        <DatePicker.Standalone
                            mode="multiple"
                            fromDate={dayjs(sporsmal.min).toDate()}
                            toDate={dayjs(sporsmal.max).toDate()}
                            selected={verdier}
                            onSelect={(a) => {
                                setVerdier(a || [])
                                field.onChange(a)
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
