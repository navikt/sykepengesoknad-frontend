import { BodyShort, Checkbox, CheckboxGroup, Heading, HelpText } from '@navikt/ds-react'
import React, { Fragment } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import Vis from '../../vis'
import { TagTyper } from '../../../types/enums'
import { Sporsmal } from '../../../types/types'

const CheckboxKomp = ({ sporsmal }: SpmProps) => {
    const {
        formState: { errors },
        watch,
        getValues,
    } = useFormContext()
    let watchCheckbox = watch(sporsmal.id)
    if (watchCheckbox === undefined) {
        watchCheckbox = getValues(sporsmal.id)
    }
    const feilmelding = hentFeilmelding(sporsmal)

    const HjelpeTekstTilSvaralternativ = (svaralternativ: Sporsmal) => {
        if (svaralternativ.tag === TagTyper.INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD) {
            return (
                <HelpText>
                    <Heading size="small">Ansatt eller mottar inntekt et annet sted</Heading>
                    <BodyShort>Du kan ha startet i ny jobb, eller.......</BodyShort>
                    <BodyShort>
                        Ikke alle inntektskilder vises i offentlige registre ved sykemeldingstidspunktet, derfor er det
                        viktig at du informerer om annen inntekt i denne perioden.
                    </BodyShort>
                </HelpText>
            )
        }

        if (svaralternativ.tag === TagTyper.INNTEKTSKILDE_SELVSTENDIG) {
            return (
                <HelpText>
                    <Heading size="small">Er jeg selvstendig næringsdrivende?</Heading>
                    <BodyShort>
                        En selvstendig næringsdrivende er en person som driver en virksomhet alene, uten å være ansatt
                        av noen annen. De har det fulle ansvaret for driften og er den eneste eieren av virksomheten.
                    </BodyShort>
                    <BodyShort>Stemmer dette for deg svarer du på spørsmålene under.</BodyShort>
                </HelpText>
            )
        }

        if (svaralternativ.tag === TagTyper.INNTEKTSKILDE_FRILANSER) {
            return (
                <HelpText>
                    <Heading size="small">Er jeg frilanser?</Heading>
                    <BodyShort>
                        Frilans er når en person jobber på selvstendig basis for forskjellige kunder uten å være fast
                        ansatt.
                    </BodyShort>
                    <BodyShort>Stemmer dette for deg svarer du på spørsmålene under.</BodyShort>
                </HelpText>
            )
        }

        return <></>
    }

    return (
        <Controller
            name={sporsmal.id}
            rules={{ required: feilmelding.global }}
            render={({ field }) => (
                <CheckboxGroup
                    {...field}
                    legend={sporsmal.sporsmalstekst}
                    error={errors[sporsmal.id] !== undefined && feilmelding.lokal}
                    className="mt-8"
                >
                    {sporsmal.undersporsmal.map((uspm) => (
                        <Fragment key={uspm.id + '_fragment'}>
                            <div className="flex items-center gap-4">
                                <Checkbox id={uspm.id} value={uspm.sporsmalstekst}>
                                    {uspm.sporsmalstekst}
                                </Checkbox>
                                {HjelpeTekstTilSvaralternativ(uspm)}
                            </div>
                            <Vis
                                hvis={watchCheckbox?.includes(uspm.sporsmalstekst)}
                                render={() => (
                                    <div
                                        aria-live="assertive"
                                        className="600 ml-3 border-l-2 border-grayalpha-300 pl-4"
                                    >
                                        <UndersporsmalListe oversporsmal={uspm} oversporsmalSvar="CHECKED" />
                                    </div>
                                )}
                            />
                        </Fragment>
                    ))}
                </CheckboxGroup>
            )}
        />
    )
}

export default CheckboxKomp
