import Distribution from "./distribution.js";

/**
 * A uniform distribution.
 */
export default class Uniform extends Distribution{
    /**
     * Constructor.
     * @param {number} from The lower boundary.
     * @param {number} to The upper boundary.
     * @param {Function} rnd Random number generator.
     */
    constructor(from, to, rnd) {
        super(rnd);
        this.from = from;
        this.to = to;
    }

    /**
     * Draws the next random number.
     * @return {number}
     */
    draw() {
        return this.from + this.rnd() * (this.to - this.from)
    }
}