import AlertStripe, { AlertStripeSuksess } from 'nav-frontend-alertstriper'
import { Undertittel } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype'
import { Soknad } from '../../types/types'
import { dayjsToDate, getDuration, sendtForMerEnn30DagerSiden } from '../../utils/dato-utils'
import { tekst } from '../../utils/tekster'
import Vis from '../vis'
import Inntil16dager from './innhold/arbeidstaker/inntil16dager'
import Over16dager from './innhold/arbeidstaker/over16dager'
import PerioderMedOpphold from './innhold/arbeidstaker/perioder-med-opphold'
import PerioderUtenOpphold from './innhold/arbeidstaker/perioder-uten-opphold'
import ArbeidstakerStatus from './status/arbeidstaker-status'

type ArbeidstakerKvitteringTekst = 'inntil16dager' | 'over16dager' | 'utenOpphold' | 'medOpphold' | undefined

const Arbeidstaker = () => {
    const { valgtSoknad, valgtSykmelding, soknader } = useAppStore()
    const [ kvitteringTekst, setKvitteringTekst ] = useState<ArbeidstakerKvitteringTekst>()


    useEffect(() => {
        settRiktigKvitteringTekst()
        // eslint-disable-next-line
    }, [valgtSoknad?.sendtTilNAVDato])

    if (!valgtSoknad) return null

    // 1. Søknaden er innenfor arbeidsgiverperiode
    // 2. Søknaden er utenfor arbeidsgiverperiode og det er mer enn 16 dager siden sist søknad
    // 3. -||- og det er ikke opphold til tidligere søknad og forrige søknad var også utenfor arbeidsgiverperiode
    // 4. -||- og det er ikke opphold til tidligere søknad men forrige søknad var innenfor arbeidsgiverperiode, gir samme resultat som 2.
    // 5. -||- og det er 16 eller mindre, men ikke 0 dager opphold

    // Obs: denne dekker ikke tilfelle der det er 1 søknad uten opphold, men den søknaden er utenfor arbeidsgiverperioden, men ikke 16 dager lang.

    const settRiktigKvitteringTekst = () => {
        if (valgtSoknad.sendtTilArbeidsgiverDato !== null && valgtSoknad.sendtTilNAVDato === null) {
            setKvitteringTekst('inntil16dager')
        } else {
            const fom = valgtSoknad!.fom!.getDate()
            const sykFom = dayjsToDate(valgtSykmelding!.mulighetForArbeid.perioder[0].fom)?.getDate()
            const forsteSoknad = fom === sykFom

            if (forsteSoknad) {
                const tidligereSoknader = soknader
                    .filter((sok) => sok.soknadstype === RSSoknadstype.ARBEIDSTAKERE)                       // Gjelder arbeidstakersøknad
                    .filter((sok) => sok.arbeidsgiver?.orgnummer === valgtSoknad?.arbeidsgiver?.orgnummer)  // Samme arbeidstaker
                    .filter((senereSok) => senereSok.tom! < valgtSoknad!.fom!)                              // Gjelder søknader før valgt
                    .filter((tidligereSok) => tidligereSoknaderInnenfor16Dager(tidligereSok.tom!, valgtSoknad.fom!))
                if (tidligereSoknader.length > 0) {
                    if (tidligereSoknader.filter(sok => tidligereUtenOpphold(sok.tom!, valgtSoknad.fom!)).length > 0) {
                        if (tidligereUtenOppholdMenFørsteUtenforArbeidsgiverperiode(tidligereSoknader)) {
                            setKvitteringTekst('over16dager')
                        }
                        else {
                            setKvitteringTekst('utenOpphold')
                        }
                    }
                    else {
                        setKvitteringTekst('medOpphold')
                    }
                } else {
                    setKvitteringTekst('over16dager')
                }
            } else {
                setKvitteringTekst('utenOpphold')
            }
        }
    }

    const tidligereSoknaderInnenfor16Dager = (d1: Date, d2: Date): boolean => {
        return getDuration(d1, d2) <= 17    // (fom = 1) + 15 + (tom = 1)
    }

    const tidligereUtenOpphold = (d1: Date, d2: Date): boolean => {
        return getDuration(d1, d2) <= 2
    }

    const tidligereUtenOppholdMenFørsteUtenforArbeidsgiverperiode = (tidligereSoknader: Soknad[]) => {
        const tidligstFom = tidligereSoknader.sort((a, b) => a.fom!.getTime() - b.fom!.getTime()).reverse()[0].fom!
        const senesteTom = tidligereSoknader.sort((a, b) => a.fom!.getTime() - b.fom!.getTime())[0].tom!
        return getDuration(tidligstFom, senesteTom) <= 16        // (fom = 1) + 14 + (tom = 1)
    }

    const kvitteringInnhold = () => {
        switch (kvitteringTekst) {
            case 'inntil16dager':
                return <Inntil16dager />
            case 'over16dager':
                return <Over16dager />
            case 'utenOpphold':
                return <PerioderUtenOpphold />
            case 'medOpphold':
                return <PerioderMedOpphold />
            default:
                return null
        }
    }

    return (
        <>
            <AlertStripeSuksess>
                <Undertittel tag={'h2'}>
                    {tekst('kvittering.soknaden-er-sendt')}
                </Undertittel>
            </AlertStripeSuksess>
            <div className="sendt-info">
                <ArbeidstakerStatus />

                <Vis
                    hvis={!sendtForMerEnn30DagerSiden(valgtSoknad?.sendtTilArbeidsgiverDato, valgtSoknad?.sendtTilNAVDato)}>
                    <div className="hva-skjer">
                        <AlertStripe type="info" form="inline">
                            <Vis hvis={kvitteringTekst === 'medOpphold'}>
                                <Undertittel tag="h3">{tekst('kvittering.viktig-informasjon')}</Undertittel>
                            </Vis>
                            <Vis hvis={kvitteringTekst !== 'medOpphold'}>
                                <Undertittel tag="h3">{tekst('kvittering.hva-skjer-videre')}</Undertittel>
                            </Vis>
                        </AlertStripe>
                        <div className="avsnitt">
                            <div className="sendt-inner">
                                {kvitteringInnhold()}
                            </div>
                        </div>
                    </div>
                </Vis>
            </div>

        </>
    )
}

export default Arbeidstaker
