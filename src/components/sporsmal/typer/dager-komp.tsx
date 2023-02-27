import {BodyShort, Label, UNSAFE_DatePicker, UNSAFE_useDatepicker} from '@navikt/ds-react'
import dayjs from 'dayjs'
import React, {useState} from 'react'
import {Controller, useController, useFormContext, useWatch} from 'react-hook-form'

import {maaneder, sammeAar, sammeMnd} from '../../../utils/dato-utils'
import {tekst} from '../../../utils/tekster'
import FeilLokal from '../../feil/feil-lokal'
import {SpmProps} from '../sporsmal-form/sporsmal-form'
import {hentFeilmelding} from '../sporsmal-utils'
import validerDato from "../../../utils/sporsmal/valider-dato";
import validerLand from "../../../utils/sporsmal/valider-land";
import LandvelgerComponent from "../landvelger/landvelger";


const DagerKomp = ({sporsmal}: SpmProps) => {
    const {register, setValue, getValues} = useFormContext()
    const {
        formState: {errors},
    } = useFormContext()

    const [verdier, setVerdier] = useState(sporsmal.svarliste.svar.map((i) => new Date(i.verdi)))


    return (
        <>
            <Label as="h3" className="skjema__sporsmal">
                {sporsmal.sporsmalstekst}
            </Label>

            <div>


                <Controller
                    name={sporsmal.id}
                    render={({field}) => (
                        <UNSAFE_DatePicker.Standalone
                            mode="multiple"
                            fromDate={dayjs(sporsmal.min).toDate()}
                            toDate={dayjs(sporsmal.max).toDate()}
                            selected={verdier}
                            onSelect={(a) => {
                                setVerdier(a || [])
                                field.onChange(a)
                            }}
                        />
                    )}
                />


                <FeilLokal sporsmal={sporsmal}/>

            </div>
        </>
    )
}

export default DagerKomp
