import { Label } from '@navikt/ds-react'
import React from 'react'

import FeilLokal from '../../feil/feil-lokal'
import GuidepanelUnderSporsmalstekst from '../guidepanel/GuidepanelUnderSporsmalstekst'
import { SpmProps } from '../sporsmal-form/sporsmal-form'

import BehandlingsUke from './behandlings-uke'

const BehDager = ({ sporsmal }: SpmProps) => {
    return (
        <>
            <Label as="h2" className="skjema__sporsmal">
                {sporsmal.sporsmalstekst}
            </Label>

            <GuidepanelUnderSporsmalstekst sporsmal={sporsmal} />

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
                        return <BehandlingsUke key={ukeidx} sporsmal={sporsmal} ukespm={ukespm} ukeidx={ukeidx} />
                    })}
                </div>
            </div>

            <FeilLokal sporsmal={sporsmal} />
        </>
    )
}

export default BehDager
