import Board from '../game/Board.js'
import GameResult from './GameResult.js'
import CheckCells from './CheckCells.js'

export default class CheckCols {
    /**
     * @param {Board} board
     * @returns {GameResult}
     */
    verifyBoard(board) {
        for (const col of board.matrix.coords.cols) {
            const checker = new CheckCells(col)
            const result = checker.verifyResult(board)

            if (result.isFinish) {
                return result
            }
        }

        return new GameResult()
    }
}
