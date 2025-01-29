import GameResult from '../result/GameResult.js'
import Board from '../game/Board.js'

export default class CheckCells {
    #_coords

    /** @param {[number,number][]} coords */
    constructor(coords) {
        this.#_coords = coords
    }

    /**
     *
     * @param {Board} board
     * @returns {GameResult}
     */
    verifyResult(board) {
        const cells = this.#_coords.map(([row, col]) => board.getCell(row, col))
        const types = cells.map((cell) => cell.type)

        const firstType = types[0]
        const sameType = types.every((type) => type !== null && type === firstType)

        return sameType ? new GameResult(cells) : new GameResult()
    }
}
