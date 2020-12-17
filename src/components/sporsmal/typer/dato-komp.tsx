import { Datepicker } from 'nav-datovelger'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { fraBackendTilDate } from '../../../utils/dato-utils'
import validerDato from '../../../utils/sporsmal/valider-dato'
import Vis from '../../vis'
import { hentSvar } from '../hent-svar'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'

const DatoInput = ({ sporsmal }: SpmProps) => {
    const { setValue, errors, watch, getValues } = useFormContext()
    const feilmelding = hentFeilmelding(sporsmal)
    const [ dato, setDato ] = useState<string>('')

    useEffect(() => {
        const svar = hentSvar(sporsmal)
        setValue(sporsmal.id, svar)
        setDato(svar)
        // eslint-disable-next-line
    }, [sporsmal]);

    return (
        <div>
            <label className="skjema__sporsmal" htmlFor={sporsmal.id}>
                <Element>{sporsmal.sporsmalstekst}</Element>
            </label>
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
                        inputId={ name }
                        onChange={(value) => {
                            setValue(sporsmal.id ,value)
                            setDato(value)
                        }}
                        value={dato}
                        inputProps={{
                            name: name
                        }}
                        calendarSettings={{ showWeekNumbers: true }}
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

            <Normaltekst tag="div" role="alert" aria-live="assertive" className="skjemaelement__feilmelding">
                <Vis hvis={errors[sporsmal.id]}>
                    <p>{feilmelding.lokal}</p>
                </Vis>
            </Normaltekst>

            <div className="undersporsmal">
                <Vis hvis={watch(sporsmal.id)}>
                    <UndersporsmalListe oversporsmal={sporsmal} />
                </Vis>
            </div>
        </div>
    )
}

export default DatoInput
