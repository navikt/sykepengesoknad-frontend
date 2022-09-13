import { BodyShort, Label } from '@navikt/ds-react'
import { logger } from '@navikt/next-logger'
import parser from 'html-react-parser'
import React, { useCallback, useEffect, useState } from 'react'

import { isMockBackend, isProd } from '../../../utils/environment'
import { AuthenticationError, fetchJsonMedRequestId } from '../../../utils/fetch'
import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'

const Kontonummer = () => {
    const [kontonummer, setKontonummer] = useState<string>()

    const fetchData = useCallback(async () => {
        const data = await fetchJsonMedRequestId('https://www.nav.no/person/personopplysninger-api/personalia', {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
        })
        setKontonummer(data?.personalia?.kontonr)
    }, [])

    useEffect(() => {
        if (isProd()) {
            fetchData().catch((e: Error) => {
                if (!(e instanceof AuthenticationError)) {
                    logger.error(e)
                }
                return
            })
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
