import './beh.dager.less'

import React from 'react'

import FeilLokal from '../../feil/feil-lokal'
import BjornUnderSporsmalstekst from '../bjorn/bjorn-under-sporsmalstekst'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import SporsmalstekstH3 from '../sporsmalstekst/sporsmalstekstH3'
import BehandlingsUke from './behandlings-uke'

const BehDager = ({ sporsmal }: SpmProps) => {
    return (
        <>
            <SporsmalstekstH3 sporsmal={sporsmal} />

            <BjornUnderSporsmalstekst sporsmal={sporsmal} />

            <div className="skjemaelement">
                <div className="skjema__beh-dager">
                    <div className="ukedager">
                        <span>Man</span>
                        <span>Tir</span>
                        <span>Ons</span>
                        <span>Tor</span>
                        <span>Fre</span>
                    </div>

                    {sporsmal.undersporsmal.map((ukespm, ukeidx) => {
                        return (
                            <BehandlingsUke key={ukeidx} sporsmal={sporsmal} ukespm={ukespm} ukeidx={ukeidx} />
                        )
                    })}
                </div>
            </div>

            <FeilLokal sporsmal={sporsmal} />
        </>
    )
}

export default BehDager
