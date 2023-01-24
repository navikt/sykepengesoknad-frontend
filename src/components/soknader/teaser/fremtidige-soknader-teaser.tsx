import { Next } from '@navikt/ds-icons'
import { BodyLong, Button, Detail, Heading, Label, Modal } from '@navikt/ds-react'
import dayjs from 'dayjs'
import React, { useState } from 'react'

import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { tilLesbarDatoMedArstall, tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { useAmplitudeInstance } from '../../amplitude/amplitude'
import Utvidbar from '../../utvidbar/utvidbar'
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

const FremtidigeSoknaderTeaser = ({ soknad }: SykepengesoknadTeaserProps) => {
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
            <button
                className="inngangspanel inngangspanel__btn inngangspanel--fremtidig"
                onClick={() => setAapen(true)}
            >
                <div className="inngangspanel__ytre">
                    <div className="inngangspanel__del1">
                        <InngangsIkon ikon={hentIkon(soknad)} ikonHover={hentIkonHover(soknad)} />
                        <div id={`soknader-header-${soknad.id}`} className="inngangspanel__innhold">
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

            <Modal
                className="modal__teaser_popup"
                onClose={() => setAapen(false)}
                open={aapen}
                aria-labelledby="modal-tittel"
            >
                <Modal.Content>
                    <Heading size="small" level="1" className="modal__tittel" id="modal-tittel">
                        {tekst('soknader.teaser.fremtidig.modal.tittel')}
                    </Heading>
                    <BodyLong spacing>
                        {getLedetekst(tekst('soknader.teaser.fremtidig.modal.tekst'), {
                            '%DATO%': tilLesbarDatoMedArstall(dayjs(soknad.tom).add(1, 'day')),
                        })}
                    </BodyLong>
                    <BodyLong spacing>{tekst('soknader.teaser.fremtidig.modal.tekst2')}</BodyLong>

                    <Utvidbar
                        erApen={false}
                        type="intern"
                        tittel={<Label>{tekst('soknader.teaser.fremtidig.modal.utvidbar.tittel')}</Label>}
                    >
                        <BodyLong spacing>{tekst('soknader.teaser.fremtidig.modal.utvidbar.tekst')}</BodyLong>
                    </Utvidbar>
                    <Button variant="primary" onClick={() => setAapen(false)}>
                        Lukk
                    </Button>
                </Modal.Content>
            </Modal>
        </article>
    )
}

export default FremtidigeSoknaderTeaser
