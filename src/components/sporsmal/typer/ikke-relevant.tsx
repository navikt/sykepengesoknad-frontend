import { BodyLong, Label, Panel } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React from 'react'

import Vis from '../../vis'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { TagTyper } from '../../../types/enums'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'

const IkkeRelevant = ({ sporsmal }: SpmProps) => {
    if (sporsmal.tag === TagTyper.UTENLANDSK_ADRESSE) {
        return (
            <Panel border={true} style={{ marginTop: '1em' }}>
                <Label as="h2">Oppgi utenlandsk kontaktadresse</Label>
                <UndersporsmalListe oversporsmal={sporsmal} />
            </Panel>
        )
    }
    return (
        <Vis
            hvis={sporsmal.sporsmalstekst}
            render={() => (
                <div className="til_slutt_seksjon">
                    <Label as="h2" className="skjema__sporsmal">
                        {sporsmal.sporsmalstekst}
                    </Label>
                    {sporsmal.undertekst && (
                        <BodyLong as="div" className="redaksjonelt-innhold">
                            {parser(sporsmal.undertekst)}
                        </BodyLong>
                    )}
                </div>
            )}
        />
    )
}

export default IkkeRelevant
