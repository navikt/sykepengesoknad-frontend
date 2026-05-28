import { isAfter, isBefore, subDays } from 'date-fns'

import { getSykmeldingStartDate, Sykmelding } from '../../types/sykmelding'

export function eldreUsendteSykmeldinger(
    sykmeldinger: Sykmelding[] | undefined,
    soknadTom: Date | undefined,
): Sykmelding[] {
    if (!sykmeldinger || !soknadTom) return []

    return sykmeldinger
        .filter((sykmelding) => {
            return sykmelding.sykmeldingStatus.statusEvent == 'APEN'
        })
        .filter((sykmelding) => {
            return isAfter(sykmelding.mottattTidspunkt, subDays(new Date(), 365))
        })
        .filter((sykmelding) => {
            const smFom = getSykmeldingStartDate(sykmelding)
            return isBefore(smFom, soknadTom)
        })
}
