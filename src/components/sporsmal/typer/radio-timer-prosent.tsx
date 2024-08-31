import { Soknad } from '../../../types/types'
import { Alert, BodyLong, BodyShort, Radio, RadioGroup, ReadMore } from '@navikt/ds-react'
import React, { useState, useEffect } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

import { rodeUkeDagerIPerioden } from '../../../utils/helligdager-utils'
import { hentUndersporsmal } from '../../../utils/soknad-utils'
import validerArbeidsgrad from '../../../utils/sporsmal/valider-arbeidsgrad'
import { getLedetekst, tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'
import { hentSporsmal } from '../../../utils/soknad-utils'

interface TimerProsentAlertProps {
    watchRadio: string;
    beregnGrad: (() => number) | undefined;
    validerGrad: (() => string | true) | undefined;
    tekst: typeof tekst;
    valgtSoknad: Soknad;
    timerValue: number | null;
    watchTimer: string | null;
}

export const TimerProsentAlert: React.FC<TimerProsentAlertProps> = ({
    watchRadio,
    beregnGrad,
    validerGrad,
    tekst,
    valgtSoknad,
    timerValue,
    watchTimer,
}) => {
    const shouldShow = beregnGrad && 
        watchRadio?.toLowerCase() === 'timer' &&
        beregnGrad() !== undefined &&
        beregnGrad() !== Infinity &&
        validerGrad?.() === true &&
        timerValue !== null
        && watchTimer !== null;

    if (!shouldShow) return ( <pre>
        new:
        <br />
        {watchRadio}
        <br />
        <pre>
        {true || JSON.stringify(valgtSoknad, null, 2)}
        </pre>
        <br />
        <pre>
        {JSON.stringify(timerValue, null, 2)}
        </pre>
        <pre>
        {JSON.stringify(watchTimer, null, 2)}
        </pre>
    </pre>);

    /*
    export const hentSporsmal = (soknad: Soknad, tag: string): Sporsmal | undefined => {
        return flattenSporsmal(soknad.sporsmal).find((spm) => spm.tag === tag)
    }*/

    // const normalArbeidsuke = hentSporsmal(valgtSoknad, "JOBBER_DU_NORMAL_ARBEIDSUKE")




    return (
        <>
        <Alert variant="info" style={{ marginTop: '1rem' }}>
            <BodyShort>
                {getLedetekst(tekst('sykepengesoknad.jobb-underveis-timer-i-prosent'), {
                    '%PROSENT%': typeof beregnGrad === 'number' ? Math.floor(beregnGrad * 100) : 0,
                })}
            </BodyShort>
            
        </Alert>
        <div>
                <pre>
                    stringified:
                    <br />
                    valgt soknad;
                    <pre>
                        {JSON.stringify(valgtSoknad, null, 2)}
                    </pre>
                    <br />
                    {JSON.stringify(hentSporsmal(valgtSoknad, "JOBBER_DU_NORMAL_ARBEIDSUKE"))}
                    <br />
                    
                    <br />
                    {JSON.stringify(timerValue)}
                    {JSON.stringify(watchTimer)}
                </pre>
            </div>
        </>
    );
};

interface TimerProsentAlert2Props {
    timerEllerProsentId: string;
    underSporsmalIder: string[];
    valgtSoknad: Soknad;
    undersporsmalTags: string[];
}

const TimerProsentAlert2: React.FC<TimerProsentAlert2Props> = ({ timerEllerProsentId, underSporsmalIder, valgtSoknad, undersporsmalTags}) => {
    const { control, getValues } = useFormContext()

    const [secondaryWatchValues, setSecondaryWatchValues] = useState<any>(null)

    // this seems to work, not pipe that data into USESTATE!!!
    const watchedValues = useWatch({
        control,
        name: [timerEllerProsentId, ...underSporsmalIder],
    })

    useEffect(() => {
        console.log('Watched values:', watchedValues)
        console.log('All form values:', getValues())
        console.log('timerEllerProsentId:', timerEllerProsentId)
        console.log('underSporsmalIder:', underSporsmalIder)
    }, [watchedValues, getValues, timerEllerProsentId, underSporsmalIder, valgtSoknad])

    const [timerEllerProsent, watchTimer, watchProsent] = watchedValues


    // this seems to work, not pipe that data into USESTATE!!!
    // can you force this to rerender? every time 0.5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            console.log('Watched values:', watchedValues)

            const getValuesResult = getValues()
            console.log('All form values:', getValuesResult)
            setSecondaryWatchValues(getValuesResult)
            console.log('timerEllerProsentId:', timerEllerProsentId)
            console.log('underSporsmalIder:', underSporsmalIder)
        }, 500)
        return () => clearInterval(interval)
    }, [watchedValues, getValues, timerEllerProsentId, underSporsmalIder, valgtSoknad])
      


    return (
        <div>
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
    );
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

    const [timerValue, setTimerValue] = useState<number | null>(null)
    // const timerUndersporsmal = hentUndersporsmal(sporsmal, 'HVOR_MYE_TIMER_VERDI_0')
    // const watchTimer = timerUndersporsmal && timerUndersporsmal.id ? watch(timerUndersporsmal.id) : undefined

    // useEffect(() => {
    //     if (watchTimer) {
    //     const numericValue = parseFloat(watchTimer)
    //     setTimerValue(isNaN(numericValue) ? null : numericValue)
    //     }
    // }, [watchTimer])

    const feilmelding = hentFeilmelding(sporsmal)
    const { valgtSoknad } = useSoknadMedDetaljer()

    const { validerGrad, beregnGrad } = validerArbeidsgrad(sporsmal)

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

            

            {/* <Vis
                hvis={
                    watchRadio?.toLowerCase() === 'timer' &&
                    beregnGrad?.() &&
                    beregnGrad() !== Infinity &&
                    validerGrad!() == true
                }
                render={() => (
                    <Alert variant="info" style={{ marginTop: '1rem' }}>
                        <BodyShort>
                            {getLedetekst(tekst('sykepengesoknad.jobb-underveis-timer-i-prosent'), {
                                '%PROSENT%': typeof beregnGrad!() === 'number' ? Math.floor(beregnGrad!() * 100) : 0,
                            })}
                        </BodyShort>
                    </Alert>
                )}
            /> */}

            {/* {false && valgtSoknad && (
                <TimerProsentAlert
                    watchRadio={watchRadio}
                    watchTimer={watchTimer}
                    beregnGrad={beregnGrad}
                    validerGrad={validerGrad}
                    tekst={tekst}
                    valgtSoknad={valgtSoknad}
                    timerValue={timerValue}
                />
            )} */}

            {valgtSoknad && sporsmal.undersporsmal.length > 0 && (
                <TimerProsentAlert2
                    timerEllerProsentId={sporsmal.id}
                    underSporsmalIder={sporsmal.undersporsmal.map(x => x.id)}
                    valgtSoknad={valgtSoknad}
                    undersporsmalTags={sporsmal.undersporsmal.map(x => x.tag)}
                />

            )}
            
            <Vis
                hvis={true || errors[hentUndersporsmal(sporsmal!, 'HVOR_MYE_TIMER_VERDI')!.id] && rodeUkeDagerIPerioden(valgtSoknad!.fom, valgtSoknad!.tom)}
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
