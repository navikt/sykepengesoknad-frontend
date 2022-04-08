import { Alert, BodyLong, BodyShort, Button, Label, Modal } from '@navikt/ds-react'
import parser from 'html-react-parser'
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
                <Label as="h3" className="skjema__sporsmal">
                    {sporsmal.sporsmalstekst}
                </Label>
            </div>

            <Alert variant="warning" className="reisetilskudd">
                <BodyShort as="strong">{tekst('soknad.info.kvitteringer-del1')}</BodyShort>
                <ul style={{ minWidth: 190 }}>
                    <BodyShort>
                        <li>{tekst('soknad.info.kvitteringer-del2-kulepunkt1')}</li>
                        <li>{tekst('soknad.info.kvitteringer-del2-kulepunkt2')}</li>
                        <li>{tekst('soknad.info.kvitteringer-del2-kulepunkt3')}</li>
                    </BodyShort>
                </ul>
                <BodyShort>{tekst('soknad.info.kvitteringer-del3')}</BodyShort>
            </Alert>

            <div className="pdf-hjelp">
                <Ekspanderbar title={tekst('soknad.info.kvitteringer-PDF-tittel')} sporsmalId={sporsmal.id}>
                    <BodyLong>
                        {parser(tekst('soknad.info.kvitteringer-PDF-tekst'))}
                    </BodyLong>
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
                <BodyShort as="span">{tekst('opplasting.legg-til')}</BodyShort>
            </Button>

            <Modal
                open={openModal}
                onClose={lukkModal}
                closeButton
                className="opplasting_modal"
            >
                <Modal.Content>
                    <OpplastingForm sporsmal={sporsmal} />
                </Modal.Content>
            </Modal>

            <FilListe sporsmal={sporsmal} fjernKnapp />
        </div>
    )
}

export default Opplasting
