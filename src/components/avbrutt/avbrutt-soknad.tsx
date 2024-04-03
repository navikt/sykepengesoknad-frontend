import { Alert, BodyLong, BodyShort } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
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
import { FlexjarSurvey } from '../flexjar/flexjar-survey'

import GjenapneSoknad from './gjenapneknapp'

const AvbruttSoknad = () => {
    const router = useRouter()
    const { data: soknader } = useSoknader()
    const { valgtSoknad, soknadId } = useSoknadMedDetaljer()

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

    const flexjarAlternativer = [
        'Arbeidsgiveren min betaler hele sykefraværet',
        'Jeg skal svare på søknaden senere',
        'Annet',
    ]

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

            <FlexjarSurvey
                onSubmit={() => {}}
                tittel="Hvorfor avbrøt du søknaden?"
                flexjarSporsmal="Hvorfor ønsker du å avbryte denne søknaden?"
                svarAlternativer={flexjarAlternativer}
            ></FlexjarSurvey>
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
        </>
    )
}

export default AvbruttSoknad
