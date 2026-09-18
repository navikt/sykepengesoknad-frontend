import React, { ReactNode } from 'react'
import { Box } from '@navikt/ds-react'

export function KvitteringPanel({ children, className }: { children: ReactNode[] | ReactNode; className?: string }) {
    return (
        <div>
            <Box borderRadius="2" borderWidth="1" borderColor="neutral-strong" className={className}>
                {children}
            </Box>
        </div>
    )
}
