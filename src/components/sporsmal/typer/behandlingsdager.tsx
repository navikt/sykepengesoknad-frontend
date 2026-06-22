import { DatePicker, Label } from '@navikt/ds-react'
import React from 'react'
import { getISOWeek } from 'date-fns'
import { Controller } from 'react-hook-form'

import GuidepanelUnderSporsmalstekst from '../guidepanel/GuidepanelUnderSporsmalstekst'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { tilLokalDatoFraDato } from '../../../utils/dato-utils'

import {
    fjernKalenderDato,
    finnEndringIValgteDatoer,
    tilLokalKalenderDato,
    tilLokalKalenderDatoFraStrengEllerStandard,
    tilOsloDato,
} from './kalender-dato-utils'

const ukeNummer = (dato: Date) => getISOWeek(tilLokalDatoFraDato(tilOsloDato(dato)))

const Behandlingsdager = ({ sporsmal }: SpmProps) => {
    const minDate = tilLokalKalenderDatoFraStrengEllerStandard(sporsmal.undersporsmal[0].min, '1900-01-01')
    const maxDate = tilLokalKalenderDatoFraStrengEllerStandard(
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

                                const nyDatoMedOsloTidssone = tilOsloDato(endring.dato)
                                const valgtUke = ukeNummer(nyDatoMedOsloTidssone)
                                const beholdteDatoer = tidligereValgteDatoer.filter(
                                    (tidligereDato) => ukeNummer(tidligereDato) !== valgtUke,
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
