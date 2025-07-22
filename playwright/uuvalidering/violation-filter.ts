import { Result } from 'axe-core'

import { IgnoreRule } from './types'

export const DEFAULT_IGNORE_RULES: IgnoreRule[] = [
    { selector: '.navds-accordion', rules: ['color-contrast'] },
    { selector: '.navds-link', rules: ['color-contrast'] },
]

export function filterAxeViolations(violations: Result[], ignoreRules: IgnoreRule[]): Result[] {
    if (ignoreRules.length === 0) return violations

    return violations.filter((violation) => {
        const shouldIgnore = ignoreRules.some((ignoreRule) => {
            if (!ignoreRule.rules.includes(violation.id)) return false

            return violation.nodes.every((node) =>
                node.target.some((selectorPart) => selectorPart.includes(ignoreRule.selector)),
            )
        })
        return !shouldIgnore
    })
}

export function formatErrorMessage(violations: Result[]): string {
    return violations
        .map((violation) => {
            const nodeDetails = violation.nodes
                .slice(0, 3)
                .map((node) => {
                    const colorDetails = getColorContrastDetails(violation.id, node)
                    const rawDetails = formatNodeDetails(node)
                    return `   • ${node.target.join(' ')}${colorDetails}\n${rawDetails}`
                })
                .join('\n')

            const additionalNodes =
                violation.nodes.length > 3 ? `\n   • ... og ${violation.nodes.length - 3} flere` : ''

            return (
                `🚨 ${violation.id} (${violation.impact?.toUpperCase()})\n` +
                `📝 ${violation.description}\n` +
                `📍 Påvirker ${violation.nodes.length} element(s):\n` +
                nodeDetails +
                additionalNodes +
                `\n🔗 Hjelp: ${violation.helpUrl}\n`
            )
        })
        .join('\n' + '─'.repeat(80) + '\n')
}

function getColorContrastDetails(violationId: string, node: any): string {
    if (violationId !== 'color-contrast' || !node.any?.[0]?.data) return ''

    const data = node.any[0].data
    const fg = data.fg ?? data.fgColor ?? 'ukjent'
    const bg = data.bg ?? data.bgColor ?? 'ukjent'
    const ratio = data.contrastRatio ?? 'ukjent'

    return `      (fargekontrast: fg=${fg} bg=${bg} ratio=${ratio})`
}

function formatNodeDetails(node: any): string {
    let details = `      impact: ${node.impact ?? 'ukjent'}\n`
    details += `      html: ${node.html?.replace(/\n/g, '') ?? 'ukjent'}\n`

    if (node.failureSummary) {
        details += `      failureSummary: ${node.failureSummary.replace(/\n/g, ' ')}\n`
    }

    ;['any', 'all', 'none'].forEach((checkType) => {
        if (node[checkType]?.length > 0) {
            details += `      ${checkType}:\n`
            node[checkType].forEach((check: any) => {
                details += `        - id: ${check.id}\n`
                if (check.data) {
                    Object.entries(check.data).forEach(([k, v]) => {
                        details += `          ${k}: ${v}\n`
                    })
                }
                if (check.message) {
                    details += `          message: ${check.message}\n`
                }
            })
        }
    })

    return details
}
