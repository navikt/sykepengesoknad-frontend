import './personvern-les-mer.less'

import parser from 'html-react-parser'
import ModalWrapper from 'nav-frontend-modal'
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React, { useState } from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { tekst } from '../../utils/tekster'

const PersonvernLesMer = () => {
    const [ aapen, setAapen ] = useState<boolean>(false)
    const { valgtSoknad } = useAppStore()

    if (!valgtSoknad) {
        return null
    }

    return (
        <>
            <button className="lenke no-border"
                onClick={() => setAapen(true)}>
                {tekst('sykepengesoknad.soknad-intro.personvern-les-mer')}
            </button>
            <ModalWrapper className={'personvern-modal'} onRequestClose={() => setAapen(false)}
                contentLabel={'Personvern'}
                isOpen={aapen}
            >
                <Systemtittel tag="h3" className="modal__tittel">
                    {tekst('sykepengesoknad.soknad-intro.personvern-modal-header')}
                </Systemtittel>
                {parser(tekst('sykepengesoknad.soknad-intro.personvern-modal-innhold'))}

                <div className={'lukk-wrapper'}>
                    <button type="button" className="no-border lenke" onClick={() => setAapen(false)}>
                        <Normaltekst tag="span">Lukk</Normaltekst>
                    </button>
                </div>
            </ModalWrapper>
        </>
    )
}

export default PersonvernLesMer
