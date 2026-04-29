import { ReadMore } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'

import { RSArbeidssituasjon } from '../../../types/rs-types/rs-arbeidssituasjon'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { logEvent } from '../../umami/umami'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'
import { erSigrunInntekt, SigrunInntekt, Sporsmal } from '../../../types/types'
import { formatterTall } from '../../../utils/utils'

import { SporsmalTagMedHjelpetekst } from './types'
import { arbeidstakerMapping } from './arbeidstaker/mapping'
import { naringsdrivendeMapping } from './naeringsdrivende/mapping'
import { medlemskapMapping } from './medlemskap/mapping'
import { fellesMapping } from './felles/mapping'
import { ftaMapping } from './friskmeldt-til-arbeidsformidling/mapping'

export interface ReadmoreTittelOgKomponent {
    tittel: string
    komponent: React.ReactNode
}

export const EkspanderbarHjelp = ({ sporsmal, mb }: { sporsmal: Sporsmal; mb?: string }) => {
    const { valgtSoknad } = useSoknadMedDetaljer()

    const [expanded, setExpanded] = useState<boolean>(false)

    // Lukker mellom hvert spørsmål
    useEffect(() => {
        setExpanded(false)
    }, [sporsmal.tag])

    if (!valgtSoknad) return null

    if (sporsmal.tag == 'ANDRE_INNTEKTSKILDER' && valgtSoknad.arbeidssituasjon == RSArbeidssituasjon.FRILANSER) {
        // Hjelpeteksten er ikke kompatibel med svaralternativene for frilanser
        return null
    }

    const sporsmalTagMedSoknadstypeEllerArbeidssituasjon = (): string => {
        if (sporsmal.tag == 'TILBAKE_I_ARBEID' && valgtSoknad.soknadstype == RSSoknadstype.GRADERT_REISETILSKUDD) {
            return 'TILBAKE_I_ARBEID_GRADERT_REISETILSKUDD'
        }
        if (sporsmal.tag == 'JOBBET_DU_GRADERT' || sporsmal.tag == 'ARBEID_UNDERVEIS_100_PROSENT') {
            return sporsmal.tag + '_' + valgtSoknad.arbeidssituasjon
        }
        return sporsmal.tag
    }

    const sporsmalTag = sporsmalTagMedSoknadstypeEllerArbeidssituasjon()

    const sporsmalTagTilReadmoreMapping: Record<string, ReadmoreTittelOgKomponent> = {
        ...fellesMapping(),
        ...arbeidstakerMapping(),
        ...naringsdrivendeMapping(sporsmal),
        ...medlemskapMapping(),
        ...ftaMapping(),
    }

    const readmore = sporsmalTagTilReadmoreMapping[sporsmalTag as SporsmalTagMedHjelpetekst]

    if (!readmore) {
        return null
    }

    function lagTittel(): string {
        if (
            sporsmal.tag === 'INNTEKTSOPPLYSNINGER_VARIG_ENDRING_25_PROSENT' &&
            erSigrunInntekt(sporsmal.metadata?.sigrunInntekt)
        ) {
            const { beregnet } = sporsmal.metadata?.sigrunInntekt as SigrunInntekt
            return `Hvordan har vi kommet frem til ${formatterTall(beregnet.snitt)} kroner?`
        }
        return readmore.tittel
    }

    return (
        <ReadMore
            className={`${mb ?? 'mb-8'} mt-4 w-full`}
            header={lagTittel()}
            open={expanded}
            onClick={() => {
                function vaskTittel(tittel: string): string {
                    if (tittel.includes('Hvordan har vi kommet frem til')) {
                        return 'Hvordan har vi kommet frem til [redacted] kroner?'
                    }
                    return tittel
                }

                logEvent(expanded ? 'readmore lukket' : 'readmore åpnet', {
                    tittel: vaskTittel(lagTittel()),
                    component: 'hjelpetekst',
                    spørsmål: sporsmalTag || '',
                })

                setExpanded((prev) => !prev)
            }}
        >
            <div className="mt-4">{readmore.komponent}</div>
        </ReadMore>
    )
}
