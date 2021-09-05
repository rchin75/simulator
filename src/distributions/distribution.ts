/**
 * A distribution (abstract class).
 */
export default class Distribution {
    readonly rnd : Function;

    /**
     * Constructor.
     * @param {Function} rnd Random number generator.
     */
    constructor(rnd: Function) {
        if (new.target === Distribution) {
            throw new TypeError("Cannot construct Distribution instances directly");
        }
        this.rnd = rnd;
    }

    /**
     * Draws the next random number.
     * @return {number}
     */
    draw() : number {
        return this.rnd();
    }
}