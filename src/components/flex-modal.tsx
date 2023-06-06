import React from 'react'
import { Button, Heading, Modal } from '@navikt/ds-react'

interface FlexModalProps {
    open: boolean
    setOpen: (open: boolean) => void
    headerId: string
    header: string
    children: React.ReactNode
    onClose?: () => void
    lukkKnapp?: boolean
}

export const FlexModal = ({ open, setOpen, headerId, header, children, onClose, lukkKnapp }: FlexModalProps) => {
    return (
        <Modal
            open={open}
            aria-labelledby={headerId}
            onClose={() => {
                setOpen(false)
                onClose && onClose()
            }}
        >
            <Modal.Content className="m-4 md:w-2xl">
                <Heading size="small" level="1" id={headerId} spacing>
                    {header}
                </Heading>
                {children}
                {lukkKnapp && (
                    <Button
                        variant="primary"
                        className="mt-4"
                        type="button"
                        onClick={(e) => {
                            e.preventDefault()
                            setOpen(false)
                        }}
                    >
                        Lukk
                    </Button>
                )}
            </Modal.Content>
        </Modal>
    )
}
