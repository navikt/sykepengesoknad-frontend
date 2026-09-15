import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { FormProvider, useForm } from 'react-hook-form'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

import { flereInntektskilderGhost } from '../../../data/mock/data/sporsmal/flere-inntektskilder-ghost'
import { skapSporsmal } from '../../../types/mapping'
import { Sporsmal } from '../../../types/types'
import UndersporsmalListe from '../undersporsmal/undersporsmal-liste'
import SporsmalSwitch from '../sporsmal-switch'

import CheckboxKomp from './checkbox-komp'

// JaNeiStor (brukt av hovedspørsmålet) og JaNeiLiten henter valgtSoknad via denne hooken.
// Vi mocker den slik at hele spørsmålstreet kan rendres uten en ekte QueryClientProvider/router-oppsett.
vi.mock('../../../hooks/useSoknadMedDetaljer', () => ({
    useSoknadMedDetaljer: () => ({
        valgtSoknad: {
            soknadstype: 'ARBEIDSTAKERE',
            status: 'NY',
            inntektskilderDataFraInntektskomponenten: undefined,
            kjentOppholdstillatelse: undefined,
        },
    }),
}))

function Wrapper({ children }: { children: React.ReactNode }) {
    const methods = useForm(skjemaOppsett)
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(() => {})}>
                {children}
                <button type="submit">Send</button>
            </form>
        </FormProvider>
    )
}

const hentJobbetMerISporsmal = (): Sporsmal => {
    const ghost = flereInntektskilderGhost()
    const jobbetMerI = ghost.undersporsmal.find((spm) => spm.tag === 'JOBBET_MER_I')!
    return skapSporsmal(jobbetMerI, null, false)
}

// Feilmeldingen som vises inline i skjemaet er den lokale varianten, mens den globale
// varianten brukes i feiloppsummeringen.
// Samme oppsett som det virkelige skjemaet i sporsmal-form.tsx, slik at testene
// treffer den faktiske valideringsoppførselen.
const skjemaOppsett = { mode: 'onSubmit', reValidateMode: 'onChange', shouldUnregister: true } as const

const feilmeldingJobbetMerI = 'Du må velge et alternativ'

describe('CheckboxKomp - JOBBET_MER_I', () => {
    it('viser feilmelding når ingen avkrysningsbokser er valgt ved innsending', async () => {
        render(<CheckboxKomp sporsmal={hentJobbetMerISporsmal()} />, { wrapper: Wrapper })

        await userEvent.click(screen.getByRole('button', { name: 'Send' }))

        expect(await screen.findByText(feilmeldingJobbetMerI)).toBeInTheDocument()
    })

    it('viser feilmelding når en avkrysningsboks først velges og deretter fjernes', async () => {
        render(<CheckboxKomp sporsmal={hentJobbetMerISporsmal()} />, { wrapper: Wrapper })

        await userEvent.click(screen.getByText('Ruter'))
        await userEvent.click(screen.getByText('Ruter'))
        await userEvent.click(screen.getByRole('button', { name: 'Send' }))

        expect(await screen.findByText(feilmeldingJobbetMerI)).toBeInTheDocument()
    })

    it('viser ikke feilmelding når minst en avkrysningsboks er valgt ved innsending', async () => {
        render(<CheckboxKomp sporsmal={hentJobbetMerISporsmal()} />, { wrapper: Wrapper })

        await userEvent.click(screen.getByText('Ruter'))
        await userEvent.click(screen.getByRole('button', { name: 'Send' }))

        expect(screen.queryByText(feilmeldingJobbetMerI)).not.toBeInTheDocument()
    })
})

// Reproduserer hele scenarioet fra FLERE_INNTEKTSKILDER_GHOST slik det faktisk vises i søknaden:
// et JA/NEI-hovedspørsmål med to underspørsmål - en checkbox-gruppe (JOBBET_MER_I) og et
// JA/NEI-underspørsmål (ANDRE_INNTEKTSKILDER_V2). Hovedspørsmålet er her allerede besvart med "JA",
// slik at begge underspørsmålene vises og skal valideres ved innsending.
function GhostWrapper({ children }: { children: React.ReactNode }) {
    const methods = useForm(skjemaOppsett)
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
    return (
        <QueryClientProvider client={queryClient}>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(() => {})}>
                    {children}
                    <button type="submit">Send</button>
                </form>
            </FormProvider>
        </QueryClientProvider>
    )
}

const hentGhostSporsmal = (): Sporsmal => skapSporsmal(flereInntektskilderGhost(), null, true)

const feilmeldingAndreInntektskilderLokal = 'Du må velge et alternativ'
const andreInntektskilderNavn = /Har du hatt annen inntekt eller oppdrag/

const checkboxGruppe = () => screen.getByRole('group', { name: /Hvilke jobbet du mer i/ })
const andreInntektskilderGruppe = () => screen.getByRole('radiogroup', { name: andreInntektskilderNavn })

describe('FLERE_INNTEKTSKILDER_GHOST - fullt scenario med underspørsmål', () => {
    it('viser feilmelding for både checkbox-gruppen og ja/nei-spørsmålet når ingen underspørsmål er besvart', async () => {
        const ghost = hentGhostSporsmal()

        render(<UndersporsmalListe oversporsmal={ghost} oversporsmalSvar="JA" />, { wrapper: GhostWrapper })

        await userEvent.click(screen.getByRole('button', { name: 'Send' }))

        // JOBBET_MER_I (checkbox-gruppe)
        expect(await within(checkboxGruppe()).findByText(feilmeldingJobbetMerI)).toBeInTheDocument()

        // ANDRE_INNTEKTSKILDER_V2 (ja/nei)
        expect(
            await within(andreInntektskilderGruppe()).findByText(feilmeldingAndreInntektskilderLokal),
        ).toBeInTheDocument()
    })

    it('viser ingen feilmeldinger når begge underspørsmål er besvart', async () => {
        const ghost = hentGhostSporsmal()

        render(<UndersporsmalListe oversporsmal={ghost} oversporsmalSvar="JA" />, { wrapper: GhostWrapper })

        await userEvent.click(screen.getByText('Ruter'))
        await userEvent.click(screen.getByRole('radio', { name: 'Nei' }))
        await userEvent.click(screen.getByRole('button', { name: 'Send' }))

        expect(within(checkboxGruppe()).queryByText(feilmeldingJobbetMerI)).not.toBeInTheDocument()
        expect(
            within(andreInntektskilderGruppe()).queryByText(feilmeldingAndreInntektskilderLokal),
        ).not.toBeInTheDocument()
    })
})

// Tester hele visningen av FLERE_INNTEKTSKILDER_GHOST slik den faktisk rendres i søknaden via
// SporsmalSwitch - fra hovedspørsmålet (ja/nei) til underspørsmålene vises og valideres, ikke
// bare underspørsmålene isolert.
function HovedSporsmalWrapper({ children }: { children: React.ReactNode }) {
    const methods = useForm(skjemaOppsett)
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(() => {})}>
                {children}
                <button type="submit">Send</button>
            </form>
        </FormProvider>
    )
}

const hovedSporsmalNavn = /Har du jobbet noe mer i disse enn du vanligvis gjør/

describe('FLERE_INNTEKTSKILDER_GHOST - hele spørsmålsvisningen', () => {
    it('viser underspørsmål med feilmeldinger når hovedspørsmålet besvares med Ja og skjemaet sendes uten svar', async () => {
        const ghost = hentGhostSporsmal()

        render(<SporsmalSwitch sporsmal={ghost} sporsmalIndex={0} erSisteSporsmal={false} erHovedsporsmal={true} />, {
            wrapper: HovedSporsmalWrapper,
        })

        // Underspørsmålene skal ikke vises før hovedspørsmålet er besvart
        expect(screen.queryByText('Hvilke jobbet du mer i?')).not.toBeInTheDocument()

        const hovedSporsmal = screen.getByRole('radiogroup', { name: hovedSporsmalNavn })
        await userEvent.click(within(hovedSporsmal).getByRole('radio', { name: 'Ja' }))

        expect(await screen.findByText('Hvilke jobbet du mer i?')).toBeInTheDocument()
        expect(screen.getByText('Har du hatt annen inntekt eller oppdrag?')).toBeInTheDocument()

        await userEvent.click(screen.getByRole('button', { name: 'Send' }))

        expect(await within(checkboxGruppe()).findByText(feilmeldingJobbetMerI)).toBeInTheDocument()
        expect(
            await within(andreInntektskilderGruppe()).findByText(feilmeldingAndreInntektskilderLokal),
        ).toBeInTheDocument()

        // Hovedspørsmålet er besvart og skal derfor ikke ha egen feilmelding
        expect(within(hovedSporsmal).queryByText(/Du må/)).not.toBeInTheDocument()
    })

    it('viser ingen feilmeldinger når hovedspørsmål og begge underspørsmål er besvart', async () => {
        const ghost = hentGhostSporsmal()

        render(<SporsmalSwitch sporsmal={ghost} sporsmalIndex={0} erSisteSporsmal={false} erHovedsporsmal={true} />, {
            wrapper: HovedSporsmalWrapper,
        })

        const hovedSporsmal = screen.getByRole('radiogroup', { name: hovedSporsmalNavn })
        await userEvent.click(within(hovedSporsmal).getByRole('radio', { name: 'Ja' }))
        await screen.findByText('Hvilke jobbet du mer i?')

        await userEvent.click(screen.getByText('Ruter'))

        const andreInntektskilder = screen.getByRole('radiogroup', { name: andreInntektskilderNavn })
        await userEvent.click(within(andreInntektskilder).getByRole('radio', { name: 'Nei' }))

        await userEvent.click(screen.getByRole('button', { name: 'Send' }))

        expect(within(checkboxGruppe()).queryByText(feilmeldingJobbetMerI)).not.toBeInTheDocument()
        expect(
            within(andreInntektskilderGruppe()).queryByText(feilmeldingAndreInntektskilderLokal),
        ).not.toBeInTheDocument()
    })
})
