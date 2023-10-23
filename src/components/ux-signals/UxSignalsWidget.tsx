import Script from 'next/script'
import React from 'react'

export function UxSignalsWidget({ study, demo }: { study: string; demo: boolean }) {
    // https://app.uxsignals.com/docs
    return (
        <>
            <Script
                type="module"
                strategy="lazyOnload"
                src="https://uxsignals-frontend.uxsignals.app.iterate.no/embed.js"
            />
            <div data-uxsignals-embed={study} data-uxsignals-mode={demo ? 'demo' : ''} />
        </>
    )
}
