import { ConfirmationPanel, Label } from '@navikt/ds-react'
import React from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { TagTyper } from '../../../types/enums'
import { tekst } from '../../../utils/tekster'
import FeilLokal from '../../feil/feil-lokal'
import Vis from '../../vis'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'

const CheckboxInput = ({ sporsmal }: SpmProps) => {
    const { register } = useFormContext()
    const feilmelding = hentFeilmelding(sporsmal)
    const watchCheckbox = useWatch({ name: sporsmal.id })
    const watchCheckboxUtland = useWatch({
        name: sporsmal.undersporsmal[0]?.id,
    })

    const bekreftUtland =
        sporsmal.tag === TagTyper.BEKREFT_OPPLYSNINGER_UTLAND_INFO
    const id = bekreftUtland ? sporsmal.undersporsmal[0].id : sporsmal.id
    const sporsmalsTekst = bekreftUtland
        ? sporsmal.undersporsmal[0].sporsmalstekst
        : sporsmal.sporsmalstekst

    return (
        <>
            <ConfirmationPanel
                className={'bekreftCheckboksPanel'}
                label={sporsmalsTekst}
                id={id}
                {...register(id, {
                    required: feilmelding.global,
                })}
                checked={bekreftUtland ? watchCheckboxUtland : watchCheckbox}
            >
                <Vis
                    hvis={sporsmal.tag === TagTyper.ANSVARSERKLARING}
                    render={() => (
                        <Label>
                            {tekst('sporsmal.riktige-opplysninger-tittel')}
                        </Label>
                    )}
                />
            </ConfirmationPanel>

            <FeilLokal sporsmal={sporsmal} />
        </>
    )
}

export default CheckboxInput
