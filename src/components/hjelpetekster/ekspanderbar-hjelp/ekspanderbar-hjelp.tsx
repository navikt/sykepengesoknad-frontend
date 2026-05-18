import { ReadMore } from '@navikt/ds-react'
import React, { useEffect, useState } from 'react'

import { RSArbeidssituasjon } from '../../../types/rs-types/rs-arbeidssituasjon'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'
import { logEvent } from '../../umami/umami'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'
import { Sporsmal } from '../../../types/types'

import { SporsmalTagMedHjelpetekst } from './types'
import { arbeidstakerMapping } from './arbeidstaker/mapping'
import { naringsdrivendeMapping } from './naeringsdrivende/mapping'
import { medlemskapMapping } from './medlemskap/mapping'
import { fellesMapping } from './felles/mapping'
import { ftaMapping } from './friskmeldt-til-arbeidsformidling/mapping'
import { reisetilskuddMapping } from './reisetilskudd/mapping'

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
        if (sporsmal.tag.startsWith('JOBBET_DU_GRADERT') || sporsmal.tag.startsWith('ARBEID_UNDERVEIS_100_PROSENT')) {
            return sporsmal.tag.replace(/_\d+$/, '') + '_' + valgtSoknad.arbeidssituasjon
        }
        return sporsmal.tag
    }

    const sporsmalTag = sporsmalTagMedSoknadstypeEllerArbeidssituasjon()

    const sporsmalTagTilReadmoreMapping: Record<string, ReadmoreTittelOgKomponent> = {
        ...fellesMapping(),
        ...arbeidstakerMapping(),
        ...naringsdrivendeMapping(),
        ...medlemskapMapping(),
        ...ftaMapping(),
        ...reisetilskuddMapping(),
    }

    const readmore = sporsmalTagTilReadmoreMapping[sporsmalTag as SporsmalTagMedHjelpetekst]

    if (!readmore) {
        return null
    }

    return (
        <ReadMore
            className={`${mb ?? 'mb-8'} mt-4 w-full`}
            header={readmore.tittel}
            open={expanded}
            onClick={() => {
                function vaskTittel(tittel: string): string {
                    if (tittel.includes('Hvordan har vi kommet frem til')) {
                        return 'Hvordan har vi kommet frem til [redacted] kroner?'
                    }
                    return tittel
                }

                logEvent(expanded ? 'readmore lukket' : 'readmore åpnet', {
                    tittel: vaskTittel(readmore.tittel),
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
