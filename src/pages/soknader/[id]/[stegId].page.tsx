import React from 'react'

import { beskyttetSideUtenProps } from '../../../auth/beskyttetSide'
import { Soknaden } from '../../../components/soknad/soknaden'

export default function Page() {
    return <Soknaden />
}

export const getServerSideProps = beskyttetSideUtenProps
