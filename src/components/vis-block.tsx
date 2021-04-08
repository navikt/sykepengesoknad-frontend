import React from 'react'

interface VisBlockProps {
    hvis: any;
    render: () => React.ReactElement;
}

const VisBlock = ({ hvis, render }: VisBlockProps) => {
    return hvis
        ? render()
        : null
}

export default VisBlock
