import { InfoCard } from '@navikt/ds-react'
import { InformationSquareIcon } from '@navikt/aksel-icons'

export default function MerInfoAlert({ info }: { info: string }) {
    return (
        <InfoCard data-color="info" className="mt-8">
            <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>{info}</InfoCard.Message>
        </InfoCard>
    )
}
