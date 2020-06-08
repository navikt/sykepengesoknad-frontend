import React from 'react'

import { AmplitudeProvider } from './amplitude'

interface AmplitudeProps {
    children: React.ReactNode;
}

export const Amplitude = (props: AmplitudeProps) => {
    return (
        <AmplitudeProvider>
            { props.children }
        </AmplitudeProvider>
    )
}
