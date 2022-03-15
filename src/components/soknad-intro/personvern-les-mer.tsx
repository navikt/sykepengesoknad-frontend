import './personvern-les-mer.less'

import { Button, Modal } from '@navikt/ds-react'
import ModalContent from '@navikt/ds-react/esm/modal/ModalContent'
import parser from 'html-react-parser'
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React, { MouseEvent, useState } from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { tekst } from '../../utils/tekster'

type Event = MouseEvent<HTMLAnchorElement | HTMLButtonElement>;

const PersonvernLesMer = () => {
    const [ aapen, setAapen ] = useState<boolean>(false)
    const { valgtSoknad } = useAppStore()

    if (!valgtSoknad) {
        return null
    }

    const handleAapen = (event: Event) => {
        event.preventDefault()
        setAapen(true)
    }

    return (
        <div className="personvern-les-mer">
            <Button size="small" variant="tertiary"
                onClick={handleAapen} style={{ paddingBottom: '2rem' }}>
                {tekst('sykepengesoknad.soknad-intro.personvern-les-mer')}
            </Button>
            <Modal className="personvern-modal" onClose={() => setAapen(false)}
                open={aapen}
            >
                <ModalContent>
                    <Systemtittel tag="h3" className="modal__tittel">
                        {tekst('sykepengesoknad.soknad-intro.personvern-modal-header')}
                    </Systemtittel>
                    {parser(tekst('sykepengesoknad.soknad-intro.personvern-modal-innhold'))}

                    <div className={'lukk-wrapper'}>
                        <button type="button" className="no-border navds-link" onClick={() => setAapen(false)}>
                            <Normaltekst tag="span">Lukk</Normaltekst>
                        </button>
                    </div>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default PersonvernLesMer
