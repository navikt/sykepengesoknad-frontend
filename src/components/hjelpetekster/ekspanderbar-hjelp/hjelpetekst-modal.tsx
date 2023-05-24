import { Button, Heading, Modal } from '@navikt/ds-react'
import { useState } from 'react'

interface HjelpetekstPopupProps {
    inlinetekst: React.ReactNode
    tittel: string
    children: React.ReactNode
}

export const HjelpetekstModal = (props: HjelpetekstPopupProps) => {
    const { inlinetekst, tittel, children } = props
    const [open, setOpen] = useState(false)

    return (
        <>
            <span
                role="button"
                className="border-b-2 border-dotted border-border-action hover:bg-gray-100"
                onClick={(e) => {
                    e.preventDefault()
                    setOpen(true)
                }}
            >
                {inlinetekst}
            </span>

            <Modal open={open} onClose={() => setOpen((x) => !x)} aria-labelledby="modal-heading">
                <Modal.Content style={{ maxWidth: '360px' }}>
                    <Heading size="small" level="3" className="pb-4" id="modal-heading">
                        {tittel}
                    </Heading>
                    {children}
                    <div className="mt-4 flex justify-end">
                        <Button onClick={() => setOpen(false)}>OK</Button>
                    </div>
                </Modal.Content>
            </Modal>
        </>
    )
}
