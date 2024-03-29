import { useQuery } from '@tanstack/react-query'

import { Sykmelding } from '../types/sykmelding'

import useSykmeldinger from './useSykmeldinger'

export default function useSykmelding(id: string | undefined) {
    const { data: sykmeldinger, isSuccess: sykmeldingerLastet } = useSykmeldinger()

    return useQuery<Sykmelding | undefined, Error>({
        queryKey: ['sykmelding', id],
        enabled: sykmeldingerLastet && id !== undefined,
        queryFn: () => {
            return Promise.resolve(sykmeldinger?.find((s) => s.id === id))
        },
    })
}
