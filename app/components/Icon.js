/**
 *
 * @param {string} src
 * @returns {HTMLImageElement}
 */
export default function Icon(src) {
    const img = document.createElement('img')
    img.classList.add('icon')
    img.src = src

    return img
}
