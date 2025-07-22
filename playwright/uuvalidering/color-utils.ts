import { ColorInfo } from './types'

export function parseColor(colorStr: string): ColorInfo | null {
    if (!colorStr || colorStr === 'ukjent') return null

    const rgbaMatch = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
    if (rgbaMatch) {
        return {
            r: parseInt(rgbaMatch[1]),
            g: parseInt(rgbaMatch[2]),
            b: parseInt(rgbaMatch[3]),
            a: rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1,
        }
    }

    const hexMatch = colorStr.match(/^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
    if (hexMatch) {
        return {
            r: parseInt(hexMatch[1], 16),
            g: parseInt(hexMatch[2], 16),
            b: parseInt(hexMatch[3], 16),
            a: 1,
        }
    }

    return null
}

export function colorToHex(color: ColorInfo): string {
    const toHex = (n: number) => n.toString(16).padStart(2, '0')
    return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`
}

export function generateColorContrastHtml(data: any): string {
    const fg = data.fg ?? data.fgColor ?? 'ukjent'
    const bg = data.bg ?? data.bgColor ?? 'ukjent'
    const ratio = data.contrastRatio ?? 'ukjent'

    const fgColor = parseColor(fg)
    const bgColor = parseColor(bg)

    const fgHex = fgColor ? colorToHex(fgColor) : '#000000'
    const bgHex = bgColor ? colorToHex(bgColor) : '#ffffff'

    const ratioNum = typeof ratio === 'number' ? ratio : parseFloat(ratio)
    const ratioClass = ratioNum < 4.5 ? 'fail' : ''

    return `
        <div class="color-contrast-detail">
            <div class="color-sample">
                <span class="color-swatch" style="background-color: ${fgHex}"></span>
                <span>Forgrunn: ${fg} (${fgHex})</span>
            </div>
            <div class="color-sample">
                <span class="color-swatch" style="background-color: ${bgHex}"></span>
                <span>Bakgrunn: ${bg} (${bgHex})</span>
            </div>
            <div class="contrast-ratio ${ratioClass}">
                Kontrast: ${ratio}:1 ${ratioNum < 4.5 ? '❌' : '✅'}
            </div>
            <div class="color-sample" style="background-color: ${bgHex}; color: ${fgHex}; padding: 4px 8px; border: 2px solid #999;">
                Eksempel tekst
            </div>
        </div>`
}
