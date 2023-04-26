import { BodyShort } from '@navikt/ds-react'
import React from 'react'

import { TagTyper } from '../../../types/enums'
import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { fjernIndexFraTag } from '../sporsmal-utils'
import { ProgressivtGuidePanel } from '../../guidepanel/ProgressivtGuidePanel'
import { parserWithReplace } from '../../../utils/html-react-parser-utils'

import styles from './GuidepanelUnderSporsmalstekst.module.css'

const GuidepanelUnderSporsmalstekst = ({ sporsmal }: SpmProps) => {
    const bjornTekst = `soknad.bjorn.${fjernIndexFraTag(sporsmal.tag).toLowerCase()}`

    const bjornVeileder = (tag: TagTyper) => tag === TagTyper.ENKELTSTAENDE_BEHANDLINGSDAGER

    return (
        <>
            <Vis
                hvis={bjornVeileder(sporsmal.tag)}
                render={() => (
                    <ProgressivtGuidePanel className={styles.guidepanelWrapper}>
                        <BodyShort>{parserWithReplace(tekst(bjornTekst as any))}</BodyShort>
                    </ProgressivtGuidePanel>
                )}
            />
        </>
    )
}

export default GuidepanelUnderSporsmalstekst
