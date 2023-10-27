import React, { ReactNode } from 'react'

function GridItems({ venstre, children, hoyre }: { venstre?: ReactNode; children: ReactNode; hoyre?: ReactNode }) {
    return (
        <>
            <div className="col-span-1">{venstre}</div>
            <div className="col-span-10">{children}</div>
            <div className="col-span-1">{hoyre}</div>
        </>
    )
}

export default GridItems
