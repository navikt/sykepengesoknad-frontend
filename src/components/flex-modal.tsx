import React from 'react'
import { Button, Heading, Modal } from '@navikt/ds-react'

interface FlexModalProps {
    open: boolean
    setOpen: (open: boolean) => void
    headerId?: string
    header: string
    children: React.ReactNode
    onClose?: () => void
    lukkKnapp?: boolean
}

export const FlexModal = ({ open, setOpen, headerId, header, children, onClose, lukkKnapp }: FlexModalProps) => {
    const faktiskHeaderId =
        headerId ||
        header
            .replace(/[^a-zA-Z\s]/g, '')
            .replace(/\s+/g, '_')
            .toLowerCase()
    return (
        <Modal
            open={open}
            aria-labelledby={faktiskHeaderId}
            onClose={() => {
                setOpen(false)
                onClose && onClose()
            }}
        >
            <Modal.Body className="flex flex-col items-start md:w-2xl" data-cy="modal-content">
                <div>
                    <Heading size="small" level="1" id={faktiskHeaderId} className="pr-8" spacing>
                        {header}
                    </Heading>
                    {children}
                </div>
                {lukkKnapp && (
                    <Button
                        variant="primary"
                        className="mt-4 self-end"
                        type="button"
                        onClick={(e) => {
                            e.preventDefault()
                            setOpen(false)
                        }}
                    >
                        Lukk
                    </Button>
                )}
            </Modal.Body>
        </Modal>
    )
}
