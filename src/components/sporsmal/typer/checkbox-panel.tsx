import { ConfirmationPanel, Label } from '@navikt/ds-react'
import React from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { TagTyper } from '../../../types/enums'
import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import { hentFeilmelding } from '../sporsmal-utils'

const CheckboxInput = ({ sporsmal }: SpmProps) => {
    const spm = sporsmal.tag === TagTyper.BEKREFT_OPPLYSNINGER_UTLAND_INFO ? sporsmal.undersporsmal[0] : sporsmal

    const { register } = useFormContext()

    const feilmelding = hentFeilmelding(spm)
    const watchCheckbox = useWatch({ name: spm.id })

    return (
        <>
            <ConfirmationPanel
                className={'bekreftCheckboksPanel'}
                label={spm.sporsmalstekst}
                id={spm.id}
                {...register(spm.id, {
                    required: feilmelding.global,
                })}
                checked={watchCheckbox}
            >
                <Vis
                    hvis={sporsmal.tag === TagTyper.ANSVARSERKLARING}
                    render={() => <Label as="span">{tekst('sporsmal.riktige-opplysninger-tittel')}</Label>}
                />
            </ConfirmationPanel>
        </>
    )
}

export default CheckboxInput
