import { AlertStripeFeil } from 'nav-frontend-alertstriper'
import React from 'react'

const IngenData = () => {
    return (
        <div className='limit'>
            <AlertStripeFeil>
                Vi får akkurat nå ikke hentet alle data.
                Vi jobber med å løse saken. Vennligst prøv igjen senere.
            </AlertStripeFeil>
        </div>
    )
}

export default IngenData
