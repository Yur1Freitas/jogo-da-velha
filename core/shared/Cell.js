/**
 * @typedef CellProps
 *
 * @prop {'X' | 'O' | null} type
 * @prop {number} row
 * @prop {number} col
 */

export default class Cell {
    #_type
    #_row
    #_col

    /** @param {CellProps} */
    constructor({ type = null, row, col }) {
        this.#_type = type
        this.#_row = row
        this.#_col = col
    }

    get type() {
        return this.#_type
    }

    get row() {
        return this.#_row
    }

    get col() {
        return this.#_col
    }

    get isMarked() {
        return this.#_type !== null
    }

    get isNotMarked() {
        return this.#_type === null
    }

    /**
     *
     * @param {'X' | 'O'} type
     * @returns {Cell}
     */
    mark(type) {
        if (this.#_type !== null) {
            return this
        }

        const { row, col } = this
        return new Cell({ type, row, col })
    }
}
