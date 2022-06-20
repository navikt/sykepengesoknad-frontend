import dayjs from 'dayjs'

import { Sykmelding } from '../../types/sykmelding'

export function usendteSykmeldinger(sykmeldinger: Sykmelding[]): Sykmelding[] {
    return sykmeldinger
        .filter((sykmelding) => {
            return sykmelding.sykmeldingStatus.statusEvent == 'APEN'
        })
        .filter((sykmelding) => {
            return dayjs(sykmelding.mottattTidspunkt).isAfter(
                dayjs().subtract(365, 'days')
            )
        })
}
