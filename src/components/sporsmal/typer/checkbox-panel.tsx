import React, { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { TagTyper } from '../../../types/enums'
import FeilLokal from '../../feil/feil-lokal'
import { hentSvar } from '../hent-svar'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'

const CheckboxInput = ({ sporsmal }: SpmProps) => {
    const { register, setValue, errors } = useFormContext()

    const bekreft = useRef<HTMLDivElement>(null)
    const [ classname, setClassname ] = useState<string>('bekreftCheckboksPanel')
    const feilmelding = hentFeilmelding(sporsmal)

    useEffect(() => {
        const svar = hentSvar(sporsmal)
        setValue(sporsmal.id, svar)
        setClassname(getClassName(svar === 'CHECKED'))
        // eslint-disable-next-line
    }, [ sporsmal, setValue, setClassname ])

    const handleChange = (evt: any) => {
        bekreft.current!.classList.toggle('bekreftCheckboksPanel--checked')
        setClassname(getClassName(evt.target.checked))
    }

    const getClassName = (checked: boolean) => {
        const cls = 'bekreftCheckboksPanel'
        const err = errors[sporsmal.id] ? ' skjemaelement__input--harFeil' : ''
        const all = checked ? cls + ' ' + cls + '--checked' : cls
        return all + err
    }

    if (sporsmal.tag === TagTyper.BEKREFT_OPPLYSNINGER_UTLAND_INFO) {
        return (
            <CheckboxInput sporsmal={sporsmal.undersporsmal[0]} />
        )
    }
    return (
        <>
            <div className={classname} ref={bekreft}>
                <div className="skjemaelement skjemaelement--horisontal">
                    <input type="checkbox"
                        className="skjemaelement__input checkboks"
                        name={sporsmal.id}
                        id={sporsmal.id}
                        onChange={handleChange}
                        ref={register({ required: feilmelding.global })}
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
