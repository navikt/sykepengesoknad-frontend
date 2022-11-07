import { Heading } from '@navikt/ds-react'
import React from 'react'
import { useParams } from 'react-router'

import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { tilLesbarPeriodeMedArstall } from '../../utils/dato-utils'
import { tekst } from '../../utils/tekster'
import Vis from '../vis'
import { RouteParams } from '../../app'
import useSoknad from '../../hooks/useSoknad'

interface BannerProps {
    overskrift?: string
}

const Banner = ({ overskrift }: BannerProps) => {
    const { id } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id, id !== undefined)

    const tittel = () => {
        if (valgtSoknad) {
            if (valgtSoknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND) {
                return tekst('sykepengesoknad-utland.tittel')
            }
            if (valgtSoknad.soknadstype === RSSoknadstype.REISETILSKUDD) {
                return tekst('reisetilskuddsoknad.tittel')
            }
            if (valgtSoknad.soknadstype === RSSoknadstype.GRADERT_REISETILSKUDD) {
                return tekst('gradert-reisetilskuddsoknad.tittel')
            }
        }
        return tekst('sykepengesoknad.sidetittel')
    }

    return (
        <header className="sidebanner">
            {/*
            <SykSokLokalt />
            */}
            <Heading size="xlarge" level="1" className="sidebanner__tittel">
                {overskrift === undefined ? tittel() : overskrift}
            </Heading>
            <Vis
                hvis={valgtSoknad && valgtSoknad.fom && valgtSoknad.tom}
                render={() => (
                    <Heading size="medium">{tilLesbarPeriodeMedArstall(valgtSoknad!.fom, valgtSoknad!.tom)}</Heading>
                )}
            />
        </header>
    )
}

export default Banner
