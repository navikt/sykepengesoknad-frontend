import { defineConfig } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettierRecommended from 'eslint-plugin-prettier/recommended'

export default defineConfig([
    ...nextVitals,
    ...nextTs,
    {
        rules: {
            '@next/next/no-img-element': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            'react-hooks/exhaustive-deps': ['warn', { additionalHooks: '(useUpdateBreadcrumbs)' }],
            'react-hooks/set-state-in-effect': 'off',
        },
    },
    {
        extends: [prettierRecommended],
        rules: {
            'prettier/prettier': 'warn',
        },
    },
])
