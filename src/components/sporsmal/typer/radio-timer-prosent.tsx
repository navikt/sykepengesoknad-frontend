import { Alert, BodyLong, BodyShort, Radio, RadioGroup, ReadMore } from '@navikt/ds-react'
import React, { useState, useEffect } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

import { Soknad, Sporsmal } from '../../../types/types'
import { rodeUkeDagerIPerioden } from '../../../utils/helligdager-utils'
import { hentUndersporsmal } from '../../../utils/soknad-utils'
import validerArbeidsgrad from '../../../utils/sporsmal/valider-arbeidsgrad'
import { getLedetekst, tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'

interface TimerProsentAlert2Props {
    timerEllerProsentId: string
    underSporsmalIder: string[]
    valgtSoknad: Soknad
    undersporsmalTags: string[]
    sporsmal: Sporsmal
}

const TimerProsentAlert2: React.FC<TimerProsentAlert2Props> = ({
    timerEllerProsentId,
    underSporsmalIder,
    valgtSoknad,
    undersporsmalTags,
    sporsmal,
}) => {
    const { control, getValues } = useFormContext() // formState: { errors }
    const [secondaryWatchValues, setSecondaryWatchValues] = useState<any>(null)
    const { beregnGrad } = validerArbeidsgrad(sporsmal)

    const [beregnetGrad, setBeregnetGrad] = useState<number | undefined>(undefined)

    // this seems to work, not pipe that data into USESTATE!!!
    const watchedValues = useWatch({
        control,
        name: [timerEllerProsentId, ...underSporsmalIder],
    })

    // useEffect(() => {
    //     // console.log('Watched values:', watchedValues)
    //     // console.log('All form values:', getValues())
    //     // console.log('timerEllerProsentId:', timerEllerProsentId)
    //     // console.log('underSporsmalIder:', underSporsmalIder)
    // }, [watchedValues, getValues, timerEllerProsentId, underSporsmalIder, valgtSoknad, validerGrad, beregnGrad])

    const [timerEllerProsent, watchTimer, watchProsent] = watchedValues

    // this seems to work, not pipe that data into USESTATE!!!
    // can you force this to rerender? every time 0.5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            // console.log('Watched values:', watchedValues)

            const getValuesResult = getValues()
            // console.log('All form values:', getValuesResult)
            setSecondaryWatchValues(getValuesResult)
            // console.log('timerEllerProsentId:', timerEllerProsentId)
            // console.log('underSporsmalIder:', underSporsmalIder)
            setBeregnetGrad(beregnGrad!())
        }, 250)
        return () => clearInterval(interval)
    }, [watchedValues, getValues, timerEllerProsentId, underSporsmalIder, valgtSoknad])

    return (
        <div>
            {beregnetGrad && beregnetGrad > 0 && (
                <Alert variant="info" style={{ marginTop: '1rem' }}>
                    <BodyShort>
                        {getLedetekst(tekst('sykepengesoknad.jobb-underveis-timer-i-prosent'), {
                            '%PROSENT%': Math.floor(beregnetGrad * 100),
                        })}
                    </BodyShort>
                </Alert>
            )}

            {/*<Vis*/}
            {/*        hvis={*/}
            {/*             watchRadio?.toLowerCase() === 'timer' &&*/}
            {/*             beregnGrad?.() &&*/}
            {/*             beregnGrad() !== Infinity &&*/}
            {/*             validerGrad!() == true*/}
            {/*        }*/}
            {/*        render={() => (*/}
            {/*            <Alert variant="info" style={{ marginTop: '1rem' }}>*/}
            {/*                <BodyShort>*/}
            {/*                    {getLedetekst(tekst('sykepengesoknad.jobb-underveis-timer-i-prosent'), {*/}
            {/*                        '%PROSENT%': typeof beregnGrad!() === 'number' ? Math.floor(beregnGrad!() * 100) : 0,*/}
            {/*                    })}*/}
            {/*                </BodyShort>*/}
            {/*            </Alert>*/}
            {/*        )}*/}
            {/*    />*/}
            <div>
                timerEllerProsent: {timerEllerProsent} <br />
                prosent: {watchProsent} <br />
                watchTimer: {watchTimer} <br />
                undersporsmalTags: {JSON.stringify(undersporsmalTags)} <br />
            </div>
            <pre>
                timerEllerProsentId: {JSON.stringify(timerEllerProsentId)}
                <br />
                underSporsmalIder: {JSON.stringify(underSporsmalIder)}
                <br />
                All form values: {JSON.stringify(getValues(), null, 2)}
                <br />
                Secondary watch values from useEffect: {JSON.stringify(secondaryWatchValues, null, 2)}
            </pre>
        </div>
    )
}

const RadioTimerProsent = ({ sporsmal }: SpmProps) => {
    const {
        formState: { errors },
        watch,
        getValues,
    } = useFormContext()
    let watchRadio = watch(sporsmal.id)
    if (watchRadio === undefined) {
        watchRadio = getValues(sporsmal.id)
    }

    const timerId = hentUndersporsmal(sporsmal, 'HVOR_MYE_TIMER_VERDI_0')?.id
    let watchTimer = timerId ? watch(timerId) : undefined
    if (watchTimer === undefined) {
        if (timerId) {
            watchTimer = getValues(timerId)
        }
    }

    const feilmelding = hentFeilmelding(sporsmal)
    const { valgtSoknad } = useSoknadMedDetaljer()
    const lavereProsentHjelpTittel = tekst('ekspanderbarhjelp.prosenten_lavere_enn_forventet_arbeidstaker.tittel')

    return (
        <>
            <Controller
                name={sporsmal.id}
                rules={{ required: feilmelding.global }}
                defaultValue=""
                render={({ field }) => (
                    <RadioGroup
                        {...field}
                        legend={sporsmal.sporsmalstekst}
                        description={sporsmal.undertekst}
                        error={errors[sporsmal.id] !== undefined && feilmelding.lokal}
                        key={sporsmal.id}
                        className="mt-8"
                    >
                        {sporsmal.undersporsmal.map((uspm) => (
                            <Radio key={uspm.id} id={uspm.id} value={uspm.sporsmalstekst}>
                                {uspm.sporsmalstekst}
                            </Radio>
                        ))}
                    </RadioGroup>
                )}
            />

            {sporsmal.undersporsmal.map((uspm, idx) => {
                const checked = watchRadio === uspm.sporsmalstekst
                return (
                    <div aria-live="assertive" key={idx + 'under'}>
                        <UndersporsmalListe oversporsmal={uspm} oversporsmalSvar={checked ? 'CHECKED' : ''} />
                    </div>
                )
            })}

            {valgtSoknad && sporsmal.undersporsmal.length > 0 && (
                <TimerProsentAlert2
                    timerEllerProsentId={sporsmal.id}
                    underSporsmalIder={sporsmal.undersporsmal.map((x) => x.id)}
                    valgtSoknad={valgtSoknad}
                    undersporsmalTags={sporsmal.undersporsmal.map((x) => x.tag)}
                    sporsmal={sporsmal}
                />
            )}

            <Vis
                hvis={
                    errors[hentUndersporsmal(sporsmal!, 'HVOR_MYE_TIMER_VERDI')!.id] &&
                    rodeUkeDagerIPerioden(valgtSoknad!.fom, valgtSoknad!.tom)
                }
                render={() => (
                    <ReadMore header={lavereProsentHjelpTittel}>
                        <BodyLong spacing>
                            {tekst('ekspanderbarhjelp.prosenten_lavere_enn_forventet_arbeidstaker.innhold1')}
                        </BodyLong>
                        <BodyLong spacing>
                            {tekst('ekspanderbarhjelp.prosenten_lavere_enn_forventet_arbeidstaker.innhold2')}
                        </BodyLong>
                    </ReadMore>
                )}
            />
        </>
    )
}

export default RadioTimerProsent
