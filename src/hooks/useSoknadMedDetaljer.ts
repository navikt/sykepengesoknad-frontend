import { useRouter } from 'next/router'

import { RSSoknadstype } from '../types/rs-types/rs-soknadstype'

import useSoknad from './useSoknad'
import useSoknader from './useSoknader'
import useSykmeldinger from './useSykmeldinger'
import useSykmelding from './useSykmelding'

export function UseSoknadMedDetaljer() {
    const router = useRouter()
    const { id, stegId } = router.query as { id?: string; stegId: string }
    const { data: valgtSoknad, isLoading: valgtSoknadLaster } = useSoknad(id, id !== undefined)
    const { data: soknader, isLoading: soknaderLaster } = useSoknader()
    const { data: sykmeldinger, isLoading: sykmeldingerLaster } = useSykmeldinger()
    const { data: valgtSykmelding } = useSykmelding(valgtSoknad?.sykmeldingId)

    const stegNo = parseInt(stegId)
    const spmIndex = stegNo - 1
    const sporsmal = valgtSoknad?.sporsmal[spmIndex]
    const erUtenlandssoknad = valgtSoknad?.soknadstype === RSSoknadstype.OPPHOLD_UTLAND && !valgtSykmelding
    return {
        valgtSoknad,
        sykmeldinger,
        valgtSykmelding,
        stegNo,
        spmIndex,
        sporsmal,
        soknader,
        soknaderLaster,
        sykmeldingerLaster,
        valgtSoknadLaster,
        erUtenlandssoknad,
    }
}
