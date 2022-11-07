import { Alert, Button } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import Endreknapp from '../../components/endreknapp/endreknapp'
import { useAppStore } from '../../data/stores/app-store'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { Brodsmule } from '../../types/types'
import { SEPARATOR } from '../../utils/constants'
import { sykefravaerUrl } from '../../utils/environment'
import { tekst } from '../../utils/tekster'
import { useAmplitudeInstance } from '../amplitude/amplitude'
import Banner from '../banner/banner'
import Brodsmuler from '../brodsmuler/brodsmuler'
import Ettersending from '../ettersending/ettersending'
import { GjenstaendeSoknader, hentGjenstaendeSoknader } from '../gjenstaende-soknader/gjenstaende-soknader'
import { hentHotjarJsTrigger, HotjarTrigger } from '../hotjar-trigger'
import { UxSignalsWidget } from '../ux-signals/UxSignalsWidget'
import Vis from '../vis'

import Kvittering from './kvittering'
import { harSvartJaJobbetDuUnderveis } from './harSvartJaJobbetDuUnderveis'

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

const KvitteringSide = () => {
    const { valgtSoknad, soknader, setValgtSoknad, setValgtSykmelding, sykmeldinger, feilmeldingTekst } = useAppStore()
    const [rerendreKvittering, setRerendrekvittering] = useState<Date>(new Date())
    const { logEvent } = useAmplitudeInstance()
    const { id } = useParams<RouteParams>()

    useEffect(() => {
        const filtrertSoknad = soknader.find((soknad) => soknad.id === id)
        setValgtSoknad(filtrertSoknad)

        const sykmelding = sykmeldinger.find((sm) => sm.id === filtrertSoknad?.sykmeldingId)
        setValgtSykmelding(sykmelding)

        logEvent('skjema åpnet', {
            skjemanavn: 'sykepengesoknad',
            soknadstype: filtrertSoknad?.soknadstype,
            soknadstatus: filtrertSoknad?.status,
        })
        // eslint-disable-next-line
    }, [id, soknader, sykmeldinger])

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    useEffect(() => {}, [rerendreKvittering])

    if (!valgtSoknad) return null

    const erSendtTilArbeidsgiver = valgtSoknad.sendtTilArbeidsgiverDato !== null

    const skalViseEndre = valgtSoknad.status !== RSSoknadstatus.KORRIGERT
    const skalViseSendTilArbeidsgiver =
        valgtSoknad.arbeidsgiver !== undefined &&
        !erSendtTilArbeidsgiver &&
        valgtSoknad.soknadstype !== RSSoknadstype.REISETILSKUDD
    const skalViseEndreEllerEttersend =
        valgtSoknad.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND && (skalViseEndre || skalViseSendTilArbeidsgiver)

    const gjenstaendeSoknader = hentGjenstaendeSoknader(soknader)

    return (
        <>
            <Banner />
            <Brodsmuler brodsmuler={brodsmuler} />

            <div className="limit kvittering-side">
                <HotjarTrigger jsTrigger={hentHotjarJsTrigger(valgtSoknad.soknadstype, 'kvittering')}>
                    <Kvittering />

                    <GjenstaendeSoknader soknader={gjenstaendeSoknader} />

                    <div className="knapperad">
                        <Vis
                            hvis={gjenstaendeSoknader.length == 0}
                            render={() => (
                                <Button
                                    className="ferdig-knapp"
                                    onClick={() => {
                                        logEvent('knapp klikket', {
                                            tekst: tekst('kvittering.ferdig'),
                                            soknadstype: valgtSoknad?.soknadstype,
                                        })
                                        window.location.href = sykefravaerUrl()
                                    }}
                                >
                                    {tekst('kvittering.ferdig')}
                                </Button>
                            )}
                        ></Vis>
                        <Vis
                            hvis={harSvartJaJobbetDuUnderveis(valgtSoknad) && gjenstaendeSoknader.length == 0}
                            render={() => <UxSignalsWidget study={'study-241w19s2m9'} />}
                        />
                        <Vis
                            hvis={skalViseEndreEllerEttersend}
                            render={() => (
                                <>
                                    <Vis hvis={skalViseEndre} render={() => <Endreknapp />} />
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
                    </div>
                    <div aria-live="polite">
                        <Vis hvis={feilmeldingTekst} render={() => <Alert variant="error">{feilmeldingTekst}</Alert>} />
                    </div>
                </HotjarTrigger>
            </div>
        </>
    )
}

export default KvitteringSide
