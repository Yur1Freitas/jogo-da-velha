import { Cell, PlayerType } from '../../core/index.js'

import Markup from './Markup.js'

/**
 * @param {Cell} cell
 * @returns {HTMLDivElement}
 */
export default function CellArea(cell) {
    const element = document.createElement('div')
    element.classList.add('cell')

    if (cell.isMarked) {
        element.classList.add(cell.type === PlayerType.O ? 'cell--bot' : 'cell--user')
    }

    const markup = Markup(cell.type)
    element.appendChild(markup)

    return element
}
