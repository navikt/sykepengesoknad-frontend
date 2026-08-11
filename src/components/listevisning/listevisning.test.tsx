import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

const mockUseRouter = vi.fn()

vi.mock('next/router', () => ({
    useRouter: () => mockUseRouter(),
}))

vi.mock('../../hooks/useSoknader', () => ({
    default: () => ({
        data: [],
        isPending: false,
    }),
}))

vi.mock('../../hooks/useBreadcrumbs', () => ({
    useUpdateBreadcrumbs: vi.fn(),
}))

vi.mock('../queryStatusPanel/QueryStatusPanel', () => ({
    default: () => null,
}))

import Listevisning from './listevisning'

describe('Listevisning', () => {
    it('viser alert med navnet på personaen som brukes', () => {
        mockUseRouter.mockReturnValue({
            query: { testperson: 'arbeidstaker' },
        })

        render(<Listevisning />)

        expect(screen.getByText('Viser demodata for persona Arbeidstaker')).toBeInTheDocument()
    })
})
