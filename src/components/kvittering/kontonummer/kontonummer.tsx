import { BodyShort, Label } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React, { useEffect, useState } from 'react'

import { Personalia } from '../../../types/types'
import { isMockBackend, isProd } from '../../../utils/environment'
import fetchMedRequestId from '../../../utils/fetch'
import { logger } from '../../../utils/logger'
import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'

const Kontonummer = () => {
    const [kontonummer, setKontonummer] = useState<string>()

    useEffect(() => {
        const fetchData = async () => {
            let response
            try {
                response = await fetchMedRequestId('https://www.nav.no/person/personopplysninger-api/personalia', {
                    method: 'GET',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                })
            } catch (e) {
                return
            }

            let data: Personalia
            try {
                data = await response.json()
            } catch (e) {
                logger.error('Feilet ved parsing av JSON.', e)
                return
            }
            setKontonummer(data?.personalia?.kontonr)
        }

        if (isProd()) {
            fetchData().catch((e: Error) => logger.error(e.message))
        }

        if (isMockBackend()) {
            setKontonummer('12332112332')
        }
    }, [])

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
