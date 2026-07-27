import { defineConfig } from 'eslint/config'
import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
    baseDirectory: import.meta.dirname,
})

export default defineConfig([
    { ignores: ['src/registerServiceWorker.js'] },
    ...compat.config({
        extends: ['@navikt/eslint-config-teamsykmelding', 'next/core-web-vitals'],
        rules: {
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@next/next/no-img-element': 'off',
        },
    }),
    ...compat.config({
        overrides: [
            {
                files: ['playwright/**/*.{js,ts}'],
                extends: ['plugin:playwright/recommended'],
                rules: {
                    'testing-library/prefer-screen-queries': 'off',
                    'playwright/require-top-level-describe': 'error',
                    'playwright/expect-expect': 'off',
                },
            },
        ],
    }),
])
