import { DatePicker, Label, useDatepicker } from '@navikt/ds-react'
import React from 'react'
import { getISOWeek } from 'date-fns'
import { Controller } from 'react-hook-form'

import GuidepanelUnderSporsmalstekst from '../guidepanel/GuidepanelUnderSporsmalstekst'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { toDate } from '../../../utils/dato-utils'

const BehDager = ({ sporsmal }: SpmProps) => {
    const minDate = toDate(sporsmal.undersporsmal[0].min!)
    const maxDate = toDate(sporsmal.undersporsmal[sporsmal.undersporsmal.length - 1].max!)

    const { inputProps } = useDatepicker()

    return (
        <>
            <Label as="h2">{sporsmal.sporsmalstekst}</Label>

            <GuidepanelUnderSporsmalstekst sporsmal={sporsmal} />

            <Controller
                name={sporsmal.id}
                render={({ field }) => (
                    <>
                        <DatePicker.Standalone
                            {...inputProps}
                            locale="nb"
                            selected={field.value}
                            mode="multiple"
                            fromDate={minDate}
                            toDate={maxDate}
                            disableWeekends={true}
                            onSelect={(date) => {
                                if (date) {
                                    const weekNrs = date.map((day) => getISOWeek(day))

                                    // om disse ikke er like er det mer enn en dag i samme uke som er valgt
                                    if (weekNrs.length === new Set(weekNrs).size) {
                                        field.onChange(date)
                                    } else {
                                        // tar vare på den nye dagen
                                        const nyDag = date.pop()
                                        // filtrerer ut alle dager som er i samme uke som den nye dagen
                                        const valgteDagerMinusDenISammeUkeSomNyDag = date.filter((dag) => {
                                            return getISOWeek(dag) !== getISOWeek(nyDag!)
                                        })

                                        // legger den nye dagen tilbake
                                        if (nyDag) {
                                            valgteDagerMinusDenISammeUkeSomNyDag.push(nyDag)
                                        }
                                        field.onChange(valgteDagerMinusDenISammeUkeSomNyDag)
                                    }
                                }
                            }}
                        ></DatePicker.Standalone>
                    </>
                )}
            />
        </>
    )
}

export default BehDager
