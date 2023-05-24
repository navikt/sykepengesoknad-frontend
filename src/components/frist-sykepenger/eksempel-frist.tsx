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
        <div className="my-2 rounded bg-gray-100 p-4" aria-hidden>
            <BodyShort spacing>
                {normalTekst}
                <strong>{boldTekst}</strong>
            </BodyShort>
            <div className="css-arrow flex w-full gap-2">
                <Tag variant="neutral" className="w-full bg-blue-50 py-2">
                    {mndEn}
                </Tag>
                <Tag variant="neutral" className="w-full bg-orange-50 py-2">
                    {mndTo}
                </Tag>
                <Tag variant="neutral" className="w-full bg-orange-100 py-2">
                    {mndTre}
                </Tag>
                <Tag variant="neutral" className="w-full bg-orange-200 py-2">
                    {mndFire}
                </Tag>
            </div>
        </div>
    )
}

export default EksempelFrist
