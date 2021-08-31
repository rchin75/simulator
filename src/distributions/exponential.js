import Distribution from "./distribution.js";

/**
 * An exponential distribution.
 */
export default class Exponential extends Distribution{
    /**
     * Constructor.
     * @param {number} lambda Lambda. The mean, or expected value is 1 / lambda.
     * @param {Function} rnd Random number generator.
     */
    constructor(lambda, rnd) {
        super(rnd);
        this.lambda = lambda;
    }

    /**
     * Draws the next random number.
     * @return {number}
     */
    draw() {
        // Source: https://en.wikipedia.org/wiki/Exponential_distribution#Generating_exponential_variates
        return -1 * Math.log(this.rnd()) / this.lambda;
    }
}
