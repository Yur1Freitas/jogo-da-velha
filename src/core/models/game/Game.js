import CheckDiagonals from '../result/CheckDiagonals.js'
import GameResult from '../result/GameResult.js'
import CheckCols from '../result/CheckCols.js'
import CheckRows from '../result/CheckRows.js'
import CheckTie from '../result/CheckTie.js'

import Player from '../player/Player.js'

import Board from './Board.js'

/**
 * @typedef GameProps
 *
 * @prop {Player} user
 * @prop {Player} bot
 * @prop {Player} firstPlayer
 * @prop {Player} currentPlayer
 * @prop {number} tie
 * @prop {Board} board
 * @prop {GameResult} result
 *
 */

export default class Game {
    #_user
    #_bot

    #_firstPlayer
    #_currentPlayer

    #_tie
    #_board
    #_result

    /** @param {GameProps} */
    constructor({ user, bot, firstPlayer, currentPlayer, tie = 0, board = Board.create(), result = new GameResult() }) {
        this.#_user = user
        this.#_bot = bot
        this.#_firstPlayer = firstPlayer
        this.#_currentPlayer = currentPlayer
        this.#_tie = tie
        this.#_board = board
        this.#_result = result
    }

    get user() {
        return this.#_user
    }

    get bot() {
        return this.#_bot
    }

    get firstPlayer() {
        return this.#_firstPlayer
    }

    get currentPlayer() {
        return this.#_currentPlayer
    }

    get tie() {
        return this.#_tie
    }

    get board() {
        return this.#_board
    }

    get result() {
        return this.#_result
    }

    /**
     *
     * @param {number} row
     * @param {number} col
     * @returns {Game}
     */
    mark(row, col) {
        if (this.board.isMarked(row, col) || this.result.isFinish) {
            return this
        }

        const board = this.board.markCell({ row, col, type: this.currentPlayer.type })
        const result = this.#_checkResult(board)

        const { user, bot } = this.#_getPlayers(result)

        const { tie, firstPlayer, currentPlayer } = this

        const game = new Game({
            bot,
            user,
            board,
            result,
            firstPlayer,
            currentPlayer,
            tie: result.isTie ? tie + 1 : tie
        })

        return game.#_switchCurrentPlayers()
    }

    /**
     *
     * @returns {Game}
     */
    reset() {
        const user = this.user.reset()
        const bot = this.bot.reset()

        const firstPlayer = this.firstPlayer.type === this.user.type ? bot : user

        const tie = 0
        const board = Board.create()
        const result = new GameResult()

        return new Game({
            bot,
            user,
            tie,
            board,
            result,
            firstPlayer,
            currentPlayer: firstPlayer
        })
    }

    /**
     *
     * @returns {Game}
     */
    nextRound() {
        const { user, bot, tie } = this

        const firstPlayer = this.firstPlayer.type === this.user.type ? this.bot : this.user

        const board = Board.create()
        const result = new GameResult()

        return new Game({
            bot,
            user,
            tie,
            board,
            result,
            firstPlayer,
            currentPlayer: firstPlayer
        })
    }

    /**
     *
     * @param { Player } user
     * @param { Player } bot
     * @returns { Game }
     */
    static create(user, bot) {
        return new Game({ user, bot, firstPlayer: user, currentPlayer: user })
    }

    /**
     *
     * @param {GameResult} result
     * @returns {{user: Player, bot: Player}}
     */
    #_getPlayers(result) {
        const { user, bot } = this

        if (result.isWinner(this.user)) {
            return { bot, user: user.addScore(1) }
        }

        if (result.isWinner(this.bot)) {
            return { user, bot: bot.addScore(1) }
        }

        return { user, bot }
    }

    /**
     * @returns { Jogo }
     */
    #_switchCurrentPlayers() {
        if (!this.result.inProgress) {
            return this
        }

        const currentPlayer = this.currentPlayer.type === this.user.type ? this.bot : this.user

        const { user, bot, tie, board, result, firstPlayer } = this

        return new Game({
            bot,
            user,
            tie,
            board,
            result,
            firstPlayer,
            currentPlayer
        })
    }

    /**
     *
     * @param {Board} board
     * @returns {GameResult}
     */
    #_checkResult(board) {
        const colsResult = new CheckCols().verifyBoard(board)
        const rowsResult = new CheckRows().verifyBoard(board)
        const diagonalsResult = new CheckDiagonals().verifyBoard(board)

        const results = [colsResult, rowsResult, diagonalsResult]

        return results.find((result) => result.isFinish) ?? new CheckTie().verifyBoard(board)
    }
}
