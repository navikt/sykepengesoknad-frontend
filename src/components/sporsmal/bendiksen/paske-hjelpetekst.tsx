import { BodyShort, Label, Link } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React from 'react'

import { useAppStore } from '../../../data/stores/app-store'
import { TagTyper } from '../../../types/enums'
import { innenforPaske } from '../../../utils/helligdager-utils'
import { tekst } from '../../../utils/tekster'
import { useAmplitudeInstance } from '../../amplitude/amplitude'
import Vis from '../../vis'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import Bendiksen from './bendiksen'

const PaskeHjelpetekst = ({ sporsmal }: SpmProps) => {
    const { logEvent } = useAmplitudeInstance()
    const { valgtSoknad } = useAppStore()

    if (!valgtSoknad) return null

    const paskeVeileder = (tag: TagTyper) =>
        tag === TagTyper.FERIE_V2 &&
        innenforPaske(valgtSoknad.fom, valgtSoknad.tom)

    return (
        <Vis
            hvis={paskeVeileder(sporsmal.tag)}
            render={() => (
                <div className="bendiksen-container">
                    <div className="bendiksen-hjelpetekst">
                        <Label>{tekst('soknad.bendiksen.paske.label')}</Label>
                        <BodyShort spacing>
                            {tekst('soknad.bendiksen.paske.tekst')}
                        </BodyShort>

                        <BodyShort>
                            {parser(tekst('soknad.bendiksen.paske.tips'))}
                            <Link
                                href={tekst('soknad.bendiksen.paske.lenke')}
                                onClick={() => {
                                    logEvent('navigere', {
                                        lenketekst: tekst(
                                            'soknad.bendiksen.paske.lenketekst'
                                        ),
                                    })
                                }}
                                target="_blank"
                            >
                                {tekst('soknad.bendiksen.paske.lenketekst')}
                            </Link>
                        </BodyShort>
                    </div>

                    <Bendiksen />
                </div>
            )}
        />
    )
}

export default PaskeHjelpetekst
