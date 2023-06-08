import React from 'react'

import { beskyttetSideUtenProps } from '../auth/beskyttetSide'
import { FeilStateView } from '../components/feil/refresh-hvis-feil-state'

export default function Page() {
    return <FeilStateView />
}

export const getServerSideProps = beskyttetSideUtenProps
