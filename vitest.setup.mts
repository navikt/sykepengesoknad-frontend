import '@testing-library/jest-dom'
import { vi, expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

vi.mock('next/config', () => ({
    default: () => ({
        publicRuntimeConfig: {
            umamiEnabled: 'false',
        },
    }),
}))

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
