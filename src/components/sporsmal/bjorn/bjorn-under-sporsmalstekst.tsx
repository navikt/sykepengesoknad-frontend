import { BodyShort, Link } from '@navikt/ds-react'
import React from 'react'

import { useAppStore } from '../../../data/stores/app-store'
import { TagTyper } from '../../../types/enums'
import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus'
import { tekst } from '../../../utils/tekster'
import { useAmplitudeInstance } from '../../amplitude/amplitude'
import Vis from '../../vis'
import { innenforPaske } from '../bendiksen/paske-utils'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { fjernIndexFraTag } from '../sporsmal-utils'
import Bjorn from './bjorn'

const BjornUnderSporsmalstekst = ({ sporsmal }: SpmProps) => {
    const { valgtSoknad } = useAppStore()
    const { logEvent } = useAmplitudeInstance()

    const bjornTekst= `soknad.bjorn.${fjernIndexFraTag(sporsmal.tag).toLowerCase()}`

    const bjornVeileder = (tag: TagTyper) =>
        tag === TagTyper.ENKELTSTAENDE_BEHANDLINGSDAGER

    const bjornVeilederOgMaaler = (tag: TagTyper) =>
        tag === TagTyper.FERIE_V2 && valgtSoknad?.status === RSSoknadstatus.NY && !innenforPaske(valgtSoknad.fom, valgtSoknad.tom)

    return (
        <>
            <Vis hvis={bjornVeileder(sporsmal.tag)}
                render={() =>
                    <Bjorn className="blokk-m" nokkel={ bjornTekst } />
                }
            />
            <Vis hvis={bjornVeilederOgMaaler(sporsmal.tag)} render={() =>
                <Bjorn className="blokk-m" >
                    <BodyShort>
                        {tekst(bjornTekst as any)}
                        <Link href={tekst((bjornTekst + '_lenke') as any) }
                            onClick={() => { logEvent('navigere', { lenketekst: tekst((bjornTekst + '_lenketekst') as any) })}}
                            target="_blank"
                        >
                            {tekst((bjornTekst + '_lenketekst') as any )}
                        </Link>
                    </BodyShort>
                </Bjorn>} />
        </>
    )
}

export default BjornUnderSporsmalstekst
