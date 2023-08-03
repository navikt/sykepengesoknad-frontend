import { BodyShort, Checkbox, CheckboxGroup } from '@navikt/ds-react'
import React, { Fragment } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

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
                            <div className="flex items-center gap-4">
                                <Checkbox id={uspm.id} value={uspm.sporsmalstekst}>
                                    {uspm.sporsmalstekst}
                                </Checkbox>
                            </div>
                            <Vis
                                hvis={watchCheckbox?.includes(uspm.sporsmalstekst) && uspm.undersporsmal.length > 0}
                                render={() => (
                                    <div aria-live="assertive" className="my-4 pl-8">
                                        <UndersporsmalListe oversporsmal={uspm} oversporsmalSvar="CHECKED" />
                                    </div>
                                )}
                            />
                        </Fragment>
                    ))}
                    <div className="flex gap-2 pl-1 pt-8">
                        <BodyShort className="text-gray-700">
                            Finner du ikke noe som passer for deg, velger du nei øverst
                        </BodyShort>
                    </div>
                </CheckboxGroup>
            )}
        />
    )
}

export default CheckboxKomp
