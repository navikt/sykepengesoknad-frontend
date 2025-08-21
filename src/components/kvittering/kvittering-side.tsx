import { Button } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'
import { logger } from '@navikt/next-logger'
import { useRouter } from 'next/router'

import Endreknapp from '../../components/endreknapp/endreknapp'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { sykefravaerUrl } from '../../utils/environment'
import { tekst } from '../../utils/tekster'
import { logEvent } from '../amplitude/amplitude'
import Ettersending from '../ettersending/ettersending'
import { GjenstaendeSoknader, hentGjenstaendeSoknader } from '../gjenstaende-soknader/gjenstaende-soknader'
import useSoknader from '../../hooks/useSoknader'
import { urlTilSoknad } from '../soknad/soknad-link'
import QueryStatusPanel from '../queryStatusPanel/QueryStatusPanel'
import { kvitteringBreadcrumb, useUpdateBreadcrumbs } from '../../hooks/useBreadcrumbs'
import { SoknadHeader } from '../soknad/soknad-header'
import { FlexjarKvittering } from '../flexjar/flexjar-kvittering'
import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'
import { useToggle } from '../../toggles/context'
import { JulesoknadTekstKvittering } from '../julesoknad/julesoknad-infotekst'
import { RSArbeidssituasjon } from '../../types/rs-types/rs-arbeidssituasjon'
import { SelvstendingSurveyModal } from '../flexjar/selvstending-survey'

import Kvittering from './kvittering'

const KvitteringSide = () => {
    const { valgtSoknad, soknadId } = useSoknadMedDetaljer()
    const router = useRouter()
    const { data: soknader } = useSoknader()

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

    const [visSurvey, setVisSurvey] = useState<boolean>(false)

    useEffect(() => {
        setVisSurvey(valgtSoknad?.arbeidssituasjon === RSArbeidssituasjon.NAERINGSDRIVENDE)
    }, [valgtSoknad])

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

    const erJulesoknad = !!valgtSoknad?.julesoknad
    const skalViseFlexjar =
        flexjarToggle.enabled ||
        erJulesoknad ||
        valgtSoknad?.soknadstype == RSSoknadstype.FRISKMELDT_TIL_ARBEIDSFORMIDLING

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
            {skalViseEndre && <Endreknapp />}
            {skalViseSendTilArbeidsgiver && <Ettersending gjelder="arbeidsgiver" />}
            {skalViseFlexjar && <FlexjarKvittering />}

            <SelvstendingSurveyModal
                visSurvey={visSurvey}
                onSubmit={() => setVisSurvey(false)}
            ></SelvstendingSurveyModal>
        </>
    )
}

export default KvitteringSide
