import { Element, Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'
import { FieldValues, useFormContext } from 'react-hook-form'

import { useAppStore } from '../../../data/stores/app-store'
import { Sporsmal } from '../../../types/types'
import AnimateOnMount from '../../animate-on-mount'
import Vis from '../../vis'
import { hentSvar } from '../hent-svar'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'

const CheckboxKomp = ({ sporsmal }: SpmProps) => {
    const { errors } = useFormContext()
    const feilmelding = hentFeilmelding(sporsmal)
    const { validCheck } = useAppStore()

    return (
        <>
            <div>
                <Vis hvis={sporsmal.sporsmalstekst !== null}>
                    <Element tag='h3' className='skjema__sporsmal'>{sporsmal.sporsmalstekst}</Element>
                </Vis>

                <div className={'skjemagruppe checkboxgruppe' + (errors[sporsmal.id] ? ' skjemagruppe--feil' : '')}>
                    {sporsmal.undersporsmal.map((uspm, idx) => {
                        return <CheckboxSingle parent={sporsmal} sporsmal={uspm} key={idx} />
                    })}

                    <Normaltekst tag='div' role='alert' aria-live='assertive' className='skjemaelement__feilmelding'>
                        <Vis hvis={Object.entries(errors).length > 0 && !validCheck}>
                            <p>{feilmelding['lokal']}</p>
                        </Vis>
                    </Normaltekst>
                </div>
            </div>
        </>
    )
}

export default CheckboxKomp

interface CheckboxProps {
    parent: Sporsmal;
}

type AllProps = SpmProps & CheckboxProps;

const CheckboxSingle = ({ parent, sporsmal }: AllProps) => {
    const { register, setValue, watch, getValues, clearError } = useFormContext()
    const feilmelding = hentFeilmelding(parent)
    const { setValidCheck } = useAppStore()
    const [ lokal, setLokal ] = useState<string>(hentSvar(sporsmal))

    useEffect(() => {
        const svar = hentSvar(sporsmal)
        setValue(sporsmal.id, svar === 'CHECKED' ? 'true' : '')
        // eslint-disable-next-line
    }, [sporsmal]);

    const valider = () => {
        const valid = harValgtNoe(parent, getValues())
        const fields: string[] = parent.undersporsmal.map(spm => spm.id)
        if (!valid) {
            fields.shift()
        }
        clearError(fields)
        setValidCheck(valid)
        return valid ? valid : feilmelding.global
    }

    const mounted = watch(sporsmal.id)

    return (
        <div className='checkboksContainer'>
            <input type='checkbox'
                id={sporsmal.id}
                name={sporsmal.id}
                onChange={(e) => {
                    setLokal(e.target.checked ? 'CHECKED' : '')
                }}
                ref={register({ validate: () => valider() })}
                className='skjemaelement__input checkboks'
            />
            <label className='skjemaelement__label' htmlFor={sporsmal.id}>
                {sporsmal.sporsmalstekst}
            </label>

            <AnimateOnMount
                mounted={mounted}
                enter='undersporsmal--vis'
                leave='undersporsmal--skjul'
                start='undersporsmal'
            >
                <UndersporsmalListe oversporsmal={sporsmal} oversporsmalSvar={lokal} />
            </AnimateOnMount>
        </div>
    )
}

const harValgtNoe = (parent: Sporsmal, values: FieldValues): boolean => {
    return parent.undersporsmal.filter(uspm => {
        return values[uspm.id]
    }).length > 0
}
