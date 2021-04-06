import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'
import { FieldValues, useFormContext } from 'react-hook-form'

import { Sporsmal } from '../../../types/types'
import AnimateOnMount from '../../animate-on-mount'
import FeilLokal from '../../feil/feil-lokal'
import Vis from '../../vis'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'

const CheckboxKomp = ({ sporsmal }: SpmProps) => {
    const { errors } = useFormContext()

    return (
        <>
            <Vis hvis={sporsmal.sporsmalstekst !== null}>
                <Element tag="h3" className="skjema__sporsmal">{sporsmal.sporsmalstekst}</Element>
            </Vis>

            <div className={'skjemagruppe checkboxgruppe' + (errors[sporsmal.id] ? ' skjemagruppe--feil' : '')}>
                {sporsmal.undersporsmal.map((uspm, idx) => {
                    return <CheckboxSingle parent={sporsmal} sporsmal={uspm} key={idx} />
                })}

                <Vis hvis={sporsmal.undertekst}>
                    <Normaltekst tag="div"> {sporsmal.undertekst} </Normaltekst>
                </Vis>

                <FeilLokal sporsmal={sporsmal} />
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
    const { register, watch, getValues } = useFormContext()
    const watchCheck = watch(sporsmal.id)
    const feilmelding = hentFeilmelding(parent)

    const valider = () => {
        const valid = harValgtNoe(parent, getValues())
        const forsteCheckbox = parent.undersporsmal[0].id
        if (valid) {
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
