import { IToggle } from '@unleash/nextjs'

import { isProd } from '../utils/environment'

import { EXPECTED_TOGGLES } from './toggles'

export function localDevelopmentToggles(): IToggle[] {
    return EXPECTED_TOGGLES.map(
        (it): IToggle => ({
            name: it,
            enabled: true,
            impressionData: false,
            variant: {
                name: 'disabled',
                enabled: false,
            },
        }),
    )
}

export function getUnleashEnvironment(): 'development' | 'production' {
    if (isProd()) {
        return 'production'
    }
    return 'development'
}
