import React from 'react'
import { useForm } from 'react-hook-form'

import { TagTyper } from '../../../types/enums'
import FeilLokal from '../../feil/feil-lokal'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'

const CheckboxInput = ({ sporsmal }: SpmProps) => {
    const { formState: { errors }, register, watch } = useForm()
    const feilmelding = hentFeilmelding(sporsmal)
    const watchCheckbox = watch(sporsmal.id)

    if (sporsmal.tag === TagTyper.BEKREFT_OPPLYSNINGER_UTLAND_INFO) {
        return <CheckboxInput sporsmal={sporsmal.undersporsmal[0]} />
    }

    return (
        <>
            <div className={
                'bekreftCheckboksPanel' +
                (watchCheckbox ? ' bekreftCheckboksPanel--checked' : '') +
                (errors[sporsmal.id] ? ' skjemaelement__input--harFeil' : '')
            }>
                <div className="skjemaelement skjemaelement--horisontal">
                    <input type="checkbox"
                        className="skjemaelement__input checkboks"
                        id={sporsmal.id}
                        {...register(sporsmal.id, { required: feilmelding.global })}
                    />
                    <label className="skjemaelement__label" htmlFor={sporsmal.id}>
                        {sporsmal.sporsmalstekst}
                    </label>
                </div>
            </div>

            <FeilLokal sporsmal={sporsmal} />
        </>
    )
}

export default CheckboxInput
