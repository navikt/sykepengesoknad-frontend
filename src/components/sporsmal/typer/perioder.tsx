import { Label } from '@navikt/ds-react'
import React, { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import useForceUpdate from 'use-force-update'

import { tekst } from '../../../utils/tekster'
import { hentPerioder } from '../hent-svar'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'

import PeriodeKomp from './periode-komp'

const Perioder = ({ sporsmal }: SpmProps) => {
    const { unregister } = useFormContext()
    const [lokal, setLokal] = useState<number[]>([0])
    const periodeliste = useRef<HTMLUListElement>(null)
    const forceUpdate = useForceUpdate()

    useEffect(() => {
        const svar = hentPerioder(sporsmal)
        setLokal(svar.length > 0 ? svar : lokal)
        // eslint-disable-next-line
    }, [sporsmal])

    const slettPeriode = (e: any, idx: number) => {
        e.preventDefault()
        const index = lokal.findIndex((value) => value === idx)
        lokal.splice(index, 1)
        setLokal(lokal)
        unregister(sporsmal.id + '_' + idx, { keepValue: false })
    }

    const leggTilPeriode = (e: any) => {
        e.preventDefault()
        lokal.push(lokal[lokal.length - 1] + 1)
        setLokal(lokal)
        forceUpdate()
    }

    return (
        <div className={sporsmal.parentKriterie ? 'kriterie--' + sporsmal.parentKriterie.toLowerCase() : ''}>
            <Label as="h3" className="skjema__sporsmal">
                {sporsmal.sporsmalstekst}
            </Label>

            <ul className="periodeliste" ref={periodeliste}>
                {lokal.map((idx) => {
                    return (
                        <PeriodeKomp
                            sporsmal={sporsmal}
                            index={idx}
                            slettPeriode={slettPeriode}
                            key={sporsmal.id + '_' + idx}
                        />
                    )
                })}
            </ul>

            <button role="link" className="lenkeknapp navds-link" onClick={leggTilPeriode}>
                {tekst('sykepengesoknad.periodevelger.legg-til-ekstra')}
            </button>

            <div aria-live="assertive" className="undersporsmal">
                <UndersporsmalListe oversporsmal={sporsmal} />
            </div>
        </div>
    )
}

export default Perioder
