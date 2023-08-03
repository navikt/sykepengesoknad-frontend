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
        if (svaralternativ.tag === TagTyper.INNTEKTSKILDE_SELVSTENDIG) {
            return (
                <BodyShort>
                    Dette betyr at du er selvstendig næringsdrivende. Du driver en bedrift for egen regning og risiko,
                    leverer skattemelding for næringsdrivende, fakturerer kunder og (ofte) lever av overskuddet. Du er
                    din egen sjef og ikke ansatt av andre i et arbeidsforhold.
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
            {ForklaringAvValgtCheckbox(oversporsmal)}
            {oversporsmal.undersporsmal
                .map((underspm: Sporsmal, idx: number) => <SporsmalSwitch key={idx} sporsmal={underspm} />)
                .filter((underspm: any) => underspm !== null)}
        </div>
    )
}

export default UndersporsmalListe
