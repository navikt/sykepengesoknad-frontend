import { Alert, BodyLong, BodyShort, Radio, RadioGroup, ReadMore } from '@navikt/ds-react'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { rodeUkeDagerIPerioden } from '../../../utils/helligdager-utils'
import { finnHovedSporsmal, hentSporsmal, hentUndersporsmal } from '../../../utils/soknad-utils'
import validerArbeidsgrad from '../../../utils/sporsmal/valider-arbeidsgrad'
import { getLedetekst, tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'

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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const watchTimer = watch(hentUndersporsmal(sporsmal!, 'HVOR_MYE_TIMER_VERDI')!.id)
    const errorTimer = errors[hentUndersporsmal(sporsmal!, 'HVOR_MYE_TIMER_VERDI')!.id]

    const feilmelding = hentFeilmelding(sporsmal)
    const { valgtSoknad } = useSoknadMedDetaljer()

    const watchVanligeTimer = watch(hentSporsmal(valgtSoknad!, 'HVOR_MANGE_TIMER_PER_UKE')!.id)
    const watch40timerIUkenJaNei = watch(hentSporsmal(valgtSoknad!, 'JOBBER_DU_NORMAL_ARBEIDSUKE')!.id)

    const { beregnGrad } = validerArbeidsgrad(sporsmal) // validerGrad,

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

            <Vis
                hvis={
                    watchRadio?.toLowerCase() === 'timer' &&
                    !Number.isNaN(beregnGrad!()) &&
                    beregnGrad?.() &&
                    !Number.isNaN(beregnGrad!() * 100) &&
                    (watchVanligeTimer || watch40timerIUkenJaNei === 'JA') &&
                    beregnGrad() !== Infinity
                }
                render={() => (
                    <Alert variant="info" style={{ marginTop: '1rem' }}>
                        <BodyShort>
                            {getLedetekst(tekst('sykepengesoknad.jobb-underveis-timer-i-prosent'), {
                                '%PROSENT%': Math.floor(beregnGrad!() * 100),
                            })}
                        </BodyShort>
                    </Alert>
                )}
            />

            <Vis
                hvis={errorTimer && rodeUkeDagerIPerioden(valgtSoknad!.fom, valgtSoknad!.tom)}
                render={() => (
                    <ReadMore header={lavereProsentHjelpTittel}>
                        <BodyLong spacing>
                            {tekst('ekspanderbarhjelp.prosenten_lavere_enn_forventet_arbeidstaker.innhold1')}
                        </BodyLong>
                        <BodyLong spacing>
                            {tekst('ekspanderbarhjelp.prosenten_lavere_enn_forventet_arbeidstaker.innhold2')}
                        </BodyLong>
                        {watch40timerIUkenJaNei}
                    </ReadMore>
                )}
            />
        </>
    )
}

export default RadioTimerProsent
