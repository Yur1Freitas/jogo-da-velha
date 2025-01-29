/**
 * @typedef PlayerProps
 *
 * @prop {'X'|'O'} type
 * @prop {string} name
 * @prop {number} score
 * @prop {boolean} isBot
 */

export default class Player {
    #_type
    #_name
    #_score
    #_isBot

    /** @param {PlayerProps} */
    constructor({ type, name, isBot = false, score = 0 }) {
        this.#_type = type
        this.#_name = name
        this.#_score = score
        this.#_isBot = isBot
    }

    get type() {
        return this.#_type
    }

    get name() {
        return this.#_name
    }

    get score() {
        return this.#_score
    }

    get isBot() {
        return this.#_isBot
    }

    /**
     *
     * @param {number} score
     * @returns {Player}
     */
    addScore(score) {
        if (score === 0) {
            return this
        }

        return new Player({
            type: this.type,
            name: this.name,
            isBot: this.isBot,
            score: this.score + score
        })
    }

    /**
     *
     * @returns {Player}
     */
    reset() {
        const { type, name, isBot } = this
        return new Player({ type, name, isBot })
    }
}
