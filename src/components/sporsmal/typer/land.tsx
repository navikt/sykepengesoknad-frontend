import { Element } from 'nav-frontend-typografi'
import React, { useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import validerLand from '../../../utils/sporsmal/valider-land'
import FeilLokal from '../../feil/feil-lokal'
import { hentSvar } from '../hent-svar'
import LandvelgerComponent from '../landvelger/landvelger'
import { SpmProps } from '../sporsmal-form/sporsmal-form'

export default ({ sporsmal }: SpmProps) => {
    const { setValue, getValues } = useFormContext()

    useEffect(() => {
        setValue(sporsmal.id, hentSvar(sporsmal))
    }, [ sporsmal, setValue ])

    return (
        <>
            <div className={sporsmal.parentKriterie
                ? 'kriterie--' + sporsmal.parentKriterie.toLowerCase() + ' skjemaelement'
                : 'skjemaelement'
            }>

                <Element tag="h3" className="skjema__sporsmal">{sporsmal.sporsmalstekst}</Element>

                <Controller
                    as={LandvelgerComponent}
                    id={sporsmal.id}
                    name={sporsmal.id}
                    onChange={(values: string[]) => {
                        return values[0]
                    }}
                    rules={{
                        validate: () => validerLand(sporsmal, getValues())
                    }}
                    verdierInn={sporsmal.svarliste.svar.map((i) => i.verdi)}
                />

            </div>

            <FeilLokal sporsmal={sporsmal} />
        </>
    )
}

