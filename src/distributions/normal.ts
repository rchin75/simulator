import Distribution from "./distribution";

/**
 * A normal distribution.
 */
export default class Normal extends Distribution{
    readonly mean: number;
    readonly stdDev: number;
    private spare: number;
    private hasSpare: boolean;

    /**
     * Constructor.
     * @param {number} mean Mean.
     * @param {number} stdDev Standard deviation.
     * @param {Function} rnd Random number generator.
     */
    constructor(mean: number, stdDev: number, rnd: Function) {
        super(rnd);
        this.mean = mean;
        this.stdDev = stdDev;
        this.spare = 0;
        this.hasSpare = false;
    }

    /**
     * Draws the next random number.
     * @return {number}
     */
    draw(): number {
        // Source: https://en.wikipedia.org/wiki/Marsaglia_polar_method
        if (this.hasSpare) {
            this.hasSpare = false;
            return this.spare * this.stdDev + this.mean;
        } else {
            let u, v, s;
            do {
                u = this.rnd() * 2 - 1;
                v = this.rnd() * 2 - 1;
                s = u * u + v * v;
            } while ((s >= 1) || (s === 0));

            s = Math.sqrt(-2.0 * Math.log(s) / s);
            this.spare = v * s;
            this.hasSpare = true;
            return this.mean + this.stdDev * u * s;
        }
    }
}
