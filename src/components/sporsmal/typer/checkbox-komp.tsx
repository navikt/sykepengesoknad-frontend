import { BodyShort, Checkbox, CheckboxGroup } from '@navikt/ds-react'
import React, { Fragment } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import cn from 'classnames'

import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import Vis from '../../vis'
import { Sporsmal } from '../../../types/types'
import { TagTyper } from '../../../types/enums'
import { SvaralternativCheckboxForklaring } from "../svaralternativ-checkbox-forklaring";

const ForklaringAvValgtCheckbox = (svaralternativ: Sporsmal) => {
    if (svaralternativ.tag === TagTyper.INNTEKTSKILDE_SELVSTENDIG) {
        return (
            <BodyShort>
                Dette betyr at du er selvstendig næringsdrivende. Du driver en bedrift for egen regning og risiko,
                leverer skattemelding for næringsdrivende, fakturerer kunder og (ofte) lever av overskuddet. Du er din
                egen sjef og ikke ansatt av andre i et arbeidsforhold.
            </BodyShort>
        )
    }

    if (svaralternativ.tag === TagTyper.INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD) {
        return (
            <BodyShort>
                Dette betyr at du er ansatt hos en eller flere arbeidsgiverne som ikke er kjent for oss enda og derfor
                ikke ligger i listen ovenfor.
            </BodyShort>
        )
    }

    return <Fragment />
}

const undertekst = (tekst: string | null) => {
    return <BodyShort size="small">{tekst}</BodyShort>
}
const CheckboxKomp = ({ sporsmal }: SpmProps) => {
    const {
        formState: { errors },
        watch,
        getValues,
    } = useFormContext()
    let watchCheckbox = watch(sporsmal.id)
    if (watchCheckbox === undefined) {
        watchCheckbox = getValues(sporsmal.id)
    }
    const feilmelding = hentFeilmelding(sporsmal)

    const checkboxesSkalHaSpesiellStyling = (sporsmalTag: TagTyper) =>
        sporsmalTag == TagTyper.HVILKE_ANDRE_INNTEKTSKILDER

    return (
        <Controller
            name={sporsmal.id}
            rules={{ required: feilmelding.global }}
            render={({ field }) => (
                <div
                    className={cn('', {
                        'max-w-sm': checkboxesSkalHaSpesiellStyling(sporsmal.tag),
                    })}
                >
                    <CheckboxGroup
                        {...field}
                        legend={sporsmal.sporsmalstekst}
                        description={undertekst(sporsmal.undertekst)}
                        error={errors[sporsmal.id] !== undefined && feilmelding.lokal}
                    >
                        <div className="mt-4 space-y-2">
                            {sporsmal.undersporsmal.map((uspm) => (
                                <Fragment key={uspm.id + '_fragment'}>
                                    <div
                                        className={cn('flex items-center gap-4', {
                                            'bx-4 max-w-sm rounded-lg bg-gray-50': checkboxesSkalHaSpesiellStyling(
                                                sporsmal.tag,
                                            ),
                                        })}
                                    >
                                        <Checkbox id={uspm.id} value={uspm.sporsmalstekst} className="pl-3">
                                            <BodyShort
                                                className={
                                                    watchCheckbox?.includes(uspm.sporsmalstekst) ? 'font-bold' : ''
                                                }
                                            >
                                                {uspm.sporsmalstekst}
                                            </BodyShort>
                                        </Checkbox>
                                    </div>
                                    <Vis
                                        hvis={
                                            watchCheckbox?.includes(uspm.sporsmalstekst) &&
                                            uspm.undersporsmal.length > 0
                                        }
                                        render={() => (
                                            <div aria-live="assertive" className="my-4 max-w-sm pl-3">
                                                <SvaralternativCheckboxForklaring svaralternativTag={uspm.tag} />
                                                <UndersporsmalListe oversporsmal={uspm} oversporsmalSvar="CHECKED" />
                                            </div>
                                        )}
                                    />
                                </Fragment>
                            ))}
                        </div>
                    </CheckboxGroup>
                </div>
            )}
        />
    )
}

export default CheckboxKomp
