import { BodyShort, Button, Label, Modal } from '@navikt/ds-react'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { tekst } from '../../../../utils/tekster'
import FilListe from '../../../filopplaster/fil-liste/fil-liste'
import OpplastingForm from '../../../filopplaster/kvittering-modal/opplasting-form'
import { SpmProps } from '../../sporsmal-form/sporsmal-form'
import { Kvittering } from '../../../../types/types'
import useSoknad from '../../../../hooks/useSoknad'
import { useAppStore } from '../../../../data/stores/app-store'
import { RouteParams } from '../../../../app'
import { EkspanderbarHjelp } from '../../../hjelpetekster/ekspanderbar-hjelp/ekspanderbar-hjelp'

const Opplasting = ({ sporsmal }: SpmProps) => {
    const { id } = useParams<RouteParams>()
    const { data: valgtSoknad } = useSoknad(id)

    const { setFeilmeldingTekst } = useAppStore()
    const [valgtKvittering, setValgtKvittering] = useState<Kvittering>()
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [valgtFil, setValgtFil] = useState<File>()

    // eslint-disable-next-line
    // @ts-ignore
    Modal.setAppElement('#maincontent')

    const aktiverModal = () => {
        setOpenModal(true)
        setValgtKvittering(undefined)
        setFeilmeldingTekst('')
    }

    const lukkModal = () => {
        setOpenModal(false)
    }

    return (
        <>
            <Label as="h2">{sporsmal.sporsmalstekst}</Label>

            <EkspanderbarHjelp sporsmal={sporsmal} />

            <Button type="button" variant="secondary" className="mt-6 w-full p-8" onClick={aktiverModal}>
                <BodyShort>{tekst('opplasting.legg-til')}</BodyShort>
            </Button>

            <Modal open={openModal} onClose={lukkModal} closeButton aria-labelledby="opplasting-modal" className="w-96">
                <Modal.Content>
                    <OpplastingForm
                        valgtSoknad={valgtSoknad}
                        valgtKvittering={valgtKvittering}
                        setOpenModal={setOpenModal}
                        valgtFil={valgtFil}
                        setValgtFil={setValgtFil}
                    />
                </Modal.Content>
            </Modal>

            <FilListe />
        </>
    )
}

export default Opplasting
