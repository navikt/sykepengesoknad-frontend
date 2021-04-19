import { Normaltekst } from 'nav-frontend-typografi'
import React from 'react'
import { FieldValues, useFormContext } from 'react-hook-form'

import { Sporsmal } from '../../../types/types'
import AnimateOnMount from '../../animate-on-mount'
import FeilLokal from '../../feil/feil-lokal'
import VisBlock from '../../vis-block'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import SporsmalstekstH3 from '../sporsmalstekst/sporsmalstekstH3'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'

const CheckboxKomp = ({ sporsmal }: SpmProps) => {
    const { errors } = useFormContext()

    return (
        <>
            <SporsmalstekstH3 sporsmal={sporsmal} />

            <div className={'skjemagruppe checkboxgruppe' + (errors[sporsmal.undersporsmal[0].id] ? ' skjemagruppe--feil' : '')}>
                {sporsmal.undersporsmal.map((uspm, idx) => {
                    return <CheckboxSingle parent={sporsmal} sporsmal={uspm} key={idx} />
                })}

                <VisBlock hvis={sporsmal.undertekst}
                    render={() =>
                        <Normaltekst tag="div"> {sporsmal.undertekst} </Normaltekst>
                    }
                />

                <FeilLokal sporsmal={sporsmal.undersporsmal[0]} />
            </div>
        </>
    )
}

export default CheckboxKomp

interface CheckboxProps {
    parent: Sporsmal;
}

type AllProps = SpmProps & CheckboxProps

const CheckboxSingle = ({ parent, sporsmal }: AllProps) => {
    const { register, watch, getValues, clearErrors } = useFormContext()
    const watchCheck = watch(sporsmal.id)
    const feilmelding = hentFeilmelding(parent)

    const valider = () => {
        const valid = harValgtNoe(parent, getValues())
        const forsteCheckbox = parent.undersporsmal[0].id
        if (valid) {
            clearErrors(forsteCheckbox)
            return true
        }
        // For å bare vise feilmeldingen en gang
        if (forsteCheckbox === sporsmal.id) {
            return feilmelding.global
        } else {
            return true
        }
    }

    return (
        <div className="checkboksContainer">
            <input type="checkbox"
                id={sporsmal.id}
                name={sporsmal.id}
                ref={register({ validate: () => valider() })}
                className="skjemaelement__input checkboks"
            />
            <label className="skjemaelement__label" htmlFor={sporsmal.id}>
                {sporsmal.sporsmalstekst}
            </label>

            <AnimateOnMount
                mounted={watchCheck}
                enter="undersporsmal--vis"
                leave="undersporsmal--skjul"
                start="undersporsmal"
            >
                <UndersporsmalListe oversporsmal={sporsmal} oversporsmalSvar={watchCheck ? 'CHECKED' : ''} />
            </AnimateOnMount>
        </div>
    )
}

const harValgtNoe = (parent: Sporsmal, values: FieldValues): boolean => {
    return parent.undersporsmal.filter(uspm => {
        return values[uspm.id]
    }).length > 0
}
