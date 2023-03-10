import { json } from 'stream/consumers'

import { Label, UNSAFE_DatePicker, UNSAFE_useDatepicker } from '@navikt/ds-react'
import React, { useState } from 'react'
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { Controller } from 'react-hook-form'

import FeilLokal from '../../feil/feil-lokal'
import GuidepanelUnderSporsmalstekst from '../guidepanel/GuidepanelUnderSporsmalstekst'
import { SpmProps } from '../sporsmal-form/sporsmal-form'

import BehandlingsUke from './behandlings-uke'

const BehDager = ({ sporsmal }: SpmProps) => {
    const [selectedDays, setSelectedDays] = useState<Date[]>([])
    const [selectedWeekNumbers, setSelectedNumbers] = useState<number[]>([])
    function setHasError(arg0: boolean) {
        throw new Error('Function not implemented.')
    }



    // todo det er et problem her knyttet til forskyvning av tidligste dato (tidssone?)
    const earliestDate = dayjs(sporsmal.undersporsmal[0].min).toDate()
    const latestDate = dayjs(sporsmal.undersporsmal[sporsmal.undersporsmal.length - 1].max).toDate()

    dayjs.extend(weekOfYear)
    dayjs.extend(weekOfYear)

    const minDate = earliestDate
    const maxDate = latestDate

    const { datepickerProps, inputProps, selectedDay } = UNSAFE_useDatepicker({
        fromDate: minDate,
        toDate: maxDate,
        openOnFocus: false,
    })

    return (
        <>
            <Label as="h2" className="skjema__sporsmal">
                {sporsmal.sporsmalstekst}
            </Label>

            <GuidepanelUnderSporsmalstekst sporsmal={sporsmal} />

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
                    <>

                        <UNSAFE_DatePicker.Standalone
                            {...inputProps}
                            selected={field.value}
                            mode="multiple"
                            fromDate={minDate}
                            toDate={maxDate}
                            disableWeekends={true}
                            onSelect={(date) => {
                                if (date) {
                                    // todo det kan være at denne lar den siste dagen ligge igjen
                                    const weekNrs = date.map((day) => dayjs(day).week())
                                    if (weekNrs.length === new Set(weekNrs).size) {
                                        field.onChange(date)
                                    } else {
                                        const nyDag = date.pop()
                                        const valgteDagerMinusDenISammeUkeSomNyDag = date.filter((dag) => {
                                            return dayjs(dag).week() !== dayjs(nyDag).week()
                                        })
                                        if (nyDag) {
                                            valgteDagerMinusDenISammeUkeSomNyDag.push(nyDag)
                                        }
                                        field.onChange(valgteDagerMinusDenISammeUkeSomNyDag)
                                    }
                                }
                            }}
                        ></UNSAFE_DatePicker.Standalone>
                    </>
                )}
            />

            <FeilLokal sporsmal={sporsmal} />
        </>
    )
}

export default BehDager
