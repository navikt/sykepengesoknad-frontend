import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { logEvent } from '../umami/umami'
import Endreknapp from '../endreknapp/endreknapp'
import Ettersending from '../ettersending/ettersending'
import Kvittering from '../kvittering/kvittering'
import QueryStatusPanel from '../queryStatusPanel/QueryStatusPanel'
import { kvitteringBreadcrumb, useUpdateBreadcrumbs } from '../../hooks/useBreadcrumbs'
import { SoknadHeader } from '../soknad/soknad-header'
import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'
import { urlTilSoknad } from '../soknad/soknad-link'
import { skalViseSendTilArbeidsgiver } from '../../utils/ettersending-utils'

const SendtSide = () => {
    const { valgtSoknad, soknadId } = useSoknadMedDetaljer()
    const router = useRouter()

    useUpdateBreadcrumbs(() => [{ ...kvitteringBreadcrumb, handleInApp: true }], [])

    useEffect(() => {
        if (!valgtSoknad) return

        if (valgtSoknad.status !== RSSoknadstatus.SENDT) {
            router.push(urlTilSoknad(valgtSoknad), undefined, { shallow: true })
            return
        }

        logEvent('skjema åpnet', {
            skjemanavn: 'sykepengesoknad',
            soknadstype: valgtSoknad.soknadstype,
            soknadstatus: valgtSoknad.status,
        })
        // eslint-disable-next-line
    }, [valgtSoknad])

    if (!valgtSoknad) return <QueryStatusPanel valgSoknadId={soknadId} />

    const erSendtTilNav = valgtSoknad.sendtTilNAVDato !== undefined

    const skalViseEndre = valgtSoknad.status !== RSSoknadstatus.KORRIGERT
    const skalViseEttersending = skalViseSendTilArbeidsgiver(valgtSoknad)
    const skalViseKnapperad =
        valgtSoknad.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND &&
        (skalViseEndre || !erSendtTilNav || skalViseEttersending)

    return (
        <>
            <SoknadHeader />

            <Kvittering />

            {skalViseKnapperad && (
                <>
                    {skalViseEndre && <Endreknapp />}

                    {skalViseEttersending && <Ettersending gjelder="arbeidsgiver" />}
                </>
            )}
        </>
    )
}

export default SendtSide
