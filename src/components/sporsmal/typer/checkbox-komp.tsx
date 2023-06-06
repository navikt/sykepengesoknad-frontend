import { CheckboxGroup, Checkbox } from '@navikt/ds-react'
import React, { Fragment } from 'react'
import { useFormContext, Controller } from 'react-hook-form'

import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import Vis from '../../vis'

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

    return (
        <Controller
            name={sporsmal.id}
            rules={{ required: feilmelding.global }}
            render={({ field }) => (
                <CheckboxGroup
                    {...field}
                    legend={sporsmal.sporsmalstekst}
                    error={errors[sporsmal.id] !== undefined && feilmelding.lokal}
                    className="mt-8"
                >
                    {sporsmal.undersporsmal.map((uspm) => (
                        <Fragment key={uspm.id + '_fragment'}>
                            <Checkbox id={uspm.id} value={uspm.sporsmalstekst}>
                                {uspm.sporsmalstekst}
                            </Checkbox>
                            <Vis
                                hvis={watchCheckbox?.includes(uspm.sporsmalstekst)}
                                render={() => (
                                    <div aria-live="assertive">
                                        <UndersporsmalListe oversporsmal={uspm} oversporsmalSvar="CHECKED" />
                                    </div>
                                )}
                            />
                        </Fragment>
                    ))}
                </CheckboxGroup>
            )}
        />
    )
}

export default CheckboxKomp
