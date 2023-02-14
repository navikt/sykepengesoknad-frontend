import { GuidePanel } from '@navikt/ds-react'
import { GuidePanelProps } from '@navikt/ds-react/src/guide-panel/GuidePanel'

import { useWindowSize } from '../../utils/useWindowSize'

export function ProgressivtGuidePanel(props: GuidePanelProps) {
    const { mobile } = useWindowSize()

    const actualProps = {
        ...props,
        poster: mobile == true,
    }

    return <GuidePanel {...actualProps}></GuidePanel>
}
