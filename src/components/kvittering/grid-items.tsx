import React, { ReactNode } from 'react'

function GridItems({ venstre, midt, hoyre }: { venstre: ReactNode; midt: ReactNode; hoyre: ReactNode }) {
    return (
        <>
            <div className="col-span-1">{venstre}</div>
            <div className="col-span-10">{midt}</div>
            <div className="col-span-1">{hoyre}</div>
        </>
    )
}

export default GridItems
