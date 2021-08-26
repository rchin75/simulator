/**
 * A triangular distribution.
 * @param a Left corner.
 * @param b Right corner.
 * @param c Top corner.
 * @param rnd Random number generator.
 * @return {function(): *}
 */
export const triangular = function(a, b, c, rnd) {
    // Source: https://en.wikipedia.org/wiki/Triangular_distribution
    const f = (c-a) / (b - a);
    return function() {
        let u = rnd();
        let x = 0;
        if (u < f) {
            x = a + Math.sqrt(u * (b - a) * (c - a));
        } else {
            x = b - Math.sqrt((1 - u) * (b - a) * (b - c));
        }
        return x;
    }
}