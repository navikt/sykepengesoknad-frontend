import { BodyShort, Heading } from '@navikt/ds-react'
import React from 'react'

import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { tekst } from '../../utils/tekster'
import Vis from '../vis'

interface HvorforSoknadSykepengerProps {
    soknadstype: RSSoknadstype
}

const HvorforSoknadSykepenger = ({ soknadstype }: HvorforSoknadSykepengerProps) => {
    return (
        <>
            <Heading size="small" level="3" spacing>
                {tekst('hvorfor-soknad-sykepenger.overskrift')}
            </Heading>

            <Vis
                hvis={soknadstype === RSSoknadstype.REISETILSKUDD}
                render={() => <BodyShort>{tekst('hvorfor-soknad-reisetilskudd')}</BodyShort>}
            />

            <Vis
                hvis={soknadstype === RSSoknadstype.GRADERT_REISETILSKUDD}
                render={() => (
                    <>
                        <BodyShort spacing>{tekst('hvorfor-soknad-gradertreisetilskudd')}</BodyShort>
                        <BodyShort>{tekst('hvorfor-soknad-sykepenger.jobba')}</BodyShort>
                    </>
                )}
            />

            <Vis
                hvis={
                    soknadstype !== RSSoknadstype.REISETILSKUDD && soknadstype !== RSSoknadstype.GRADERT_REISETILSKUDD
                }
                render={() => (
                    <>
                        <BodyShort spacing>{tekst('hvorfor-soknad-sykepenger')}</BodyShort>
                        <BodyShort>{tekst('hvorfor-soknad-sykepenger.jobba')}</BodyShort>
                    </>
                )}
            />
        </>
    )
}

export default HvorforSoknadSykepenger
