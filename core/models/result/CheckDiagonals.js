import Board from '../game/Board.js'
import GameResult from './GameResult.js'
import CheckCells from './CheckCells.js'

export default class CheckRows {
    /**
     * @param {Board} board
     * @returns {GameResult}
     */
    verifyBoard(board) {
        for (const diagonal of board.matrix.coords.diagonals) {
            const checker = new CheckCells(diagonal)
            const result = checker.verifyResult(board)

            if (result.isFinish) {
                return result
            }
        }

        return new GameResult()
    }
}
