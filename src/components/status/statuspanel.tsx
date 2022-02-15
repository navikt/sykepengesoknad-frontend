import './statuspanel.less'

import { Knapp } from 'nav-frontend-knapper'
import { Normaltekst, UndertekstBold } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'

import { RouteParams } from '../../app'
import { redirectTilLoginHvis401 } from '../../data/rest/utils'
import { useAppStore } from '../../data/stores/app-store'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { tilLesbarDatoMedArstall } from '../../utils/dato-utils'
import env from '../../utils/environment'
import fetcher from '../../utils/fetcher'
import { logger } from '../../utils/logger'
import { tekst } from '../../utils/tekster'
import { useAmplitudeInstance } from '../amplitude/amplitude'

const StatusPanel = () => {
    const { valgtSoknad, setValgtSoknad, setValgtSykmelding, sykmeldinger, soknader, setSoknader } = useAppStore()
    const history = useHistory()
    const { id } = useParams<RouteParams>()
    const [ gjenapner, setGjenapner ] = useState<boolean>(false)
    const { logEvent } = useAmplitudeInstance()

    useEffect(() => {
        if (!valgtSoknad) {
            const filtrertSoknad = soknader.find(soknad => soknad.id === id)
            setValgtSoknad(filtrertSoknad)
            const sykmelding = sykmeldinger.find(sm => sm.id === filtrertSoknad?.sykmeldingId)
            setValgtSykmelding(sykmelding)
        }
        // eslint-disable-next-line
    }, [])

    const Gjenapne = async() => {
        if (gjenapner) return
        setGjenapner(true)
        try {
            const res = await fetcher(env.flexGatewayRoot() + `/syfosoknad/api/soknader/${valgtSoknad!.id}/gjenapne`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' }
            })

            logEvent('knapp klikket', {
                'tekst': 'Gjenåpne søknad',
                'soknadstype': valgtSoknad?.soknadstype,
                'component': 'Avbrutt søknad visning'
            })

            try {
                const httpCode = res.status
                if (redirectTilLoginHvis401(res)) {
                    return
                } else if ([ 200, 201, 203, 206 ].includes(httpCode)) {
                    valgtSoknad!.status = RSSoknadstatus.NY
                    valgtSoknad!.avbruttDato = undefined
                    setValgtSoknad(valgtSoknad)
                    soknader[ soknader.findIndex(sok => sok.id === valgtSoknad!.id) ] = valgtSoknad!
                    setSoknader(soknader)
                    history.push(`/soknader/${valgtSoknad!.id}/1`)
                } else {
                    logger.error('Feil ved gjenåpning av søknad', res)
                }
            } catch (e) {
                logger.error('Feil ved gjenåpning av søknad', e)
            }
        } finally {
            setGjenapner(false)
        }
    }

    return (
        <div className={'statuspanel'}>
            <div className={'content'}>
                <div className="avsnitt">
                    <UndertekstBold tag="h3" className="avsnitt-hode">{tekst('statuspanel.status')}</UndertekstBold>
                    <Normaltekst>{tekst('sykepengesoknad.status.AVBRUTT')}</Normaltekst>
                </div>
                <div className="avsnitt">
                    <UndertekstBold tag="h3" className="avsnitt-hode">{'Dato avbrutt'}</UndertekstBold>
                    <Normaltekst>{tilLesbarDatoMedArstall(valgtSoknad!.avbruttDato)}</Normaltekst>
                </div>
            </div>

            <Knapp spinner={gjenapner} mini type="standard" onClick={Gjenapne}>
                {'Gjenåpne søknad'}
            </Knapp>
        </div>
    )
}

export default StatusPanel
