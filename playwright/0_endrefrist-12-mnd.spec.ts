import { test, expect } from '@playwright/test'
import { validerAxeUtilityWrapper } from './uuvalidering'

test.describe('Tester endrefrist 12 måneder', () => {
    test('Viser popup med info om at endrefristen er ute', async ({ page }) => {
        await page.goto(
            '/syk/sykepengesoknad/sendt/46cd957d-0d62-4091-81ec-7bac2bf6a628?testperson=korrigeringsfrist-utlopt',
        )

        await page.getByRole('button', { name: 'Jeg vil endre svarene i søknaden' }).click()

        await expect(
            page
                .getByRole('dialog', { name: 'Jeg vil endre svarene i søknaden' })
                .getByText(
                    'Fristen for å endre svarene i denne digitale søknaden er gått ut. Hvis du trenger å endre svarene dine kan du forklare hva du ønsker å endre ved å skrive til oss.',
                ),
        ).toBeVisible()

        await validerAxeUtilityWrapper(page, test.info())

        await page.getByRole('link', { name: 'skrive til oss' }).click()

        await validerAxeUtilityWrapper(page, test.info())

        await page.getByRole('button', { name: 'Lukk' }).click()

        await expect(page.getByRole('button', { name: 'Lukk' })).toBeHidden()
    })
})
