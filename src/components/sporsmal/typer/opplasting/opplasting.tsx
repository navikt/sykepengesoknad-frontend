import { Alert, BodyLong, BodyShort, Button, Label, Modal } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React, { useRef, useState } from 'react'

import { tekst } from '../../../../utils/tekster'
import { Ekspanderbar } from '../../../ekspanderbar/ekspanderbar'
import FilListe from '../../../filopplaster/fil-liste/fil-liste'
import OpplastingForm from '../../../filopplaster/kvittering-modal/opplasting-form'
import { SpmProps } from '../../sporsmal-form/sporsmal-form'
import { Kvittering } from '../../../../types/types'

const Opplasting = ({ sporsmal }: SpmProps) => {
    const [valgtKvittering, setValgtKvittering] = useState<Kvittering>()
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [valgtFil, setValgtFil] = useState<File>()
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
                <Label as="h2" className="skjema__sporsmal">
                    {sporsmal.sporsmalstekst}
                </Label>
            </div>

            <Alert variant="warning" className="reisetilskudd">
                <BodyShort as="strong">{tekst('soknad.info.kvitteringer-del1')}</BodyShort>
                <ul style={{ minWidth: 190 }}>
                    <BodyShort as="li">{tekst('soknad.info.kvitteringer-del2-kulepunkt1')}</BodyShort>
                    <BodyShort as="li">{tekst('soknad.info.kvitteringer-del2-kulepunkt2')}</BodyShort>
                    <BodyShort as="li">{tekst('soknad.info.kvitteringer-del2-kulepunkt3')}</BodyShort>
                </ul>
                <BodyShort>{tekst('soknad.info.kvitteringer-del3')}</BodyShort>
            </Alert>

            <div className="pdf-hjelp">
                <Ekspanderbar title={tekst('soknad.info.kvitteringer-PDF-tittel')} sporsmalId={sporsmal.id}>
                    <BodyLong>{parser(tekst('soknad.info.kvitteringer-PDF-tekst'))}</BodyLong>
                </Ekspanderbar>
            </div>

            <Button
                type="button"
                variant="secondary"
                className="fler-vedlegg"
                onClick={aktiverModal}
                onMouseEnter={() => (ikonRef.current!.src = '/syk/sykepengesoknad/static/pluss-ikon-hover.svg')}
                onMouseLeave={() => (ikonRef.current!.src = '/syk/sykepengesoknad/static/pluss-ikon.svg')}
            >
                <img ref={ikonRef} className="pluss-ikon" src={'/syk/sykepengesoknad/static/pluss-ikon.svg'} alt="" />
                <BodyShort as="span">{tekst('opplasting.legg-til')}</BodyShort>
            </Button>

            <Modal
                open={openModal}
                onClose={lukkModal}
                closeButton
                className="opplasting_modal"
                aria-labelledby="modal-tittel"
            >
                <Modal.Content>
                    <OpplastingForm
                        valgtKvittering={valgtKvittering}
                        sporsmal={sporsmal}
                        setOpenModal={setOpenModal}
                        valgtFil={valgtFil}
                        setValgtFil={setValgtFil}
                    />
                </Modal.Content>
            </Modal>

            <FilListe
                sporsmal={sporsmal}
                fjernKnapp
                setValgtKvittering={setValgtKvittering}
                setOpenModal={setOpenModal}
            />
        </div>
    )
}

export default Opplasting
