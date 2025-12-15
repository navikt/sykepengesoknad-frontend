import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FormProvider, useForm } from 'react-hook-form'

import { RSSoknadstypeType } from '../../../types/rs-types/rs-soknadstype'

import { OppholdUtenforEUEOS } from './opphold-utenfor-eu-eos'

const selvstendigType: RSSoknadstypeType = 'SELVSTENDIGE_OG_FRILANSERE'
const arbeidstakerType: RSSoknadstypeType = 'ARBEIDSTAKERE'

function Wrapper({ children }: { children: React.ReactNode }) {
    const methods = useForm()
    return <FormProvider {...methods}>{children}</FormProvider>
}

describe('OppholdUtenforEUEOS', () => {
    it('viser ReadMore for selvstendig næringsdrivende', () => {
        render(<OppholdUtenforEUEOS soknadstype={selvstendigType} />, { wrapper: Wrapper })
        expect(
            screen.getByText(/Var reisen en behandlingsreise i regi av Oslo Universitetssykehus/),
        ).toBeInTheDocument()
        expect(screen.queryByText(/Var reisen i forbindelse med ferie/)).not.toBeInTheDocument()
    })

    it('viser Accordion for arbeidstaker', () => {
        render(<OppholdUtenforEUEOS soknadstype={arbeidstakerType} />, { wrapper: Wrapper })
        expect(screen.getByText(/Var reisen i forbindelse med ferie/)).toBeInTheDocument()
        expect(
            screen.getByText(/Var reisen en behandlingsreise i regi av Oslo Universitetssykehus/),
        ).toBeInTheDocument()
    })
})
