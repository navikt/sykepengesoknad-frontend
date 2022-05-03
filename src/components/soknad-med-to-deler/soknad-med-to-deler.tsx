import { BodyLong, GuidePanel, Heading } from '@navikt/ds-react'
import React from 'react'

import { tekst } from '../../utils/tekster'
import VeilederSVG from '../soknad-intro/veileder'

const SoknadMedToDeler = () => {
    return (
        <div className="to-deler">
            <GuidePanel poster illustration={VeilederSVG}>
                <Heading size="small" level="2">
                    {tekst('to-deler.overskrift')}
                </Heading>
                <BodyLong>{tekst('to-deler.avsnitt.1')}</BodyLong>
                <BodyLong>{tekst('to-deler.avsnitt.2')}</BodyLong>
            </GuidePanel>
        </div>
    )
}

export default SoknadMedToDeler
