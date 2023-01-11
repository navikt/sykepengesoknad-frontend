import { useQuery } from '@tanstack/react-query'
import { logger } from '@navikt/next-logger'

import { Sykmelding } from '../types/sykmelding'

import useSykmeldinger from './useSykmeldinger'

export default function useSykmelding(id: string | undefined) {
    const { data: sykmeldinger, isSuccess: sykmeldingerLastet } = useSykmeldinger()

    return useQuery<Sykmelding | undefined, Error>({
        queryKey: ['sykmelding', id],
        queryFn: () => {
            return Promise.resolve(sykmeldinger?.find((s) => s.id === id))
        },
        enabled: sykmeldingerLastet && id !== undefined,
        onError: (e: any) => {
            logger.warn(e)
        },
    })
}
