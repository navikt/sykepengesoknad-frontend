import { BodyLong } from '@navikt/ds-react'
import React from 'react'

import { harSvart, hentSvar } from '../../../utils/soknad-utils'
import { useSoknadMedDetaljer } from '../../../hooks/useSoknadMedDetaljer'
import { tilLesbarDatoMedArstall } from '../../../utils/dato-utils'
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
        const fortsattArbeidssoker = harSvart(valgtSoknad, 'FTA_JOBBSITUASJONEN_DIN_FORTSATT_FRISKMELDT_NY_JOBB', 'JA')
        if (fortsattArbeidssoker) {
            return <DuErFortsattRegistrertFremTil dato={sisteSoeknad.tom!} />
        }
        const ikkeArbeidssoker = harSvart(valgtSoknad, 'FTA_JOBBSITUASJONEN_DIN_FORTSATT_FRISKMELDT_NY_JOBB', 'NEI')
        if (ikkeArbeidssoker) {
            const nyJobbDato = hentSvar(valgtSoknad, 'FTA_JOBBSITUASJONEN_DIN_NAR')
            if (nyJobbDato) {
                return <DuErAvmeldt dato={nyJobbDato} />
            }
        }
    }

    const ikkeNyJobb = harSvart(valgtSoknad, 'FTA_JOBBSITUASJONEN_DIN_NEI', 'CHECKED')
    if (ikkeNyJobb) {
        const fortsattArbeidssoker = harSvart(valgtSoknad, 'FTA_JOBBSITUASJONEN_DIN_FORTSATT_FRISKMELDT', 'JA')
        if (fortsattArbeidssoker) {
            return <DuErFortsattRegistrertFremTil dato={sisteSoeknad.tom!} />
        }
        const ikkeArbeidssoker = harSvart(valgtSoknad, 'FTA_JOBBSITUASJONEN_DIN_FORTSATT_FRISKMELDT', 'NEI')
        if (ikkeArbeidssoker) {
            const nyJobbDato = hentSvar(valgtSoknad, 'FTA_JOBBSITUASJONEN_DIN_FORTSATT_FRISKMELDT_AVREGISTRERT_NAR')
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
        <MedAvsluttendeHr>
            <BodyLong spacing>Du har nå sendt inn den siste søknaden for friskmeldt til arbeidsformidling.</BodyLong>
            <BodyLong>{`Fra og med ${datoFormattert} stanser vi sykepengene dine.`}</BodyLong>
        </MedAvsluttendeHr>
    )
}

function DuErFortsattRegistrertFremTil({ dato }: { dato: Date }) {
    const datoFormattert = tilLesbarDatoMedArstall(dato)
    return (
        <MedAvsluttendeHr>
            <BodyLong>{`Du er friskmeldt til arbeidsformidling frem til ${datoFormattert}.`}</BodyLong>
        </MedAvsluttendeHr>
    )
}

function MedAvsluttendeHr({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <hr className="my-10 border-gray-500" />
        </>
    )
}
