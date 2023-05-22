import { useEffect } from 'react'

import { Sporsmal } from '../types/types'

import { isProd } from './environment'

function aktivtElementErInputEllerTextarea() {
    const aktivtElement = document.activeElement
    if (!aktivtElement) {
        return false
    }

    if (aktivtElement.tagName.toLowerCase() === 'input' && aktivtElement.getAttribute('type') !== 'radio') {
        return true
    }
    if (aktivtElement.tagName.toLowerCase() === 'textarea') {
        return true
    }
    return false
}

export function useJaNeiKeyboardNavigation(sporsmal: Sporsmal) {
    useEffect(() => {
        if (isProd()) {
            return
        }
        const handleKeyDown = (event: KeyboardEvent) => {
            if (aktivtElementErInputEllerTextarea()) {
                return
            }

            if (event.key === 'j') {
                document.getElementById(`${sporsmal.id}_0`)?.click()
                document.getElementById(`${sporsmal.id}_0`)?.focus()
            } else if (event.key === 'n') {
                document.getElementById(`${sporsmal.id}_1`)?.click()
                document.getElementById(`${sporsmal.id}_1`)?.focus()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [sporsmal.id])
}

export function useCheckbockNavigation(sporsmal: Sporsmal) {
    useEffect(() => {
        if (isProd()) {
            return
        }
        const handleKeyDown = (event: KeyboardEvent) => {
            if (aktivtElementErInputEllerTextarea()) {
                return
            }
            if (event.key === 'c') {
                document.getElementById(sporsmal.id)?.click()
                document.getElementById(sporsmal.id)?.focus()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [sporsmal.id])
}
