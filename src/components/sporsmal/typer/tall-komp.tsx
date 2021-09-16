import AlertStripe from 'nav-frontend-alertstriper'
import { Normaltekst } from 'nav-frontend-typografi'
import React, { useRef } from 'react'
import { useFormContext } from 'react-hook-form'

import { TagTyper } from '../../../types/enums'
import { RSSvartype } from '../../../types/rs-types/rs-svartype'
import validerArbeidsgrad from '../../../utils/sporsmal/valider-arbeidsgrad'
import { getLedetekst, tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import SporsmalstekstH3 from '../sporsmalstekst/sporsmalstekstH3'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'

const TallKomp = ({ sporsmal }: SpmProps) => {
    const { register, formState: { errors }, watch } = useFormContext()
    const watchTall = watch(sporsmal.id)

    const feilmelding = hentFeilmelding(sporsmal, errors[sporsmal.id])
    const undersporsmal = useRef<HTMLDivElement>(null)
    const { validerGrad, periode, hovedSporsmal } = validerArbeidsgrad(sporsmal)

    const valider = () => {
        if (validerGrad) {
            if (![ TagTyper.JOBBET_DU_GRADERT, TagTyper.JOBBET_DU_100_PROSENT ].includes(hovedSporsmal!.tag)) {
                return true // hopp over validering dersom det ikke er spørsmål av denne typen
            }

            if (sporsmal.tag !== TagTyper.HVOR_MYE_TIMER_VERDI) {
                return true
            }
            return validerGrad()
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

    return (
        <div className={className()}>
            <SporsmalstekstH3 sporsmal={sporsmal} />

            <div className="medEnhet">
                <input
                    type="number"
                    id={sporsmal.id}
                    {...register(sporsmal.id, {
                        required: feilmelding.global,
                        validate: () => valider(),
                        min: {
                            value: sporsmal.min!,
                            message: (sporsmal.max)
                                ? getLedetekst(tekst('soknad.feilmelding.TALL_MIN_MAX'), { '%MIN%': sporsmal.min, '%MAX%': sporsmal.max })
                                : getLedetekst(tekst('soknad.feilmelding.TALL_MIN'), { '%MIN%': sporsmal.min })
                        },
                        max: {
                            value: sporsmal.max!,
                            message: getLedetekst(tekst('soknad.feilmelding.TALL_MIN_MAX'),
                                { '%MIN%': sporsmal.min, '%MAX%': sporsmal.max }
                            )
                        }
                    })}
                    min={sporsmal.min!}
                    max={sporsmal.max!}
                    className={
                        'skjemaelement__input' +
                        inputSize() +
                        (errors[sporsmal.id] ? ' skjemaelement__input--harFeil' : '')
                    }
                    step={step()}
                    autoComplete="off"
                />
                <label className="medEnhet__enhet" htmlFor={sporsmal.id}>{sporsmal.undertekst}</label>
            </div>

            <div role="alert" aria-live="assertive">
                <Vis hvis={errors[sporsmal.id]}
                    render={() =>
                        <>
                            <Vis hvis={errors[sporsmal.id]?.type !== 'validate'}
                                render={() =>
                                    <Normaltekst tag="span" className="skjemaelement__feilmelding">
                                        {feilmelding.lokal}
                                    </Normaltekst>
                                }
                            />
                            <Vis hvis={errors[sporsmal.id]?.type === 'validate' && sporsmal.tag === TagTyper.HVOR_MYE_TIMER_VERDI}
                                render={() =>
                                    <Normaltekst tag="span" className="skjemaelement__feilmelding">
                                        {getLedetekst(
                                            tekst('soknad.feilmelding.MINDRE_TIMER_ENN_FORVENTET.lokal'),
                                            { '%GRAD%':  100 - periode!.grad }
                                        )}
                                    </Normaltekst>
                                }
                            />
                        </>
                    }
                />
            </div>

            <Vis hvis={sporsmal.tag === TagTyper.HVOR_MANGE_TIMER_PER_UKE && watchTall && watchTall < 10}
                render={() =>
                    <AlertStripe type="advarsel" style={{ marginTop: '1rem' }}>
                        <Normaltekst>{tekst('sykepengesoknad.jobb-underveis-under-10-timer-uke')}</Normaltekst>
                    </AlertStripe>
                }
            />

            <div className="undersporsmal" ref={undersporsmal}>
                <Vis hvis={watchTall}
                    render={() => <UndersporsmalListe oversporsmal={sporsmal} />}
                />
            </div>
        </div>
    )
}

export default TallKomp
