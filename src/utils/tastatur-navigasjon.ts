import { useEffect, useRef } from 'react'

import { Sporsmal } from '../types/types'

import { isProd } from './environment'
import { flattenSporsmal } from './soknad-utils'

export function useJaNeiTastaturNavigasjon(sporsmal: Sporsmal) {
    const handleKeyDown = (event: KeyboardEvent) => {
        if (isProd()) return
        if (erInputEllerTextareaAktiv()) return

        if (event.key === 'j') {
            document.getElementById(`${sporsmal.id}_0`)?.click()
            document.getElementById(`${sporsmal.id}_0`)?.focus()
        } else if (event.key === 'n') {
            document.getElementById(`${sporsmal.id}_1`)?.click()
            document.getElementById(`${sporsmal.id}_1`)?.focus()
        }
    }
    useTastaturNavigasjon(handleKeyDown)
}

export function useCheckboxNavigasjon(sporsmal: Sporsmal) {
    const handleKeyDown = (event: KeyboardEvent) => {
        if (isProd()) return
        if (erInputEllerTextareaAktiv()) return
        if (event.key === 'c' || event.key === 'j' || event.key === 'n') {
            document.getElementById(sporsmal.id)?.click()
            document.getElementById(sporsmal.id)?.focus()
        }
    }
    useTastaturNavigasjon(handleKeyDown)
}

export function useGruppeAvUndersporsmalTastaturNavigasjon(sporsmal: Sporsmal) {
    const sluttetJaRef = useRef<HTMLElement | null>(null)
    const handleKeyDown = (event: KeyboardEvent) => {
        if (isProd()) return
        if (erInputEllerTextareaAktiv()) return

        if (event.key === 'j' || event.key === 'n') {
            if (sporsmal.tag === 'KJENTE_INNTEKTSKILDER_GRUPPE') {
                const alleSpm = flattenSporsmal(sporsmal.undersporsmal)
                const sluttetJa = alleSpm.find((spm) => spm.tag === 'KJENTE_INNTEKTSKILDER_SLUTTET_NEI')
                if (sluttetJa) {
                    sluttetJaRef.current = document.getElementById(sluttetJa.id)
                    sluttetJaRef.current?.click()
                    vent(20).then(() => {
                        const utfortArbeid = alleSpm.find((spm) => spm.tag === 'KJENTE_INNTEKTSKILDER_UTFORT_ARBEID')
                        if (utfortArbeid) {
                            const inputfelt = document.getElementById(utfortArbeid.id + '_0') as HTMLInputElement
                            inputfelt.click()
                            inputfelt.focus()
                        }
                    })
                }
            }
        }
    }
    useTastaturNavigasjon(handleKeyDown)
}

function useTastaturNavigasjon(handterTasteTrykk: (event: KeyboardEvent) => void) {
    useEffect(() => {
        window.addEventListener('keydown', handterTasteTrykk)
        return () => window.removeEventListener('keydown', handterTasteTrykk)
    }, [handterTasteTrykk])
}

function erInputEllerTextareaAktiv() {
    const aktivtElement = document.activeElement
    if (!aktivtElement) return false
    const tagName = aktivtElement.tagName.toLowerCase()
    return (tagName === 'input' && aktivtElement.getAttribute('type') !== 'radio') || tagName === 'textarea'
}

const vent = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
