import { List } from '@navikt/ds-react'

import VaerKlarOverAtTekster from '../sporsmal/vaer-klar-over-at-tekster'

const VaerKlarOverAt = () => {
    return (
        <List as="ul" title="Viktig å være klar over:">
            {Object.values(VaerKlarOverAtTekster).map((tekst, index) => (
                <List.Item key={index}>{tekst}</List.Item>
            ))}
        </List>
    )
}

export default VaerKlarOverAt
