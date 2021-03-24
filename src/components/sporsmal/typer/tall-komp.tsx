import { Element, Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { TagTyper } from '../../../types/enums'
import { RSSvartype } from '../../../types/rs-types/rs-svartype'
import validerArbeidsgrad from '../../../utils/sporsmal/valider-arbeidsgrad'
import { getLedetekst, tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import { hentSvar } from '../hent-svar'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'

const TallKomp = ({ sporsmal }: SpmProps) => {
    const feilmelding = hentFeilmelding(sporsmal)
    const [ lokal, setLokal ] = useState<string>(hentSvar(sporsmal))
    const { register, setValue, errors, getValues } = useFormContext()
    const undersporsmal = useRef<HTMLDivElement>(null)
    const { validerGrad, periode, hovedSporsmal } = validerArbeidsgrad(sporsmal)

    const onChange = (e: any) => {
        const value = e.target.value
        setValue(sporsmal.id, value)
        setLokal(value)
    }

    const valider = () => {
        if (validerGrad) {
            if (![ TagTyper.JOBBET_DU_GRADERT, TagTyper.JOBBET_DU_100_PROSENT ].includes(hovedSporsmal!.tag)) {
                return true // hopp over validering dersom det ikke er spørsmål av denne typen
            }

            if (sporsmal.tag !== TagTyper.HVOR_MYE_TIMER_VERDI) {
                return true
            }

            const values = getValues()

            return validerGrad(values)
        } else {
            return true
        }
    }

    const className = () => {
        if (!sporsmal.parentKriterie) return ''
        if (sporsmal.tag === TagTyper.KM_HJEM_JOBB ||
            sporsmal.tag === TagTyper.OFFENTLIG_TRANSPORT_BELOP
        ) {
            return `kriterie--${sporsmal.parentKriterie.toLowerCase()} skjemaelement`
        }
        return 'skjemaelement'
    }

    const inputSize = () => {
        switch (sporsmal.svartype) {
            case RSSvartype.PROSENT:
            case RSSvartype.TALL:
                return ' input--xs'
            default:
                return ' input--s'
        }
    }

    const step = () => {
        switch (sporsmal.svartype) {
            case RSSvartype.PROSENT:
            case RSSvartype.BELOP:
                return 1
            case RSSvartype.KILOMETER:
                return 0.1
            default:
                return 0.05
        }
    }

    useEffect(() => {
        setValue(sporsmal.id, hentSvar(sporsmal))
        // eslint-disable-next-line
    }, [])


    return (
        <div className={className()}>
            <Vis hvis={sporsmal.sporsmalstekst}>
                <Element tag="h3" className="skjema__sporsmal">{sporsmal.sporsmalstekst}</Element>
            </Vis>

            <div className="medEnhet">
                <input type="number"
                    className={'skjemaelement__input' + inputSize()}
                    name={sporsmal.id}
                    id={sporsmal.id}
                    value={lokal}
                    min={sporsmal.min!}
                    max={sporsmal.max!}
                    ref={register({
                        required: feilmelding.global,
                        validate: () => valider(),
                        min: {
                            value: sporsmal.min!,
                            message: getLedetekst(tekst('soknad.feilmelding.TALL_MIN_MAX'),
                                { '%MIN%': sporsmal.min, '%MAX%': sporsmal.max })
                        },
                        max: {
                            value: sporsmal.max!,
                            message: getLedetekst(tekst('soknad.feilmelding.TALL_MIN_MAX'),
                                { '%MIN%': sporsmal.min, '%MAX%': sporsmal.max }
                            )
                        }
                    })}
                    step={step()}
                    onChange={onChange}
                    autoComplete="off"
                />
                <label className="medEnhet__enhet" htmlFor={sporsmal.id}>{sporsmal.undertekst}</label>
            </div>

            <div role="alert" aria-live="assertive" className="skjemaelement__feilmelding">
                <Vis hvis={errors[sporsmal.id]}>
                    <Vis hvis={errors[sporsmal.id]?.type !== 'validate'}>
                        <Normaltekst tag="span">
                            <p>{feilmelding.lokal}</p>
                        </Normaltekst>
                    </Vis>
                    <Vis
                        hvis={errors[sporsmal.id]?.type === 'validate' && sporsmal.tag === TagTyper.HVOR_MYE_TIMER_VERDI}>
                        <Normaltekst tag="span">
                            <p>{getLedetekst(tekst('soknad.feilmelding.MINDRE_TIMER_ENN_FORVENTET.lokal'),
                                { '%GRAD%': periode?.grad })}</p>
                        </Normaltekst>
                    </Vis>
                </Vis>
            </div>

            <div className="undersporsmal" ref={undersporsmal}>
                <Vis hvis={lokal}>
                    <UndersporsmalListe oversporsmal={sporsmal} />
                </Vis>
            </div>
        </div>
    )
}

export default TallKomp
