import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import { UseKontonummer } from '../../../hooks/useKontonummer'
import { parserWithReplace } from '../../../utils/html-react-parser-utils'

const Kontonummer = () => {
    const { data: kontonummer, isSuccess } = UseKontonummer()

    if (!isSuccess) {
        return null
    }

    const formatterKontonr = (kontonummer: string) =>
        kontonummer.length === 11 ? kontonummer.replace(/^(.{4})(.{2})(.*)$/, '$1 $2 $3') : kontonummer

    return (
        <div data-cy="kontonummer">
            <Label as="h2" spacing>
                {tekst('kvittering.kontonummer.tittel')}
            </Label>

            <Vis
                hvis={!kontonummer}
                render={() => <BodyShort>{parserWithReplace(tekst('kvittering.kontonummer.mangler'))}</BodyShort>}
            />

            <Vis
                hvis={kontonummer}
                render={() => (
                    <>
                        <BodyShort>
                            <strong>{formatterKontonr(kontonummer!)}</strong>
                        </BodyShort>
                        <BodyShort>{parserWithReplace(tekst('kvittering.kontonummer.endre'))}</BodyShort>
                    </>
                )}
            />
        </div>
    )
}

export default Kontonummer
