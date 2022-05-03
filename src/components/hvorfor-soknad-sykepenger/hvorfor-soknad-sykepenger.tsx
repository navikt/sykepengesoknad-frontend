import { Accordion, BodyLong, Heading } from '@navikt/ds-react'
import React, { useState } from 'react'

import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { tekst } from '../../utils/tekster'
import { useAmplitudeInstance } from '../amplitude/amplitude'
import Vis from '../vis'

interface HvorforSoknadSykepengerProps {
    soknadstype: RSSoknadstype
}

const HvorforSoknadSykepenger = ({ soknadstype }: HvorforSoknadSykepengerProps) => {
    const [ open, setOpen ] = useState<boolean>(false)
    const { logEvent } = useAmplitudeInstance()

    return (
        <Accordion>
            <Accordion.Item open={open} className="hvorfor-soknad-sykepenger">
                <Accordion.Header onClick={() => {
                    logEvent('accordion ekspandert', {
                        'component': tekst('hvorfor-soknad-sykepenger.overskrift')
                    })
                    setOpen(!open)
                }
                }>
                    <Heading size="small" level="2">{tekst('hvorfor-soknad-sykepenger.overskrift')}</Heading>
                </Accordion.Header>
                <Accordion.Content>
                    <Vis hvis={soknadstype === RSSoknadstype.REISETILSKUDD}
                        render={() =>
                            <BodyLong spacing>{tekst('hvorfor-soknad-reisetilskudd')}</BodyLong>
                        }
                    />

                    <Vis hvis={soknadstype === RSSoknadstype.GRADERT_REISETILSKUDD}
                        render={() =>
                            <>
                                <BodyLong spacing>{tekst('hvorfor-soknad-gradertreisetilskudd')}</BodyLong>
                                <BodyLong spacing>{tekst('hvorfor-soknad-sykepenger.jobba')}</BodyLong>
                            </>
                        }
                    />

                    <Vis hvis={soknadstype !== RSSoknadstype.REISETILSKUDD && soknadstype !== RSSoknadstype.GRADERT_REISETILSKUDD}
                        render={() =>
                            <>
                                <BodyLong spacing>{tekst('hvorfor-soknad-sykepenger')}</BodyLong>
                                <BodyLong spacing>{tekst('hvorfor-soknad-sykepenger.jobba')}</BodyLong>
                            </>
                        }
                    />
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    )
}

export default HvorforSoknadSykepenger
