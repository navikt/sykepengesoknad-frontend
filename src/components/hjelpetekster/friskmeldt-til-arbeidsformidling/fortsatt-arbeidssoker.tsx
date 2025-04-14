import { Alert, BodyLong } from '@navikt/ds-react'
import React from 'react'
import { useFormContext } from 'react-hook-form'

import { Sporsmal } from '../../../types/types'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'
import { tilLesbarDatoMedArstall } from '../../../utils/dato-utils'
import { flattenSporsmal } from '../../../utils/soknad-utils'

export function FortsattArbeidssoker({ sporsmal, fieldValue }: { sporsmal: Sporsmal; fieldValue: any }) {
    const { watch, getValues } = useFormContext()
    watch() // Nå abonnerer vi på alle skjemaverdiene

    const { valgtSoknad } = useSoknadMedDetaljer()

    if (sporsmal.tag == 'FTA_JOBBSITUASJONEN_DIN_FORTSATT_FRISKMELDT_NY_JOBB' && fieldValue === 'NEI') {
        const dato = () => {
            const tagForDato = flattenSporsmal(valgtSoknad?.sporsmal || []).find(
                (s) => s.tag === 'FTA_JOBBSITUASJONEN_DIN_NAR',
            )
            if (!tagForDato) {
                return null
            }
            const funnetVerdi = getValues()[tagForDato.id] as null | string
            if (funnetVerdi) {
                return tilLesbarDatoMedArstall(funnetVerdi)
            }
            return null
        }

        const formattertDato = dato()
        if (!formattertDato) return null
        return (
            <Alert variant="info" className="mt-4">
                <BodyLong spacing>
                    {`Du har svart at du har begynt i ny jobb og dermed ikke vil være friskmeldt til arbeidsformidling fra og med ${formattertDato}`}
                </BodyLong>
                <BodyLong>Da stanser vi sykepengene dine fra og med denne datoen.</BodyLong>
            </Alert>
        )
    }
    if (sporsmal.tag == 'FTA_JOBBSITUASJONEN_DIN_FORTSATT_FRISKMELDT' && fieldValue === 'NEI') {
        const dato = () => {
            const tagForDato = sporsmal.undersporsmal.find(
                (s) => s.tag === 'FTA_JOBBSITUASJONEN_DIN_FORTSATT_FRISKMELDT_AVREGISTRERT_NAR',
            )
            if (!tagForDato) {
                return null
            }
            const funnetVerdi = getValues()[tagForDato.id] as null | string
            if (funnetVerdi) {
                return tilLesbarDatoMedArstall(funnetVerdi)
            }
            return null
        }
        const formattertDato = dato()
        if (!formattertDato) return null
        return (
            <Alert variant="warning" className="mt-4">
                <BodyLong spacing>
                    {`Du har svart at du ikke vil være friskmeldt til arbeidsformidling fra og med ${formattertDato}.`}
                </BodyLong>
                <BodyLong>Da stanser vi sykepengene dine fra og med denne datoen.</BodyLong>
            </Alert>
        )
    }
    return null
}
