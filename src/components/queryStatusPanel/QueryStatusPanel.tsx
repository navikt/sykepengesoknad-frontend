import { Alert, Button, Heading, Loader } from '@navikt/ds-react'
import React from 'react'
import { useIsFetching, UseQueryResult } from '@tanstack/react-query'

import useSoknader from '../../hooks/useSoknader'
import Vis from '../vis'
import useSoknad from '../../hooks/useSoknad'

interface QueryStatusPanelProps {
    valgSoknadId?: string
}

interface QueryOgFeilmelding {
    query: UseQueryResult
    message: string
}

const QueryStatusPanel = ({ valgSoknadId }: QueryStatusPanelProps) => {
    const isFetching = useIsFetching()

    /*
    // TODO: Legg også til sykmeldinger
    const sykmeldinger: QueryOgFeilmelding = {
        query: useSykmeldinger(),
        message: 'Kunne ikke hente dine sykmeldinger',
    }
    */
    const soknader: QueryOgFeilmelding = {
        query: useSoknader(),
        message: 'Kunne ikke hente dine søknader',
    }

    const soknad: QueryOgFeilmelding = {
        query: useSoknad(valgSoknadId, valgSoknadId !== undefined),
        message: 'Kunne ikke hente din søknad',
    }

    const errorQueries = [soknader, soknad].filter((a) => a.query.isError)

    return (
        <>
            <Vis
                hvis={isFetching > 0}
                render={() => (
                    <div className="query-status-panel">
                        <Heading size="small">Henter dine data</Heading>
                        {/* TODO: fjern onResize og onResizeCapture ved oppdatering til React 18. */}
                        <Loader onResize={undefined} onResizeCapture={undefined} />
                    </div>
                )}
            />
            <Vis
                hvis={errorQueries.length > 0}
                render={() => (
                    <Alert variant="warning" className="query-status-error">
                        <strong>Ai ai ai!</strong>
                        <span> Vi har problemer med noen av baksystemene nå. </span>
                        <ul>
                            {errorQueries.map((e, idx) => (
                                <li key={idx}>{e.message}</li>
                            ))}
                        </ul>

                        <Button
                            onClick={() => {
                                errorQueries.forEach((a) => a.query.refetch())
                            }}
                        >
                            Hent på nytt
                        </Button>
                    </Alert>
                )}
            />
        </>
    )
}

export default QueryStatusPanel
