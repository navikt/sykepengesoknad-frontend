import { Heading, Skeleton } from '@navikt/ds-react'
import React from 'react'

import Person from '../person/Person'

export const Banner = ({
    overskrift,
    underoverskrift,
    skeleton,
}: {
    overskrift: string
    underoverskrift?: string
    skeleton?: boolean
}) => (
    <header className="m-auto mt-4 flex items-center justify-between py-4">
        <Heading {...(skeleton ? { as: Skeleton } : {})} size="large" level="1" className="inline md:mr-2">
            {overskrift}
            {underoverskrift && (
                <Heading as={skeleton ? Skeleton : 'span'} size="small" className="mt-2 block">
                    {underoverskrift}
                </Heading>
            )}
        </Heading>
        <Person />
    </header>
)
