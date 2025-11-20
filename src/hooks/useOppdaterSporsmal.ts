import { useMutation, useQueryClient } from '@tanstack/react-query'

import { fetchJsonMedRequestId } from '../utils/fetch'
import { Soknad, Sporsmal } from '../types/types'
import { sporsmalToRS } from '../types/rs-types/rs-sporsmal'
import { RSOppdaterSporsmalResponse } from '../types/rs-types/rest-response/rs-oppdatersporsmalresponse'
import { rsToSoknad, skapSporsmal } from '../types/mapping'
import { logEvent } from '../components/umami/umami'

import { useTestpersonQuery } from './useTestpersonQuery'

interface OppdaterSporsmalVariables {
    sporsmal: Sporsmal
    soknad: Soknad
    spmIndex: number
    onSuccess?: (oppdatertSoknad: Soknad) => void
}

export function useOppdaterSporsmal() {
    const queryClient = useQueryClient()
    const testpersonQuery = useTestpersonQuery()

    return useMutation<RSOppdaterSporsmalResponse, any, OppdaterSporsmalVariables>({
        mutationFn: async (variables) => {
            return fetchJsonMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${variables.soknad.id}/sporsmal/${
                    variables.sporsmal.id
                }${testpersonQuery.query()}`,
                {
                    method: 'PUT',
                    credentials: 'include',
                    body: JSON.stringify(sporsmalToRS(variables.sporsmal)),
                    headers: { 'Content-Type': 'application/json' },
                },
            )
        },

        onSuccess: async (data, variables) => {
            const oppdatertSoknad = () => {
                if (data.mutertSoknad) {
                    return rsToSoknad(data.mutertSoknad)
                } else {
                    const spm = data.oppdatertSporsmal

                    const oppdaterteSporsmal = variables.soknad.sporsmal.map((sporsmal, index) => {
                        if (index == variables.spmIndex) {
                            return skapSporsmal(spm, null, true)
                        }
                        return sporsmal
                    })
                    return variables.soknad.copyWith({ sporsmal: oppdaterteSporsmal })
                }
            }

            const soknadMedSvar = oppdatertSoknad()
            queryClient.setQueryData(['soknad', variables.soknad.id], soknadMedSvar)
            if (variables.onSuccess) variables.onSuccess(soknadMedSvar)
        },
        onError: (e) => {
            logEvent('mutation error', {
                mutation: 'oppdater sporsmal',
                skjemanavn: 'sykepengesoknad',
                status: e?.status?.toString(),
            })
        },
    })
}
