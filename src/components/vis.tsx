import React from 'react'

const Vis = (props: { hvis: any; children: React.ReactNode }) => {
    return props.hvis === undefined || props.hvis === null || props.hvis === false
        ? (null as any)
        : props.children
}

export default Vis
