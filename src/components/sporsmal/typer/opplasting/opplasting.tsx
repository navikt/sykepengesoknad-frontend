import { Alert, BodyLong, BodyShort, Button, Label, Modal, ReadMore } from '@navikt/ds-react'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

import { tekst } from '../../../../utils/tekster'
import FilListe from '../../../filopplaster/fil-liste/fil-liste'
import OpplastingForm from '../../../filopplaster/kvittering-modal/opplasting-form'
import { SpmProps } from '../../sporsmal-form/sporsmal-form'
import { Kvittering } from '../../../../types/types'
import useSoknad from '../../../../hooks/useSoknad'
import { useAppStore } from '../../../../data/stores/app-store'
import OpplastingTekster from '../../../filopplaster/kvittering-modal/opplasting-tekster'
import { RouteParams } from '../../../../app'

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
            <Label as="h2" className="skjema__sporsmal">
                {sporsmal.sporsmalstekst}
            </Label>

            <Alert variant="warning" className="mt-6 bg-white">
                <BodyShort as="strong">{tekst('soknad.info.kvitteringer-del1')}</BodyShort>
                <ul>
                    <BodyShort as="li">{tekst('soknad.info.kvitteringer-del2-kulepunkt1')}</BodyShort>
                    <BodyShort as="li">{tekst('soknad.info.kvitteringer-del2-kulepunkt2')}</BodyShort>
                    <BodyShort as="li">{tekst('soknad.info.kvitteringer-del2-kulepunkt3')}</BodyShort>
                </ul>
                <BodyShort>{tekst('soknad.info.kvitteringer-del3')}</BodyShort>
            </Alert>

            <ReadMore className="mt-4" header={OpplastingTekster['soknad.info.kvitteringer-PDF-tittel']}>
                <BodyLong>{OpplastingTekster['soknad.info.kvitteringer-PDF-tekst']}</BodyLong>
            </ReadMore>

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
