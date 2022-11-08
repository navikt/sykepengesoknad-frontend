import React from 'react'

interface VisProps {
    hvis: any
    render: () => React.ReactElement | null
}

const Vis = ({ hvis, render }: VisProps) => {
    return hvis ? render() : null
}

export default Vis
