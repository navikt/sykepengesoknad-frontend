import { useRouter } from 'next/router'
import uuid from 'uuid'

import { RSSoknadstype } from '../types/rs-types/rs-soknadstype'

import useSoknad from './useSoknad'
import useSoknader from './useSoknader'
import useSykmeldinger from './useSykmeldinger'
import useSykmelding from './useSykmelding'

export function useSoknadMedDetaljer() {
    const router = useRouter()
    const { id: soknadIdUnsafe, stegId } = router.query as { id?: string; stegId: string }

    const soknadId = soknadIdUnsafe ? uuid.parse(soknadIdUnsafe).toString() : undefined

    const { data: valgtSoknad, isLoading: valgtSoknadLaster } = useSoknad(soknadId, soknadId !== undefined)
    const { data: soknader, isLoading: soknaderLaster } = useSoknader()
    const { data: sykmeldinger, isLoading: sykmeldingerLaster } = useSykmeldinger()
    const { data: valgtSykmelding } = useSykmelding(valgtSoknad?.sykmeldingId)

    const stegNo = parseInt(stegId)
    const spmIndex = stegNo - 1
    const sporsmal = valgtSoknad?.sporsmal[spmIndex]
    const erUtenlandssoknad = valgtSoknad?.soknadstype === RSSoknadstype.OPPHOLD_UTLAND && !valgtSykmelding
    return {
        valgtSoknad,
        soknadId,
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
        stegId,
    }
}
