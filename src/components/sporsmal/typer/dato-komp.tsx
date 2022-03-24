import { Label } from '@navikt/ds-react'
import { Datepicker } from 'nav-datovelger'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { skalBrukeFullskjermKalender } from '../../../utils/browser-utils'
import { fraBackendTilDate } from '../../../utils/dato-utils'
import validerDato from '../../../utils/sporsmal/valider-dato'
import FeilLokal from '../../feil/feil-lokal'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'

const DatoInput = ({ sporsmal }: SpmProps) => {
    const { getValues } = useFormContext()

    return (
        <div className="dato-komp">
            <label className="skjema__sporsmal" htmlFor={sporsmal.id}>
                <Label>{sporsmal.sporsmalstekst}</Label>
            </label>
            <Controller
                name={sporsmal.id}
                rules={{
                    validate: () => {
                        const div: HTMLDivElement | null = document.querySelector('.nav-datovelger__input')
                        const detteFeilet = validerDato(sporsmal, getValues())
                        if (detteFeilet !== true) {
                            div?.classList.add('skjemaelement__input--harFeil')
                            return detteFeilet
                        }
                        div?.classList.remove('skjemaelement__input--harFeil')
                        return true
                    }
                }}
                render={({ field }) => (
                    <Datepicker
                        locale="nb"
                        inputId={field.name}
                        onChange={field.onChange}
                        value={field.value}
                        inputProps={{
                            name: field.name
                        }}
                        calendarSettings={{
                            showWeekNumbers: true,
                            position: skalBrukeFullskjermKalender()
                        }}
                        showYearSelector={false}
                        limitations={{
                            weekendsNotSelectable: false,
                            minDate: sporsmal.min || undefined,
                            maxDate: sporsmal.max || undefined
                        }}
                        dayPickerProps={{
                            initialMonth: fraBackendTilDate(sporsmal.max!)
                        }}
                    />
                )}
            />

            <FeilLokal sporsmal={sporsmal} />

            <div aria-live="assertive" className="undersporsmal">
                <UndersporsmalListe oversporsmal={sporsmal} />
            </div>
        </div>
    )
}

export default DatoInput
