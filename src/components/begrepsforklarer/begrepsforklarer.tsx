import { BodyShort, Modal } from '@navikt/ds-react'
import React, { useState } from 'react'

import { ModalFooterMedLukk } from '../modal-footer-med-lukk'

export interface BegrepsforklarerProps {
    inlinetekst: string
    tittel: string
    children: React.ReactNode
}

export const Begrepsforklarer = (props: BegrepsforklarerProps) => {
    const { inlinetekst, tittel, children } = props
    const [open, setOpen] = useState(false)

    return (
        <>
            <BodyShort
                as="button"
                type="button"
                className="border-b-2 border-dotted border-border-action hover:bg-gray-100"
                onClick={(e) => {
                    e.preventDefault()
                    setOpen(true)
                }}
            >
                {inlinetekst}
            </BodyShort>

            <Modal open={open} header={{ heading: tittel, closeButton: false }} onClose={() => setOpen(false)}>
                <Modal.Body>{children}</Modal.Body>
                <ModalFooterMedLukk setOpen={setOpen} />
            </Modal>
        </>
    )
}
