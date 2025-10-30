import React, { useEffect, useState } from 'react'
import { shuffle } from 'remeda'

import { Soknad, Sporsmal } from '../../types/types'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'

import { FeedbackRadioGroup, FlexjarFelles } from './flexjar-felles'

interface FlexjarSporsmalProps {
    soknad: Soknad | undefined
    sporsmal: Sporsmal | undefined
    steg: number
}

const VANSKELIGHET_ALTERNATIVER_VANSKELIGE = [
    ['LITT_VANSKELIG', 'Litt vanskelig'],
    ['VELDIG_VANSKELIG', 'Veldig vanskelig'],
]
const VANSKELIGHET_ALTERNATIVER_ENKLE = [
    ['VELDIG_ENKELT', 'Veldig enkelt'],
    ['GANSKE_ENKELT', 'Ganske enkelt'],
]
const VANSKELIGHET_ALTERNATIVER = [...VANSKELIGHET_ALTERNATIVER_ENKLE, ...VANSKELIGHET_ALTERNATIVER_VANSKELIGE]
const VANSKELIGE_AARSAKER = [
    ['SPRAK_VANSKELIG_A_FORSTA', 'Språket eller ordbruken var vanskelig å forstå'],
    ['USIKKER_HVA_SPORSMALET_HANDLET_OM', 'Jeg ble usikker på hva spørsmålet handlet om'],
    ['FORSTOD_IKKE_HVORFOR_DERE_STILTE_SPORSMALET', 'Jeg forstod ikke hvorfor dere stilte spørsmålet'],
    ['UBEHAGELIG_A_SVARE_PA', 'Spørsmålet føltes ubehagelig å svare på'],
]
const VANSKELIGE_AARSAKER_ANNET = [['ANNET', 'Annet']]
const ALLE_VANSKELIGE_AARSAKER_BLANDET = shuffle(VANSKELIGE_AARSAKER).concat(VANSKELIGE_AARSAKER_ANNET)

export const FlexjarSporsmalV2 = ({ soknad, sporsmal, steg }: FlexjarSporsmalProps) => {
    const [activeState, setActiveState] = useState<string | number | null>(null)
    const [thanksFeedback, setThanksFeedback] = useState<boolean>(false)
    const [aarsak, setAarsak] = useState<string | number | null>(null)
    const [visSendeKnapp, setVisSendeKnapp] = useState<boolean>(false)
    const [visTextTilbakemelding, setVisTextTilbakemelding] = useState<boolean>(false)

    useEffect(() => {
        setActiveState(null)
        setThanksFeedback(false)
        setAarsak(null)
        setVisSendeKnapp(false)
        setVisTextTilbakemelding(false)
    }, [sporsmal?.tag])
    if (steg <= 1 && soknad?.soknadstype !== RSSoknadstype.OPPHOLD_UTLAND) {
        return null
    }

    const handterEndretVanskelighet = (value: string | number | null) => {
        setActiveState(value)
        if (VANSKELIGHET_ALTERNATIVER_ENKLE.some(([key]) => key === value)) {
            setAarsak(null)
            setVisTextTilbakemelding(false)
        }
        setVisSendeKnapp(true)
    }

    const handterEndretAarsak = (value: string | number | null) => {
        setVisTextTilbakemelding(true)
        setAarsak(value)
    }

    if (sporsmal?.tag === 'TIL_SLUTT' || sporsmal?.tag === 'VAER_KLAR_OVER_AT') {
        return null
    }

    const feedbackId = 'sykepengesoknad-sporsmal-v2'
    const feedbackProps: Record<string, string | undefined | boolean> = {
        soknadstype: soknad?.soknadstype.toString(),
        sporsmal: sporsmal?.tag.toString(),
    }
    const tilleggssporsmal: Record<string, string | undefined | boolean> = {
        aarsak: aarsak?.toString(),
    }

    if (soknad?.julesoknad) {
        feedbackProps['julesøknad'] = true
    }

    return (
        <FlexjarFelles
            feedbackId={feedbackId}
            setActiveState={setActiveState}
            activeState={activeState}
            thanksFeedback={thanksFeedback}
            setThanksFeedback={setThanksFeedback}
            getPlaceholder={() => 'Har du forslag til hvordan vi kan forbedre spørsmålet?'}
            feedbackProps={feedbackProps}
            textRequired={false}
            showSendFeedback={visSendeKnapp}
            showTextBox={visTextTilbakemelding}
            additionalQuestions={tilleggssporsmal}
            flexjartittel="Vil du hjelpe oss å gjøre søknaden bedre?"
            flexjarsporsmal=""
        >
            <div className="flex w-full mt-2 mb-2">
                <FeedbackRadioGroup
                    feedbackId={feedbackId}
                    sporsmal="Hvordan var det å svare på dette spørsmålet?"
                    svarAlternativer={VANSKELIGHET_ALTERNATIVER}
                    setSvar={handterEndretVanskelighet}
                    svar={activeState}
                />
            </div>
            {VANSKELIGHET_ALTERNATIVER_VANSKELIGE.some(([key]) => key === activeState) && (
                <div className="flex w-full mt-4">
                    <FeedbackRadioGroup
                        feedbackId={feedbackId}
                        sporsmal="Hva synes du var vanskelig?"
                        undertekst="Velg alternativer som passer best"
                        svarAlternativer={ALLE_VANSKELIGE_AARSAKER_BLANDET}
                        setSvar={handterEndretAarsak}
                        svar={aarsak}
                    />
                </div>
            )}
        </FlexjarFelles>
    )
}
