import './opprett-utland.less'

import parser from 'html-react-parser'
import React, { useEffect } from 'react'

import Bjorn from '../../components/sporsmal/bjorn/bjorn'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'


const OpprettUtland = () => {

    useEffect(() => {
        setBodyClass('soknader')
    }, [])

    return (
        <>
            <div className={'opprett-utland'}>
                <div className="sidebanner sidebanner--utenramme">
                    <div className="sidebanner__innhold blokk--xl">
                        <Bjorn nokkel={'opprett-utland.bjorn'} hvit={true} vertikal={true} stor={true} />
                    </div>
                </div>
                <div className="begrensning">
                    <header className="sidetopp"><h1
                        className="opprett-utland__tittel">{tekst('opprett-utland.tittel')}</h1></header>
                    <div className="panel blokk redaksjonelt-innhold">
                        {parser(tekst('opprett-utland.trenger-ikke-soke'))}
                    </div>

                    <div className="knapperad">
                        <p>
                            <button className="knapp js-submit knapp--hoved" type="submit">
                                {tekst('opprett-utland.fortsett')}
                            </button>
                        </p>
                        <p className="blokk"><a
                            href="https://www.nav.no/no/NAV+og+samfunn/Om+NAV/personvern-i-arbeids-og-velferdsetaten"
                            target="_blank" rel="noopener noreferrer">
                            {tekst('opprett-utland.personvern')}

                        </a></p></div>
                </div>
            </div>
        </>
    )
}

export default OpprettUtland

