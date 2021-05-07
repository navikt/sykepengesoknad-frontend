import { Datepicker } from 'nav-datovelger'
import { Element } from 'nav-frontend-typografi'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { skalBrukeFullskjermKalender } from '../../../utils/browser-utils'
import { fraBackendTilDate } from '../../../utils/dato-utils'
import validerDato from '../../../utils/sporsmal/valider-dato'
import FeilLokal from '../../feil/feil-lokal'
import { hentSvar } from '../hent-svar'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'

const DatoInput = ({ sporsmal }: SpmProps) => {
    const { setValue, getValues, watch } = useFormContext()
    const watchDato = watch(sporsmal.id)

    return (
        <div className="dato-komp">
            <label className="skjema__sporsmal" htmlFor={sporsmal.id}>
                <Element>{sporsmal.sporsmalstekst}</Element>
            </label>
            <div className="on-top">
                <Controller
                    name={sporsmal.id}
                    defaultValue={hentSvar(sporsmal)}
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
                    render={({ name }) => (
                        <Datepicker
                            locale={'nb'}
                            inputId={name}
                            onChange={(value) => {
                                setValue(sporsmal.id, value)
                            }}
                            value={watchDato}
                            inputProps={{
                                name: name
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
            </div>

            <FeilLokal sporsmal={sporsmal} />

            <UndersporsmalListe oversporsmal={sporsmal} />
        </div>
    )
}

export default DatoInput
