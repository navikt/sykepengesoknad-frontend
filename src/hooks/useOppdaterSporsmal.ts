import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetchJsonMedRequestId } from '../utils/fetch'
import { Soknad, Sporsmal } from '../types/types'
import { sporsmalToRS } from '../types/rs-types/rs-sporsmal'
import { RSOppdaterSporsmalResponse } from '../types/rs-types/rest-response/rs-oppdatersporsmalresponse'
import { rsToSoknad, skapSporsmal } from '../types/mapping'

interface OppdaterSporsmalVariables {
    sporsmal: Sporsmal
    onSuccess?: () => void
}

interface OppdaterSporsmalProps {
    soknad: Soknad
    spmIndex: number
}

export function useOppdaterSporsmal(props: OppdaterSporsmalProps) {
    const { soknad, spmIndex } = props
    const queryClient = useQueryClient()

    return useMutation<RSOppdaterSporsmalResponse, any, OppdaterSporsmalVariables>({
        mutationFn: async (variables) => {
            return fetchJsonMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${soknad.id}/sporsmal/${variables.sporsmal.id}`,
                {
                    method: 'PUT',
                    credentials: 'include',
                    body: JSON.stringify(sporsmalToRS(variables.sporsmal)),
                    headers: { 'Content-Type': 'application/json' },
                },
            )
        },
        mutationKey: ['oppdaterSporsmal', soknad.id, spmIndex],

        onSuccess: async (data, variables) => {
            const oppdatertSoknad = () => {
                if (data.mutertSoknad) {
                    return rsToSoknad(data.mutertSoknad)
                } else {
                    const spm = data.oppdatertSporsmal

                    const oppdaterteSporsmal = soknad.sporsmal.map((sporsmal, index) => {
                        if (index == spmIndex) {
                            return skapSporsmal(spm, null, true)
                        }
                        return sporsmal
                    })
                    return soknad.copyWith({ sporsmal: oppdaterteSporsmal })
                }
            }

            queryClient.setQueriesData(['soknad', soknad.id], oppdatertSoknad())

            if (variables.onSuccess) variables.onSuccess()
        },
    })
}
