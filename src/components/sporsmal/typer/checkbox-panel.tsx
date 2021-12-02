import { Normaltekst } from 'nav-frontend-typografi'
import React from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { TagTyper } from '../../../types/enums'
import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'

const CheckboxInput = ({ sporsmal }: SpmProps) => {
    const { register, formState: { errors } } = useFormContext()
    const feilmelding = hentFeilmelding(sporsmal)
    const watchCheckbox = useWatch({ name: sporsmal.id })

    if (sporsmal.tag === TagTyper.BEKREFT_OPPLYSNINGER_UTLAND_INFO) {
        return <CheckboxInput sporsmal={sporsmal.undersporsmal[0]} />
    }

    const lokalFeilmelding = () => {
        switch (sporsmal.tag) {
            case TagTyper.ANSVARSERKLARING:
                return tekst('soknad.feilmelding.ANSVARSERKLARING')
            case TagTyper.BEKREFT_OPPLYSNINGER:
                return tekst('soknad.feilmelding.BEKREFT_OPPLYSNINGER')
            case TagTyper.BEKREFT_OPPLYSNINGER_UTLAND:
                return tekst('soknad.feilmelding.BEKREFT_OPPLYSNINGER_UTLAND')
            default:
                return feilmelding.lokal
        }
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

            <div role="alert" aria-live="assertive">
                <Vis hvis={errors[sporsmal.id]}
                    render={() =>
                        <Vis hvis={errors[sporsmal.id]?.type !== 'validate'}
                            render={() =>
                                <Normaltekst tag="span" className="skjemaelement__feilmelding">
                                    { lokalFeilmelding() }
                                </Normaltekst>
                            }
                        />
                    }
                />
            </div>
        </>
    )
}

export default CheckboxInput
