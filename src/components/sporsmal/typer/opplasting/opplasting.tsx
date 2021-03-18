import './opplasting.less'

import Modal from 'nav-frontend-modal'
import { Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../../../data/stores/app-store'
import { tekst } from '../../../../utils/tekster'
import FilListe from '../../../filopplaster/fil-liste/fil-liste'
import OpplastingForm from '../../../filopplaster/kvittering-modal/opplasting-form'
import { SpmProps } from '../../sporsmal-form/sporsmal-form'
import PlussIkon from './pluss-ikon.svg'
import SparTidMobil from './spar-tid-mobil'

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
                <Normaltekst id="opplasting-overskrift" aria-describedby="opplasting-hjelpetekst">
                    {sporsmal.sporsmalstekst}
                </Normaltekst>
            </div>

            <SparTidMobil />

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
