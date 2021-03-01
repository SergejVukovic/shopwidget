export function isDesktop () {
    const w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        windowWidth = w.innerWidth || e.clientWidth || g.clientWidth; //window width

    return windowWidth > 768; //returns true for widths larger than 768 pixels
}
