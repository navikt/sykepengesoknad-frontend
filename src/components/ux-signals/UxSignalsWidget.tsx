import Script from 'next/script'
import React from 'react'

import styles from './UxSignalsWidget.module.css'

export function UxSignalsWidget({ study }: { study: string }): JSX.Element | null {
    return (
        <>
            <Script
                type="module"
                strategy="lazyOnload"
                src="https://uxsignals-frontend.uxsignals.app.iterate.no/embed.js"
            />
            <div data-uxsignals-embed={study} className={styles.uxSignalsContainer} />
        </>
    )
}
