import dayjs from 'dayjs'

import { getSykmeldingStartDate, Sykmelding } from '../../types/sykmelding'

export function eldreUsendteSykmeldinger(
    sykmeldinger: Sykmelding[],
    soknadTom: Date
): Sykmelding[] {
    return sykmeldinger
        .filter((sykmelding) => {
            return sykmelding.sykmeldingStatus.statusEvent == 'APEN'
        })
        .filter((sykmelding) => {
            return dayjs(sykmelding.mottattTidspunkt).isAfter(
                dayjs().subtract(365, 'days')
            )
        })
        .filter((sykmelding) => {
            const smFom = getSykmeldingStartDate(sykmelding)
            return smFom.isBefore(dayjs(soknadTom))
        })
}
