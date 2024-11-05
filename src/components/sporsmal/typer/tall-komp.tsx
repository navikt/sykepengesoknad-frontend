import { Alert, BodyShort, TextField } from '@navikt/ds-react'
import React from 'react'
import { useFormContext } from 'react-hook-form'

import { RSSvartype } from '../../../types/rs-types/rs-svartype'
import validerArbeidsgrad from '../../../utils/sporsmal/valider-arbeidsgrad'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'
import { Soknad } from '../../../types/types'

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
    const { valgtSoknad } = useSoknadMedDetaljer()

    const valider = () => {
        if (validerGrad) {
            if (!['JOBBET_DU_GRADERT', 'JOBBET_DU_100_PROSENT'].includes(hovedSporsmal!.tag)) {
                return true // hopp over validering dersom det ikke er spørsmål av denne typen
            }

            if (sporsmal.tag !== 'HVOR_MYE_TIMER_VERDI') {
                return true
            }
            return validerGrad()
        } else {
            return true
        }
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

    const manglerSporsmalsTekst = sporsmal.sporsmalstekst === ''

    const description = () => {
        const tekstDescription =
            sporsmal.undertekst || (manglerSporsmalsTekst ? '' : tekst(('soknad.undertekst.' + sporsmal.tag) as any))
        if (sporsmal.tag == 'NYTT_ARBEIDSFORHOLD_UNDERVEIS_BRUTTO') {
            const jaFerie = harSvartJaFerie(valgtSoknad)
            const jaPermisjon = harSvartJaFerie(valgtSoknad)
            if (jaFerie || jaPermisjon) {
                const feriePermisjonTekst = () => {
                    if (jaFerie) {
                        return 'ferie'
                    }
                    if (jaPermisjon) {
                        return 'permisjon'
                    }
                    return 'ferie eller permisjon'
                }

                return (
                    <>
                        <BodyShort>{tekstDescription}</BodyShort>
                        <Alert variant="warning" className="mt-2 bg-white border-0 p-0">
                            {`Ikke ta med det du eventuelt tjente de dagene du hadde ${feriePermisjonTekst()} fra ${valgtSoknad?.arbeidsgiver?.navn}.`}
                        </Alert>
                    </>
                )
            }
        }
        return tekstDescription
    }

    return (
        <div className={!sporsmal.parentKriterie ? '' : 'mt-8 w-full'}>
            <TextField
                label={
                    manglerSporsmalsTekst
                        ? tekst(('soknad.undertekst.' + sporsmal.tag) as any)
                        : sporsmal.sporsmalstekst
                }
                description={description()}
                className="[&>input]:md:w-1/2"
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
                {errors[sporsmal.id] && (
                    <>
                        {errors[sporsmal.id]?.type !== 'validate' && (
                            <BodyShort
                                as="span"
                                className="mt-2 block font-bold text-surface-danger"
                                data-cy="feil-lokal"
                            >
                                {feilmelding.lokal}
                            </BodyShort>
                        )}
                        {errors[sporsmal.id]?.type === 'validate' && sporsmal.tag === 'HVOR_MYE_TIMER_VERDI' && (
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
                    </>
                )}
            </div>
        </div>
    )
}

function harSvartJaFerie(valgtSoknad: Soknad | undefined) {
    if (!valgtSoknad) {
        return false
    }
    return valgtSoknad.sporsmal.some(
        (s) => s.tag === 'FERIE_V2' && s.svarliste.svar.some((svar) => svar.verdi === 'JA'),
    )
}

export default TallKomp
