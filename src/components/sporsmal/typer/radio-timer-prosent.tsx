import { Alert, BodyLong, BodyShort, Radio, RadioGroup, ReadMore } from '@navikt/ds-react'
import React from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

import { Soknad } from '../../../types/types'
import { rodeUkeDagerIPerioden } from '../../../utils/helligdager-utils'
import { hentSporsmal, hentUndersporsmal } from '../../../utils/soknad-utils'
import validerArbeidsgrad from '../../../utils/sporsmal/valider-arbeidsgrad'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'
import { logEvent } from '../../umami/umami'

interface TimerProsentAlertProps {
    valgtSoknad: Soknad
    beregnGradNy: (
        hvorMyeTimerVerdi: string,
        jobberDuNormalArbeidsuke: string,
        hvorMangeTimerPerUke: string,
    ) => number | undefined
}

const TimerProsentAlert = ({ valgtSoknad, beregnGradNy }: TimerProsentAlertProps) => {
    const { control } = useFormContext()

    const relevantTagList = ['HVOR_MYE_TIMER_VERDI', 'JOBBER_DU_NORMAL_ARBEIDSUKE', 'HVOR_MANGE_TIMER_PER_UKE']

    const tagToIdMap = new Map<string, string>()
    relevantTagList.forEach((tag) => {
        const sporsmalId = hentSporsmal(valgtSoknad, tag)?.id
        if (sporsmalId) {
            tagToIdMap.set(tag, sporsmalId)
        }
    })

    const hvorMyeTimerVerdi = useWatch({
        control,
        name: tagToIdMap.get('HVOR_MYE_TIMER_VERDI') || '',
    })
    const jobberDuNormalArbeidsuke = useWatch({
        control,
        name: tagToIdMap.get('JOBBER_DU_NORMAL_ARBEIDSUKE') || '',
    })
    const hvorMangeTimerPerUke = useWatch({
        control,
        name: tagToIdMap.get('HVOR_MANGE_TIMER_PER_UKE') || '',
    })

    const beregnetGrad = beregnGradNy(hvorMyeTimerVerdi, jobberDuNormalArbeidsuke, hvorMangeTimerPerUke)

    return (
        <div>
            {beregnetGrad !== undefined && !(valgtSoknad.julesoknad !== undefined && valgtSoknad.julesoknad) && (
                <Alert variant="info" style={{ marginTop: '1rem' }}>
                    <BodyShort>
                        {getLedetekst(tekst('sykepengesoknad.jobb-underveis-timer-i-prosent'), {
                            '%PROSENT%': Math.floor(beregnetGrad * 100),
                        })}
                    </BodyShort>
                </Alert>
            )}
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

    const errorTimer = errors[hentUndersporsmal(sporsmal!, 'HVOR_MYE_TIMER_VERDI')!.id]

    const feilmelding = hentFeilmelding(sporsmal)
    const { valgtSoknad } = useSoknadMedDetaljer()

    const { beregnGradNy } = validerArbeidsgrad(sporsmal)

    return (
        <>
            <Controller
                name={sporsmal.id}
                rules={{
                    required: feilmelding.global,
                    onChange: (event) => {
                        logEvent('skjema spørsmål besvart', {
                            soknadstype: valgtSoknad?.soknadstype,
                            skjemanavn: 'sykepengesoknad',
                            spørsmål: sporsmal.tag,
                            svar: event.target.value,
                        })
                    },
                }}
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

            {valgtSoknad && sporsmal.undersporsmal.length > 0 && beregnGradNy && (
                <TimerProsentAlert valgtSoknad={valgtSoknad} beregnGradNy={beregnGradNy} />
            )}

            {errorTimer && rodeUkeDagerIPerioden(valgtSoknad!.fom, valgtSoknad!.tom) && (
                <ReadMore header="Er prosenten lavere enn du forventet?">
                    <BodyLong spacing>
                        Grunnen kan være at helligdager eller røde dager som havner på mandag-fredag regnes som
                        sykepengedager hos NAV. Derfor fordeles timene dine også på disse dagene selv om du hadde fri.
                    </BodyLong>
                    <BodyLong spacing>
                        Hvis du har fylt inn riktig antall timer, og likevel får beskjed om at timene utgjør mindre enn
                        sykmeldingsprosenten din, kan du svare nei på spørsmålet og gå videre.
                    </BodyLong>
                </ReadMore>
            )}
        </>
    )
}

export default RadioTimerProsent
