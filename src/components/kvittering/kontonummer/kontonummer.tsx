import { BodyShort, Label } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React from 'react'

import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import { UseKontonummer } from '../../../hooks/useKontonummer'

const Kontonummer = () => {
    const { data: kontonummer, isSuccess } = UseKontonummer()

    if (!isSuccess) {
        return null
    }

    const formatterKontonr = (kontonummer: string) =>
        kontonummer.length === 11 ? kontonummer.replace(/^(.{4})(.{2})(.*)$/, '$1 $2 $3') : kontonummer

    return (
        <>
            <Label as="h2">{tekst('kvittering.kontonummer.tittel')}</Label>

            <Vis
                hvis={!kontonummer}
                render={() => <BodyShort>{parser(tekst('kvittering.kontonummer.mangler'))}</BodyShort>}
            />

            <Vis
                hvis={kontonummer}
                render={() => (
                    <>
                        <BodyShort>
                            <strong>{formatterKontonr(kontonummer!)}</strong>
                        </BodyShort>
                        <BodyShort>{parser(tekst('kvittering.kontonummer.endre'))}</BodyShort>
                    </>
                )}
            />
        </>
    )
}

export default Kontonummer
