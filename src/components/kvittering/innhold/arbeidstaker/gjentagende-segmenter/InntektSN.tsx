import { Button, BodyLong, Label } from '@navikt/ds-react'
import React from 'react'
import { ExternalLinkIcon } from '@navikt/aksel-icons'

import { tekst } from '../../../../../utils/tekster'
import Vis from '../../../../vis'

function InntektSN({ skalSendeInntektsmelding }: { skalSendeInntektsmelding: boolean }) {
    // TODO Fikse label i kvittering

    return (
        <Vis
            hvis={skalSendeInntektsmelding}
            render={() => (
                <div className="mt-8">
                    <Label as="h2">TODO Vi trenger inntektsopplysninger fra deg som selvstendig næringsdrivende</Label>
                    <BodyLong as="span">{tekst('kvittering.naeringsdrivende.brodtekst')} </BodyLong>

                    <div>
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
