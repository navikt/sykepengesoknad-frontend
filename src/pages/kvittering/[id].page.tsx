import React from 'react'

import { beskyttetSideUtenProps } from '../../auth/beskyttetSide'
import KvitteringSide from '../../components/kvittering/kvittering-side'

export default function Page() {
    return <KvitteringSide />
}

export const getServerSideProps = beskyttetSideUtenProps
