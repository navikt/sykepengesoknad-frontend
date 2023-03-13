import { Label, UNSAFE_DatePicker, UNSAFE_useDatepicker } from '@navikt/ds-react'
import React from 'react'
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { Controller } from 'react-hook-form'

import FeilLokal from '../../feil/feil-lokal'
import GuidepanelUnderSporsmalstekst from '../guidepanel/GuidepanelUnderSporsmalstekst'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
// import { fraBackendTilDate } from '../../../utils/dato-utils'

const BehDager = ({ sporsmal }: SpmProps) => {
    dayjs.extend(weekOfYear)

    const minDate = dayjs(sporsmal.undersporsmal[0].min).toDate()
    const maxDate = dayjs(sporsmal.undersporsmal[sporsmal.undersporsmal.length - 1].max).toDate()

    const { inputProps } = UNSAFE_useDatepicker({
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
                            locale="nb"
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
