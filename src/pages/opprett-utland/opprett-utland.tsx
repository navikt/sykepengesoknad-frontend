import './opprett-utland.less'

import parser from 'html-react-parser'
import Alertstripe from 'nav-frontend-alertstriper'
import { Knapp } from 'nav-frontend-knapper'
import React from 'react'
import { useHistory } from 'react-router'

import Bjorn from '../../components/sporsmal/bjorn/bjorn'
import VisBlock from '../../components/vis-block'
import useFetch from '../../data/rest/use-fetch'
import { FetchState, hasData } from '../../data/rest/utils'
import { useAppStore } from '../../data/stores/app-store'
import { RSSoknad } from '../../types/rs-types/rs-soknad'
import { Soknad } from '../../types/types'
import env from '../../utils/environment'
import { logger } from '../../utils/logger'
import { tekst } from '../../utils/tekster'
import { getUrlTilSoknad } from '../../utils/url-utils'


const OpprettUtland = () => {
    const { soknader, setSoknader, setFeilmeldingTekst, feilmeldingTekst } = useAppStore()

    const opprettUtland = useFetch<RSSoknad>()
    const history = useHistory()

    const opprett = () => {
        opprettUtland.fetch(`${env.flexGatewayRoot}/syfosoknad/api/opprettSoknadUtland`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }, (fetchState: FetchState<RSSoknad>) => {
            if (hasData(fetchState)) {
                const soknad = new Soknad(fetchState.data)
                if (!soknader.find(s => s.id === soknad.id)) {
                    soknader.push(soknad)
                    setSoknader(soknader)
                }
                history.push(getUrlTilSoknad(soknad))
                setFeilmeldingTekst('')
            } else {
                logger.error('Feil ved opprettelse av utlandssøknad', fetchState)
                setFeilmeldingTekst(tekst('opprett-utland.feilet'))
            }
        })
    }

    return (
        <div id="opprett_utland_main" className={'opprett-utland'}>
            <div className="sidebanner sidebanner--utenramme">
                <div className="sidebanner__innhold blokk--xl">
                    <Bjorn nokkel={'opprett-utland.bjorn'} hvit={true} vertikal={true} stor={true} />
                </div>
            </div>
            <div className="begrensning">
                <header className="sidetopp">
                    <h1 className="opprett-utland__tittel">{tekst('opprett-utland.tittel')}</h1>
                </header>

                <div className="panel blokk redaksjonelt-innhold">
                    {parser(tekst('opprett-utland.trenger-ikke-soke'))}
                </div>

                <div className="knapperad">
                    <Knapp type="hoved" htmlType={'button'}
                        onClick={opprett}>{tekst('opprett-utland.fortsett')}
                    </Knapp>

                    <div aria-live="polite">
                        <VisBlock hvis={feilmeldingTekst !== ''}
                            render={() => <Alertstripe type="feil">{feilmeldingTekst}</Alertstripe>}
                        />
                    </div>

                    <a className="blokk" href="https://www.nav.no/no/NAV+og+samfunn/Om+NAV/personvern-i-arbeids-og-velferdsetaten"
                        target="_blank" rel="noopener noreferrer">
                        {tekst('opprett-utland.personvern')}
                    </a>
                </div>
            </div>
        </div>
    )
}

export default OpprettUtland

