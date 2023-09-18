import React from 'react'
import { Button, Modal } from '@navikt/ds-react'

export const ModalFooterMedLukk = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
    return (
        <Modal.Footer>
            <Button
                variant="primary"
                type="button"
                onClick={() => {
                    setOpen(false)
                }}
            >
                Lukk
            </Button>
        </Modal.Footer>
    )
}
