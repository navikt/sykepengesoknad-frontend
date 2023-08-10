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
        <Link className={cn('!text-text-action', props.className)} target="_blank" rel="noopener" href={props.href}>
            <BodyShort className="text-text-action" as="span">
                {props.text}
            </BodyShort>
            <ExternalLinkIcon />
        </Link>
    )
}
