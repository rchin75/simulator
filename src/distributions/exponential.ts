import Distribution from "./distribution";

/**
 * An exponential distribution.
 */
export default class Exponential extends Distribution{
    readonly lambda: number;

    /**
     * Constructor.
     * @param {number} lambda Lambda. The mean, or expected value is 1 / lambda.
     * @param {Function} rnd Random number generator.
     */
    constructor(lambda: number, rnd: Function) {
        super(rnd);
        this.lambda = lambda;
    }

    /**
     * Draws the next random number.
     * @return {number}
     */
    draw(): number {
        // Source: https://en.wikipedia.org/wiki/Exponential_distribution#Generating_exponential_variates
        return -1 * Math.log(this.rnd()) / this.lambda;
    }
}
