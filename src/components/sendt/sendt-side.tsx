import { Alert } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router'

import { useAppStore } from '../../data/stores/app-store'
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
import { RouteParams } from '../../app'

const SendtSide = () => {
    const { id } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)
    const navigate = useNavigate()

    const { feilmeldingTekst } = useAppStore()
    const [rerendreKvittering, setRerendrekvittering] = useState<Date>(new Date())

    useUpdateBreadcrumbs(() => [{ ...kvitteringBreadcrumb, handleInApp: true }], [])

    useEffect(() => {
        if (!valgtSoknad) return

        if (valgtSoknad.status !== RSSoknadstatus.SENDT) {
            navigate(urlTilSoknad(valgtSoknad), { replace: true })
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

            <div className="limit sendt-side">
                <HotjarTrigger jsTrigger={hentHotjarJsTrigger(valgtSoknad.soknadstype, 'sendt')}>
                    <Kvittering />

                    <Vis
                        hvis={skalViseKnapperad}
                        render={() => (
                            <div className="knapperad">
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
                            </div>
                        )}
                    />

                    <div aria-live="polite">
                        <Vis hvis={feilmeldingTekst} render={() => <Alert variant="error">{feilmeldingTekst}</Alert>} />
                    </div>
                </HotjarTrigger>
            </div>
        </>
    )
}

export default SendtSide
