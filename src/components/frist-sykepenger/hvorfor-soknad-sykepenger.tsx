import { BodyShort, Heading } from '@navikt/ds-react'
import React from 'react'

import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { tekst } from '../../utils/tekster'

interface HvorforSoknadSykepengerProps {
    soknadstype: RSSoknadstype
}

const HvorforSoknadSykepenger = ({ soknadstype }: HvorforSoknadSykepengerProps) => {
    return (
        <>
            <Heading size="small" level="3" spacing>
                {tekst('hvorfor-soknad-sykepenger.overskrift')}
            </Heading>

            {soknadstype === RSSoknadstype.REISETILSKUDD && (
                <BodyShort>{tekst('hvorfor-soknad-reisetilskudd')}</BodyShort>
            )}

            {soknadstype === RSSoknadstype.GRADERT_REISETILSKUDD && (
                <>
                    <BodyShort spacing>{tekst('hvorfor-soknad-gradertreisetilskudd')}</BodyShort>
                    <BodyShort>{tekst('hvorfor-soknad-sykepenger.jobba')}</BodyShort>
                </>
            )}

            {soknadstype !== RSSoknadstype.REISETILSKUDD && soknadstype !== RSSoknadstype.GRADERT_REISETILSKUDD && (
                <>
                    <BodyShort spacing>{tekst('hvorfor-soknad-sykepenger')}</BodyShort>
                    <BodyShort>{tekst('hvorfor-soknad-sykepenger.jobba')}</BodyShort>
                </>
            )}
        </>
    )
}

export default HvorforSoknadSykepenger
