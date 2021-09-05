import Distribution from "./distribution";

/**
 * A uniform distribution.
 */
export default class Uniform extends Distribution{
    readonly from: number;
    readonly to: number;

    /**
     * Constructor.
     * @param {number} from The lower boundary.
     * @param {number} to The upper boundary.
     * @param {Function} rnd Random number generator.
     */
    constructor(from: number = 0, to: number = 1, rnd: Function) {
        super(rnd);
        this.from = from;
        this.to = to;
    }

    /**
     * Draws the next random number.
     * @return {number}
     */
    draw(): number {
        return this.from + this.rnd() * (this.to - this.from)
    }
}