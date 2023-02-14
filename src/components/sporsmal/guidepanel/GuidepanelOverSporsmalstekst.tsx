import React from 'react'
import { BodyShort } from '@navikt/ds-react'
import parser from 'html-react-parser'

import { TagTyper } from '../../../types/enums'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { fjernIndexFraTag } from '../sporsmal-utils'
import { tekst } from '../../../utils/tekster'
import { ProgressivtGuidePanel } from '../../guidepanel/ProgressivtGuidePanel'

import styles from './GuidepanelOverSporsmalstekst.module.css'

const GuidepanelOverSporsmalstekst = ({ sporsmal }: SpmProps) => {
    const bjornTekst = `soknad.bjorn.${fjernIndexFraTag(sporsmal.tag).toLowerCase()}`

    const bjornVeileder = (tag: TagTyper) =>
        tag === TagTyper.BRUKTE_REISETILSKUDDET ||
        tag === TagTyper.FRAVER_FOR_BEHANDLING ||
        tag === TagTyper.PERIODEUTLAND
    if (!bjornVeileder(sporsmal.tag)) return null

    return (
        <div className={styles.wrapper}>
            <ProgressivtGuidePanel>
                <BodyShort>{parser(tekst(bjornTekst as any))}</BodyShort>
            </ProgressivtGuidePanel>
        </div>
    )
}

export default GuidepanelOverSporsmalstekst
