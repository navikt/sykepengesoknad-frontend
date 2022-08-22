import { BodyLong, Heading } from '@navikt/ds-react'
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
            <Heading size="small" level="3">
                {tekst('hvorfor-soknad-sykepenger.overskrift')}
            </Heading>

            <Vis
                hvis={soknadstype === RSSoknadstype.REISETILSKUDD}
                render={() => <BodyLong spacing>{tekst('hvorfor-soknad-reisetilskudd')}</BodyLong>}
            />

            <Vis
                hvis={soknadstype === RSSoknadstype.GRADERT_REISETILSKUDD}
                render={() => (
                    <>
                        <BodyLong spacing>{tekst('hvorfor-soknad-gradertreisetilskudd')}</BodyLong>
                        <BodyLong spacing>{tekst('hvorfor-soknad-sykepenger.jobba')}</BodyLong>
                    </>
                )}
            />

            <Vis
                hvis={
                    soknadstype !== RSSoknadstype.REISETILSKUDD && soknadstype !== RSSoknadstype.GRADERT_REISETILSKUDD
                }
                render={() => (
                    <>
                        <BodyLong spacing>{tekst('hvorfor-soknad-sykepenger')}</BodyLong>
                        <BodyLong spacing>{tekst('hvorfor-soknad-sykepenger.jobba')}</BodyLong>
                    </>
                )}
            />
        </>
    )
}

export default HvorforSoknadSykepenger
