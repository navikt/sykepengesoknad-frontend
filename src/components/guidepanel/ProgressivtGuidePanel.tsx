import { GuidePanel, GuidePanelProps } from '@navikt/ds-react'

import { useWindowSize } from '../../utils/useWindowSize'

export function ProgressivtGuidePanel(props: GuidePanelProps) {
    const { mobile } = useWindowSize()

    const actualProps = {
        ...props,
        poster: mobile == true,
    }

    return <GuidePanel {...actualProps}></GuidePanel>
}
