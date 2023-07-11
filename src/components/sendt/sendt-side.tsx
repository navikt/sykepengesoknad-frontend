import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { logEvent } from '../amplitude/amplitude'
import Banner from '../banner/banner'
import Endreknapp from '../endreknapp/endreknapp'
import Ettersending from '../ettersending/ettersending'
import { hentHotjarJsTrigger, HotjarTrigger } from '../hotjar-trigger'
import Kvittering from '../kvittering/kvittering'
import Vis from '../vis'
import useSoknad from '../../hooks/useSoknad'
import { urlTilSoknad } from '../soknad/soknad-link'
import QueryStatusPanel from '../queryStatusPanel/QueryStatusPanel'
import { kvitteringBreadcrumb, useUpdateBreadcrumbs } from '../../hooks/useBreadcrumbs'

const SendtSide = () => {
    const router = useRouter()
    const { id } = router.query as { id: string }
    const { data: valgtSoknad } = useSoknad(id)

    const [rerendreKvittering, setRerendrekvittering] = useState<Date>(new Date())

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

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    useEffect(() => {}, [rerendreKvittering])

    if (!valgtSoknad) return <QueryStatusPanel valgSoknadId={id} />

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
            <Banner />

            <HotjarTrigger jsTrigger={hentHotjarJsTrigger(valgtSoknad.soknadstype, 'sendt')}>
                <Kvittering />

                <Vis
                    hvis={skalViseKnapperad}
                    render={() => (
                        <>
                            <Vis hvis={skalViseEndre} render={() => <Endreknapp />} />

                            <Vis
                                hvis={!erSendtTilNav}
                                render={() => (
                                    <Ettersending gjelder="nav" setRerendrekvittering={setRerendrekvittering} />
                                )}
                            />

                            <Vis
                                hvis={skalViseSendTilArbeidsgiver}
                                render={() => (
                                    <Ettersending
                                        gjelder="arbeidsgiver"
                                        setRerendrekvittering={setRerendrekvittering}
                                    />
                                )}
                            />
                        </>
                    )}
                />
            </HotjarTrigger>
        </>
    )
}

export default SendtSide
