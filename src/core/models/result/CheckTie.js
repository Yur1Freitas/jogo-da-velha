import GameResult from './GameResult.js'
import Board from '../game/Board.js'

export default class CheckTie {
    /**
     *
     * @param { Board } board
     * @returns { GameResult }
     */
    verifyBoard(board) {
        return board.isFull ? new GameResult([], true) : new GameResult()
    }
}
