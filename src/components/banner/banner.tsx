import './banner.less'

import React from 'react'

interface BannerProps {
    children: React.ReactNode;
}

const Banner = ({ children }: BannerProps) => {
    return (
        <header className="sidebanner">
            {children}
        </header>
    )
}

export default Banner
