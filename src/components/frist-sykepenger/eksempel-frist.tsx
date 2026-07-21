import { BodyShort, Tag } from '@navikt/ds-react'
import React from 'react'

interface EksempelKalenderProps {
    normalTekst: string
    boldTekst: string
    mndEn: string
    mndTo: string
    mndTre: string
    mndFire: string
}

const EksempelFrist = ({ normalTekst, boldTekst, mndEn, mndTo, mndTre, mndFire }: EksempelKalenderProps) => {
    return (
        <div className="my-2 rounded-sm bg-ax-neutral-200 p-4" aria-hidden>
            <BodyShort spacing>
                {normalTekst}
                <strong>{boldTekst}</strong>
            </BodyShort>
            <div className="relative">
                <div className="absolute right-0 top-0 -mr-1 -mt-1 h-0 w-0 border-b-4 border-l-8 border-t-4 border-ax-border-neutral border-y-transparent" />
                <div className="mr-1 flex w-full gap-2 border-t border-ax-border-neutral pt-4">
                    <Tag data-color="neutral" variant="outline" className="w-full bg-ax-accent-100 py-2">
                        {mndEn}
                    </Tag>
                    <Tag data-color="neutral" variant="outline" className="w-full bg-ax-warning-100 py-2">
                        {mndTo}
                    </Tag>
                    <Tag data-color="neutral" variant="outline" className="w-full bg-ax-warning-200 py-2">
                        {mndTre}
                    </Tag>
                    <Tag data-color="neutral" variant="outline" className="w-full bg-ax-warning-300 py-2">
                        {mndFire}
                    </Tag>
                </div>
            </div>
        </div>
    )
}

export default EksempelFrist
