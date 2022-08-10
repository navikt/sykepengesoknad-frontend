import dynamic from 'next/dynamic'
import React from 'react'

import { beskyttetSideUtenProps } from '../auth/beskyttetSide'

function App() {
    const CreateReactAppEntryPoint = dynamic(() => import('../app'), {
        ssr: false,
    })

    return (
        <>
            <CreateReactAppEntryPoint />
        </>
    )
}

export const getServerSideProps = beskyttetSideUtenProps

export default App
