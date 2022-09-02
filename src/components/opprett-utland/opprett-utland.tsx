import { Alert, Button, Heading } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React from 'react'
import { useHistory } from 'react-router'

import { redirectTilLoginHvis401 } from '../../data/rest/utils'
import { useAppStore } from '../../data/stores/app-store'
import { Soknad } from '../../types/types'
import fetchMedRequestId from '../../utils/fetch'
import { logger } from '../../utils/logger'
import { tekst } from '../../utils/tekster'
import { urlTilSoknad } from '../soknad/soknad-link'
import Bjorn from '../sporsmal/bjorn/bjorn'
import Vis from '../vis'

const OpprettUtland = () => {
    const { soknader, setSoknader, setFeilmeldingTekst, feilmeldingTekst } = useAppStore()

    const history = useHistory()

    const opprett = async () => {
        let fetchResult
        const url = '/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/opprettSoknadUtland'
        const options: RequestInit = {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        }
        try {
            fetchResult = await fetchMedRequestId(url, options)
        } catch (e) {
            return
        }

        const response = fetchResult.response
        if (redirectTilLoginHvis401(response)) {
            return
        }

        if (!response.ok) {
            logger.error(
                `Feil ved kall til: ${options.method} ${url} med HTTP-kode: ${response.status} og x_request_id: ${fetchResult.requestId}.`
            )
            setFeilmeldingTekst(tekst('opprett-utland.feilet'))
            return
        }

        let data
        try {
            data = await response.json()
        } catch (e) {
            logger.error(
                `${e} - Kall til: ${options.method} ${url} feilet HTTP-kode: ${response.status} ved parsing av JSON for x_request_id: ${fetchResult.requestId} med data: ${response.body}`
            )
            return
        }

        const soknad = new Soknad(data)
        if (!soknader.find((s) => s.id === soknad.id)) {
            soknader.push(soknad)
            setSoknader(soknader)
        }
        history.push(urlTilSoknad(soknad))
        setFeilmeldingTekst('')
    }

    return (
        <div id="opprett_utland_main" className="opprett-utland">
            <div className="sidebanner sidebanner--utenramme">
                <div className="sidebanner__innhold blokk--xl">
                    <Bjorn nokkel="opprett-utland.bjorn" hvit={true} vertikal={true} stor={true} />
                </div>
            </div>
            <div className="begrensning">
                <header className="sidetopp">
                    <Heading spacing size="xlarge" level="1" className="opprett-utland__tittel">
                        {tekst('opprett-utland.tittel')}
                    </Heading>
                </header>

                <div className="panel blokk redaksjonelt-innhold">
                    {parser(tekst('opprett-utland.trenger-ikke-soke'))}
                </div>

                <div className="knapperad">
                    <Button variant="primary" type="button" onClick={opprett}>
                        {tekst('opprett-utland.fortsett')}
                    </Button>

                    <div aria-live="polite">
                        <Vis hvis={feilmeldingTekst} render={() => <Alert variant="error">{feilmeldingTekst}</Alert>} />
                    </div>

                    <a
                        className="blokk"
                        href="https://www.nav.no/no/NAV+og+samfunn/Om+NAV/personvern-i-arbeids-og-velferdsetaten"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {tekst('opprett-utland.personvern')}
                    </a>
                </div>
            </div>
        </div>
    )
}

export default OpprettUtland
