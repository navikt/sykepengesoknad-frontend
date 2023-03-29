import { Next } from '@navikt/ds-icons'
import { Alert, Detail, Heading, Modal } from '@navikt/ds-react'
import React, { useState } from 'react'

import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils'
import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import { InngangsIkon, InngangsStatus } from '../inngang/inngangspanel'
import { logEvent } from '../../amplitude/amplitude'
import { parserWithReplace } from '../../../utils/html-react-parser-utils'

import {
    hentIkon,
    hentIkonHover,
    hentTeaserStatustekst,
    periodeListevisning,
    SykepengesoknadTeaserProps,
    teaserTittel,
} from './teaser-util'

const UtgaattSoknaderTeaser = ({ soknad }: SykepengesoknadTeaserProps) => {
    const [aapen, setAapen] = useState<boolean>(false)

    return (
        <article
            aria-labelledby={`soknader-header-${soknad.id}`}
            onClick={() => {
                logEvent('skjema åpnet', {
                    skjemanavn: 'sykepengesoknad',
                    soknadstype: soknad.soknadstype,
                    soknadstatus: soknad.status,
                })
            }}
        >
            <button className="inngangspanel inngangspanel__btn" onClick={() => setAapen(true)}>
                <div className="inngangspanel__ytre">
                    <div className="inngangspanel__del1">
                        <InngangsIkon ikon={hentIkon(soknad)} ikonHover={hentIkonHover(soknad)} />
                        <div id={`soknader-header-${soknad.id}`} className="inngangspanel--inaktivt">
                            <Vis
                                hvis={soknad.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND}
                                render={() => (
                                    <Detail className="inngangspanel__periode">
                                        {tilLesbarPeriodeMedArstall(soknad.fom, soknad.tom)}
                                    </Detail>
                                )}
                            />
                            <Heading size="small" level="2" className="inngangspanel__tittel">
                                {teaserTittel(soknad)}
                            </Heading>
                            {periodeListevisning(soknad)}
                        </div>
                    </div>
                    <InngangsStatus status={soknad.status} tekst={hentTeaserStatustekst(soknad)} />
                </div>
                <Next className="chevron--hoyre" />
            </button>
            <Modal onClose={() => setAapen(false)} open={aapen} aria-labelledby="utgått-soknad-modal">
                <Modal.Content>
                    <Heading size="medium" id="utgått-soknad-modal" level="1" className="mr-10 mt-1" spacing>
                        {tekst('soknad.teaser.utgaatt.popup.header')}
                    </Heading>
                    <Alert variant="info">{parserWithReplace(tekst('soknad.teaser.utgaatt.popup.innhold'))}</Alert>
                </Modal.Content>
            </Modal>
        </article>
    )
}

export default UtgaattSoknaderTeaser
