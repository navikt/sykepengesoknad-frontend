import { Element } from 'nav-frontend-typografi'
import React, { MouseEvent, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { RSSvartype } from '../../../types/rs-types/rs-svartype'
import { Sporsmal } from '../../../types/types'
import AnimateOnMount from '../../animate-on-mount'
import FeilLokal from '../../feil/feil-lokal'
import Vis from '../../vis'
import { hentSvar } from '../hent-svar'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'

export interface RadioUnderKompProps {
    selectedOption: string;
    uspm: Sporsmal;
    idx: number;
    sporsmal: Sporsmal;
    handleOptionChange: (e: MouseEvent) => void;
}

const RadioKomp = ({ sporsmal }: SpmProps) => {
    const { register, setValue, watch } = useFormContext()
    const watchRadio = watch(sporsmal.id)
    const feilmelding = hentFeilmelding(sporsmal)

    useEffect(() => {
        setValue(sporsmal.id, hentSvar(sporsmal))
    }, [ sporsmal, setValue ])

    return (
        <>
            <Vis hvis={sporsmal.sporsmalstekst !== null}>
                <Element tag="h3" className="skjema__sporsmal">{sporsmal.sporsmalstekst}</Element>
            </Vis>

            <div className={erHorisontal(sporsmal.svartype)
                ? 'skjemaelement skjemaelement--horisontal'
                : 'skjemaelement'}
            >
                {sporsmal.undersporsmal.map((uspm, idx) => {
                    const checked = watchRadio === uspm.sporsmalstekst

                    return (
                        <div className="radioContainer" key={idx}>
                            <input type="radio"
                                id={uspm.id}
                                name={sporsmal.id}
                                value={uspm.sporsmalstekst}
                                ref={register({ required: feilmelding.global })}
                                className="skjemaelement__input radioknapp"
                            />
                            <label className="skjemaelement__label" htmlFor={uspm.id}>
                                {uspm.sporsmalstekst}
                            </label>

                            <AnimateOnMount
                                mounted={checked}
                                enter="undersporsmal--vis"
                                leave="undersporsmal--skjul"
                                start="undersporsmal"
                            >
                                <UndersporsmalListe oversporsmal={uspm} oversporsmalSvar={checked ? 'CHECKED' : ''} />
                            </AnimateOnMount>
                        </div>
                    )
                })}
            </div>

            <FeilLokal sporsmal={sporsmal} />
        </>
    )
}

export default RadioKomp

export const erHorisontal = (svartype: RSSvartype) => {
    return svartype === RSSvartype.RADIO_GRUPPE_TIMER_PROSENT
}
