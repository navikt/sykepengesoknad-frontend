import './kvittering.less'

import Alertstripe from 'nav-frontend-alertstriper'
import { Knapp } from 'nav-frontend-knapper'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { useParams } from 'react-router-dom'

import useFetch from '../../data/rest/use-fetch'
import { FetchState, hasData } from '../../data/rest/utils'
import { useAppStore } from '../../data/stores/app-store'
import { RSSoknad } from '../../types/rs-types/rs-soknad'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { Soknad } from '../../types/types'
import env from '../../utils/environment'
import { logger } from '../../utils/logger'
import { tekst } from '../../utils/tekster'
import { getUrlTilSoknad } from '../../utils/url-utils'
import Opplysninger from '../opplysninger/opplysninger'
import Oppsummering from '../oppsummering/oppsummering'
import Ettersending from '../status/ettersending'
import Vis from '../vis'
import KvitteringInfo from './kvittering-info'
import KvitteringStatus from './kvittering-status'

const Kvittering = () => {
    const { valgtSoknad, setValgtSoknad, soknader, setSoknader, sykmeldinger, setValgtSykmelding, feilmeldingTekst, setFeilmeldingTekst } = useAppStore()
    const korrigerSoknad = useFetch<RSSoknad>()
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

    const korriger = () => {
        korrigerSoknad.fetch(env.syfoapiRoot + `/syfosoknad/api/soknader/${valgtSoknad!.id}/korriger`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }, (fetchState: FetchState<RSSoknad>) => {
            if (hasData(fetchState)) {
                const soknad = new Soknad(fetchState.data)
                soknader.push(soknad)
                setSoknader(soknader)
                history.push(getUrlTilSoknad(soknad, undefined))
                setFeilmeldingTekst('')
            } else {
                logger.error('Feil ved opprettelse av UTKAST_TIL_KORRIGERING', fetchState)
                setFeilmeldingTekst(tekst('kvittering.korrigering.feilet'))
            }
        })
    }

    const skalViseKnapperad = !(valgtSoknad?.soknadstype === RSSoknadstype.OPPHOLD_UTLAND)

    return (
        <div className="kvittering">
            <KvitteringStatus />
            <KvitteringInfo />
            <Opplysninger ekspandert={false} />
            <Oppsummering />

            <Vis hvis={skalViseKnapperad}>
                <div className='knapperad'>
                    <Knapp mini type='standard' onClick={korriger}>{tekst('kvittering.knapp.endre')}</Knapp>

                    <Ettersending gjelder='nav' />

                    <Vis hvis={valgtSoknad!.arbeidsgiver !== undefined}>
                        <Ettersending gjelder='arbeidsgiver' />
                    </Vis>
                </div>
            </Vis>

            <div aria-live="polite">
                <Vis hvis={feilmeldingTekst !== ''}>
                    <Alertstripe type="feil">{feilmeldingTekst}</Alertstripe>
                </Vis>
            </div>
        </div>
    )
}

export default Kvittering
