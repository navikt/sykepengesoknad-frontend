import { Heading } from '@navikt/ds-react'
import React from 'react'
import { useParams } from 'react-router'

import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { tilLesbarPeriodeMedArstall } from '../../utils/dato-utils'
import { tekst } from '../../utils/tekster'
import Vis from '../vis'
import { RouteParams } from '../../app'
import useSoknad from '../../hooks/useSoknad'
import Person from '../person/Person'

interface BannerProps {
    overskrift?: string
}

const Banner = ({ overskrift }: BannerProps) => {
    const { id } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id, id !== undefined)

    interface TittelMedSize {
        tittel: string
        size: 'xlarge' | 'medium' | 'large'
    }
    const tittel = (): TittelMedSize => {
        if (valgtSoknad) {
            if (valgtSoknad.utenlandskSykmelding === true) {
                return { tittel: 'Egenerklæring for utenlandske sykmeldinger', size: 'medium' }
            }
            if (valgtSoknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND) {
                return { tittel: tekst('sykepengesoknad-utland.tittel'), size: 'xlarge' }
            }
            if (valgtSoknad.soknadstype === RSSoknadstype.REISETILSKUDD) {
                return { tittel: tekst('reisetilskuddsoknad.tittel'), size: 'xlarge' }
            }
            if (valgtSoknad.soknadstype === RSSoknadstype.GRADERT_REISETILSKUDD) {
                return { tittel: tekst('gradert-reisetilskuddsoknad.tittel'), size: 'xlarge' }
            }
        }
        return { tittel: tekst('sykepengesoknad.sidetittel'), size: 'xlarge' }
    }
    const tittelen = tittel()

    return (
        <header className="sidebanner">
            <Heading size={tittelen.size} level="1" className="sidebanner__tittel">
                {overskrift === undefined ? tittelen.tittel : overskrift}
                <Vis
                    hvis={valgtSoknad && valgtSoknad.fom && valgtSoknad.tom}
                    render={() => (
                        <Heading size="medium" as="span">
                            {tilLesbarPeriodeMedArstall(valgtSoknad!.fom, valgtSoknad!.tom)}
                        </Heading>
                    )}
                />
            </Heading>
            <Person />
        </header>
    )
}

export default Banner
