import { Radio, RadioGroup } from '@navikt/ds-react'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { hentFeilmelding } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import { EkspanderbarHjelp } from '../../hjelpetekster/ekspanderbar-hjelp/ekspanderbar-hjelp'
import { NyIArbeidslivertAlert } from '../../hjelpetekster/ny-i-arbeidslivert-alert'
import { cn } from '../../../utils/tw-utils'
import { Sporsmal } from '../../../types/types'
import { useRadiogruppeKeyboardNavigation } from '../../../utils/keyboard-navigation'

import { jaNeiStorStyle, JaNeiStyle } from './ja-nei-stor-style'

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

    const feilmelding = hentFeilmelding(sporsmal)
    const error = errors[sporsmal.id] !== undefined
    useRadiogruppeKeyboardNavigation(sporsmal, erHovedsporsmal)
    const erHovedJaNei =
        sporsmal.undersporsmal.length == 2 &&
        sporsmal.undersporsmal.some((uspm) => uspm.sporsmalstekst == 'Ja') &&
        sporsmal.undersporsmal.some((uspm) => uspm.sporsmalstekst == 'Nei') &&
        erHovedsporsmal
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
                        className={cn({ 'mt-8': !erHovedJaNei })}
                        data-cy="radio-komp"
                    >
                        <EkspanderbarHjelp sporsmal={sporsmal} key="radio-komp-hjelp" />

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
