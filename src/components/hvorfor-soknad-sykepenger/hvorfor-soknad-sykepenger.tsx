import './hvorfor-soknad-sykepenger.less'

import { Accordion } from '@navikt/ds-react'
import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React, { useState } from 'react'

import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { tekst } from '../../utils/tekster'
import Vis from '../vis'

interface HvorforSoknadSykepengerProps {
    soknadstype: RSSoknadstype
}

const HvorforSoknadSykepenger = ({ soknadstype }: HvorforSoknadSykepengerProps) => {
    const [ open, setOpen ] = useState<boolean>(false)

    return (
        <Accordion>
            <Accordion.Item open={open} className="hvorfor-soknad-sykepenger">
                <Accordion.Header onClick={() => setOpen(!open)}>
                    <Undertittel tag="h2">{tekst('hvorfor-soknad-sykepenger.overskrift')}</Undertittel>
                </Accordion.Header>
                <Accordion.Content>
                    <Vis hvis={soknadstype === RSSoknadstype.REISETILSKUDD}
                        render={() =>
                            <Normaltekst>{tekst('hvorfor-soknad-reisetilskudd')}</Normaltekst>
                        }
                    />

                    <Vis hvis={soknadstype === RSSoknadstype.GRADERT_REISETILSKUDD}
                        render={() =>
                            <>
                                <Normaltekst>{tekst('hvorfor-soknad-gradertreisetilskudd')}</Normaltekst>
                                <Normaltekst>{tekst('hvorfor-soknad-sykepenger.jobba')}</Normaltekst>
                            </>
                        }
                    />

                    <Vis hvis={soknadstype !== RSSoknadstype.REISETILSKUDD && soknadstype !== RSSoknadstype.GRADERT_REISETILSKUDD}
                        render={() =>
                            <>
                                <Normaltekst>{tekst('hvorfor-soknad-sykepenger')}</Normaltekst>
                                <Normaltekst>{tekst('hvorfor-soknad-sykepenger.jobba')}</Normaltekst>
                            </>
                        }
                    />
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    )
}

export default HvorforSoknadSykepenger
