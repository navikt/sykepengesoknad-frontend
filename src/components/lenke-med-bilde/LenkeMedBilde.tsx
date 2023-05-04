import { Link, BodyShort } from '@navikt/ds-react'
import { ExternalLinkIcon } from '@navikt/aksel-icons'
import React from 'react'

interface LenkeProps {
    href: string
    text: string
    className?: string
}
export function LenkeMedBilde(props: LenkeProps) {
    return (
        <Link className={props.className} target="_blank" rel="noopener" href={props.href}>
            <BodyShort as="span">{props.text}</BodyShort>
            <ExternalLinkIcon />
        </Link>
    )
}
