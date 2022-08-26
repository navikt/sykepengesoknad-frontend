import { Alert, BodyLong, BodyShort, Label, Radio, RadioGroup } from '@navikt/ds-react'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { useAppStore } from '../../../data/stores/app-store'
import { TagTyper } from '../../../types/enums'
import { RSSvartype } from '../../../types/rs-types/rs-svartype'
import { rodeUkeDagerIPerioden } from '../../../utils/helligdager-utils'
import { hentUndersporsmal } from '../../../utils/soknad-utils'
import validerArbeidsgrad from '../../../utils/sporsmal/valider-arbeidsgrad'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { useAmplitudeInstance } from '../../amplitude/amplitude'
import AnimateOnMount from '../../animate-on-mount'
import { Ekspanderbar } from '../../ekspanderbar/ekspanderbar'
import FeilLokal from '../../feil/feil-lokal'
import Vis from '../../vis'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'

const RadioKomp = ({ sporsmal }: SpmProps) => {
    const {
        register,
        formState: { errors },
        watch,
        getValues,
    } = useFormContext()
    let watchRadio = watch(sporsmal.id)
    if (watchRadio === undefined) {
        watchRadio = getValues(sporsmal.id)
    }

    // watchTimer er lagt inn for å rendre prosent-alerten
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // noinspection JSUnusedLocalSymbols
    const watchTimer = watch(hentUndersporsmal(sporsmal!, TagTyper.HVOR_MYE_TIMER_VERDI)!.id)
    const errorTimer = errors[hentUndersporsmal(sporsmal!, TagTyper.HVOR_MYE_TIMER_VERDI)!.id]

    const feilmelding = hentFeilmelding(sporsmal)
    const { valgtSoknad } = useAppStore()
    const { validerGrad, beregnGrad } = validerArbeidsgrad(sporsmal)
    const [surveySvart, setSurveySvart] = useState<boolean>(false)
    const { logEvent } = useAmplitudeInstance()

    const lavereProsentHjelpTittel = tekst('ekspanderbarhjelp.prosenten_lavere_enn_forventet_arbeidstaker.tittel')
    return (
        <>
            <Label as="h3" className="skjema__sporsmal">
                {sporsmal.sporsmalstekst}
            </Label>
            <Vis
                hvis={sporsmal.undertekst && sporsmal.svartype == RSSvartype.RADIO_GRUPPE_TIMER_PROSENT}
                render={() => <BodyLong spacing> {sporsmal.undertekst}</BodyLong>}
            />

            <div className={'skjemaelement' + (errors[sporsmal.id] ? ' skjemagruppe--feil' : '')}>
                {sporsmal.undersporsmal.map((uspm, idx) => {
                    const checked = watchRadio === uspm.sporsmalstekst

                    return (
                        <div className="radioContainer" key={idx}>
                            <input
                                type="radio"
                                id={uspm.id}
                                value={uspm.sporsmalstekst}
                                {...register(sporsmal.id, {
                                    required: feilmelding.global,
                                })}
                                className="skjemaelement__input radioknapp"
                            />
                            <label className="skjemaelement__label" htmlFor={uspm.id}>
                                {uspm.sporsmalstekst}
                            </label>

                            <div aria-live="assertive">
                                <AnimateOnMount
                                    mounted={checked}
                                    enter="undersporsmal--vis"
                                    leave="undersporsmal--skjul"
                                    start="undersporsmal"
                                >
                                    <UndersporsmalListe
                                        oversporsmal={uspm}
                                        oversporsmalSvar={checked ? 'CHECKED' : ''}
                                    />
                                </AnimateOnMount>
                            </div>
                        </div>
                    )
                })}
            </div>

            <FeilLokal sporsmal={sporsmal} />

            <Vis
                hvis={watchRadio?.toLowerCase() === 'timer' && beregnGrad?.() && validerGrad!() == true}
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
                    <>
                        <Ekspanderbar
                            title={lavereProsentHjelpTittel}
                            sporsmalId={sporsmal.id}
                            amplitudeProps={{
                                component: lavereProsentHjelpTittel,
                                sporsmaltag: sporsmal.tag,
                            }}
                            logVedVisning={lavereProsentHjelpTittel}
                        >
                            <div className="avsnitt">
                                <Label size="medium" as="h3" className="helligdager-tittel">
                                    {tekst('ekspanderbarhjelp.helligdager.tittel')}
                                </Label>
                                <BodyLong spacing>
                                    {tekst('ekspanderbarhjelp.prosenten_lavere_enn_forventet_arbeidstaker.innhold1')}
                                </BodyLong>
                                <BodyLong spacing>
                                    {tekst('ekspanderbarhjelp.prosenten_lavere_enn_forventet_arbeidstaker.innhold2')}
                                </BodyLong>
                                <RadioGroup legend={tekst('ekspanderbarhjelp.helligdager.enkelt-tittel')} size="medium">
                                    <Radio
                                        value={tekst('ekspanderbarhjelp.helligdager.enkelt-svar-Ja')}
                                        onClick={() => {
                                            if (!surveySvart) {
                                                setSurveySvart(true)
                                                logEvent('skjema spørsmål besvart', {
                                                    skjemanavn: 'hjelpetekst',
                                                    spørsmål: tekst('ekspanderbarhjelp.helligdager.enkelt-tittel'),
                                                    svar: tekst('ekspanderbarhjelp.helligdager.enkelt-svar-Ja'),
                                                })
                                            }
                                        }}
                                    >
                                        {tekst('ekspanderbarhjelp.helligdager.enkelt-svar-Ja')}
                                    </Radio>
                                    <Radio
                                        value={tekst('ekspanderbarhjelp.helligdager.enkelt-svar-Nei')}
                                        onClick={() => {
                                            if (!surveySvart) {
                                                setSurveySvart(true)
                                                logEvent('skjema spørsmål besvart', {
                                                    skjemanavn: 'hjelpetekst',
                                                    spørsmål: tekst('ekspanderbarhjelp.helligdager.enkelt-tittel'),
                                                    svar: tekst('ekspanderbarhjelp.helligdager.enkelt-svar-Nei'),
                                                })
                                            }
                                        }}
                                    >
                                        {tekst('ekspanderbarhjelp.helligdager.enkelt-svar-Nei')}
                                    </Radio>
                                </RadioGroup>
                            </div>
                        </Ekspanderbar>
                    </>
                )}
            />
        </>
    )
}

export default RadioKomp
