import { Next } from '@navikt/ds-icons'
import { Alert, Button, Detail, Heading, Modal } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React, { useState } from 'react'

import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils'
import { tekst } from '../../../utils/tekster'
import { useAmplitudeInstance } from '../../amplitude/amplitude'
import Vis from '../../vis'
import { InngangsIkon, InngangsStatus } from '../inngang/inngangspanel'

import {
    hentIkon,
    hentIkonHover,
    hentTeaserStatustekst,
    periodeListevisning,
    SykepengesoknadTeaserProps,
    teaserTittel,
} from './teaser-util'

const UtgaattSoknaderTeaser = ({ soknad }: SykepengesoknadTeaserProps) => {
    const { logEvent } = useAmplitudeInstance()
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
                            <Heading size="small" level="3" className="inngangspanel__tittel">
                                {teaserTittel(soknad)}
                            </Heading>
                            {periodeListevisning(soknad)}
                        </div>
                    </div>
                    <InngangsStatus status={soknad.status} tekst={hentTeaserStatustekst(soknad)} />
                </div>
                {/* TODO: fjern onResize og onResizeCapture ved oppdatering til React 18. */}
                <Next className="chevron--hoyre" onResize={undefined} onResizeCapture={undefined} />
            </button>
            <Modal
                className="modal__teaser_popup"
                onClose={() => setAapen(false)}
                open={aapen}
                aria-labelledby="modal-tittel"
            >
                <Modal.Content>
                    <Heading size="medium" level="1" className="modal__tittel" id="modal-tittel">
                        {tekst('soknad.teaser.utgaatt.popup.header')}
                    </Heading>
                    <Alert variant="info">{parser(tekst('soknad.teaser.utgaatt.popup.innhold'))}</Alert>
                    <Button variant="primary" onClick={() => setAapen(false)}>
                        Lukk
                    </Button>
                </Modal.Content>
            </Modal>
        </article>
    )
}

export default UtgaattSoknaderTeaser
