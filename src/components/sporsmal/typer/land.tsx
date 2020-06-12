import { Element, Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import Vis from '../../vis'
import LandvelgerComponent from '../landvelger/landvelger'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'

export default ({ sporsmal }: SpmProps) => {
    const { errors, setValue } = useFormContext()
    const feilmelding = hentFeilmelding(sporsmal)

    useEffect(() => {
        setValue(sporsmal.id, sporsmal.svarliste.svar.map((i) => i.verdi))
        // eslint-disable-next-line
    }, [sporsmal]);

    return (
        <>
            <div className={sporsmal.parentKriterie
                ? 'kriterie--' + sporsmal.parentKriterie.toLowerCase() + ' skjemaelement'
                : 'skjemaelement'
            }>

                <Element tag='h3' className='skjema__sporsmal'>{sporsmal.sporsmalstekst}</Element>


                <Controller
                    as={LandvelgerComponent}
                    rules={{ required: feilmelding.global }}
                    id={sporsmal.id}
                    name={sporsmal.id}
                    onChange={(s: string[]) => {
                        return s
                    }}
                    verdierInn={sporsmal.svarliste.svar.map((i) => i.verdi)}
                />

            </div>

            <div role='alert' aria-live='assertive'>
                <Vis hvis={errors[sporsmal.id]}>
                    <Normaltekst tag='span' className='skjemaelement__feilmelding'>
                        <p>{feilmelding.lokal}</p>
                    </Normaltekst>
                </Vis>
            </div>
        </>
    )
}

