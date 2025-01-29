import Game from '../game/Game.js'

export default class CPU {
    /**
     *
     * @param {Game} game
     * @param {number} [layer=0]
     * @param {boolean} [isBot=false]
     * @returns {number}
     */
    static #_calcScore(game, layer = 0, isBot = false) {
        const user = game.user
        const bot = game.bot

        if (game.result.isWinner(user)) return -10 + layer
        if (game.result.isWinner(bot)) return +10 + layer
        if (game.result.isTie) return 0

        if (isBot) {
            let bestScore = -Infinity

            const { cells } = game.board

            for (const cell of cells) {
                if (cell.isNotMarked) {
                    const _temp = game.mark(cell.row, cell.col)
                    const score = CPU.#_calcScore(_temp, layer + 1, false)

                    bestScore = Math.max(score, bestScore)
                }
            }

            return bestScore
        } else {
            let bestScore = Infinity

            const { cells } = game.board

            for (const cell of cells) {
                if (cell.isNotMarked) {
                    const _temp = game.mark(cell.row, cell.col)
                    const score = CPU.#_calcScore(_temp, layer + 1, true)

                    bestScore = Math.min(score, bestScore)
                }
            }

            return bestScore
        }
    }

    /**
     *
     * @param {Game} game
     * @returns {[number, number]}
     */
    static #_calcBestPosition(game) {
        let bestScore = -Infinity
        let bestPosition = [-1, -1]

        const { cells } = game.board

        for (const cell of cells) {
            if (cell.isNotMarked) {
                const _temp = game.mark(cell.row, cell.col)
                const score = CPU.#_calcScore(_temp)

                if (score > bestScore) {
                    bestScore = score
                    bestPosition = [cell.row, cell.col]
                }
            }
        }

        return bestPosition
    }

    /**
     *
     * @param {Game} game
     * @returns {[number, number]}
     */
    static #_randomPosition(game) {
        const row = Math.floor(Math.random() * game.board.size)
        const col = Math.floor(Math.random() * game.board.size)

        return [row, col]
    }

    /**
     * @param {Game} game
     * @returns {Game}
     */
    mark(game) {
        if (game.board.isEmpty) {
            const [row, col] = CPU.#_randomPosition(game)
            return game.mark(row, col)
        }

        const [row, col] = CPU.#_calcBestPosition(game)
        return game.mark(row, col)
    }
}
