import { DatePicker, Label } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React from 'react'
import { Controller } from 'react-hook-form'

import FeilLokal from '../../feil/feil-lokal'
import { SpmProps } from '../sporsmal-form/sporsmal-form'

const DagerKomp = ({ sporsmal }: SpmProps) => {
    const labelen = 'dager-kalender-label'
    return (
        <>
            <Label as="h3">{sporsmal.sporsmalstekst}</Label>

            <div className="dagerKalender axe-exclude">
                <Controller
                    name={sporsmal.id}
                    rules={{
                        validate: (value) => {
                            if (value.length === 0) {
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
                            fromDate={dayjs(sporsmal.min).toDate()}
                            toDate={dayjs(sporsmal.max).toDate()}
                            selected={field.value}
                            onSelect={(a) => {
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
