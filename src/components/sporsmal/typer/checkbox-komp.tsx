import { BodyShort, Checkbox, CheckboxGroup, InlineMessage, ReadMore } from '@navikt/ds-react'
import React, { Fragment } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import cn from 'classnames'

import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'

const undertekst = (tekst: string | null) => {
    return <BodyShort size="small">{tekst}</BodyShort>
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
                <div>
                    <CheckboxGroup
                        {...field}
                        legend={sporsmal.sporsmalstekst}
                        description={undertekst(sporsmal.undertekst)}
                        error={errors[sporsmal.id] !== undefined && feilmelding.lokal}
                    >
                        <div className="mt-4">
                            {sporsmal.undersporsmal.map((uspm) => {
                                const erChecked = watchCheckbox?.includes(uspm.sporsmalstekst)
                                return (
                                    <Fragment key={uspm.id + '_fragment'}>
                                        <div className={cn('flex items-center gap-4')}>
                                            <Checkbox
                                                id={uspm.id}
                                                value={uspm.sporsmalstekst}
                                                description={uspm.undertekst ?? ''}
                                            >
                                                <BodyShort className={erChecked ? 'font-ax-bold' : ''}>
                                                    {uspm.sporsmalstekst}
                                                </BodyShort>
                                            </Checkbox>
                                        </div>
                                        {erChecked && (
                                            <div>
                                                {uspm.undersporsmal.length > 0 && (
                                                    <div aria-live="assertive" className="my-4">
                                                        <UndersporsmalListe
                                                            oversporsmal={uspm}
                                                            oversporsmalSvar="CHECKED"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </Fragment>
                                )
                            })}
                        </div>
                    </CheckboxGroup>
                    {sporsmal.tag === 'HVILKE_ANDRE_INNTEKTSKILDER' && (
                        <>
                            <ReadMore header={'Finner du ikke riktig alternativ?'}>
                                <BodyShort className={'my-4'}>
                                    Da kan det være at det ikke er pensjonsgivende inntekt. Pensjonsgivende inntekt er
                                    som regel lønn eller betaling for arbeid du har utført, og som det betales skatt av.
                                    Det er bare slik inntekt som kan gi rett til sykepenger.
                                </BodyShort>
                                <BodyShort className={'my-4'}>
                                    Svar heller “nei” på spørsmål om du har inntekt fra annet arbeid.
                                </BodyShort>
                            </ReadMore>

                            <InlineMessage status={'info'} className="mt-6">
                                Informasjon om andre inntektskilder vises kun til Nav, og blir ikke delt med
                                arbeidsgiver
                            </InlineMessage>
                        </>
                    )}
                </div>
            )}
        />
    )
}

export default CheckboxKomp
