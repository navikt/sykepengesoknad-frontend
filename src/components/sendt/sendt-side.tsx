import { Alert } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import { useAppStore } from '../../data/stores/app-store'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { Brodsmule } from '../../types/types'
import { SEPARATOR } from '../../utils/constants'
import { tekst } from '../../utils/tekster'
import { useAmplitudeInstance } from '../amplitude/amplitude'
import Banner from '../banner/banner'
import Brodsmuler from '../brodsmuler/brodsmuler'
import Endreknapp from '../endreknapp/endreknapp'
import Ettersending from '../ettersending/ettersending'
import { hentHotjarJsTrigger, HotjarTrigger } from '../hotjar-trigger'
import Kvittering from '../kvittering/kvittering'
import Vis from '../vis'
import useSoknad from '../../hooks/useSoknad'
import { urlTilSoknad } from '../soknad/soknad-link'

const brodsmuler: Brodsmule[] = [
    {
        tittel: tekst('soknader.sidetittel'),
        sti: SEPARATOR + window.location.search,
        erKlikkbar: true,
    },
    {
        tittel: tekst('kvittering.sidetittel'),
        sti: null as any,
        erKlikkbar: false,
    },
]

const SendtSide = () => {
    const { id } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)

    const { setValgtSykmelding, sykmeldinger, feilmeldingTekst } = useAppStore()
    const [rerendreKvittering, setRerendrekvittering] = useState<Date>(new Date())
    const { logEvent } = useAmplitudeInstance()
    const history = useHistory()

    useEffect(() => {
        if (!valgtSoknad || !sykmeldinger) return

        if (valgtSoknad.status !== RSSoknadstatus.SENDT) {
            history.replace(urlTilSoknad(valgtSoknad))
            return
        }

        const sykmelding = sykmeldinger.find((sm) => sm.id === valgtSoknad.sykmeldingId)
        setValgtSykmelding(sykmelding)

        logEvent('skjema åpnet', {
            skjemanavn: 'sykepengesoknad',
            soknadstype: valgtSoknad.soknadstype,
            soknadstatus: valgtSoknad.status,
        })
        // eslint-disable-next-line
    }, [valgtSoknad, sykmeldinger])

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    useEffect(() => {}, [rerendreKvittering])

    if (!valgtSoknad) return null

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
            <Brodsmuler brodsmuler={brodsmuler} />

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
