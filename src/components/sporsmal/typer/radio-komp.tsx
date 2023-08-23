import { BodyShort, List, Radio, RadioGroup } from '@navikt/ds-react'
import React, { Fragment } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import { Sporsmal } from '../../../types/types'
import { TagTyper } from '../../../types/enums'
import { Begrepsforklarer } from '../../begrepsforklarer/begrepsforklarer'
import { AndreInntektskilderHjelpTekster } from '../../hjelpetekster/ekspanderbar-hjelp/andre-inntektskilder-hjelp-tekst'

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

    const forklaringAvSporsmal = (sporsmal: Sporsmal) => {
        if (sporsmal.tag == TagTyper.INNTEKTSKILDE_SELVSTENDIG_VARIG_ENDRING_GRUPPE) {
            return (
                <BodyShort>
                    Varig endring av arbeidssituasjon eller virksomhet kan være at:
                    <List as="ul" size="small" className="ml-4">
                        <List.Item>
                            <BodyShort>tidligere virksomhet er lagt ned</BodyShort>
                        </List.Item>
                        <List.Item>
                            <BodyShort>det har vært en omlegging av virksomheten</BodyShort>
                        </List.Item>
                        <List.Item>
                            <BodyShort>den næringsdrivende har økt eller redusert arbeidsinnsatsen</BodyShort>
                        </List.Item>
                    </List>
                </BodyShort>
            )
        }
    }

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
                        {forklaringAvSporsmal(sporsmal)}

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
