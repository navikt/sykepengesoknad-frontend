import { FormProgress } from '@navikt/ds-react'
import React from 'react'
import { useRouter } from 'next/router'

import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'
import { tekst } from '../../../utils/tekster'
import { SEPARATOR } from '../../../utils/constants'
import { useTestpersonQuery } from '../../../hooks/useTestpersonQuery'

const Fremdriftsbar = () => {
    const { valgtSoknad, stegNo } = useSoknadMedDetaljer()

    const oppholdUtland = valgtSoknad?.soknadstype == RSSoknadstype.OPPHOLD_UTLAND
    const router = useRouter()
    const testperson = useTestpersonQuery()

    const aktivtSteg = oppholdUtland ? stegNo : stegNo - 1
    if (valgtSoknad && aktivtSteg == 0) return null

    if (aktivtSteg == 0) {
        // ingen progressbar på første side
        return null
    }

    const antallSporsmål =
        valgtSoknad?.sporsmal.filter((s) => s.tag !== 'VAER_KLAR_OVER_AT' && s.tag !== 'TIL_SLUTT').length || 9
    const antallSteg = oppholdUtland ? antallSporsmål + 1 : antallSporsmål

    const stegene =
        valgtSoknad?.sporsmal
            .filter((s) => !['VAER_KLAR_OVER_AT', 'ANSVARSERKLARING'].includes(s.tag))
            .map((s) => s.tag) || []

    return (
        <FormProgress totalSteps={antallSteg} activeStep={aktivtSteg}>
            {stegene.map((tag, i) => {
                const nokkel = tag.toLowerCase()
                const tittel = tekst(`sykepengesoknad.${nokkel}.tittel` as any)
                const completed = i < aktivtSteg - 1
                const url = `/soknader/${valgtSoknad?.id}${SEPARATOR}${i + 2}${testperson.query()}`
                return (
                    <FormProgress.Step
                        onClick={(e) => {
                            if (completed) {
                                e.preventDefault()
                                router.push(url)
                            }
                        }}
                        href={'/syk/sykepengesoknad' + url}
                        key={i + ' ' + tag}
                        completed={completed}
                        interactive={completed}
                    >
                        {tittel}
                    </FormProgress.Step>
                )
            })}
        </FormProgress>
    )

    /*
        return (
            <div
                className="my-4 md:my-6"
                role="progressbar"
                aria-valuenow={aktivtSteg}
                aria-valuemin={1}
                aria-valuemax={antallSteg}
                aria-valuetext={valueText}
                aria-label="Søknadssteg"
            >
                <div className="relative mx-auto mt-4">
                    <div className="h-3 rounded-lg bg-gray-200" />
                    <div
                        className="-mt-3 h-3 rounded-lg bg-gray-900"
                        style={{
                            width: `${bredde}%`,
                        }}
                    />
                </div>
                <div className="mt-4 flex justify-between">
                    <BodyShort as={valgtSoknad ? 'span' : Skeleton}>{valueText}</BodyShort>
                </div>
            </div>
        )*/
}

export default Fremdriftsbar
