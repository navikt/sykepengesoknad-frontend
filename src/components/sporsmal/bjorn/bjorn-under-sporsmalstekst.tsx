import { BodyShort, Link } from '@navikt/ds-react'
import React from 'react'
import { useParams } from 'react-router'

import { TagTyper } from '../../../types/enums'
import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus'
import { innenforPaske } from '../../../utils/helligdager-utils'
import { tekst } from '../../../utils/tekster'
import { useAmplitudeInstance } from '../../amplitude/amplitude'
import Vis from '../../vis'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { fjernIndexFraTag } from '../sporsmal-utils'
import { RouteParams } from '../../../app'
import useSoknad from '../../../hooks/useSoknad'

import Bjorn from './bjorn'

const BjornUnderSporsmalstekst = ({ sporsmal }: SpmProps) => {
    const { id } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)
    const { logEvent } = useAmplitudeInstance()

    const bjornTekst = `soknad.bjorn.${fjernIndexFraTag(sporsmal.tag).toLowerCase()}`

    const bjornVeileder = (tag: TagTyper) => tag === TagTyper.ENKELTSTAENDE_BEHANDLINGSDAGER

    const bjornVeilederOgMaaler = (tag: TagTyper) =>
        tag === TagTyper.FERIE_V2 &&
        valgtSoknad?.status === RSSoknadstatus.NY &&
        !innenforPaske(valgtSoknad.fom, valgtSoknad.tom)

    return (
        <>
            <Vis hvis={bjornVeileder(sporsmal.tag)} render={() => <Bjorn className="blokk-m" nokkel={bjornTekst} />} />
            <Vis
                hvis={bjornVeilederOgMaaler(sporsmal.tag)}
                render={() => (
                    <Bjorn className="blokk-m">
                        <BodyShort>
                            {tekst(bjornTekst as any)}
                            <Link
                                href={tekst((bjornTekst + '_lenke') as any)}
                                onClick={() => {
                                    logEvent('navigere', {
                                        lenketekst: tekst((bjornTekst + '_lenketekst') as any),
                                    })
                                }}
                                target="_blank"
                            >
                                {tekst((bjornTekst + '_lenketekst') as any)}
                            </Link>
                        </BodyShort>
                    </Bjorn>
                )}
            />
        </>
    )
}

export default BjornUnderSporsmalstekst
