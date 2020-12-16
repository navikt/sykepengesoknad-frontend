import { Datepicker } from 'nav-datovelger'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import Vis from '../../vis'
import { hentSvar } from '../hent-svar'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'

const DatoInput = ({ sporsmal }: SpmProps) => {
    const { setValue, errors, watch } = useFormContext()
    const feilmelding = hentFeilmelding(sporsmal)
    const [ dato, setDato ] = useState<string>('')

    useEffect(() => {
        const svar = hentSvar(sporsmal)
        setValue(sporsmal.id, svar)
        setDato(svar)
        // eslint-disable-next-line
    }, [sporsmal]);

    useEffect(() => {
        // eslint-disable-next-line
    }, [errors[sporsmal.id]]);

    return (
        <div>
            <label className="skjema__sporsmal" htmlFor={'input' + sporsmal.id}>
                <Element>{sporsmal.sporsmalstekst}</Element>
            </label>
            <Controller
                name={sporsmal.id}
                defaultValue={hentSvar(sporsmal)}
                rules={{
                    validate: () => {
                        const div: HTMLDivElement | null = document.querySelector('.nav-datovelger__input')
                        // 2020-01-20 //
                        if (dato === '' || !dato.match(RegExp('\\d{4}-\\d{2}-\\d{2}'))) {
                            div?.classList.add('skjemaelement__input--harFeil')
                            return feilmelding.global
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
                            minDate: sporsmal.min!,
                            maxDate: sporsmal.max!
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
