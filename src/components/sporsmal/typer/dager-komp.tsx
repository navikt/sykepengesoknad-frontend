import {BodyShort, Label, UNSAFE_DatePicker, UNSAFE_useDatepicker} from '@navikt/ds-react'
import dayjs from 'dayjs'
import React from 'react'
import {useController, useFormContext, useWatch} from 'react-hook-form'

import {maaneder, sammeAar, sammeMnd} from '../../../utils/dato-utils'
import {tekst} from '../../../utils/tekster'
import FeilLokal from '../../feil/feil-lokal'
import {SpmProps} from '../sporsmal-form/sporsmal-form'
import {hentFeilmelding} from '../sporsmal-utils'
import validerDato from "../../../utils/sporsmal/valider-dato";


const DagerKomp = ({sporsmal}: SpmProps) => {
    const {register, setValue, getValues} = useFormContext()
    const {
        formState: {errors},
    } = useFormContext()

    const feilmelding = hentFeilmelding(sporsmal)
    let watchDager = useWatch({name: sporsmal.id})
    if (watchDager === undefined) {
        watchDager = getValues(sporsmal.id)
    }
    console.log(sporsmal)


    const min = dayjs(sporsmal.min!)
    const max = dayjs(sporsmal.max!)

    const {field} = useController({
        name: sporsmal.id,
        rules: {
            validate: (value) => {
                return true
            },
        },
    })

    const finnMinOgMax = () => {
        return {
            fromDate: dayjs(sporsmal.min).toDate(),
            toDate: dayjs(sporsmal.max).toDate(),
        }
    }
    const {datepickerProps, inputProps} = UNSAFE_useDatepicker({
        //...field,
        onDateChange: field.onChange,

        //defaultMonth: dayjs().toDate(),
        openOnFocus: false,
    })
    console.log(datepickerProps)

    return (
        <>
            <Label as="h3" className="skjema__sporsmal">
                {sporsmal.sporsmalstekst}
            </Label>

            <div>


                <div className="axe-exclude">
                    <UNSAFE_DatePicker.Standalone
                        mode="multiple"
                        {...finnMinOgMax()}
                        onSelect={console.log}
                    />

                </div>


                <FeilLokal sporsmal={sporsmal}/>

            </div>
        </>
    )
}

export default DagerKomp
