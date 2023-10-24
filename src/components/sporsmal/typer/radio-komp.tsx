import { Radio, RadioGroup } from '@navikt/ds-react'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import { ForklaringAvVarigEndringSporsmal } from '../forklaring-av-varig-endring-sporsmal'

const RadioKomp = ({ sporsmal }: SpmProps) => {
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
                        data-cy="radio-komp"
                    >
                        {sporsmal.tag == 'INNTEKTSKILDE_SELVSTENDIG_VARIG_ENDRING_GRUPPE' && (
                            <ForklaringAvVarigEndringSporsmal key="forklaring-varig-endring" />
                        )}

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
        </>
    )
}

export default RadioKomp
