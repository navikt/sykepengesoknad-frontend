import { BodyShort, Button, Label, Modal } from '@navikt/ds-react'
import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { tekst } from '../../../../utils/tekster'
import FilListe from '../../../filopplaster/fil-liste/fil-liste'
import OpplastingForm from '../../../filopplaster/kvittering-modal/opplasting-form'
import { SpmProps } from '../../sporsmal-form/sporsmal-form'
import useSoknad from '../../../../hooks/useSoknad'
import { EkspanderbarHjelp } from '../../../hjelpetekster/ekspanderbar-hjelp/ekspanderbar-hjelp'

const Opplasting = ({ sporsmal }: SpmProps) => {
    const router = useRouter()
    const { id } = router.query as { id: string }
    const { data: valgtSoknad } = useSoknad(id)

    const [openModal, setOpenModal] = useState<boolean>(false)

    const aktiverModal = () => {
        setOpenModal(true)
    }

    const lukkModal = () => {
        setOpenModal(false)
    }

    return (
        <>
            <Label as="h2">{sporsmal.sporsmalstekst}</Label>

            <EkspanderbarHjelp sporsmal={sporsmal} />

            <Button type="button" variant="secondary" className="w-full p-8" onClick={aktiverModal}>
                <BodyShort>{tekst('opplasting.legg-til')}</BodyShort>
            </Button>

            <Modal open={openModal} onClose={lukkModal} aria-labelledby="opplasting-modal" className="w-96">
                <Modal.Body>
                    <OpplastingForm valgtSoknad={valgtSoknad} setOpenModal={setOpenModal} />
                </Modal.Body>
            </Modal>

            <FilListe />
        </>
    )
}

export default Opplasting
