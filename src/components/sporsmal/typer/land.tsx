import { Element } from 'nav-frontend-typografi'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import validerLand from '../../../utils/sporsmal/valider-land'
import FeilLokal from '../../feil/feil-lokal'
import { hentSvar } from '../hent-svar'
import LandvelgerComponent from '../landvelger/landvelger'
import { SpmProps } from '../sporsmal-form/sporsmal-form'

const Land = ({ sporsmal }: SpmProps) => {
    const { getValues } = useFormContext()

    return (
        <>
            <div className={sporsmal.parentKriterie
                ? 'kriterie--' + sporsmal.parentKriterie.toLowerCase() + ' skjemaelement'
                : 'skjemaelement'
            }>

                <Element tag="h3" className="skjema__sporsmal">{sporsmal.sporsmalstekst}</Element>

                <Controller
                    name={sporsmal.id}
                    defaultValue={hentSvar(sporsmal)}
                    rules={{
                        validate: () => validerLand(sporsmal, getValues(sporsmal.id))
                    }}
                    render={() => (
                        <LandvelgerComponent
                            verdierInn={sporsmal.svarliste.svar.map((i) => i.verdi)}
                            sporsmalId={sporsmal.id}
                            name={sporsmal.id}
                            onChange={(values: string[]) => {
                                return values[0]
                            }}
                        />
                    )}
                />
            </div>

            <FeilLokal sporsmal={sporsmal} />
        </>
    )
}

export default Land
