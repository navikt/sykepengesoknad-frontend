import { DatePicker, Label } from '@navikt/ds-react'
import React from 'react'
import { getISOWeek } from 'date-fns'
import { Controller } from 'react-hook-form'

import GuidepanelUnderSporsmalstekst from '../guidepanel/GuidepanelUnderSporsmalstekst'
import { SpmProps } from '../sporsmal-form/sporsmal-form'

import { tilOsloKalenderDatoFraDato } from './kalender-dato-utils'
import {
    finnEndringIValgteDatoer,
    fjernKalenderDato,
    tilLokalKalenderDato,
    tilLokalKalenderDatoEllerStandard,
} from './kalender-dato-utils'

const Behandlingsdager = ({ sporsmal }: SpmProps) => {
    const minDate = tilLokalKalenderDatoEllerStandard(sporsmal.undersporsmal[0].min, '1900-01-01')
    const maxDate = tilLokalKalenderDatoEllerStandard(
        sporsmal.undersporsmal[sporsmal.undersporsmal.length - 1].max,
        '2100-01-01',
    )

    return (
        <>
            <Label as="h2">{sporsmal.sporsmalstekst}</Label>

            <GuidepanelUnderSporsmalstekst sporsmal={sporsmal} />

            <Controller
                name={sporsmal.id}
                render={({ field }) => (
                    <>
                        <DatePicker.Standalone
                            locale="nb"
                            selected={field.value?.map(tilLokalKalenderDato)}
                            mode="multiple"
                            fromDate={minDate}
                            toDate={maxDate}
                            disableWeekends={true}
                            onSelect={(datoerFraKalender) => {
                                if (!datoerFraKalender) return

                                const tidligereValgteDatoer: Date[] = field.value ?? []
                                const endring = finnEndringIValgteDatoer(datoerFraKalender, tidligereValgteDatoer)
                                if (endring.type === 'avvalgt') {
                                    field.onChange(fjernKalenderDato(tidligereValgteDatoer, endring.dato))
                                    return
                                }
                                if (endring.type === 'ingen') return

                                const nyDatoMedOsloTidssone = tilOsloKalenderDatoFraDato(endring.dato)
                                const valgtUke = getISOWeek(nyDatoMedOsloTidssone)
                                const beholdteDatoer = tidligereValgteDatoer.filter(
                                    (tidligereDato) => getISOWeek(tidligereDato) !== valgtUke,
                                )

                                field.onChange([...beholdteDatoer, nyDatoMedOsloTidssone])
                            }}
                        ></DatePicker.Standalone>
                    </>
                )}
            />
        </>
    )
}

export default Behandlingsdager
