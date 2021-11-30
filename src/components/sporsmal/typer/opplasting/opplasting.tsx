import './opplasting.less'

import parser from 'html-react-parser'
import AlertStripe from 'nav-frontend-alertstriper'
import { Knapp } from 'nav-frontend-knapper'
import Modal from 'nav-frontend-modal'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React, { useRef } from 'react'

import { useAppStore } from '../../../../data/stores/app-store'
import {
    formaterFilstørrelse,
    formattertFiltyper,
    maxFilstørrelse
} from '../../../../utils/fil-utils'
import { getLedetekst,tekst } from '../../../../utils/tekster'
import { Ekspanderbar } from '../../../ekspanderbar/ekspanderbar'
import FilListe from '../../../filopplaster/fil-liste/fil-liste'
import OpplastingForm from '../../../filopplaster/kvittering-modal/opplasting-form'
import { SpmProps } from '../../sporsmal-form/sporsmal-form'
import PlussIkon from './pluss-ikon.svg'
import PlussIkonHover from './pluss-ikon-hover.svg'

const Opplasting = ({ sporsmal }: SpmProps) => {
    const { setValgtKvittering, openModal, setOpenModal } = useAppStore()
    const ikonRef = useRef<HTMLImageElement>(null)
    const maks = formaterFilstørrelse(maxFilstørrelse)

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
                <Normaltekst className="bold">{tekst('soknad.info.kvitteringer-del1')}</Normaltekst>
                <ul style={{ minWidth: 190 }}>
                    <Normaltekst>
                        <li>{tekst('soknad.info.kvitteringer-del2-kulepunkt1')}</li>
                        <li>{tekst('soknad.info.kvitteringer-del2-kulepunkt2')}</li>
                        <li>{tekst('soknad.info.kvitteringer-del2-kulepunkt3')}</li>
                    </Normaltekst>
                </ul>
                <Normaltekst>{tekst('soknad.info.kvitteringer-del3')}</Normaltekst>
            </AlertStripe>

            <div className="pdf-hjelp">
                <Ekspanderbar title={tekst('soknad.info.kvitteringer-PDF-tittel')} sporsmalId={sporsmal.id}>
                    <Normaltekst className="restriksjoner">
                        {parser(tekst('soknad.info.kvitteringer-PDF-tekst'))}
                        <span className="filtype">{
                            getLedetekst(tekst('opplasting_modal.filtyper'), {
                                '%FILTYPER%': formattertFiltyper
                            })
                        }</span>
                        <span className="filstr">{
                            getLedetekst(tekst('opplasting_modal.maksfilstr'), {
                                '%MAKSFILSTR%': maks
                            })
                        }</span>
                    </Normaltekst>
                </Ekspanderbar>
            </div>

            <Knapp
                htmlType="button"
                className="fler-vedlegg"
                onClick={aktiverModal}
                onMouseEnter={() => ikonRef.current!.src = PlussIkonHover}
                onMouseLeave={() => ikonRef.current!.src = PlussIkon}
            >
                <img ref={ikonRef} className="pluss-ikon" src={PlussIkon} alt="" />
                <Normaltekst tag="span">{tekst('opplasting.legg-til')}</Normaltekst>
            </Knapp>

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
