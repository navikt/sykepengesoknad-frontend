import { Alert } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

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
    const {
        valgtSoknad,
        soknader,
        setValgtSoknad,
        setValgtSykmelding,
        sykmeldinger,
        feilmeldingTekst,
    } = useAppStore()
    const [rerendreKvittering, setRerendrekvittering] = useState<Date>(
        new Date()
    )
    const { logEvent } = useAmplitudeInstance()
    const { id } = useParams<RouteParams>()

    useEffect(() => {
        const filtrertSoknad = soknader.find((soknad) => soknad.id === id)
        setValgtSoknad(filtrertSoknad)

        const sykmelding = sykmeldinger.find(
            (sm) => sm.id === filtrertSoknad?.sykmeldingId
        )
        setValgtSykmelding(sykmelding)

        logEvent('skjema åpnet', {
            skjemanavn: 'sykepengesoknad',
            soknadstype: filtrertSoknad?.soknadstype,
            soknadstatus: filtrertSoknad?.status,
        })
        // eslint-disable-next-line
    }, [id])

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    useEffect(() => {}, [rerendreKvittering])

    if (!valgtSoknad) return null

    const erSendtTilNav = valgtSoknad.sendtTilNAVDato !== null
    const erSendtTilArbeidsgiver = valgtSoknad.sendtTilArbeidsgiverDato !== null

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
                <HotjarTrigger
                    jsTrigger={hentHotjarJsTrigger(
                        valgtSoknad.soknadstype,
                        'sendt'
                    )}
                >
                    <Kvittering />

                    <Vis
                        hvis={skalViseKnapperad}
                        render={() => (
                            <div className="knapperad">
                                <Vis
                                    hvis={skalViseEndre}
                                    render={() => <Endreknapp />}
                                />

                                <Vis
                                    hvis={!erSendtTilNav}
                                    render={() => (
                                        <Ettersending
                                            gjelder="nav"
                                            setRerendrekvittering={
                                                setRerendrekvittering
                                            }
                                        />
                                    )}
                                />

                                <Vis
                                    hvis={skalViseSendTilArbeidsgiver}
                                    render={() => (
                                        <Ettersending
                                            gjelder="arbeidsgiver"
                                            setRerendrekvittering={
                                                setRerendrekvittering
                                            }
                                        />
                                    )}
                                />
                            </div>
                        )}
                    />

                    <div aria-live="polite">
                        <Vis
                            hvis={feilmeldingTekst}
                            render={() => (
                                <Alert variant="error">
                                    {feilmeldingTekst}
                                </Alert>
                            )}
                        />
                    </div>
                </HotjarTrigger>
            </div>
        </>
    )
}

export default SendtSide
