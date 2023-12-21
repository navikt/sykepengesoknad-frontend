import { useEffect } from 'react'

import { Sporsmal } from '../types/types'

import { isProd } from './environment'
import { flattenSporsmal } from './soknad-utils'

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

export function useCheckboxNavigation(sporsmal: Sporsmal) {
    useEffect(() => {
        if (isProd()) {
            return
        }
        const handleKeyDown = (event: KeyboardEvent) => {
            if (aktivtElementErInputEllerTextarea()) {
                return
            }
            if (event.key === 'c' || event.key === 'j' || event.key === 'n') {
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

export function useGruppeAvundersporsmalKeyboardNavigation(sporsmal: Sporsmal) {
    useEffect(() => {
        if (isProd()) {
            return
        }
        const handleKeyDown = (event: KeyboardEvent) => {
            if (aktivtElementErInputEllerTextarea()) {
                return
            }

            if (event.key === 'j' || event.key === 'n') {
                if (sporsmal.tag === 'KJENTE_INNTEKTSKILDER_GRUPPE') {
                    const alleSpm = flattenSporsmal(sporsmal.undersporsmal)
                    const sluttetJa = alleSpm.find((spm) => spm.tag === 'KJENTE_INNTEKTSKILDER_SLUTTET_NEI')
                    if (sluttetJa) {
                        document.getElementById(sluttetJa.id)?.click()
                    }

                    window.setTimeout(() => {
                        const utfortArbeid = alleSpm.find((spm) => spm.tag === 'KJENTE_INNTEKTSKILDER_UTFORT_ARBEID')
                        if (utfortArbeid) {
                            const inputfelt = document.getElementById(utfortArbeid.id + '_0') as HTMLInputElement
                            inputfelt.click()
                            inputfelt.focus()
                        }
                    }, 20)
                }
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [sporsmal.id, sporsmal.tag, sporsmal.undersporsmal])
}
