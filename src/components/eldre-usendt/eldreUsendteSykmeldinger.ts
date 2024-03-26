import dayjs from 'dayjs'

import { getSykmeldingStartDate, Sykmelding } from '../../types/sykmelding'
// her er sjekken for om vih har noen
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
            return dayjs(sykmelding.mottattTidspunkt).isAfter(dayjs().subtract(365, 'days'))
        })
        .filter((sykmelding) => {
            const smFom = getSykmeldingStartDate(sykmelding)
            return smFom.isBefore(dayjs(soknadTom))
        })
}
