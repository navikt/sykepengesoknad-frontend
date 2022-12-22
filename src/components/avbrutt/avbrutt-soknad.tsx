import { Alert, BodyLong, BodyShort } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import { useAppStore } from '../../data/stores/app-store'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { tilLesbarDatoMedArstall } from '../../utils/dato-utils'
import { tekst } from '../../utils/tekster'
import { useAmplitudeInstance } from '../amplitude/amplitude'
import Banner from '../banner/banner'
import FristSykepenger from '../frist-sykepenger/frist-sykepenger'
import { GjenstaendeSoknader, hentGjenstaendeSoknader } from '../gjenstaende-soknader/gjenstaende-soknader'
import Opplysninger from '../opplysninger-fra-sykmelding/opplysninger'
import { urlTilSoknad } from '../soknad/soknad-link'
import GjenapneSoknad from '../soknader/avbryt/gjenapneknapp'
import Vis from '../vis'
import useSoknader from '../../hooks/useSoknader'
import useSoknad from '../../hooks/useSoknad'
import QueryStatusPanel from '../queryStatusPanel/QueryStatusPanel'
import { soknadBreadcrumb, useUpdateBreadcrumbs } from '../../hooks/useBreadcrumbs'

const AvbruttSoknad = () => {
    const { id } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)
    const { data: soknader } = useSoknader()

    const { setValgtSykmelding, sykmeldinger } = useAppStore()
    const { logEvent } = useAmplitudeInstance()
    const history = useHistory()

    useUpdateBreadcrumbs(() => [{ ...soknadBreadcrumb, handleInApp: true }], [])

    useEffect(() => {
        if (!valgtSoknad || !sykmeldinger) return

        if (valgtSoknad.status !== RSSoknadstatus.AVBRUTT) {
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

    if (!valgtSoknad || !soknader) return <QueryStatusPanel valgSoknadId={id} />

    const gjenstaendeSoknader = hentGjenstaendeSoknader(soknader, valgtSoknad)

    return (
        <>
            <Banner />

            <div className="limit">
                <Alert variant="warning" style={{ marginBottom: '1rem' }}>
                    <BodyShort>
                        {tekst('sykepengesoknad.avbrutt.tidspunkt')} {tilLesbarDatoMedArstall(valgtSoknad.avbruttDato)}.
                    </BodyShort>
                </Alert>
                <div className="avbrutt-info">
                    <BodyLong spacing>{tekst('sykepengesoknad.avbrutt.informasjon-innhold-1')}</BodyLong>
                    <BodyLong spacing>{tekst('sykepengesoknad.avbrutt.informasjon-innhold-2')}</BodyLong>
                    <BodyLong spacing>{tekst('sykepengesoknad.avbrutt.informasjon-innhold-3')}</BodyLong>
                    <BodyLong spacing>{tekst('sykepengesoknad.avbrutt.informasjon-innhold-4')}</BodyLong>
                </div>

                <Opplysninger ekspandert={false} steg="avbrutt-søknad" />
                <FristSykepenger soknadstype={valgtSoknad.soknadstype} />

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
            </div>
        </>
    )
}

export default AvbruttSoknad
