import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { FetchError } from '../utils/fetch'
import fetchMedRequestId from '../utils/fetch'

import useSoknad from './useSoknad'

export function useSendSoknad() {
    const router = useRouter()
    const { id } = router.query as { id: string }
    const { data: valgtSoknad } = useSoknad(id)

    const queryClient = useQueryClient()

    if (!valgtSoknad) {
        throw Error('Skal ha valgt søknad')
    }
    return useMutation<unknown, FetchError>({
        mutationFn: async () =>
            fetchMedRequestId(
                `/syk/sykepengesoknad/api/sykepengesoknad-backend/api/v2/soknader/${valgtSoknad!.id}/send`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                },
            ),
        mutationKey: ['sendsoknad'],

        onSuccess: async () => {
            await queryClient.invalidateQueries(['soknad', valgtSoknad.id])

            queryClient.invalidateQueries(['soknader']).catch()

            if (valgtSoknad.korrigerer !== undefined) {
                queryClient.invalidateQueries(['soknad', valgtSoknad.korrigerer]).catch()
            }
            router.push(`/kvittering/${valgtSoknad.id}${window.location.search}`, undefined, { shallow: true })
        },
    })
}
