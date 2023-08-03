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
                <>
                    <Label as="h2">Vi trenger inntektsopplysninger fra deg som selvstendig næringsdrivende</Label>
                    <BodyLong as="span" spacing>
                        {tekst('kvittering.naeringsdrivende.brodtekst')}{' '}
                    </BodyLong>

                    <Button
                        iconPosition="right"
                        variant="secondary"
                        icon={<ExternalLinkIcon aria-hidden />}
                        as="a"
                        href={tekst('kvittering.naeringsdrivende.lenke.url')}
                        className="mt-2"
                    >
                        Send inn inntektsopplysninger
                    </Button>
                </>
            )}
        />
    )
}

export default InntektSN
