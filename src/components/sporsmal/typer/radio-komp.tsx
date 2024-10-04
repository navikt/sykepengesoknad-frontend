import { BodyShort, Radio, RadioGroup } from '@navikt/ds-react'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { hentFeilmelding } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import { EkspanderbarHjelp } from '../../hjelpetekster/ekspanderbar-hjelp/ekspanderbar-hjelp'
import { NyIArbeidslivertAlert } from '../../hjelpetekster/ny-i-arbeidslivert-alert'
import { cn } from '../../../utils/tw-utils'
import { erSigrunInntekt, SigrunInntekt, Sporsmal } from '../../../types/types'
import { useRadiogruppeTastaturNavigasjon } from '../../../utils/tastatur-navigasjon'
import { logEvent } from '../../amplitude/amplitude'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'
import { hentUndersporsmal } from '../../../utils/soknad-utils'

import { jaNeiStorStyle, JaNeiStyle } from './ja-nei-stor-style'
import { BeregningSykepengegrunnlagInfo } from './beregning-sykepengegrunnlag-info'

const RadioKomp = ({ sporsmal, erHovedsporsmal }: { sporsmal: Sporsmal; erHovedsporsmal: boolean }) => {
    const {
        formState: { errors },
        watch,
        getValues,
    } = useFormContext()
    let watchRadio = watch(sporsmal?.id)
    if (watchRadio === undefined) {
        watchRadio = getValues(sporsmal?.id)
    }
    const { valgtSoknad } = useSoknadMedDetaljer()

    const feilmelding = hentFeilmelding(sporsmal)
    const error = errors[sporsmal.id] !== undefined
    useRadiogruppeTastaturNavigasjon(sporsmal, erHovedsporsmal)
    const erHovedJaNei =
        sporsmal.undersporsmal.length == 2 &&
        sporsmal.undersporsmal.some((uspm) => uspm.sporsmalstekst == 'Ja') &&
        sporsmal.undersporsmal.some((uspm) => uspm.sporsmalstekst == 'Nei') &&
        erHovedsporsmal

    const varigEndringSporsmal = hentUndersporsmal(sporsmal, 'INNTEKTSOPPLYSNINGER_VARIG_ENDRING_25_PROSENT')
    const inntektMetadata = erSigrunInntekt(varigEndringSporsmal?.metadata?.sigrunInntekt)
        ? (varigEndringSporsmal.metadata?.sigrunInntekt as SigrunInntekt)
        : undefined

    return (
        <>
            {sporsmal.tag === 'INNTEKTSOPPLYSNINGER_NY_I_ARBEIDSLIVET' && (
                <div className="mb-4">
                    <BeregningSykepengegrunnlagInfo />
                </div>
            )}

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
                        className={cn({ 'mt-8': !erHovedJaNei })}
                        data-cy="radio-komp"
                    >
                        {sporsmal.tag === 'INNTEKTSOPPLYSNINGER_NY_I_ARBEIDSLIVET' && inntektMetadata !== undefined && (
                            <BodyShort size="small" className="text-text-subtle">
                                Datoen er første dag i det første av tre av de ferdiglignede årene.
                            </BodyShort>
                        )}

                        <EkspanderbarHjelp
                            sporsmal={sporsmal}
                            key="radio-komp-hjelp"
                            mb={!erHovedsporsmal ? 'mb-4' : undefined}
                        />

                        {!erHovedJaNei &&
                            sporsmal.undersporsmal.map((uspm) => (
                                <Radio key={uspm.id} id={uspm.id} value={uspm.sporsmalstekst}>
                                    {uspm.sporsmalstekst}
                                </Radio>
                            ))}
                        {erHovedJaNei && (
                            <JaNeiStyle>
                                <Radio
                                    key={sporsmal.undersporsmal[0].id}
                                    id={sporsmal.undersporsmal[0].id}
                                    value={sporsmal.undersporsmal[0].sporsmalstekst}
                                    className={jaNeiStorStyle(
                                        sporsmal.undersporsmal[0].sporsmalstekst,
                                        watchRadio,
                                        error,
                                    )}
                                >
                                    {sporsmal.undersporsmal[0].sporsmalstekst}
                                </Radio>
                                <Radio
                                    key={sporsmal.undersporsmal[1].id}
                                    id={sporsmal.undersporsmal[1].id}
                                    value={sporsmal.undersporsmal[1].sporsmalstekst}
                                    className={jaNeiStorStyle(
                                        sporsmal.undersporsmal[1].sporsmalstekst,
                                        watchRadio,
                                        error,
                                        true,
                                    )}
                                >
                                    {sporsmal.undersporsmal[1].sporsmalstekst}
                                </Radio>
                            </JaNeiStyle>
                        )}
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
            {sporsmal.tag === 'INNTEKTSOPPLYSNINGER_NY_I_ARBEIDSLIVET' && watchRadio == 'Ja' && (
                <NyIArbeidslivertAlert />
            )}
        </>
    )
}

export default RadioKomp
