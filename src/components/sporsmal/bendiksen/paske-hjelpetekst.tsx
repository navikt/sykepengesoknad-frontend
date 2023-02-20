import { BodyShort, Label, Link } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React from 'react'
import { useParams } from 'react-router'

import { TagTyper } from '../../../types/enums'
import { innenforPaske } from '../../../utils/helligdager-utils'
import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { RouteParams } from '../../../app'
import useSoknad from '../../../hooks/useSoknad'
import { ProgressivtGuidePanel } from '../../guidepanel/ProgressivtGuidePanel'
import { logEvent } from '../../amplitude/amplitude'

import { Bendiksen } from './bendiksen'
import styles from './PaskeHjelpetekst.module.css'
const PaskeHjelpetekst = ({ sporsmal }: SpmProps) => {
    const { id } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)

    if (!valgtSoknad) return null

    const paskeVeileder = (tag: TagTyper) =>
        tag === TagTyper.FERIE_V2 && innenforPaske(valgtSoknad.fom, valgtSoknad.tom)

    return (
        <Vis
            hvis={paskeVeileder(sporsmal.tag)}
            render={() => (
                <div className={styles.wrapper}>
                    <ProgressivtGuidePanel illustration={<Bendiksen />}>
                        <Label as="h2">{tekst('soknad.bendiksen.paske.label')}</Label>
                        <BodyShort spacing>{tekst('soknad.bendiksen.paske.tekst')}</BodyShort>
                        <BodyShort>
                            {parser(tekst('soknad.bendiksen.paske.tips'))}
                            <Link
                                href={tekst('soknad.bendiksen.paske.lenke')}
                                onClick={() => {
                                    logEvent('navigere', {
                                        lenketekst: tekst('soknad.bendiksen.paske.lenketekst'),
                                    })
                                }}
                                target="_blank"
                            >
                                {tekst('soknad.bendiksen.paske.lenketekst')}
                            </Link>
                        </BodyShort>
                    </ProgressivtGuidePanel>
                </div>
            )}
        />
    )
}

export default PaskeHjelpetekst
