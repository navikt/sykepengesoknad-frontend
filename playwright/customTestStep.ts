import { Page, test, TestInfo } from '@playwright/test'
import {
	validerAxe,
	IgnoreRule,
} from './uuvalidering'

/**
 * Options for configuring the accessibility validation for a specific step.
 */
type UuValidationOptions = {
	disableRules?: string[]
	ignoreRules?: IgnoreRule[]
}

/**
 * A wrapper for `test.step` that automatically runs our custom `validerAxe`
 * accessibility scan after the step's actions are complete.
 *
 * @param title The title of the step for the Playwright report.
 * @param page The Playwright Page object.
 * @param browserName The name of the browser being used (e.g., 'chromium').
 * @param testInfo The Playwright TestInfo object for attaching reports.
 * @param stepFunction An async function containing the test actions for the step.
 * @param options Optional rules to disable or ignore for this specific step's validation.
 */
export async function testStepWithUu(
	title: string,
	page: Page,
	browserName: string,
	testInfo: TestInfo,
	stepFunction: () => Promise<void>,
	options: UuValidationOptions = {},
) {
	await test.step(title, async () => {
		// 1. Execute the primary actions of the test step
		await stepFunction()

		// 2. Automatically run our custom Axe validation afterwards
		await validerAxe(
			browserName,
			page,
			testInfo,
			options.disableRules,
			options.ignoreRules,
		)
	})
}
