import { BodyShort, Button, Label, Modal } from '@navikt/ds-react'
import React, { useState } from 'react'

import { tekst } from '../../../utils/tekster'
import FilListe from '../../filopplaster/fil-liste/fil-liste'
import OpplastingForm from '../../filopplaster/kvittering-modal/opplasting-form'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { EkspanderbarHjelp } from '../../hjelpetekster/ekspanderbar-hjelp/ekspanderbar-hjelp'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'

const Opplasting = ({ sporsmal }: SpmProps) => {
    const { valgtSoknad } = useSoknadMedDetaljer()

    const [openModal, setOpenModal] = useState<boolean>(false)

    const aktiverModal = () => {
        setOpenModal(true)
    }

    return (
        <>
            <Label as="h2">{sporsmal.sporsmalstekst}</Label>

            <EkspanderbarHjelp sporsmal={sporsmal} />

            <Button type="button" variant="secondary" className="w-full p-8" onClick={aktiverModal}>
                <BodyShort>{tekst('opplasting.legg-til')}</BodyShort>
            </Button>
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                header={{ heading: tekst('opplasting_modal.nytt-utlegg.tittel'), size: 'medium' }}
                className="w-96"
            >
                <Modal.Body>
                    <OpplastingForm valgtSoknad={valgtSoknad} setOpenModal={setOpenModal} openModal={openModal} />
                </Modal.Body>
            </Modal>

            <FilListe />
        </>
    )
}

export default Opplasting
