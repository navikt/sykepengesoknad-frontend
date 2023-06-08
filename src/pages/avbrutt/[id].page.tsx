import React from 'react'

import { beskyttetSideUtenProps } from '../../auth/beskyttetSide'
import AvbruttSoknad from '../../components/avbrutt/avbrutt-soknad'

export default function Page() {
    return <AvbruttSoknad />
}

export const getServerSideProps = beskyttetSideUtenProps
