import React, { Fragment } from 'react'
import { BodyShort, Label } from '@navikt/ds-react'

import { Sporsmal } from '../../../types/types'
import SporsmalSwitch from '../sporsmal-switch'
import { TagTyper } from '../../../types/enums'

import { UndersporsmalTekster } from './undersporsmal-tekster'

interface UndersporsmalListeProps {
    oversporsmal: Sporsmal
    oversporsmalSvar?: string
}

const UndersporsmalListe = ({ oversporsmal, oversporsmalSvar }: UndersporsmalListeProps) => {
    const skalVise =
        (!oversporsmal.kriterieForVisningAvUndersporsmal ||
            oversporsmal.kriterieForVisningAvUndersporsmal === oversporsmalSvar) &&
        oversporsmal.undersporsmal.length > 0

    const ForklaringAvValgtCheckbox = (svaralternativ: Sporsmal) => {
        // TODO: Tekstene er ikke helt ferdig og de vises bare dersom det finnes underspørsmål inni en checkbox
        if (svaralternativ.tag === TagTyper.INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD) {
            return (
                <BodyShort>
                    Du kan ha startet i ny jobb, eller....... Ikke alle inntektskilder vises i offentlige registre ved
                    sykemeldingstidspunktet, derfor er det viktig at du informerer om annen inntekt i denne perioden.
                </BodyShort>
            )
        }

        if (svaralternativ.tag === TagTyper.INNTEKTSKILDE_SELVSTENDIG) {
            return (
                <BodyShort>
                    Dette betyr at du er selvstendig næringsdrivende. Du driver en bedrift for egen regning og risiko;
                    leverer skattemelding for næringsdrivende, og fakturerer kunder og (ofte) lever av overskuddet. Du
                    er følgelig din egen sjef, og ikke ansatt av andre i et arbeidsforhold.
                </BodyShort>
            )
        }

        if (svaralternativ.tag === TagTyper.INNTEKTSKILDE_FRILANSER) {
            return (
                <BodyShort>
                    Du jobber frilans når du jobber på selvstendig basis for forskjellige kunder uten å være fast
                    ansatt.
                </BodyShort>
            )
        }

        if (svaralternativ.tag === TagTyper.INNTEKTSKILDE_STYREVERV) {
            return (
                <BodyShort>
                    Å inneha et styreverv betyr at du er valgt inn i et selskaps styre av generalforsamlingen, og sitter
                    vanligvis for to år av gangen.
                </BodyShort>
            )
        }

        if (svaralternativ.tag === TagTyper.INNTEKTSKILDE_FOSTERHJEM) {
            return (
                <BodyShort>
                    Å motta fosterhjemsgodtgjørelse betyr at du mottar penger for å ha omsorg for et barn som ikke kan
                    bo hos foreldrene sine.
                </BodyShort>
            )
        }

        if (svaralternativ.tag === TagTyper.INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA) {
            return (
                <BodyShort>
                    Dette betyr at du jobber som dagmamma og har regelmessig ansvar for andres barn mot betaling på
                    dagtid. En dagmamma har som regel ansvar for flere barn samtidig, enten hjemme hos seg selv eller
                    hjemme hos ett av barna.
                </BodyShort>
            )
        }

        return <Fragment />
    }

    if (!skalVise) return null

    return (
        <div className="mt-4">
            {oversporsmal.tag == TagTyper.UTENLANDSK_SYKMELDING_BOSTED && (
                <Label as="h2" className="mt-8">
                    {UndersporsmalTekster['undersporsmal.UTENLANDSK_SYKMELDING_BOSTED']}
                </Label>
            )}
            {oversporsmal.undersporsmal
                .map((underspm: Sporsmal, idx: number) => <SporsmalSwitch key={idx} sporsmal={underspm} />)
                .filter((underspm: any) => underspm !== null)}
        </div>
    )
}

export default UndersporsmalListe
