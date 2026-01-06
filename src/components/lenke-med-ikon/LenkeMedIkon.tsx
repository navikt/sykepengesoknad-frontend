import { BodyShort, Link } from '@navikt/ds-react'
import { ExternalLinkIcon } from '@navikt/aksel-icons'
import React from 'react'

import { cn } from '../../utils/tw-utils'

interface LenkeProps {
    href: string
    text: string
    className?: string
}

export function LenkeMedIkon(props: LenkeProps) {
    return (
        <Link className={cn(props.className)} target="_blank" rel="noopener" href={props.href}>
            <BodyShort as="span">{props.text}</BodyShort>
            <ExternalLinkIcon aria-hidden={true} />
        </Link>
    )
}
