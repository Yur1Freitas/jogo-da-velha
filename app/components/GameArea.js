import { CPU, Game, Player, PlayerType } from '../../core/index.js'

import CellArea from '../components/CellArea.js'

export default function GameArea() {
    const cpu = new CPU()

    const user = new Player({
        type: PlayerType.X,
        name: 'P1'
    })

    const bot = new Player({
        type: PlayerType.O,
        name: 'CPU',
        isBot: true
    })

    let game = Game.create(user, bot)

    const board = document.querySelector('.board')

    const playerScore = document.querySelector('.score--user > .score__value')
    const botScore = document.querySelector('.score--bot > .score__value')
    const tieScore = document.querySelector('.score--tie > .score__value')

    const resetBoard = () => {
        board.innerHTML = ''
    }

    const updateScorebar = () => {
        playerScore.textContent = `${game.user.score}`
        botScore.textContent = `${game.bot.score}`
        tieScore.textContent = `${game.tie}`
    }

    const render = () => {
        resetBoard()
        updateScorebar()

        const { cells } = game.board

        for (const cell of cells) {
            const cellArea = CellArea(cell)

            cellArea.addEventListener('click', () => {
                game = game.mark(cell.row, cell.col)

                if (game.currentPlayer.isBot) {
                    game = cpu.mark(game)
                }

                if (game.result.isFinish) {
                    updateScorebar()
                }

                render()
            })

            board.appendChild(cellArea)
        }
    }

    const resetGame = () => {
        game = game.reset()

        if (game.firstPlayer === game.bot) {
            game = cpu.mark(game)
        }

        render()
    }

    const nextRound = () => {
        game = game.nextRound()

        if (game.firstPlayer === game.bot) {
            game = cpu.mark(game)
        }

        render()
    }

    return { render, nextRound, resetGame }
}
