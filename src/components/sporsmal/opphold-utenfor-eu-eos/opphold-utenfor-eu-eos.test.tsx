import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { FormProvider, useForm } from 'react-hook-form'
import { OppholdUtenforEUEOS } from './opphold-utenfor-eu-eos'

function Wrapper({ children }: { children: React.ReactNode }) {
    const methods = useForm()
    return <FormProvider {...methods}>{children}</FormProvider>
}

describe('OppholdUtenforEUEOS', () => {
    it('viser ReadMore for selvstendig næringsdrivende', () => {
        render(<OppholdUtenforEUEOS erSelvstendig={true} />, { wrapper: Wrapper })
        expect(
            screen.getByText(/Var reisen en behandlingsreise i regi av Oslo Universitetssykehus/),
        ).toBeInTheDocument()
        expect(screen.queryByText(/Var reisen i forbindelse med ferie/)).not.toBeInTheDocument()
    })

    it('viser Accordion for arbeidstaker', () => {
        render(<OppholdUtenforEUEOS erSelvstendig={false} />, { wrapper: Wrapper })
        expect(screen.getByText(/Var reisen i forbindelse med ferie/)).toBeInTheDocument()
        expect(
            screen.getByText(/Var reisen en behandlingsreise i regi av Oslo Universitetssykehus/),
        ).toBeInTheDocument()
    })
})
