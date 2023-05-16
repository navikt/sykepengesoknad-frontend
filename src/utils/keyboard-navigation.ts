import { useEffect } from 'react'

import { Sporsmal } from '../types/types'

import { isProd } from './environment'

export function useJaNeiKeyboardNavigation(sporsmal: Sporsmal) {
    useEffect(() => {
        if (isProd()) {
            return
        }
        const handleKeyDown = (event: KeyboardEvent) => {
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
