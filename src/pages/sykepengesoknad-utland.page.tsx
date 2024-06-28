import React from 'react'

import { beskyttetSideUtenProps } from '../auth/beskyttetSide'
import InfoOppholdUtland from '../components/opphold-utland/info-opphold-utland'

export default function Page() {
    return <InfoOppholdUtland nySoknad={true} />
}

export const getServerSideProps = beskyttetSideUtenProps
