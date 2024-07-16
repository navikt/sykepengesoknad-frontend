import { BodyShort, Modal } from '@navikt/ds-react'
import React from 'react'

import { ModalFooterMedLukk } from '../modal-footer-med-lukk'

export const Begrepsforklarer = ({
    inlinetekst,
    setOpen,
}: {
    inlinetekst: string
    setOpen: (open: boolean) => void
}) => {
    return (
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
    )
}

export const BegrepsforklarerModal = ({
    tittel,
    setOpen,
    children,
    open,
}: {
    tittel: string
    children: React.ReactNode
    open: boolean
    setOpen: (open: boolean) => void
}) => {
    return (
        <Modal open={open} header={{ heading: tittel, closeButton: false }} onClose={() => setOpen(false)}>
            <Modal.Body>{children}</Modal.Body>
            <ModalFooterMedLukk setOpen={setOpen} />
        </Modal>
    )
}
