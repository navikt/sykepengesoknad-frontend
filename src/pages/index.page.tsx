import React from 'react'

import { beskyttetSideUtenProps } from '../auth/beskyttetSide'
import Listevisning from '../components/listevisning/listevisning'

export default function Page() {
    return <Listevisning />
}

export const getServerSideProps = beskyttetSideUtenProps
