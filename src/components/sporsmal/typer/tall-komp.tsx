import { BodyShort, TextField } from '@navikt/ds-react'
import React, { useRef } from 'react'
import { useFormContext } from 'react-hook-form'

import { TagTyper } from '../../../types/enums'
import { RSSvartype } from '../../../types/rs-types/rs-svartype'
import validerArbeidsgrad from '../../../utils/sporsmal/valider-arbeidsgrad'
import { getLedetekst, tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'

const TallKomp = ({ sporsmal }: SpmProps) => {
    const {
        register,
        formState: { errors },
        watch,
        getValues,
    } = useFormContext()

    let watchTall = watch(sporsmal.id)
    if (watchTall === undefined) {
        watchTall = getValues(sporsmal.id)
    }

    const feilmelding = hentFeilmelding(sporsmal, errors[sporsmal.id])
    const undersporsmal = useRef<HTMLDivElement>(null)
    const { validerGrad, periode, hovedSporsmal } = validerArbeidsgrad(sporsmal)

    const valider = () => {
        if (validerGrad) {
            if (
                ![
                    TagTyper.JOBBET_DU_GRADERT,
                    TagTyper.JOBBET_DU_100_PROSENT,
                ].includes(hovedSporsmal!.tag)
            ) {
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
        if (
            sporsmal.tag === TagTyper.KM_HJEM_JOBB ||
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

    const labels = () => {
        if (sporsmal.sporsmalstekst) {
            return ' tallKompLabel'
        } else {
            return ' tallKompDescription'
        }
    }

    // Dette er en workaround for å gjøre textField accessible, siden noen av underspørsmålene ikke har spørsmålstekst og label er derfor tom
    let label: string
    let description: string | null

    if (sporsmal.sporsmalstekst !== '') {
        label = sporsmal.sporsmalstekst
        description = sporsmal.undertekst
    } else {
        label = sporsmal.undertekst!
        description = ''
    }

    return (
        <div className={className()}>
            <TextField
                label={label}
                description={description}
                className={`${inputSize()} ${labels()}`}
                type="number"
                id={sporsmal.id}
                min={sporsmal.min!}
                max={sporsmal.max!}
                error={errors[sporsmal.id] !== undefined}
                autoComplete="off"
                inputMode="numeric"
                {...register(sporsmal.id, {
                    required: feilmelding.global,
                    validate: () => valider(),
                    min: {
                        value: sporsmal.min!,
                        message: sporsmal.max
                            ? getLedetekst(
                                  tekst('soknad.feilmelding.TALL_MIN_MAX'),
                                  {
                                      '%MIN%': sporsmal.min,
                                      '%MAX%': sporsmal.max,
                                  }
                              )
                            : getLedetekst(
                                  tekst('soknad.feilmelding.TALL_MIN'),
                                  { '%MIN%': sporsmal.min }
                              ),
                    },
                    max: {
                        value: sporsmal.max!,
                        message: getLedetekst(
                            tekst('soknad.feilmelding.TALL_MIN_MAX'),
                            {
                                '%MIN%': sporsmal.min,
                                '%MAX%': sporsmal.max,
                            }
                        ),
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
                                        className="skjemaelement__feilmelding"
                                    >
                                        {feilmelding.lokal}
                                    </BodyShort>
                                )}
                            />
                            <Vis
                                hvis={
                                    errors[sporsmal.id]?.type === 'validate' &&
                                    sporsmal.tag ===
                                        TagTyper.HVOR_MYE_TIMER_VERDI
                                }
                                render={() => (
                                    <BodyShort
                                        as="span"
                                        className="skjemaelement__feilmelding"
                                    >
                                        {getLedetekst(
                                            tekst(
                                                'soknad.feilmelding.MINDRE_TIMER_ENN_FORVENTET.lokal'
                                            ),
                                            { '%GRAD%': 100 - periode!.grad }
                                        )}
                                    </BodyShort>
                                )}
                            />
                        </>
                    )}
                />
            </div>

            <div
                aria-live="assertive"
                className="undersporsmal"
                ref={undersporsmal}
            >
                <Vis
                    hvis={watchTall}
                    render={() => (
                        <UndersporsmalListe oversporsmal={sporsmal} />
                    )}
                />
            </div>
        </div>
    )
}

export default TallKomp
