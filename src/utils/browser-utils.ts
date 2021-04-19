// Get the top position of an element in the document

export function erSynligIViewport(element?: HTMLElement | null) {
    if (!element) {
        return false
    }
    const rect = element.getBoundingClientRect()
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
}

export function skalBrukeFullskjermKalender() {
    if (window.innerWidth < 768) {
        return 'fullscreen'
    } else {
        return 'responsive'
    }
}
