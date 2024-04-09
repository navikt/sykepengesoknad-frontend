import { Alert, BodyLong, BodyShort } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { tilLesbarDatoMedArstall } from '../../utils/dato-utils'
import { tekst } from '../../utils/tekster'
import { logEvent } from '../amplitude/amplitude'
import FristSykepenger from '../frist-sykepenger/frist-sykepenger'
import { GjenstaendeSoknader, hentGjenstaendeSoknader } from '../gjenstaende-soknader/gjenstaende-soknader'
import Opplysninger from '../opplysninger-fra-sykmelding/opplysninger'
import { urlTilSoknad } from '../soknad/soknad-link'
import Vis from '../vis'
import useSoknader from '../../hooks/useSoknader'
import QueryStatusPanel from '../queryStatusPanel/QueryStatusPanel'
import { soknadBreadcrumb, useUpdateBreadcrumbs } from '../../hooks/useBreadcrumbs'
import { SoknadHeader } from '../soknad/soknad-header'
import { useSoknadMedDetaljer } from '../../hooks/useSoknadMedDetaljer'
import { FlexjarSurveyModal } from '../flexjar/flexjar-survey'
import { skjulFlexjarSurvey } from '../flexjar/utils'

import GjenapneSoknad from './gjenapneknapp'

const AvbruttSoknad = () => {
    const router = useRouter()
    const { data: soknader } = useSoknader()
    const { valgtSoknad, soknadId } = useSoknadMedDetaljer()
    const [visSurvey, setVisSurvey] = useState(router.query.visSurvey === 'true')

    const svarAlternativer = [
        'Jeg har allerede sendt inn søknaden på papir',
        'Jeg vil lage en ny søknad',
        'Arbeidsgiveren min betaler for hele sykefraværet',
        'Jeg skal svare på søknaden senere',
        'Jeg vil ikke søke',
        'Annet',
    ]

    useUpdateBreadcrumbs(() => [{ ...soknadBreadcrumb, handleInApp: true }], [])

    useEffect(() => {
        if (!valgtSoknad) return

        if (valgtSoknad.status !== RSSoknadstatus.AVBRUTT) {
            router.push(urlTilSoknad(valgtSoknad))
            return
        }

        logEvent('skjema åpnet', {
            skjemanavn: 'sykepengesoknad',
            soknadstype: valgtSoknad.soknadstype,
            soknadstatus: valgtSoknad.status,
        })
        // eslint-disable-next-line
    }, [valgtSoknad])

    if (!valgtSoknad || !soknader) return <QueryStatusPanel valgSoknadId={soknadId} />

    const gjenstaendeSoknader = hentGjenstaendeSoknader(soknader, valgtSoknad)

    return (
        <>
            <SoknadHeader />

            <Alert variant="warning" style={{ marginBottom: '1rem' }}>
                <BodyShort>
                    {tekst('sykepengesoknad.avbrutt.tidspunkt')} {tilLesbarDatoMedArstall(valgtSoknad.avbruttDato)}.
                </BodyShort>
            </Alert>
            <BodyLong spacing>{tekst('sykepengesoknad.avbrutt.informasjon-innhold-1')}</BodyLong>
            <BodyLong spacing>{tekst('sykepengesoknad.avbrutt.informasjon-innhold-2')}</BodyLong>
            <BodyLong spacing>{tekst('sykepengesoknad.avbrutt.informasjon-innhold-3')}</BodyLong>
            <BodyLong spacing>{tekst('sykepengesoknad.avbrutt.informasjon-innhold-4')}</BodyLong>

            <Opplysninger ekspandert={false} steg="avbrutt-søknad" />
            <FristSykepenger />

            <Vis
                hvis={dayjs(valgtSoknad.avbruttDato).isAfter(dayjs().subtract(2, 'seconds'))}
                render={() => (
                    <GjenstaendeSoknader
                        style={{ marginTop: '1rem', marginBottom: '1rem' }}
                        soknader={gjenstaendeSoknader}
                    />
                )}
            />
            <GjenapneSoknad />
            <FlexjarSurveyModal
                modalTittel="Du har avbrutt søknaden"
                visSurvey={visSurvey}
                surveySporsmal="Hvorfor ønsket du å avbryte denne søknaden?"
                svarAlternativer={svarAlternativer}
                onSubmit={() => {
                    skjulFlexjarSurvey(router).then(() => setVisSurvey(false))
                }}
                feedbackId="sykpengesoknad-avbryt-survey"
            ></FlexjarSurveyModal>
        </>
    )
}

export default AvbruttSoknad
