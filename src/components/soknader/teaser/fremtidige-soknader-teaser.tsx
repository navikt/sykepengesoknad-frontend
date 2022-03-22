import { Next } from '@navikt/ds-icons'
import { Button, Heading, Modal } from '@navikt/ds-react'
import dayjs from 'dayjs'
import { Element, Normaltekst, Undertekst, Undertittel } from 'nav-frontend-typografi'
import React, { useState } from 'react'

import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { tilLesbarDatoMedArstall, tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { useAmplitudeInstance } from '../../amplitude/amplitude'
import Utvidbar from '../../utvidbar/utvidbar'
import Vis from '../../vis'
import { InngangsIkon, InngangsStatus } from '../inngang/inngangspanel'
import { hentIkon, hentIkonHover, hentTeaserStatustekst, periodeListevisning, SykepengesoknadTeaserProps, teaserTittel } from './teaser-util'

const FremtidigeSoknaderTeaser = ({ soknad }: SykepengesoknadTeaserProps) => {
    const { logEvent } = useAmplitudeInstance()
    const [ aapen, setAapen ] = useState<boolean>(false)

    return (
        <article aria-labelledby={`soknader-header-${soknad.id}`} onClick={() => {
            logEvent('skjema åpnet', {
                skjemanavn: 'sykepengesoknad',
                soknadstype: soknad.soknadstype,
                soknadstatus: soknad.status,
            })
        }}>
            <button className="inngangspanel inngangspanel__btn inngangspanel--fremtidig"
                onClick={() => setAapen(true)}>
                <div className="inngangspanel__ytre">
                    <div className="inngangspanel__del1">
                        <InngangsIkon ikon={hentIkon(soknad)} ikonHover={hentIkonHover(soknad)} />
                        <div id={`soknader-header-${soknad.id}`} className="inngangspanel__innhold">
                            <Vis hvis={soknad.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND}
                                render={() =>
                                    <Undertekst className="inngangspanel__periode">
                                        {tilLesbarPeriodeMedArstall(soknad.fom, soknad.tom)}
                                    </Undertekst>
                                }
                            />
                            <Undertittel tag="h3" className="inngangspanel__tittel">
                                {teaserTittel(soknad)}
                            </Undertittel>
                            {periodeListevisning(soknad)}
                        </div>
                    </div>
                    <InngangsStatus status={soknad.status} tekst={hentTeaserStatustekst(soknad)} />
                </div>
                <Next className="chevron--hoyre" />
            </button>

            <Modal className="modal__teaser_popup"
                onClose={() => setAapen(false)}
                open={aapen}
            >
                <Modal.Content>
                    <Heading size="small" level="3" className="modal__tittel">
                        {tekst('soknader.teaser.fremtidig.modal.tittel')}
                    </Heading>
                    <Normaltekst>
                        {getLedetekst(tekst('soknader.teaser.fremtidig.modal.tekst'), {
                            '%DATO%': tilLesbarDatoMedArstall(dayjs(soknad.tom).add(1, 'day'))
                        })}
                    </Normaltekst>
                    <Normaltekst>{tekst('soknader.teaser.fremtidig.modal.tekst2')}</Normaltekst>
                    <Utvidbar erApen={false} type="intern" tittel={
                        <Element>{tekst('soknader.teaser.fremtidig.modal.utvidbar.tittel')}</Element>
                    }>
                        <Normaltekst>{tekst('soknader.teaser.fremtidig.modal.utvidbar.tekst')}</Normaltekst>
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
