import './statuspanel.less'

import { Knapp } from 'nav-frontend-knapper'
import { EtikettLiten } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'

import { useAppStore } from '../../data/stores/app-store'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { Soknad } from '../../types/types'
import { tilLesbarDatoMedArstall } from '../../utils/dato-utils'
import env from '../../utils/environment'
import { logger } from '../../utils/logger'
import { tekst } from '../../utils/tekster'

interface StatusNokkelopplysningProps {
    tittel: string;
    innhold: string | null;
}

export const StatusNokkelopplysning = ({ tittel, innhold }: StatusNokkelopplysningProps) => {
    return (
        <>
            <EtikettLiten tag='h3'>{tittel}</EtikettLiten>
            <p className={'avsnitt'}> {innhold} </p>
        </>
    )
}

interface GjenapneSoknadProps {
    soknad: Soknad;

}

export const StatusPanel = () => {
    const { valgtSoknad, setValgtSoknad, setValgtSykmelding, sykmeldinger, soknader, setSoknader } = useAppStore()
    const [ gjenapner ] = useState<boolean>(false)
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
        const oppholdUtland = valgtSoknad?.soknadstype === RSSoknadstype.OPPHOLD_UTLAND
        const ettAarSiden = new Date()
        ettAarSiden.setFullYear(ettAarSiden.getFullYear() - 1)
        return !oppholdUtland && opprettetDato >= ettAarSiden
    }

    const GjenapneSoknad = ({ soknad }: GjenapneSoknadProps) => {
        logger.info(`GjenapneSoknad-1 - sykepengesoknad.id: ${soknad.id} - vis: ${soknadKanGjenapnes(soknad.opprettetDato)}`)

        return soknadKanGjenapnes(soknad.opprettetDato)
            ?
            <div className="verktoylinje__element">
                {
                    logger.info(`GjenapneSoknad-2 - sykepengesoknad.id: ${soknad.id} - vis: ${soknad.opprettetDato}`)
                }
                <Knapp
                    type="standard"
                    spinner={gjenapner}
                    disabled={gjenapner}
                    mini
                    onClick={Gjenapne}
                    className="js-gjenapne">
                    {'Gjenåpne'}
                </Knapp>
            </div>
            : null
    }

    const Gjenapne = () => {
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
        <div className={'statuspanel panel--ramme statuspanel--ramme'}>
            <div className={'venstre-justert'}>
                <StatusNokkelopplysning
                    tittel={tekst('statuspanel.status')}
                    innhold={tekst('sykepengesoknad.status.AVBRUTT')}
                />
            </div>
            <div className={'hoyre-justert'}>
                <StatusNokkelopplysning
                    tittel={'Dato avbrutt'}
                    innhold={tilLesbarDatoMedArstall(valgtSoknad?.avbruttDato)}
                />
            </div>
            <GjenapneSoknad soknad={valgtSoknad!} />
        </div>
    )

}
