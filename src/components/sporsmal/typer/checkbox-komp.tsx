import { BodyShort, Checkbox, CheckboxGroup } from '@navikt/ds-react';
import React, { Fragment } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import Vis from '../../vis'
import { Sporsmal } from '../../../types/types';
import { TagTyper } from '../../../types/enums';

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
                            </div>
                            <Vis
                                hvis={watchCheckbox?.includes(uspm.sporsmalstekst)}
                                render={() => (
                                    <div
                                        aria-live="assertive"
                                        className="600 ml-3 border-l-2 border-grayalpha-300 pl-4"
                                    >
                                        {ForklaringAvValgtCheckbox(uspm)}
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
