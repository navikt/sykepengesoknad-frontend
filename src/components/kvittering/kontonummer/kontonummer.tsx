import { BodyShort, Label } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React, { useCallback, useEffect, useState } from 'react'

import { redirectTilLoginHvis401 } from '../../../data/rest/utils'
import { isMockBackend, isProd } from '../../../utils/environment'
import fetchMedRequestId from '../../../utils/fetch'
import { logger } from '../../../utils/logger'
import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'

const Kontonummer = () => {
    const [kontonummer, setKontonummer] = useState<string>()

    const fetchData = useCallback(async () => {
        let fetchResult
        const url = 'https://www.nav.no/person/personopplysninger-api/personalia'
        const options: RequestInit = {
            method: 'GET',
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
            return
        }

        let data
        try {
            data = await fetchResult.response.json()
        } catch (e) {
            logger.error(
                `${e} - Kall til: ${options.method} ${url} feilet HTTP-kode: ${response.status} ved parsing av JSON for x_request_id: ${fetchResult.requestId} med data: ${response.body}`
            )
            return
        }
        setKontonummer(data?.personalia?.kontonr)
    }, [])

    useEffect(() => {
        if (isProd()) {
            fetchData().catch((e: Error) => logger.error(e.message))
        }

        if (isMockBackend()) {
            setKontonummer('12332112332')
        }
    }, [fetchData])

    const formatterKontonr = (kontonummer: string) =>
        kontonummer.length === 11 ? kontonummer.replace(/^(.{4})(.{2})(.*)$/, '$1 $2 $3') : kontonummer

    return (
        <>
            <Label as="h2">{tekst('kvittering.kontonummer.tittel')}</Label>

            <Vis
                hvis={!kontonummer}
                render={() => <BodyShort>{parser(tekst('kvittering.kontonummer.mangler'))}</BodyShort>}
            />

            <Vis
                hvis={kontonummer}
                render={() => (
                    <>
                        <BodyShort>
                            <strong>{formatterKontonr(kontonummer!)}</strong>
                        </BodyShort>
                        <BodyShort>{parser(tekst('kvittering.kontonummer.endre'))}</BodyShort>
                    </>
                )}
            />
        </>
    )
}

export default Kontonummer
