import './statuspanel.less'

import { Knapp } from 'nav-frontend-knapper'
import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router'

import { useAppStore } from '../../data/stores/app-store'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { tilLesbarDatoMedArstall } from '../../utils/dato-utils'
import env from '../../utils/environment'
import { logger } from '../../utils/logger'
import { tekst } from '../../utils/tekster'
import Vis from '../vis'

const StatusPanel = () => {
    const { valgtSoknad, setValgtSoknad, setValgtSykmelding, sykmeldinger, soknader, setSoknader } = useAppStore()
    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {
        if (!valgtSoknad) {
            const filtrertSoknad = soknader.find(soknad => soknad.id === id)
            setValgtSoknad(filtrertSoknad)
            const sykmelding = sykmeldinger.find(sm => sm.id === filtrertSoknad?.sykmeldingId)
            setValgtSykmelding(sykmelding)
        }
        // eslint-disable-next-line
    }, [])

    const soknadKanGjenapnes = (opprettetDato: Date) => {
        const oppholdUtland = valgtSoknad!.soknadstype === RSSoknadstype.OPPHOLD_UTLAND
        const ettAarSiden = new Date()
        ettAarSiden.setFullYear(ettAarSiden.getFullYear() - 1)
        return !oppholdUtland && opprettetDato >= ettAarSiden
    }

    const Gjenapne = () => {
        logger.info(`GjenapneSoknad-1 - sykepengesoknad.id: ${valgtSoknad!.id} - vis: ${soknadKanGjenapnes(valgtSoknad!.opprettetDato)}`)
        fetch(env.syfoapiRoot + `/syfosoknad/api/soknader/${valgtSoknad!.id}/gjenapne`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }).then((res: Response) => {
            try {
                const httpCode = res.status
                if ([ 200, 201, 203, 206 ].includes(httpCode)) {
                    valgtSoknad!.status = RSSoknadstatus.NY
                    valgtSoknad!.avbruttDato = undefined
                    setValgtSoknad(valgtSoknad)
                    soknader[soknader.findIndex(sok => sok.id === valgtSoknad!.id)] = valgtSoknad!
                    setSoknader(soknader)
                    history.push(`/soknader/${valgtSoknad!.id}/1`)
                } else {
                    logger.error('Feil ved gjenåpning av søknad', res)
                }
            } catch (e) {
                logger.error('Feil ved gjenåpning av søknad', e)
            }
        })
    }


    return (
        <div className={'statuspanel'}>
            <div className={'content'}>
                <div className='avsnitt'>
                    <EtikettLiten tag='h3' className='avsnitt-hode'>{tekst('statuspanel.status')}</EtikettLiten>
                    <Normaltekst>{tekst('sykepengesoknad.status.AVBRUTT')}</Normaltekst>
                </div>
                <div className='avsnitt'>
                    <EtikettLiten tag='h3' className='avsnitt-hode'>{'Dato avbrutt'}</EtikettLiten>
                    <Normaltekst>{tilLesbarDatoMedArstall(valgtSoknad!.avbruttDato)}</Normaltekst>
                </div>
            </div>
            <Vis hvis={ soknadKanGjenapnes(valgtSoknad!.opprettetDato)} >
                <Knapp mini type="standard" onClick={Gjenapne}>
                    {'Gjenåpne søknad'}
                </Knapp>
            </Vis>
        </div>
    )

}

export default StatusPanel
