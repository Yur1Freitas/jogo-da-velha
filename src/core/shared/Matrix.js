/**
 *
 * @typedef Coords
 * @property {[number, number][][]} rows
 * @property {[number, number][][]} cols
 * @property {[number, number][][]} diagonals
 */

/**
 * @template T
 * @class Matrix
 */
export default class Matrix {
    #_data
    #_size
    #_coords

    /** @param {T[][]} data */
    constructor(data) {
        this.#_data = data
        this.#_size = data.length
        this.#_coords = this.#_getCoords()
    }

    get data() {
        return this.#_data
    }

    get values() {
        return this.#_data.flat()
    }

    get size() {
        return this.#_size
    }

    get coords() {
        return this.#_coords
    }

    get positions() {
        return this.#_coords.rows.flat()
    }

    /**
     *
     * @param {number} row
     * @param {number} col
     * @returns {T | null}
     */
    get(row, col) {
        if (row < 0 || row >= this.size || col < 0 || col >= this.size) {
            return null
        }

        return this.#_data[row][col]
    }

    /**
     *
     * @param {(row: number, col: number) => unknown} handler
     * @returns {Matrix<T>}
     */
    fill(handler) {
        const data = this.#_data.map((row, i) => row.fill(null).map((_, j) => handler(i, j)))

        return new Matrix(data)
    }

    /**
     *
     * @param {number} size
     * @returns {Matrix}
     */
    static create(size) {
        const matrix = Array.from({ length: size }, () => Array(size))
        return new Matrix(matrix)
    }

    /**
     *
     * @returns {Coords}
     */
    #_getCoords() {
        const rows = Array.from({ length: this.size }, (_, i) => Array.from({ length: this.size }, (_, j) => [i, j]))
        const cols = Array.from({ length: this.size }, (_, j) => Array.from({ length: this.size }, (_, i) => [i, j]))

        const diagonals = [
            Array.from({ length: this.size }, (_, i) => [i, i]),
            Array.from({ length: this.size }, (_, i) => [i, this.size - 1 - i])
        ]

        return { rows, cols, diagonals }
    }
}
