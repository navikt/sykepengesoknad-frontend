import '@testing-library/jest-dom/vitest'
import { vi, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

vi.mock('next/router', () => ({
    useRouter: () => ({
        query: {},
        pathname: '/',
        push: vi.fn(),
        replace: vi.fn(),
        reload: vi.fn(),
        back: vi.fn(),
        prefetch: vi.fn(),
        beforePopState: vi.fn(),
        events: {
            on: vi.fn(),
            off: vi.fn(),
            emit: vi.fn(),
        },
        isFallback: false,
        isLocaleDomain: false,
        isReady: true,
        isPreview: false,
    }),
}))

afterEach(() => {
    cleanup()
})
