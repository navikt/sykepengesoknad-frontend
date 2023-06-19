import { BodyShort } from '@navikt/ds-react'
import { useState } from 'react'

import { FlexModal } from '../flex-modal'

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

            <FlexModal open={open} setOpen={setOpen} header={tittel} lukkKnapp={true}>
                {children}
            </FlexModal>
        </>
    )
}
