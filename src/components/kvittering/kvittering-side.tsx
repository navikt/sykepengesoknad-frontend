import { Button } from '@navikt/ds-react'
import React, { useEffect } from 'react'
import { logger } from '@navikt/next-logger'
import { useRouter } from 'next/router'

import Endreknapp from '../../components/endreknapp/endreknapp'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { isProd, sykefravaerUrl } from '../../utils/environment'
import { tekst } from '../../utils/tekster'
import { logEvent } from '../amplitude/amplitude'
import Ettersending from '../ettersending/ettersending'
import { GjenstaendeSoknader, hentGjenstaendeSoknader } from '../gjenstaende-soknader/gjenstaende-soknader'
import { UxSignalsWidget } from '../ux-signals/UxSignalsWidget'
import useSoknader from '../../hooks/useSoknader'
import { urlTilSoknad } from '../soknad/soknad-link'
import QueryStatusPanel from '../queryStatusPanel/QueryStatusPanel'
import { kvitteringBreadcrumb, useUpdateBreadcrumbs } from '../../hooks/useBreadcrumbs'
import { useStudyStatus } from '../../hooks/useStudyStatus'
import { SoknadHeader } from '../soknad/soknad-header'
import { FlexjarKvittering } from '../flexjar/flexjar-kvittering'
import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'
import { useToggle } from '../../toggles/context'
import { JulesoknadTekstKvittering } from '../julesoknad/julesoknad-infotekst'
import { RSArbeidssituasjon } from '../../types/rs-types/rs-arbeidssituasjon'

import Kvittering from './kvittering'

const KvitteringSide = () => {
    const { valgtSoknad, soknadId } = useSoknadMedDetaljer()
    const router = useRouter()
    const { data: soknader } = useSoknader()
    const defaultStudy = 'panel-yhv7yi5h9q'
    const { data: defaultStudyActive } = useStudyStatus(defaultStudy)
    const selvstendigNaeringsdrivendeStudy = 'panel-gtnepi3ujl'
    const { data: selvstendigNaeringsdrivendeStudyActive } = useStudyStatus(selvstendigNaeringsdrivendeStudy)

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
    const flexjarToggle = useToggle('flexjar-sykepengesoknad-frontend-kvittering')

    if (!valgtSoknad || !soknader) return <QueryStatusPanel valgSoknadId={soknadId} />

    const erSendtTilArbeidsgiver = valgtSoknad.sendtTilArbeidsgiverDato !== undefined

    const skalViseEndre =
        valgtSoknad.status !== RSSoknadstatus.KORRIGERT && valgtSoknad.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND
    const skalViseSendTilArbeidsgiver =
        valgtSoknad.arbeidsgiver !== undefined &&
        !erSendtTilArbeidsgiver &&
        valgtSoknad.soknadstype !== RSSoknadstype.REISETILSKUDD &&
        valgtSoknad.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND

    const gjenstaendeSoknader = hentGjenstaendeSoknader(soknader, valgtSoknad)

    const skalViseSelvstendigNaeringsdrivendeUxSignals =
        selvstendigNaeringsdrivendeStudyActive &&
        gjenstaendeSoknader.length === 0 &&
        valgtSoknad.soknadstype === RSSoknadstype.SELVSTENDIGE_OG_FRILANSERE &&
        valgtSoknad.arbeidssituasjon == RSArbeidssituasjon.NAERINGSDRIVENDE
    const skalViseUxSignals =
        !skalViseSelvstendigNaeringsdrivendeUxSignals && defaultStudyActive && gjenstaendeSoknader.length === 0
    const erJulesoknad = !!valgtSoknad?.julesoknad
    const skalViseFlexjar =
        !skalViseSelvstendigNaeringsdrivendeUxSignals && !skalViseUxSignals && (flexjarToggle.enabled || erJulesoknad)

    return (
        <>
            <SoknadHeader />

            <Kvittering />
            {erJulesoknad && <JulesoknadTekstKvittering />}
            <GjenstaendeSoknader soknader={gjenstaendeSoknader} />

            {gjenstaendeSoknader.length === 0 && (
                <Button
                    type="button"
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
            {skalViseSelvstendigNaeringsdrivendeUxSignals && (
                <UxSignalsWidget study={selvstendigNaeringsdrivendeStudy} demo={!isProd()} />
            )}
            {skalViseUxSignals && <UxSignalsWidget study={defaultStudy} demo={!isProd()} />}
            {skalViseEndre && <Endreknapp />}
            {skalViseSendTilArbeidsgiver && <Ettersending gjelder="arbeidsgiver" />}
            {skalViseFlexjar && <FlexjarKvittering />}
        </>
    )
}

export default KvitteringSide
