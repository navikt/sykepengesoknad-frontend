// Get the top position of an element in the document

export const getTop = function(element: HTMLElement, start: number) {
    // return value of html.getBoundingClientRect().top ... IE : 0, other browsers : -pageYOffset
    if (!element) {
        return 0;
    }
    if (element.nodeName === 'HTML') {
        return -start;
    }
    return element.getBoundingClientRect().top + start;
};

const easeInOutCubic = function(t: number) {
    if (t < 0.5) {
        return 4 * t * t * t;
    }
    return ((t - 1) * ((2 * t) - 2) * ((2 * t) - 2)) + 1;
};

const position = function(start: number, end: number, elapsed: number, duration: number) {
    if (elapsed > duration) {
        return end;
    }
    return start + ((end - start) * easeInOutCubic(elapsed / duration));
};

export function scrollTo(end: number, duration = 500, callback: any) {
    const start = window.pageYOffset;
    if (!end) {
        return;
    }

    const clock = Date.now();
    const requestAnimationFrame = window.requestAnimationFrame ||
        function(fn: any) {
            window.setTimeout(fn, 15);
        };

    const step = function() {
        const elapsed = Date.now() - clock;
        window.scroll(0, position(start, end, elapsed, duration));

        if (elapsed > duration) {
            if (typeof callback === 'function') {
                callback(end);
            }
        } else {
            requestAnimationFrame(step);
        }
    };
    step();
}

export function erSynligIViewport(element: HTMLElement) {
    if (!element) {
        return false;
    }
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

export function harLocalStorageStotte() {
    try {
        return 'localStorage' in window && window.localStorage !== null;
    } catch (e) {
        return false;
    }
}
