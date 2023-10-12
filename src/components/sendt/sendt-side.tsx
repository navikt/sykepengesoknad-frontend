import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { logEvent } from '../amplitude/amplitude'
import Endreknapp from '../endreknapp/endreknapp'
import Ettersending from '../ettersending/ettersending'
import Kvittering from '../kvittering/kvittering'
import Vis from '../vis'
import { urlTilSoknad } from '../soknad/soknad-link'
import QueryStatusPanel from '../queryStatusPanel/QueryStatusPanel'
import { kvitteringBreadcrumb, useUpdateBreadcrumbs } from '../../hooks/useBreadcrumbs'
import { SoknadHeader } from '../soknad/soknad-header'
import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'

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
    const erSendtTilArbeidsgiver = valgtSoknad.sendtTilArbeidsgiverDato !== undefined

    const skalViseEndre = valgtSoknad.status !== RSSoknadstatus.KORRIGERT
    const skalViseSendTilArbeidsgiver =
        valgtSoknad.arbeidsgiver !== undefined &&
        !erSendtTilArbeidsgiver &&
        valgtSoknad.soknadstype !== RSSoknadstype.REISETILSKUDD
    const skalViseKnapperad =
        valgtSoknad.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND &&
        (skalViseEndre || !erSendtTilNav || skalViseSendTilArbeidsgiver)

    return (
        <>
            <SoknadHeader />

            <Kvittering />

            <Vis
                hvis={skalViseKnapperad}
                render={() => (
                    <>
                        <Vis hvis={skalViseEndre} render={() => <Endreknapp />} />

                        <Vis hvis={!erSendtTilNav} render={() => <Ettersending gjelder="nav" />} />

                        <Vis
                            hvis={skalViseSendTilArbeidsgiver}
                            render={() => <Ettersending gjelder="arbeidsgiver" />}
                        />
                    </>
                )}
            />
        </>
    )
}

export default SendtSide
