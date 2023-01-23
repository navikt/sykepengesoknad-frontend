import Script from 'next/script'
import React from 'react'

import styles from './UxSignalsWidget.module.css'

export function UxSignalsWidget({ study, demo }: { study: string; demo: boolean }): JSX.Element | null {
    // https://app.uxsignals.com/docs
    return (
        <>
            <Script
                type="module"
                strategy="lazyOnload"
                src="https://uxsignals-frontend.uxsignals.app.iterate.no/embed.js"
                data-uxsignals-mode={demo ? 'demo' : ''}
            />
            <div data-uxsignals-embed={study} className={styles.uxSignalsContainer} />
        </>
    )
}
