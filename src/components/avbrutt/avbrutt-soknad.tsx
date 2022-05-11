import { Alert, BodyLong, BodyShort } from '@navikt/ds-react'
import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import { useAppStore } from '../../data/stores/app-store'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { Brodsmule } from '../../types/types'
import { SEPARATOR } from '../../utils/constants'
import { tilLesbarDatoMedArstall } from '../../utils/dato-utils'
import { tekst } from '../../utils/tekster'
import { useAmplitudeInstance } from '../amplitude/amplitude'
import Banner from '../banner/banner'
import Brodsmuler from '../brodsmuler/brodsmuler'
import FristSykepenger from '../frist-sykepenger/frist-sykepenger'
import Opplysninger from '../opplysninger-fra-sykmelding/opplysninger'
import { urlTilSoknad } from '../soknad/soknad-link'
import GjenapneSoknad from '../soknader/avbryt/gjenapneknapp'

const brodsmuler: Brodsmule[] = [
    {
        tittel: tekst('soknader.sidetittel'),
        mobilTittel: tekst('soknader.brodsmuler.sidetittel'),
        sti: SEPARATOR,
        erKlikkbar: true,
    },
    {
        tittel: tekst('soknad.sidetittel'),
        sti: null as any,
        erKlikkbar: false,
    },
]

const AvbruttSoknad = () => {
    const {
        valgtSoknad,
        soknader,
        setValgtSoknad,
        setValgtSykmelding,
        sykmeldinger,
    } = useAppStore()
    const { logEvent } = useAmplitudeInstance()
    const { id } = useParams<RouteParams>()
    const history = useHistory()

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

    if (!valgtSoknad) return null

    if (valgtSoknad.status !== RSSoknadstatus.AVBRUTT) {
        history.replace(urlTilSoknad(valgtSoknad))
        return null
    }

    return (
        <>
            <Banner />
            <Brodsmuler brodsmuler={brodsmuler} />

            <div className="limit">
                <Alert variant="warning" style={{ marginBottom: '1rem' }}>
                    <BodyShort>
                        {tekst('sykepengesoknad.avbrutt.tidspunkt')}{' '}
                        {tilLesbarDatoMedArstall(valgtSoknad!.avbruttDato)}.
                    </BodyShort>
                </Alert>

                <div className="avbrutt-info">
                    <BodyLong spacing>
                        {tekst('sykepengesoknad.avbrutt.informasjon-innhold-1')}
                    </BodyLong>
                    <BodyLong spacing>
                        {tekst('sykepengesoknad.avbrutt.informasjon-innhold-2')}
                    </BodyLong>
                    <BodyLong spacing>
                        {tekst('sykepengesoknad.avbrutt.informasjon-innhold-3')}
                    </BodyLong>
                    <BodyLong spacing>
                        {tekst('sykepengesoknad.avbrutt.informasjon-innhold-4')}
                    </BodyLong>
                </div>

                <Opplysninger ekspandert={true} steg="avbrutt-søknad" />
                <FristSykepenger soknadstype={valgtSoknad.soknadstype} />
                <GjenapneSoknad />
            </div>
        </>
    )
}

export default AvbruttSoknad
