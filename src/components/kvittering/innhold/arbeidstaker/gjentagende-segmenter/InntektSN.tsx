import { Button, BodyLong, Label } from '@navikt/ds-react'
import React from 'react'

import { tekst } from '../../../../../utils/tekster'
import { LenkeMedIkon } from '../../../../lenke-med-ikon/LenkeMedIkon'
import Vis from '../../../../vis'
import { ExternalLinkIcon } from '@navikt/aksel-icons'

function InntektSN({ skalSendeInntektsmelding }: { skalSendeInntektsmelding: boolean }) {
    // TODO Fikse label i kvittering

    return (
        <Vis
            hvis={skalSendeInntektsmelding}
            render={() => (
                <div className="mt-8">
                    <Label as="h2">TODO Vi trenger inntektsopplysninger fra deg som selvstendig næringsdrivende</Label>
                    <BodyLong as="span">{tekst('kvittering.naeringsdrivende.brodtekst')} </BodyLong>

                    {/* How can I make this button behave us a <link rel="stylesheet" href="" /> */}
                    <Button iconPosition="right" variant="secondary" icon={<ExternalLinkIcon aria-hidden />} as="a" href={tekst('kvittering.naeringsdrivende.lenke.url')}>{tekst('kvittering.naeringsdrivende.lenke')}</Button>
                    <br />
                    <br />
                    <Button iconPosition="right" variant="secondary" icon={<ExternalLinkIcon aria-hidden />} as="a" href={tekst('kvittering.naeringsdrivende.lenke.url')}>Send inn skjema</Button>

                     {/* <LenkeMedIkon
                        href={tekst('kvittering.naeringsdrivende.lenke.url')}
                        text={tekst('kvittering.naeringsdrivende.lenke')}
                    />  */}
                    
                </div>
            )}
        />
    )
}

export default InntektSN
