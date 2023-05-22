import { BodyShort, TextField } from '@navikt/ds-react'
import React from 'react'
import { useFormContext } from 'react-hook-form'

import { TagTyper } from '../../../types/enums'
import { RSSvartype } from '../../../types/rs-types/rs-svartype'
import validerArbeidsgrad from '../../../utils/sporsmal/valider-arbeidsgrad'
import { getLedetekst, tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'

function removeCharacters(value: string) {
    return value.replace(/[^0-9.,]/g, '')
}

const TallKomp = ({ sporsmal }: SpmProps) => {
    const {
        register,
        formState: { errors },
    } = useFormContext()

    const feilmelding = hentFeilmelding(sporsmal, errors[sporsmal.id])
    const { validerGrad, periode, hovedSporsmal } = validerArbeidsgrad(sporsmal)

    const valider = () => {
        if (validerGrad) {
            if (![TagTyper.JOBBET_DU_GRADERT, TagTyper.JOBBET_DU_100_PROSENT].includes(hovedSporsmal!.tag)) {
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
        if (sporsmal.tag === TagTyper.KM_HJEM_JOBB || sporsmal.tag === TagTyper.OFFENTLIG_TRANSPORT_BELOP) {
            return `kriterie--${sporsmal.parentKriterie.toLowerCase()} skjemaelement mt-8`
        }
        return 'skjemaelement mt-8'
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

    const manglerSporsmalsTekst = sporsmal.sporsmalstekst === ''
    const harUndertekst = !!sporsmal.undertekst

    const labels = () => {
        if (sporsmal.tag === TagTyper.HVOR_MANGE_TIMER_PER_UKE || sporsmal.tag === TagTyper.KM_HJEM_JOBB) {
            return ' undersporsmalSpacing'
        }
        if (manglerSporsmalsTekst) {
            return ' normalFont'
        }
        return ''
    }

    const antallDesimaler = (() => {
        switch (sporsmal.svartype) {
            case RSSvartype.PROSENT:
                return 0
            case RSSvartype.KILOMETER:
                return 1
            case RSSvartype.TALL:
            case RSSvartype.TIMER:
            case RSSvartype.BELOP:
                return 2
            default:
                return 0
        }
    })()

    const description = harUndertekst
        ? sporsmal.undertekst
        : manglerSporsmalsTekst
        ? ''
        : tekst(('soknad.undertekst.' + sporsmal.tag) as any)
    return (
        <div className={className()}>
            <TextField
                label={
                    manglerSporsmalsTekst
                        ? tekst(('soknad.undertekst.' + sporsmal.tag) as any)
                        : sporsmal.sporsmalstekst
                }
                description={description}
                className={`${inputSize()} ${labels()}`}
                type="text"
                id={sporsmal.id}
                min={sporsmal.min!}
                max={sporsmal.max!}
                error={errors[sporsmal.id] !== undefined}
                autoComplete="off"
                inputMode={antallDesimaler > 0 ? 'decimal' : 'numeric'}
                {...register(sporsmal.id, {
                    required: feilmelding.global,
                    validate: (verdien) => {
                        if (isNaN(parseFloat(verdien))) {
                            return feilmelding.global
                        }
                        return valider()
                    },
                    onChange: (e) => {
                        e.target.value = removeCharacters(e.target.value)
                    },
                    setValueAs: (verdi) => {
                        const ryddaVerdi = removeCharacters(verdi)

                        if (!ryddaVerdi) {
                            return undefined
                        } else if (antallDesimaler === 0) {
                            return parseInt(ryddaVerdi)
                        } else {
                            const medPunktum = ryddaVerdi.replace(',', '.')
                            const antallEtterPunktum = medPunktum.split('.')[1]?.length || 0
                            return parseFloat(medPunktum).toFixed(Math.min(antallDesimaler, antallEtterPunktum))
                        }
                    },
                    min: {
                        value: sporsmal.min!,
                        message: sporsmal.max
                            ? getLedetekst(tekst('soknad.feilmelding.TALL_MIN_MAX'), {
                                  '%MIN%': sporsmal.min,
                                  '%MAX%': sporsmal.max,
                              })
                            : getLedetekst(tekst('soknad.feilmelding.TALL_MIN'), { '%MIN%': sporsmal.min }),
                    },
                    max: {
                        value: sporsmal.max!,
                        message: getLedetekst(tekst('soknad.feilmelding.TALL_MIN_MAX'), {
                            '%MIN%': sporsmal.min,
                            '%MAX%': sporsmal.max,
                        }),
                    },
                })}
            />

            <div role="alert" aria-live="assertive">
                <Vis
                    hvis={errors[sporsmal.id]}
                    render={() => (
                        <>
                            <Vis
                                hvis={errors[sporsmal.id]?.type !== 'validate'}
                                render={() => (
                                    <BodyShort
                                        as="span"
                                        className="mt-2 block font-bold text-surface-danger"
                                        data-cy="feil-lokal"
                                    >
                                        {feilmelding.lokal}
                                    </BodyShort>
                                )}
                            />
                            <Vis
                                hvis={
                                    errors[sporsmal.id]?.type === 'validate' &&
                                    sporsmal.tag === TagTyper.HVOR_MYE_TIMER_VERDI
                                }
                                render={() => (
                                    <BodyShort
                                        as="span"
                                        className="mt-2 block font-bold text-surface-danger"
                                        data-cy="feil-lokal"
                                    >
                                        {getLedetekst(tekst('soknad.feilmelding.MINDRE_TIMER_ENN_FORVENTET.lokal'), {
                                            '%GRAD%': 100 - periode!.grad,
                                        })}
                                    </BodyShort>
                                )}
                            />
                        </>
                    )}
                />
            </div>
        </div>
    )
}

export default TallKomp
