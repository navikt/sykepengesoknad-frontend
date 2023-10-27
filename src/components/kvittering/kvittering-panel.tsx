import React, { ReactNode } from 'react'
import { Panel } from '@navikt/ds-react'

import { cn } from '../../utils/tw-utils'

export function KvtteringPanel({ children, className }: { children: ReactNode[] | ReactNode; className?: string }) {
    return (
        <Panel data-cy="kvittering-panel" border className={cn('grid grid-cols-12 gap-y-2 p-0 pb-8', className)}>
            {children}
        </Panel>
    )
}
