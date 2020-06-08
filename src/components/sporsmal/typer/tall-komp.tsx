import { Element, Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import validerArbeidsgrad from '../../../utils/sporsmal/valider-arbeidsgrad'
import { getLedetekst, tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import { hentSvar } from '../hent-svar'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'

const TallInput = ({ sporsmal }: SpmProps) => {
    const feilmelding = hentFeilmelding(sporsmal)
    const [ lokal, setLokal ] = useState<string>(hentSvar(sporsmal))
    const { register, setValue, errors } = useFormContext()
    const undersporsmal = useRef<HTMLDivElement>(null)
    const [ kalkulerGrad ] = validerArbeidsgrad(sporsmal)

    const onChange = (e: any) => {
        const value = e.target.value
        setValue(sporsmal.id, value)
        setLokal(value)
        // eslint-disable-next-line
        console.log(kalkulerGrad(sporsmal))
    }

    useEffect(() => {
        setValue(sporsmal.id, hentSvar(sporsmal))
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Vis hvis={sporsmal.sporsmalstekst !== null}>
                <Element tag='h3' className='skjema__sporsmal'>{sporsmal.sporsmalstekst}</Element>
            </Vis>

            <div className='medEnhet'>
                <input type='number'
                    className='skjemaelement__input input--xs'
                    name={sporsmal.id}
                    id={sporsmal.id}
                    min={sporsmal.min}
                    max={sporsmal.max}
                    ref={register({
                        required: feilmelding.global,
                        min: {
                            value: sporsmal.min,
                            message: getLedetekst(tekst('soknad.feilmelding.TALL_MIN_MAX'),
                                { '%MIN%': sporsmal.min, '%MAX%': sporsmal.max })
                        },
                        max: {
                            value: sporsmal.max,
                            message: getLedetekst(tekst('soknad.feilmelding.TALL_MIN_MAX'),
                                { '%MIN%': sporsmal.min, '%MAX%': sporsmal.max }
                            )
                        }
                    })}
                    step={0.1}
                    onChange={onChange}
                    autoComplete='off'
                />
                <label className='medEnhet__enhet' htmlFor={sporsmal.id}>{sporsmal.undertekst}</label>
            </div>

            <div role='alert' aria-live='assertive' className='skjemaelement__feilmelding'>
                <Vis hvis={errors[sporsmal.id]}>
                    <Normaltekst tag='span'>
                        <p>{feilmelding.lokal}</p>
                    </Normaltekst>
                </Vis>
            </div>

            <div className='undersporsmal' ref={undersporsmal}>
                <Vis hvis={lokal}>
                    <UndersporsmalListe undersporsmal={sporsmal.undersporsmal} />
                </Vis>
            </div>
        </>
    )
}

export default TallInput
