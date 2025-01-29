import Matrix from '../../shared/Matrix.js'
import Cell from '../../shared/Cell.js'

export default class Board {
    #_matrix

    /** @param {Matrix<Cell>} matrix */
    constructor(matrix) {
        this.#_matrix = matrix
    }

    get matrix() {
        return this.#_matrix
    }

    get size() {
        return this.#_matrix.size
    }

    get cells() {
        return this.#_matrix.values
    }

    get isFull() {
        return this.cells.every((cell) => cell.isMarked)
    }

    get isEmpty() {
        return this.cells.every((cell) => cell.isNotMarked)
    }

    /**
     *
     * @param {number} row
     * @param {number} col
     * @returns {Cell | null}
     */
    getCell(row, col) {
        return this.#_matrix.get(row, col)
    }

    /**
     *
     * @param {{ type: 'X' | 'O', row: number, col: number}}
     * @returns {Board | null}
     */
    markCell({ type, row, col }) {
        const cell = this.getCell(row, col)

        if (cell === null || cell.isMarked) {
            return this
        }
        const clonedCells = this.matrix.data.map((row) => [...row])
        clonedCells[cell.row][cell.col] = cell.mark(type)

        const matrix = new Matrix(clonedCells)
        return new Board(matrix)
    }

    /**
     *
     * @param {number} row
     * @param {number} col
     * @returns {number}
     */
    isMarked(row, col) {
        return this.getCell(row, col)?.isMarked
    }

    /**
     *
     * @param {number} row
     * @param {number} col
     * @returns {number}
     */
    isNotMarked(row, col) {
        return this.getCell(row, col)?.isNotMarked
    }

    /**
     *
     * @param {number} size
     * @returns {Board}
     */
    static create(size = 3) {
        const matrix = Matrix.create(size).fill((row, col) => new Cell({ row, col }))

        return new Board(matrix)
    }
}
