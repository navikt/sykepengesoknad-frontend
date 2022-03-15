import './opplasting.less'

import { Alert, Button, Modal } from '@navikt/ds-react'
import parser from 'html-react-parser'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React, { useRef } from 'react'

import { useAppStore } from '../../../../data/stores/app-store'
import { tekst } from '../../../../utils/tekster'
import { Ekspanderbar } from '../../../ekspanderbar/ekspanderbar'
import FilListe from '../../../filopplaster/fil-liste/fil-liste'
import OpplastingForm from '../../../filopplaster/kvittering-modal/opplasting-form'
import { SpmProps } from '../../sporsmal-form/sporsmal-form'
import PlussIkon from './pluss-ikon.svg'
import PlussIkonHover from './pluss-ikon-hover.svg'

const Opplasting = ({ sporsmal }: SpmProps) => {
    const { setValgtKvittering, openModal, setOpenModal } = useAppStore()
    const ikonRef = useRef<HTMLImageElement>(null)

    // eslint-disable-next-line
    // @ts-ignore
    Modal.setAppElement('#maincontent')

    const aktiverModal = () => {
        setOpenModal(true)
        setValgtKvittering(undefined)
    }

    const lukkModal = () => {
        setOpenModal(false)
    }

    return (
        <div className="opplasting">
            <div className="opplasting__tekst">
                <Element tag="h3" className="skjema__sporsmal">
                    {sporsmal.sporsmalstekst}
                </Element>
            </div>

            <Alert variant="warning" className="reisetilskudd">
                <Normaltekst className="bold">{tekst('soknad.info.kvitteringer-del1')}</Normaltekst>
                <ul style={{ minWidth: 190 }}>
                    <Normaltekst>
                        <li>{tekst('soknad.info.kvitteringer-del2-kulepunkt1')}</li>
                        <li>{tekst('soknad.info.kvitteringer-del2-kulepunkt2')}</li>
                        <li>{tekst('soknad.info.kvitteringer-del2-kulepunkt3')}</li>
                    </Normaltekst>
                </ul>
                <Normaltekst>{tekst('soknad.info.kvitteringer-del3')}</Normaltekst>
            </Alert>

            <div className="pdf-hjelp">
                <Ekspanderbar title={tekst('soknad.info.kvitteringer-PDF-tittel')} sporsmalId={sporsmal.id}>
                    <Normaltekst>
                        {parser(tekst('soknad.info.kvitteringer-PDF-tekst'))}
                    </Normaltekst>
                </Ekspanderbar>
            </div>

            <Button type="button"
                variant="secondary"
                className="fler-vedlegg"
                onClick={aktiverModal}
                onMouseEnter={() => ikonRef.current!.src = PlussIkonHover}
                onMouseLeave={() => ikonRef.current!.src = PlussIkon}
            >
                <img ref={ikonRef} className="pluss-ikon" src={PlussIkon} alt="" />
                <Normaltekst tag="span">{tekst('opplasting.legg-til')}</Normaltekst>
            </Button>

            <Modal
                open={openModal}
                onClose={lukkModal}
                closeButton
                className="opplasting_modal"
            >
                <Modal.Content className="modal-content">
                    <OpplastingForm sporsmal={sporsmal} />
                </Modal.Content>
            </Modal>

            <FilListe sporsmal={sporsmal} fjernKnapp />
        </div>
    )
}

export default Opplasting
