import { Button } from '@navikt/ds-react'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { logger } from '@navikt/next-logger'

import Endreknapp from '../../components/endreknapp/endreknapp'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { isProd, sykefravaerUrl } from '../../utils/environment'
import { tekst } from '../../utils/tekster'
import { logEvent } from '../amplitude/amplitude'
import Ettersending from '../ettersending/ettersending'
import { GjenstaendeSoknader, hentGjenstaendeSoknader } from '../gjenstaende-soknader/gjenstaende-soknader'
import { UxSignalsWidget } from '../ux-signals/UxSignalsWidget'
import useSoknad from '../../hooks/useSoknad'
import useSoknader from '../../hooks/useSoknader'
import { urlTilSoknad } from '../soknad/soknad-link'
import QueryStatusPanel from '../queryStatusPanel/QueryStatusPanel'
import { kvitteringBreadcrumb, useUpdateBreadcrumbs } from '../../hooks/useBreadcrumbs'
import { useStudyStatus } from '../../hooks/useStudyStatus'
import { SoknadHeader } from '../soknad/soknad-header'

import Kvittering from './kvittering'
import { harKorrigertArbeidstakersoknadIDetSiste } from './harSvartJa'
import {KvitteringFeedback} from "../feedback/kvittering-feedback";

const KvitteringSide = () => {
    const router = useRouter()
    const { id } = router.query as { id: string }
    const { data: valgtSoknad } = useSoknad(id)
    const { data: soknader } = useSoknader()
    const korrigertSøknadStudy = 'study-zeh32lhqyb'
    const { data: korrigertStudyActive } = useStudyStatus(korrigertSøknadStudy)

    useUpdateBreadcrumbs(() => [{ ...kvitteringBreadcrumb, handleInApp: true }], [])

    useEffect(() => {
        if (!valgtSoknad) return

        if (valgtSoknad.status !== RSSoknadstatus.SENDT) {
            const url = urlTilSoknad(valgtSoknad)
            router.push(url).catch((e) => {
                logger.error(e, 'feil ved redirect tilbake til søknad')
            })
            return
        }

        logEvent('skjema åpnet', {
            skjemanavn: 'sykepengesoknad',
            soknadstype: valgtSoknad.soknadstype,
            soknadstatus: valgtSoknad.status,
        })
        // eslint-disable-next-line
    }, [valgtSoknad])

    if (!valgtSoknad || !soknader) return <QueryStatusPanel valgSoknadId={id} />

    const erSendtTilArbeidsgiver = valgtSoknad.sendtTilArbeidsgiverDato !== undefined

    const skalViseEndre = valgtSoknad.status !== RSSoknadstatus.KORRIGERT
    const skalViseSendTilArbeidsgiver =
        valgtSoknad.arbeidsgiver !== undefined &&
        !erSendtTilArbeidsgiver &&
        valgtSoknad.soknadstype !== RSSoknadstype.REISETILSKUDD

    const gjenstaendeSoknader = hentGjenstaendeSoknader(soknader, valgtSoknad)

    return (
        <>
            <SoknadHeader />

            <Kvittering />

            <GjenstaendeSoknader soknader={gjenstaendeSoknader} />

            {gjenstaendeSoknader.length === 0 && (
                <>
                    <Button
                        className="mt-8"
                        onClick={() => {
                            logEvent('knapp klikket', {
                                tekst: tekst('kvittering.ferdig'),
                                soknadstype: valgtSoknad.soknadstype,
                            })
                            window.location.href = sykefravaerUrl()
                        }}
                    >
                        {tekst('kvittering.ferdig')}
                    </Button>
                    {harKorrigertArbeidstakersoknadIDetSiste(soknader) && korrigertStudyActive && (
                        <UxSignalsWidget study={korrigertSøknadStudy} demo={!isProd()} />
                    )}
                </>
            )}
            <KvitteringFeedback />

            {skalViseEndre && <Endreknapp />}
            {skalViseSendTilArbeidsgiver && (
                <Ettersending gjelder="arbeidsgiver" setRerendrekvittering={setRerendrekvittering} />
            )}
        </>
    )
}

export default KvitteringSide
