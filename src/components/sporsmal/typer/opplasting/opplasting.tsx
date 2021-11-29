import './opplasting.less'

import AlertStripe from 'nav-frontend-alertstriper'
import Modal from 'nav-frontend-modal'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../../../data/stores/app-store'
import { tekst } from '../../../../utils/tekster'
import FilListe from '../../../filopplaster/fil-liste/fil-liste'
import OpplastingForm from '../../../filopplaster/kvittering-modal/opplasting-form'
import { SpmProps } from '../../sporsmal-form/sporsmal-form'
import PlussIkon from './pluss-ikon.svg'

const Opplasting = ({ sporsmal }: SpmProps) => {
    const { setValgtKvittering, openModal, setOpenModal } = useAppStore()

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

            <AlertStripe type="advarsel" className="reisetilskudd">
                <Normaltekst className="bold">{tekst('soknad.bjorn.kvitteringer-del1')}</Normaltekst>
                <ul style={{ minWidth: 190 }}>
                    <Normaltekst>
                        <li>{tekst('soknad.bjorn.kvitteringer-del2-kulepunkt1')}</li>
                        <li>{tekst('soknad.bjorn.kvitteringer-del2-kulepunkt2')}</li>
                        <li>{tekst('soknad.bjorn.kvitteringer-del2-kulepunkt3')}</li>
                    </Normaltekst>
                </ul>
                <Normaltekst>{tekst('soknad.bjorn.kvitteringer-del3')}</Normaltekst>
            </AlertStripe>

            <button className="fler-vedlegg" onClick={aktiverModal} type="button">
                <img className="pluss-ikon" src={PlussIkon} alt="" />
                <Normaltekst tag="span">{tekst('opplasting.legg-til')}</Normaltekst>
            </button>

            <Modal
                isOpen={openModal}
                onRequestClose={lukkModal}
                closeButton
                contentLabel="Modal"
                className="opplasting_modal"
            >
                <div className="modal-content">
                    <OpplastingForm sporsmal={sporsmal} />
                </div>
            </Modal>

            <FilListe sporsmal={sporsmal} fjernKnapp />
        </div>
    )
}

export default Opplasting
