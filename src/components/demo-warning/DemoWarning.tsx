import { InfoCard } from '@navikt/ds-react'

import { isOpplaering } from '../../utils/environment'
import { ExclamationmarkTriangleIcon } from '@navikt/aksel-icons'

const DemoWarning = () => {
    if (!isOpplaering()) {
        return null
    }

    return (
        <InfoCard data-color="warning">
            <InfoCard.Message icon={<ExclamationmarkTriangleIcon aria-hidden />}>
                Dette er en demoside og inneholder ikke dine personlige data.
            </InfoCard.Message>
        </InfoCard>
    )
}

export default DemoWarning
