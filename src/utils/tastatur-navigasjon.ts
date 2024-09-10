import { useEffect, useMemo, useRef } from 'react'

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

export function useRadiogruppeTastaturNavigasjon(sporsmal: Sporsmal, erHovedsporsmal: boolean) {
    const refJaSpm = useRef<HTMLElement | null>(null)
    const refNeiSpm = useRef<HTMLElement | null>(null)
    const alleSpm = useMemo(() => flattenSporsmal(sporsmal.undersporsmal), [sporsmal.undersporsmal])

    const velgNeiSvarForInntektssporsmal = async () => {
        if (sporsmal.tag === 'INNTEKTSOPPLYSNINGER_VIRKSOMHETEN_AVVIKLET') {
            const neiSpm = alleSpm.find((spm) => spm.tag === 'INNTEKTSOPPLYSNINGER_VIRKSOMHETEN_AVVIKLET_NEI')
            if (neiSpm) {
                refNeiSpm.current = document.getElementById(neiSpm.id)
                refNeiSpm.current?.click()

                await vent(20)
                const nyIArbeidslivetNei = alleSpm.find(
                    (spm) => spm.tag === 'INNTEKTSOPPLYSNINGER_NY_I_ARBEIDSLIVET_NEI',
                )
                if (nyIArbeidslivetNei) {
                    const inputfelt = document.getElementById(nyIArbeidslivetNei.id) as HTMLInputElement
                    inputfelt.click()
                    inputfelt.focus()
                }

                await vent(20)
                const varigEndring = alleSpm.find((spm) => spm.tag === 'INNTEKTSOPPLYSNINGER_VARIG_ENDRING')
                if (varigEndring) {
                    const inputfelt = document.getElementById(varigEndring.id + '_1') as HTMLInputElement
                    inputfelt.click()
                    inputfelt.focus()
                }
            }
        }
    }

    const velgJaSvarForInntektssporsmal = () => {
        if (sporsmal.tag === 'INNTEKTSOPPLYSNINGER_VIRKSOMHETEN_AVVIKLET') {
            const jaSpm = alleSpm.find((spm) => spm.tag === 'INNTEKTSOPPLYSNINGER_VIRKSOMHETEN_AVVIKLET_JA')
            if (jaSpm) {
                refJaSpm.current = jaSpm ? document.getElementById(jaSpm.id) : null
                refJaSpm.current?.click()
            }
        }
    }

    const handterTasteTrykk = (event: KeyboardEvent) => {
        if (isProd() || !erHovedsporsmal) return
        if (erInputEllerTextareaAktiv()) return

        switch (event.key) {
            case 'j':
                velgJaSvarForInntektssporsmal()
                break
            case 'n':
                velgNeiSvarForInntektssporsmal().then()
                break
            default:
                return
        }
    }
    useTastaturNavigasjon(handterTasteTrykk)
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
