import { Button, BodyLong, Label } from '@navikt/ds-react'
import React from 'react'
import { ExternalLinkIcon } from '@navikt/aksel-icons'

import { tekst } from '../../../../../utils/tekster'
import Vis from '../../../../vis'

function InntektSN({ skalSendeInntektsmelding }: { skalSendeInntektsmelding: boolean }) {

    return (
        <Vis
            hvis={skalSendeInntektsmelding}
            render={() => (
                <div className="mt-8">
                    <Label as="h2">{tekst('kvittering.naeringsdrivende.overskrift')}</Label>
                    <BodyLong as="span">{tekst('kvittering.naeringsdrivende.brodtekst')} </BodyLong>

                    <div className="mt-2">
                        <Button
                            iconPosition="right"
                            variant="secondary"
                            icon={<ExternalLinkIcon aria-hidden />}
                            as="a"
                            href={tekst('kvittering.naeringsdrivende.lenke.url')}
                        >
                            {tekst('kvittering.naeringsdrivende.lenke')}
                        </Button>
                    </div>
                </div>
            )}
        />
    )
}

export default InntektSN
