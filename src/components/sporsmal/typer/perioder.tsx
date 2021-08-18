import { Element } from 'nav-frontend-typografi'
import React, { useEffect, useRef, useState } from 'react'
import useForceUpdate from 'use-force-update'

import { tekst } from '../../../utils/tekster'
import { hentPerioder } from '../hent-svar'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import PeriodeKomp from './periode-komp'

const Perioder = ({ sporsmal }: SpmProps) => {
    const [ lokal, setLokal ] = useState<number[]>([ 0 ])
    const periodeliste = useRef<HTMLUListElement>(null)
    const forceUpdate = useForceUpdate()

    useEffect(() => {
        const svar = hentPerioder(sporsmal)
        setLokal(svar.length > 0 ? svar : lokal)
        // eslint-disable-next-line
    }, [ sporsmal ])

    const slettPeriode = (e: any, idx: number) => {
        e.preventDefault()
        const index = lokal.findIndex(value => value === idx)
        lokal.splice(index, 1)
        setLokal(lokal)
        forceUpdate()
    }

    const leggTilPeriode = (e: any) => {
        e.preventDefault()
        lokal.push(lokal[lokal.length - 1] + 1)
        setLokal(lokal)
        forceUpdate()
    }

    return (
        <div className={sporsmal.parentKriterie ? 'kriterie--' + sporsmal.parentKriterie.toLowerCase() : ''}>
            <Element tag="h3" className="skjema__sporsmal">
                {sporsmal.sporsmalstekst}
            </Element>

            <ul className="periodeliste" ref={periodeliste}>
                {lokal.map((idx) => {
                    return <PeriodeKomp sporsmal={sporsmal} index={idx} slettPeriode={slettPeriode} key={idx} />
                })}
            </ul>

            <button role="link" className="periodeknapp lenke" onClick={leggTilPeriode}>
                {tekst('sykepengesoknad.periodevelger.legg-til-ekstra')}
            </button>

            <div className="undersporsmal">
                <UndersporsmalListe oversporsmal={sporsmal} />
            </div>
        </div>
    )
}

export default Perioder
