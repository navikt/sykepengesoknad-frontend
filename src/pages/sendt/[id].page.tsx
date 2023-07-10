import React from 'react'

import { beskyttetSideUtenProps } from '../../auth/beskyttetSide'
import SendtSide from '../../components/sendt/sendt-side'

export default function Page() {
    return <SendtSide />
}

export const getServerSideProps = beskyttetSideUtenProps
