import Distribution from "./distribution.js";

/**
 * A triangular distribution.
 */
export default class Triangular extends Distribution{
    /**
     * Constructor.
     * @param {number} a Left corner.
     * @param {number} b Right corner.
     * @param {number} c Top corner.
     * @param rnd Random number generator.
     */
    constructor(a, b, c, rnd) {
        super(rnd);
        this.a = a;
        this.b = b;
        this.c = c;
        this.f = (c-a) / (b - a);
    }

    /**
     * Draws the next random number.
     * @return {number}
     */
    draw() {
        // Source: https://en.wikipedia.org/wiki/Triangular_distribution
        let u = this.rnd();
        let x;
        if (u < this.f) {
            x = this.a + Math.sqrt(u * (this.b - this.a) * (this.c - this.a));
        } else {
            x = this.b - Math.sqrt((1 - u) * (this.b - this.a) * (this.b - this.c));
        }
        return x;
    }
}