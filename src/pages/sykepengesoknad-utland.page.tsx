import React from 'react'

import { beskyttetSideUtenProps } from '../auth/beskyttetSide'
import OpprettUtland from '../components/opprett-utland/opprett-utland'

export default function Page() {
    return <OpprettUtland />
}

export const getServerSideProps = beskyttetSideUtenProps
