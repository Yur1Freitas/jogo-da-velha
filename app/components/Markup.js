import { PlayerType } from '../../core/index.js'

import Icon from './Icon.js'

/**
 * @param {'X' | 'O' | null} type
 * @returns
 */
export default function Markup(type) {
    const element = document.createElement('div')
    element.classList.add('markup')

    if (type === PlayerType.X) {
        element.appendChild(Icon('./app/icons/x.svg'))
    }

    if (type === PlayerType.O) {
        element.appendChild(Icon('./app/icons/circle.svg'))
    }

    return element
}
