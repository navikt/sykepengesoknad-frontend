import { DatePicker, Label, useDatepicker } from '@navikt/ds-react'
import React from 'react'
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { Controller } from 'react-hook-form'

import GuidepanelUnderSporsmalstekst from '../guidepanel/GuidepanelUnderSporsmalstekst'
import { SpmProps } from '../sporsmal-form/sporsmal-form'

const BehDager = ({ sporsmal }: SpmProps) => {
    dayjs.extend(weekOfYear)

    const minDate = dayjs(sporsmal.undersporsmal[0].min).toDate()
    const maxDate = dayjs(sporsmal.undersporsmal[sporsmal.undersporsmal.length - 1].max).toDate()

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
                            className="axe-exclude"
                            locale="nb"
                            selected={field.value}
                            mode="multiple"
                            fromDate={minDate}
                            toDate={maxDate}
                            disableWeekends={true}
                            onSelect={(date) => {
                                if (date) {
                                    const weekNrs = date.map((day) => dayjs(day).week())

                                    // om disse ikke er like er det mer enn en dag i samme uke som er valgt
                                    if (weekNrs.length === new Set(weekNrs).size) {
                                        field.onChange(date)
                                    } else {
                                        // tar vare på den nye dagen
                                        const nyDag = date.pop()
                                        // filtrerer ut alle dager som er i samme uke som den nye dagen
                                        const valgteDagerMinusDenISammeUkeSomNyDag = date.filter((dag) => {
                                            return dayjs(dag).week() !== dayjs(nyDag).week()
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
