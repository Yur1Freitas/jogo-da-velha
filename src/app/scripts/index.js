import GameArea from '../components/GameArea.js'

const { render, nextRound, resetGame } = GameArea()

const resetBtn = document.querySelector('.reset-btn')
resetBtn.addEventListener('click', resetGame)

const nextRoundBtn = document.querySelector('.next-round-btn')
nextRoundBtn.addEventListener('click', nextRound)

render()
