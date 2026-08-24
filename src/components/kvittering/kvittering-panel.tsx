import React, { ReactNode } from 'react'
import { Panel } from '@navikt/ds-react'

import { cn } from '../../utils/tw-utils'

export function KvitteringPanel({ children, className }: { children: ReactNode[] | ReactNode; className?: string }) {
    return (
        <Panel
            role="region"
            aria-label="Hva skjer videre?"
            border
            className={cn('grid grid-cols-12 gap-y-2 p-0 pb-8', className)}
        >
            {children}
        </Panel>
    )
}
