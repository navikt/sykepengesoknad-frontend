import { Alert, Button } from '@navikt/ds-react'
import React from 'react'
import { UseQueryResult } from '@tanstack/react-query'

import useSoknader from '../../hooks/useSoknader'
import useSoknad from '../../hooks/useSoknad'
import useSykmeldinger from '../../hooks/useSykmeldinger'
import useSykmelding from '../../hooks/useSykmelding'

interface QueryStatusPanelProps {
    valgSoknadId?: string
    valgSykmeldingId?: string
}

interface QueryOgFeilmelding {
    query: UseQueryResult
    message: string
}

const QueryStatusPanel = ({ valgSoknadId, valgSykmeldingId }: QueryStatusPanelProps) => {
    const sykmeldinger: QueryOgFeilmelding = {
        query: useSykmeldinger(),
        message: 'Kunne ikke hente dine sykmeldinger',
    }

    const sykmelding: QueryOgFeilmelding = {
        query: useSykmelding(valgSykmeldingId),
        message: 'Kunne ikke hente din sykmelding',
    }

    const soknader: QueryOgFeilmelding = {
        query: useSoknader(),
        message: 'Kunne ikke hente dine søknader',
    }

    const soknad: QueryOgFeilmelding = {
        query: useSoknad(valgSoknadId, valgSoknadId !== undefined),
        message: 'Kunne ikke hente din søknad',
    }

    const errorQueries = [soknader, soknad, sykmeldinger, sykmelding].filter((a) => a.query.isError)

    return (
        <>
            {errorQueries.length > 0 && (
                <Alert variant="warning">
                    <strong>Ai ai ai!</strong>
                    <span> Vi har problemer med noen av baksystemene nå. </span>
                    <ul>
                        {errorQueries.map((e, idx) => (
                            <li key={idx}>{e.message}</li>
                        ))}
                    </ul>

                    <Button
                        type="button"
                        className="mt-4"
                        onClick={() => {
                            errorQueries.forEach((a) => a.query.refetch())
                        }}
                    >
                        Hent på nytt
                    </Button>
                </Alert>
            )}
        </>
    )
}

export default QueryStatusPanel
