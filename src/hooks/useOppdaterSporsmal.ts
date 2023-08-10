import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetchJsonMedRequestId } from '../utils/fetch'
import { Soknad, Sporsmal } from '../types/types'
import { sporsmalToRS } from '../types/rs-types/rs-sporsmal'
import { RSOppdaterSporsmalResponse } from '../types/rs-types/rest-response/rs-oppdatersporsmalresponse'
import { rsToSoknad } from '../types/mapping'

interface OppdaterSporsmalVariables {
    sporsmal: Sporsmal
    onSuccess?: () => void
}

interface OppdaterSporsmalProps {
    soknad: Soknad
    sporsmalId: string
    spmIndex: number
}

export function useOppdaterSporsmal(props: OppdaterSporsmalProps) {
    const { soknad, sporsmalId, spmIndex } = props
    const queryClient = useQueryClient()

    return useMutation<RSOppdaterSporsmalResponse, unknown, OppdaterSporsmalVariables>({
        mutationFn: async (variables) => {
            console.log(variables.sporsmal)
            return fetchJsonMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${soknad.id}/sporsmal/${sporsmalId}`,
                {
                    method: 'PUT',
                    credentials: 'include',
                    body: JSON.stringify(sporsmalToRS(variables.sporsmal)),
                    headers: { 'Content-Type': 'application/json' },
                },
            )
        },
        mutationKey: ['oppdaterSporsmal', soknad.id, sporsmalId],

        onSuccess: async (data, variables) => {
            const oppdatertSoknad = () => {
                if (data.mutertSoknad) {
                    return rsToSoknad(data.mutertSoknad)
                } else {
                    const spm = data.oppdatertSporsmal
                    // TODO ikke muter props. Det er ikke anbefalt av react
                    // soknad.sporsmal[spmIndex] = new Sporsmal(spm, undefined as any, true)
                    return soknad
                }
            }

            queryClient.setQueriesData(['soknad', soknad.id], oppdatertSoknad())

            if (variables.onSuccess) variables.onSuccess()
        },
    })
}
