import { Heading, Skeleton } from '@navikt/ds-react'
import React from 'react'

import { isMockBackend, isOpplaering } from '../../utils/environment'
import Person from '../person/Person'

export const Banner = ({
    overskrift,
    underoverskrift,
    skeleton,
}: {
    overskrift: string
    underoverskrift?: string
    skeleton?: boolean
}) => {
    const kanVelgePerson = isMockBackend() || isOpplaering()

    return (
        <div className="m-auto mt-4 flex items-center justify-between py-4">
            <Heading as={skeleton ? Skeleton : 'h1'} size="large" className="inline md:mr-2">
                {overskrift}
                {underoverskrift && (
                    <Heading as={skeleton ? Skeleton : 'span'} size="small" className="mt-2 block">
                        {underoverskrift}
                    </Heading>
                )}
            </Heading>
            {kanVelgePerson && <Person />}
        </div>
    )
}
