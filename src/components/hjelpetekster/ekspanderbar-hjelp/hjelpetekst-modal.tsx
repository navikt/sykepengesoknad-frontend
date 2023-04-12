import { BodyLong, Button, Heading, Modal } from '@navikt/ds-react'
import { useEffect, useState } from 'react'

interface HjelpetekstPopupProps {
    inlinetekst: React.ReactNode
    tittel: string
    children: React.ReactNode
}

export const HjelpetekstModal = (props: HjelpetekstPopupProps) => {
    const { inlinetekst, tittel, children } = props
    const [open, setOpen] = useState(false)

    useEffect(() => {
        Modal.setAppElement('#__next')
    }, [])

    return (
        <>
            <a onClick={() => setOpen(true)} className="lenkeknapp">
                {inlinetekst}
            </a>
            <Modal
                open={open}
                aria-label="Modal demo"
                onClose={() => setOpen((x) => !x)}
                aria-labelledby="modal-heading"
            >
                <Modal.Content style={{ maxWidth: '360px' }}>
                    <Heading size="small" level="3" className="pb-4">
                        {tittel}
                    </Heading>
                    <BodyLong>{children}</BodyLong>
                    <div className="mt-4 flex justify-end">
                        <Button onClick={() => setOpen(false)}>OK</Button>
                    </div>
                </Modal.Content>
            </Modal>
        </>
    )
}
