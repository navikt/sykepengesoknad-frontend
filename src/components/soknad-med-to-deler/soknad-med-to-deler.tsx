import { BodyLong, GuidePanel, Heading } from '@navikt/ds-react'
import React from 'react'

import { tekst } from '../../utils/tekster'

const SoknadMedToDeler = () => {
    return (
        <GuidePanel poster>
            <Heading size="small" level="2" spacing className={'text-center'}>
                {tekst('to-deler.overskrift')}
            </Heading>
            <BodyLong spacing>{tekst('to-deler.avsnitt.1')}</BodyLong>
            <BodyLong spacing>{tekst('to-deler.avsnitt.2')}</BodyLong>
        </GuidePanel>
    )
}

export default SoknadMedToDeler
