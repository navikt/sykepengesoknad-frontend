import { Alert, Button } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import Endreknapp from '../../components/endreknapp/endreknapp'
import { useAppStore } from '../../data/stores/app-store'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { isProd, sykefravaerUrl } from '../../utils/environment'
import { tekst } from '../../utils/tekster'
import { logEvent } from '../amplitude/amplitude'
import Banner from '../banner/banner'
import Ettersending from '../ettersending/ettersending'
import { GjenstaendeSoknader, hentGjenstaendeSoknader } from '../gjenstaende-soknader/gjenstaende-soknader'
import { hentHotjarJsTrigger, HotjarTrigger } from '../hotjar-trigger'
import { UxSignalsWidget } from '../ux-signals/UxSignalsWidget'
import Vis from '../vis'
import useSoknad from '../../hooks/useSoknad'
import useSoknader from '../../hooks/useSoknader'
import { urlTilSoknad } from '../soknad/soknad-link'
import QueryStatusPanel from '../queryStatusPanel/QueryStatusPanel'
import { kvitteringBreadcrumb, useUpdateBreadcrumbs } from '../../hooks/useBreadcrumbs'
import { useStudyStatus } from '../../hooks/useStudyStatus'

import Kvittering from './kvittering'
import { harKorrigertArbeidstakersoknadIDetSiste, erArbeidstakerSoknad } from './harSvartJa'

const KvitteringSide = () => {
    const { id } = useParams<RouteParams>()
    const { data: soknader } = useSoknader()
    const { data: valgtSoknad } = useSoknad(id)
    const arbeidstakersøknadStudy = 'study-hpyhgdokuq'
    const korrigertSøknadStudy = 'study-zeh32lhqyb'
    const { data: arbeidstakersoknadStudyActive } = useStudyStatus(arbeidstakersøknadStudy)
    const { data: korrigertStudyActive } = useStudyStatus(korrigertSøknadStudy)

    const { feilmeldingTekst } = useAppStore()
    const [rerendreKvittering, setRerendrekvittering] = useState<Date>(new Date())
    const history = useHistory()

    useUpdateBreadcrumbs(() => [{ ...kvitteringBreadcrumb, handleInApp: true }], [])

    useEffect(() => {
        if (!valgtSoknad) return

        if (valgtSoknad.status !== RSSoknadstatus.SENDT) {
            const url = urlTilSoknad(valgtSoknad)
            history.replace(url)
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

    if (!valgtSoknad || !soknader) return <QueryStatusPanel valgSoknadId={id} />

    const erSendtTilArbeidsgiver = valgtSoknad.sendtTilArbeidsgiverDato !== undefined

    const skalViseEndre = valgtSoknad.status !== RSSoknadstatus.KORRIGERT
    const skalViseSendTilArbeidsgiver =
        valgtSoknad.arbeidsgiver !== undefined &&
        !erSendtTilArbeidsgiver &&
        valgtSoknad.soknadstype !== RSSoknadstype.REISETILSKUDD
    const skalViseEndreEllerEttersend =
        valgtSoknad.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND && (skalViseEndre || skalViseSendTilArbeidsgiver)

    const gjenstaendeSoknader = hentGjenstaendeSoknader(soknader, valgtSoknad)

    return (
        <>
            <Banner />

            <div className="limit kvittering-side">
                <HotjarTrigger jsTrigger={hentHotjarJsTrigger(valgtSoknad.soknadstype, 'kvittering')}>
                    <Kvittering />

                    <GjenstaendeSoknader soknader={gjenstaendeSoknader} />

                    <div className="knapperad">
                        <Vis
                            hvis={gjenstaendeSoknader.length === 0}
                            render={() => (
                                <Button
                                    className="ferdig-knapp"
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
                            )}
                        ></Vis>
                        <Vis
                            hvis={gjenstaendeSoknader.length === 0}
                            render={() => {
                                if (harKorrigertArbeidstakersoknadIDetSiste(soknader) && korrigertStudyActive) {
                                    return <UxSignalsWidget study={korrigertSøknadStudy} demo={!isProd()} />
                                }
                                if (erArbeidstakerSoknad(valgtSoknad) && arbeidstakersoknadStudyActive) {
                                    return <UxSignalsWidget study={arbeidstakersøknadStudy} demo={!isProd()} />
                                }
                                return null
                            }}
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
