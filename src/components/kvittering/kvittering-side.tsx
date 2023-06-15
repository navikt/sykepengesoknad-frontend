import { Button } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { logger } from '@navikt/next-logger'

import Endreknapp from '../../components/endreknapp/endreknapp'
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
import { harKorrigertArbeidstakersoknadIDetSiste } from './harSvartJa'

const KvitteringSide = () => {
    const router = useRouter()
    const { id } = router.query as { id: string }
    const { data: valgtSoknad } = useSoknad(id)
    const { data: soknader } = useSoknader()
    const korrigertSøknadStudy = 'study-zeh32lhqyb'
    const { data: korrigertStudyActive } = useStudyStatus(korrigertSøknadStudy)

    const [rerendreKvittering, setRerendrekvittering] = useState<Date>(new Date())

    useUpdateBreadcrumbs(() => [{ ...kvitteringBreadcrumb, handleInApp: true }], [])

    useEffect(() => {
        if (!valgtSoknad) return

        if (valgtSoknad.status !== RSSoknadstatus.SENDT) {
            window.alert("valg soknad ikke 'SENDT'")
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

            <div>
                <HotjarTrigger jsTrigger={hentHotjarJsTrigger(valgtSoknad.soknadstype, 'kvittering')}>
                    <Kvittering />

                    <GjenstaendeSoknader soknader={gjenstaendeSoknader} />

                    <Vis
                        hvis={gjenstaendeSoknader.length === 0}
                        render={() => (
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
                        )}
                    ></Vis>
                    <Vis
                        hvis={gjenstaendeSoknader.length === 0}
                        render={() => {
                            if (harKorrigertArbeidstakersoknadIDetSiste(soknader) && korrigertStudyActive) {
                                return <UxSignalsWidget study={korrigertSøknadStudy} demo={!isProd()} />
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
                </HotjarTrigger>
            </div>
        </>
    )
}

export default KvitteringSide
