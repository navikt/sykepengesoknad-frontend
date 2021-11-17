import './kvittering.less'

import { VenstreChevron } from 'nav-frontend-chevron'
import { Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { RouteParams } from '../../app'
import Banner from '../../components/banner/banner'
import Brodsmuler from '../../components/brodsmuler/brodsmuler'
import { hentHotjarJsTrigger, HotjarTrigger } from '../../components/hotjar-trigger'
import Kvittering from '../../components/kvittering/kvittering'
import Vis from '../../components/vis'
import { useAppStore } from '../../data/stores/app-store'
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { Brodsmule } from '../../types/types'
import { SEPARATOR } from '../../utils/constants'
import env from '../../utils/environment'
import fetcher from '../../utils/fetcher'
import { logger } from '../../utils/logger'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'

const brodsmuler: Brodsmule[] = [ {
    tittel: tekst('soknader.sidetittel'),
    sti: SEPARATOR,
    erKlikkbar: true
}, {
    tittel: tekst('kvittering.sidetittel'),
    sti: null as any,
    erKlikkbar: false,
} ]

const KvitteringSide = () => {
    const { valgtSoknad, soknader, setValgtSoknad, setValgtSykmelding, sykmeldinger } = useAppStore()
    const [ erSiste, setErSiste ] = useState<boolean>()
    const [ hotjarTrigger, setHotjarTrigger ] = useState<string | null>(null)

    const { id } = useParams<RouteParams>()

    useEffect(() => {
        const filtrertSoknad = soknader.find(soknad => soknad.id === id)
        setValgtSoknad(filtrertSoknad)

        const sykmelding = sykmeldinger.find(sm => sm.id === filtrertSoknad?.sykmeldingId)
        setValgtSykmelding(sykmelding)
        // eslint-disable-next-line
    }, [id]);

    useEffect(() => {
        setBodyClass('kvittering')
        setErSiste(valgtSoknad?.status === RSSoknadstatus.SENDT)
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (valgtSoknad) {
            if (valgtSoknad.soknadstype == RSSoknadstype.ARBEIDSTAKERE) {
                fetch(`${env.narmestelederRoot()}/user/sykmeldt/narmesteledere`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' }
                }).then(async(r) => {
                    interface NarmesteLeder {
                        navn?: string;
                        orgnummer: string;
                        aktivFom: string;
                        aktivTom?: string;  // Er null hvis fortsatt aktiv leder
                        arbeidsgiverForskutterer?: boolean;
                    }

                    if (r.status == 200) {
                        const ledere = await r.json() as NarmesteLeder[]
                        const utenForskuttering = ledere
                            .filter((a) => !a.aktivTom)
                            .filter((a) => a.orgnummer == valgtSoknad.arbeidsgiver?.orgnummer)
                            .find((a) => a.arbeidsgiverForskutterer == false)
                        if (utenForskuttering) {
                            setHotjarTrigger('FLEX_REKRUTTERING_REFUSJON')
                        }
                    }
                }).catch((e) => {
                    // eslint-disable-next-line no-console
                    logger.error('feil ved sjekk av narmesteleder refusjon', e)
                })
            } else {
                setHotjarTrigger(hentHotjarJsTrigger(valgtSoknad.soknadstype, 'kvittering'))
            }
        }
    }, [ valgtSoknad ])

    if (!valgtSoknad) return null


    return (
        <>
            <Banner />
            <Brodsmuler brodsmuler={brodsmuler} />

            <div className="limit">
                <HotjarTrigger jsTrigger={hotjarTrigger}>
                    <Kvittering />
                </HotjarTrigger>

                <Vis hvis={erSiste}
                    render={() =>
                        <Link to="/" className="gaa-videre">
                            <Normaltekst tag="span">
                                <VenstreChevron />
                                {tekst('sykepengesoknad.navigasjon.gaa-til')}
                            </Normaltekst>
                        </Link>
                    }
                />
            </div>
        </>
    )
}

export default KvitteringSide
