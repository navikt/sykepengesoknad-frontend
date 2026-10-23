import { InfoCard, InfoCardProps } from '@navikt/ds-react'
import { InformationSquareIcon } from '@navikt/aksel-icons'
import { CheckmarkCircleIcon } from '@navikt/aksel-icons'
import { XMarkOctagonIcon } from '@navikt/aksel-icons'
import { ExclamationmarkTriangleIcon } from '@navikt/aksel-icons'
import { ReactNode } from 'react'

export enum Funksjon {
    success = 'success',
    info = 'info',
    warning = 'warning',
    danger = 'danger',
}

export default function nyAlertGammeltDesign({
    info,
    funksjon,
    className = 'mt-4',
}: {
    info: ReactNode
    funksjon: Funksjon
    className?: string
}) {
    type funksjonsdesign = {
        farge: InfoCardProps['data-color']
        ikon: ReactNode
    }
    const funksjonsutforming: Record<Funksjon, funksjonsdesign> = {
        success: {
            farge: 'success',
            ikon: <CheckmarkCircleIcon title="a11y-title" fontSize="1.5rem" />,
        },
        info: {
            farge: 'info',
            ikon: <InformationSquareIcon title="a11y-title" fontSize="1.5rem" />,
        },
        warning: {
            farge: 'warning',
            ikon: <ExclamationmarkTriangleIcon title="a11y-title" fontSize="1.5rem" />,
        },
        danger: {
            farge: 'danger',
            ikon: <XMarkOctagonIcon title="a11y-title" fontSize="1.5rem" />,
        },
    }

    return (
        <InfoCard data-color={funksjonsutforming[funksjon].farge} className={className}>
            <InfoCard.Message icon={funksjonsutforming[funksjon].ikon}>{info}</InfoCard.Message>
        </InfoCard>
    )
}
