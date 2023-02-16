import React, { forwardRef, Ref, SVGProps } from 'react'
import { useController, useFormContext } from 'react-hook-form'
import { BodyLong, UNSAFE_DatePicker, UNSAFE_useDatepicker } from '@navikt/ds-react'
import dayjs from 'dayjs'

import FeilLokal from '../../feil/feil-lokal'
import { SpmProps } from '../sporsmal-form/sporsmal-form'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import validerDato from '../../../utils/sporsmal/valider-dato'
import { TagTyper } from '../../../types/enums'
import { tilLesbarPeriodeMedArstall } from '../../../utils/dato-utils'

const DatoInput = ({ sporsmal }: SpmProps) => {
    const {
        formState: { errors },
    } = useFormContext()

    const { field } = useController({
        name: sporsmal.id,
        rules: {
            validate: (value) => {
                return validerDato(sporsmal, value)
            },
        },
    })

    const { datepickerProps, inputProps } = UNSAFE_useDatepicker({
        ...field,
        onDateChange: field.onChange,
        defaultSelected: field.value,
        defaultMonth: dayjs(sporsmal.max).toDate(),
        openOnFocus: false,
    })

    return (
        <div className="dato-komp" data-cy="dato-komp">
            <div className="axe-exclude">
                <UNSAFE_DatePicker
                    {...datepickerProps}
                    dropdownCaption={true}
                    locale="nb"
                    {...(sporsmal.min && { fromDate: dayjs(sporsmal.min).toDate() })}
                    {...(sporsmal.max && { toDate: dayjs(sporsmal.max).toDate() })}
                    data-cy-sporsmalid={sporsmal.id}
                >
                    <UNSAFE_DatePicker.Input
                        {...inputProps}
                        id={sporsmal.id}
                        label={sporsmal.sporsmalstekst}
                        error={errors[field.name] !== undefined}
                        data-cy={sporsmal.id}
                    />
                </UNSAFE_DatePicker>
            </div>
            {sporsmal.tag == TagTyper.TILBAKE_NAR && field.value && (
                <CustomAlert>
                    Svaret ditt betyr at du har vært i fullt arbeid fra{` `}
                    {tilLesbarPeriodeMedArstall(field.value, sporsmal.max)}. Du får ikke utbetalt sykepenger for denne
                    perioden
                    <span style={{ color: '#595959', display: 'block', marginTop: '1em' }}>
                        (Hvis du bare var delvis tilbake i jobb svarer du nei på dette spørsmålet og oppgir antall timer
                        senere i søknaden.)
                    </span>
                </CustomAlert>
            )}

            <FeilLokal sporsmal={sporsmal} />

            <div aria-live="assertive" className="undersporsmal">
                <UndersporsmalListe oversporsmal={sporsmal} />
            </div>
        </div>
    )
}

export default DatoInput

// eslint-disable-next-line react/display-name
const CustomAlert = ({ children }: { children: React.ReactNode }) => (
    <div
        style={{
            backgroundColor: '#F1F1F1',
            border: 'none',
            marginBottom: '1em',
            marginTop: '1em',
            display: 'flex',
            padding: '1rem',
            gap: '0.75rem',
        }}
    >
        <SvgInformationColored style={{ flexShrink: 0, height: '30px', width: '30px' }} />
        <BodyLong as="div" className="navds-alert__wrapper">
            {children}
        </BodyLong>
    </div>
)

interface SVGRProps {
    title?: string
    titleId?: string
}

// eslint-disable-next-line react/display-name
const SvgInformationColored = forwardRef(
    ({ ...props }: SVGProps<SVGSVGElement> & SVGRProps, ref: Ref<SVGSVGElement>) => {
        return (
            <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                focusable={false}
                role="img"
                ref={ref}
                {...props}
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 12C0 5.382 5.382 0 12 0c6.617 0 12 5.382 12 12s-5.383 12-12 12C5.382 24 0 18.618 0 12Zm12-7a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM9 19v-2h2v-5H9v-2h4v7h2v2H9Z"
                    fill="#595959"
                />
            </svg>
        )
    },
)
