import { BodyShort, Checkbox, CheckboxGroup } from '@navikt/ds-react'
import React, { Fragment } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { InformationIcon } from '@navikt/aksel-icons'

import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import Vis from '../../vis'
import { Sporsmal } from '../../../types/types'
import { TagTyper } from '../../../types/enums'

const ForklaringAvValgtCheckbox = (svaralternativ: Sporsmal) => {
    if (svaralternativ.tag === TagTyper.INNTEKTSKILDE_SELVSTENDIG) {
        return (
            <BodyShort>
                Dette betyr at du er selvstendig næringsdrivende. Du driver en bedrift for egen regning og risiko,
                leverer skattemelding for næringsdrivende, fakturerer kunder og (ofte) lever av overskuddet. Du er din
                egen sjef og ikke ansatt av andre i et arbeidsforhold.
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
                <>
                    <div className="mt-4 flex max-w-sm gap-4 rounded-lg py-6">
                        <InformationIcon
                            title="informasjon"
                            className="flex-shrink-0 rounded-full bg-gray-200 p-2 text-sm font-bold"
                            height={37}
                            width={37}
                        />
                        <BodyShort size="small">
                            Informasjon om andre arbeidsforhold blir behandlet konfidensielt, og blir ikke delt med
                            arbeidsgiver
                        </BodyShort>
                    </div>

                    <CheckboxGroup
                        {...field}
                        legend={sporsmal.sporsmalstekst}
                        description={sporsmal.undertekst}
                        error={errors[sporsmal.id] !== undefined && feilmelding.lokal}
                        className="mt-4"
                    >
                        {sporsmal.undersporsmal.map((uspm) => (
                            <Fragment key={uspm.id + '_fragment'}>
                                <div className="flex items-center gap-4">
                                    <Checkbox id={uspm.id} value={uspm.sporsmalstekst}>
                                        <BodyShort
                                            className={watchCheckbox?.includes(uspm.sporsmalstekst) ? 'font-bold' : ''}
                                        >
                                            {uspm.sporsmalstekst}
                                        </BodyShort>
                                    </Checkbox>
                                </div>
                                <Vis
                                    hvis={watchCheckbox?.includes(uspm.sporsmalstekst) && uspm.undersporsmal.length > 0}
                                    render={() => (
                                        <div aria-live="assertive" className="my-4">
                                            {ForklaringAvValgtCheckbox(uspm)}
                                            <UndersporsmalListe oversporsmal={uspm} oversporsmalSvar="CHECKED" />
                                        </div>
                                    )}
                                />
                            </Fragment>
                        ))}
                    </CheckboxGroup>
                </>
            )}
        />
    )
}

export default CheckboxKomp
