import Lenke from 'nav-frontend-lenker'
import { Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../../data/stores/app-store'
import { TagTyper } from '../../../types/enums'
import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus'
import { tekst } from '../../../utils/tekster'
import { useAmplitudeInstance } from '../../amplitude/amplitude'
import Vis from '../../vis'
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
        tag === TagTyper.FERIE_V2 && valgtSoknad?.status === RSSoknadstatus.NY

    return (
        <>
            <Vis hvis={bjornVeileder(sporsmal.tag)}
                render={() =>
                    <Bjorn className="blokk-m" nokkel={ bjornTekst } />
                }
            />
            <Vis hvis={bjornVeilederOgMaaler(sporsmal.tag)} render={() =>
                <Bjorn className="blokk-m" >
                    <Normaltekst>
                        {tekst(bjornTekst as any)}
                        <Lenke
                            onClick={() => { logEvent('navigere', { lenketekst: tekst((bjornTekst + '_lenketekst') as any) })}}
                            href={tekst((bjornTekst + '_lenke') as any) }
                            target={'_blank'}
                        >
                            {tekst((bjornTekst + '_lenketekst') as any )}
                        </Lenke>
                    </Normaltekst>
                </Bjorn>} />
        </>
    )
}

export default BjornUnderSporsmalstekst
