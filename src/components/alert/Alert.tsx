import { InfoCard, InfoCardProps } from '@navikt/ds-react'
import { InformationSquareIcon } from '@navikt/aksel-icons'
import { CheckmarkCircleIcon } from '@navikt/aksel-icons'
import { XMarkOctagonIcon } from '@navikt/aksel-icons'
import { ExclamationmarkTriangleIcon } from '@navikt/aksel-icons'
import { ReactNode } from 'react'

type Variant = 'success' | 'info' | 'warning' | 'error'

export default function Alert({
    children,
    variant,
    className,
}: {
    children: ReactNode
    variant: Variant
    className?: string
}) {
    type Variantdesign = {
        farge: InfoCardProps['data-color']
        ikon: ReactNode
    }
    const variantutforming: Record<Variant, Variantdesign> = {
        success: {
            farge: 'success',
            ikon: <CheckmarkCircleIcon aria-hidden fontSize="1.5rem" />,
        },
        info: {
            farge: 'info',
            ikon: <InformationSquareIcon aria-hidden fontSize="1.5rem" />,
        },
        warning: {
            farge: 'warning',
            ikon: <ExclamationmarkTriangleIcon aria-hidden fontSize="1.5rem" />,
        },
        error: {
            farge: 'danger',
            ikon: <XMarkOctagonIcon aria-hidden fontSize="1.5rem" />,
        },
    }

    return (
        <InfoCard data-color={variantutforming[variant].farge} className={className}>
            <InfoCard.Message icon={variantutforming[variant].ikon}>{children}</InfoCard.Message>
        </InfoCard>
    )
}
