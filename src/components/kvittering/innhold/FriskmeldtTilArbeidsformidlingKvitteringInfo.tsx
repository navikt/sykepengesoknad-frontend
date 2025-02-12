import { BodyLong, Heading } from '@navikt/ds-react'
import React from 'react'

import GridItems from '../grid-items'
import { harSvart, hentSvar } from '../../../utils/soknad-utils'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'
import { tilLesbarDatoMedArstall } from '../../../utils/dato-utils'
import { KvtteringPanel } from '../kvittering-panel'
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype'

export function FriskmeldtTilArbeidsformidlingKvitteringInfo() {
    const { valgtSoknad, soknader } = useSoknadMedDetaljer()
    if (!valgtSoknad || !soknader) {
        return null
    }
    if (valgtSoknad.soknadstype !== RSSoknadstype.FRISKMELDT_TIL_ARBEIDSFORMIDLING) {
        return null
    }

    const finnSisteSoknad = () => {
        const sisteSoknad = soknader
            .filter((s) => s.friskTilArbeidVedtakId === valgtSoknad.friskTilArbeidVedtakId && s.id !== valgtSoknad.id)
            .sort((a, b) => (a.fom! < b.fom! ? 1 : -1))
        if (sisteSoknad.length > 0) {
            return sisteSoknad[0]
        }

        return valgtSoknad
    }

    const sisteSoeknad = finnSisteSoknad()
    const nyJobb = harSvart(valgtSoknad, 'FTA_JOBBSITUASJONEN_DIN_JA', 'CHECKED')
    if (nyJobb) {
        const fortsattArbeidssoker = harSvart(
            valgtSoknad,
            'FTA_JOBBSITUASJONEN_DIN_FORTSATT_ARBEIDSSOKER_NY_JOBB',
            'JA',
        )
        if (fortsattArbeidssoker) {
            return <DuErFortsattRegistrertFremTil dato={sisteSoeknad.tom!} />
        }
        const ikkeArbeidssoker = harSvart(valgtSoknad, 'FTA_JOBBSITUASJONEN_DIN_FORTSATT_ARBEIDSSOKER_NY_JOBB', 'NEI')
        if (ikkeArbeidssoker) {
            const nyJobbDato = hentSvar(valgtSoknad, 'FTA_JOBBSITUASJONEN_DIN_NAR')
            if (nyJobbDato) {
                return <DuErAvmeldt dato={nyJobbDato} />
            }
        }
    }

    const ikkeNyJobb = harSvart(valgtSoknad, 'FTA_JOBBSITUASJONEN_DIN_NEI', 'CHECKED')
    if (ikkeNyJobb) {
        const fortsattArbeidssoker = harSvart(valgtSoknad, 'FTA_JOBBSITUASJONEN_DIN_FORTSATT_ARBEIDSSOKER', 'JA')
        if (fortsattArbeidssoker) {
            return <DuErFortsattRegistrertFremTil dato={sisteSoeknad.tom!} />
        }
        const ikkeArbeidssoker = harSvart(valgtSoknad, 'FTA_JOBBSITUASJONEN_DIN_FORTSATT_ARBEIDSSOKER', 'NEI')
        if (ikkeArbeidssoker) {
            const nyJobbDato = hentSvar(valgtSoknad, 'FTA_JOBBSITUASJONEN_DIN_FORTSATT_ARBEIDSSOKER_AVREGISTRERT_NAR')
            if (nyJobbDato) {
                return <DuErAvmeldt dato={nyJobbDato} />
            }
        }
    }
    return <DuErAvmeldt dato={valgtSoknad.tom!} />
}

function DuErAvmeldt({ dato }: { dato: Date | string }) {
    const datoFormattert = tilLesbarDatoMedArstall(dato)
    return (
        <KvtteringPanel className="mt-8 py-4 bg-bg-subtle rounded border-0">
            <GridItems>
                <Heading size="xsmall" level="3" className="mb-4">
                    {`Du vil ikke lenger være friskmeldt til arbeidsformidling fra og med ${datoFormattert}. `}
                </Heading>
                <BodyLong>
                    Da stanser vi sykepengene dine fra og med denne datoen, og fjerner deg fra arbeidssøkerregisteret
                    vårt.
                </BodyLong>
            </GridItems>
        </KvtteringPanel>
    )
}

function DuErFortsattRegistrertFremTil({ dato }: { dato: Date }) {
    const datoFormattert = tilLesbarDatoMedArstall(dato)
    return (
        <KvtteringPanel className="mt-8 py-4 bg-blue-50 rounded border-0">
            <GridItems>
                <BodyLong>{`Du er friskmeldt til arbeidsformidling frem til ${datoFormattert}.`}</BodyLong>
            </GridItems>
        </KvtteringPanel>
    )
}
