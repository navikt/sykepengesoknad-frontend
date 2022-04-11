import { Alert, BodyLong, BodyShort, Ingress } from '@navikt/ds-react'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import { useAmplitudeInstance } from '../../components/amplitude/amplitude'
import Banner from '../../components/banner/banner'
import Brodsmuler from '../../components/brodsmuler/brodsmuler'
import HvorforSoknadSykepenger from '../../components/hvorfor-soknad-sykepenger/hvorfor-soknad-sykepenger'
import Opplysninger from '../../components/opplysninger-fra-sykmelding/opplysninger'
import GjenapneSoknad from '../../components/soknader/avbryt/gjenapneknapp'
import { useAppStore } from '../../data/stores/app-store'
import { Brodsmule } from '../../types/types'
import { SEPARATOR } from '../../utils/constants'
import { tilLesbarDatoMedArstall } from '../../utils/dato-utils'
import { tekst } from '../../utils/tekster'

const brodsmuler: Brodsmule[] = [ {
    tittel: tekst('soknader.sidetittel'),
    mobilTittel: tekst('soknader.brodsmuler.sidetittel'),
    sti: SEPARATOR,
    erKlikkbar: true
}, {
    tittel: tekst('soknad.sidetittel'),
    sti: null as any,
    erKlikkbar: false,
} ]

const AvbruttSoknad = () => {
    const { valgtSoknad, soknader, setValgtSoknad, setValgtSykmelding, sykmeldinger } = useAppStore()
    const { logEvent } = useAmplitudeInstance()
    const { id } = useParams<RouteParams>()

    useEffect(() => {
        const filtrertSoknad = soknader.find(soknad => soknad.id === id)
        setValgtSoknad(filtrertSoknad)

        const sykmelding = sykmeldinger.find(sm => sm.id === filtrertSoknad?.sykmeldingId)
        setValgtSykmelding(sykmelding)

        logEvent('skjema åpnet', {
            skjemanavn: 'sykepengesoknad',
            soknadstype: filtrertSoknad?.soknadstype,
            soknadstatus: filtrertSoknad?.status,
        })
        // eslint-disable-next-line
    }, [id])

    if (!valgtSoknad) return null

    return (
        <>
            <Banner />
            <Brodsmuler brodsmuler={brodsmuler} />

            <div className="limit">
                <Alert variant="warning" style={{ marginBottom: '1rem' }}>
                    <BodyShort>
                        {tekst('sykepengesoknad.avbrutt.tidspunkt')} {tilLesbarDatoMedArstall(valgtSoknad!.avbruttDato)}.
                    </BodyShort>
                </Alert>

                <Ingress>
                    {tekst('sykepengesoknad.avbrutt.informasjon-tittel')}
                </Ingress>
                <BodyLong spacing>
                    {tekst('sykepengesoknad.avbrutt.informasjon-innhold')}
                </BodyLong>

                <Opplysninger ekspandert={true} steg="avbrutt-søknad" />
                <HvorforSoknadSykepenger soknadstype={valgtSoknad.soknadstype} />
                <GjenapneSoknad />
            </div>
        </>
    )
}

export default AvbruttSoknad
