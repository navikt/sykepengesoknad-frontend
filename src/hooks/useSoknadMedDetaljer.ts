import { useRouter } from 'next/router'
import * as uuid from 'uuid'
import { useEffect } from 'react'

import { RSSoknadstype } from '../types/rs-types/rs-soknadstype'

import useSoknad from './useSoknad'
import useSoknader from './useSoknader'
import useSykmeldinger from './useSykmeldinger'
import useSykmelding from './useSykmelding'

export function useSoknadMedDetaljer() {
    const router = useRouter()
    const { id: soknadIdUnsafe, stegId } = router.query as { id?: string; stegId: string }

    const soknadId = soknadIdUnsafe ? uuid.stringify(uuid.parse(soknadIdUnsafe)) : undefined

    const { data: soknader, isLoading: soknaderLaster } = useSoknader()
    const {
        data: valgtSoknad,
        isLoading: valgtSoknadLaster,
        error: valgtSoknadError,
    } = useSoknad(
        soknadId,
        soknadId !== undefined && soknader !== undefined && soknader.map((s) => s.id).includes(soknadId),
    )
    const { data: sykmeldinger, isLoading: sykmeldingerLaster } = useSykmeldinger()
    const { data: valgtSykmelding } = useSykmelding(valgtSoknad?.sykmeldingId)

    useEffect(() => {
        if (soknadId !== undefined && soknader !== undefined && !soknader.map((s) => s.id).includes(soknadId)) {
            window.location.href = '/syk/sykepengesoknad'
        }
    }, [soknadId, soknader])

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
        valgtSoknadError,
    }
}
