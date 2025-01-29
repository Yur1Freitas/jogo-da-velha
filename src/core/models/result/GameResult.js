import PlayerType from '../../shared/PlayerType.js'
import Player from '../player/Player.js'

export default class GameResult {
    #_moves
    #_isTie

    /**
     * @param {unknown[]} [moves=[]]
     * @param {boolean} [isTie=false]
     */
    constructor(moves = [], isTie = false) {
        this.#_moves = moves
        this.#_isTie = isTie
    }

    get moves() {
        return this.#_moves
    }

    get isXWinner() {
        return this.#_moves[0]?.type === PlayerType.X
    }

    get isOWinner() {
        return this.#_moves[0]?.type === PlayerType.O
    }

    get isTie() {
        return !this.isXWinner && !this.isOWinner && this.#_isTie
    }

    get inProgress() {
        return this.#_moves.length === 0 && !this.#_isTie
    }

    get isFinish() {
        return !this.inProgress
    }

    /**
     *
     * @param {Player} player
     * @returns {boolean}
     */
    isWinner(player) {
        return this.#_moves[0]?.type === player.type && this.isFinish
    }

    /**
     *
     * @param {number} row
     * @param {number} col
     * @returns {boolean}
     */
    hasCell(row, col) {
        const cell = this.#_moves.find((cell) => cell.row === row && cell.col === col)
        return Boolean(cell)
    }
}
