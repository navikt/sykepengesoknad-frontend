import { Label } from '@navikt/ds-react'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import validerLand from '../../../utils/sporsmal/valider-land'
import FeilLokal from '../../feil/feil-lokal'
import LandvelgerComponent from '../landvelger/landvelger'
import { SpmProps } from '../sporsmal-form/sporsmal-form'

const Land = ({ sporsmal }: SpmProps) => {
    const { getValues } = useFormContext()

    return (
        <>
            <div
                className={
                    sporsmal.parentKriterie
                        ? 'kriterie--' + sporsmal.parentKriterie.toLowerCase() + ' skjemaelement'
                        : 'skjemaelement'
                }
            >
                <Label as="h3" className="skjema__sporsmal">
                    {sporsmal.sporsmalstekst}
                </Label>

                <Controller
                    name={sporsmal.id}
                    rules={{
                        validate: () => validerLand(sporsmal, getValues(sporsmal.id)),
                    }}
                    render={({ field }) => (
                        <LandvelgerComponent
                            verdierInn={sporsmal.svarliste.svar.map((i) => i.verdi)}
                            sporsmalId={field.name}
                            name={field.name}
                            onChange={field.onChange}
                        />
                    )}
                />
            </div>

            <FeilLokal sporsmal={sporsmal} />
        </>
    )
}

export default Land
