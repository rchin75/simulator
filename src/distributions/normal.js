/**
 * A normal distribution.
 * @param mean Mean.
 * @param stdDev Standard deviation.
 * @param rnd Random number generator.
 * @return {function(...[*]=)}
 */
export const normal = function(mean, stdDev, rnd) {
    // Source: https://en.wikipedia.org/wiki/Marsaglia_polar_method
    let spare, hasSpare = false;

    return function() {
        if (hasSpare) {
            hasSpare = false;
            return spare * stdDev + mean;
        } else {
            let u, v, s;
            do {
                u = rnd() * 2 - 1;
                v = rnd() * 2 - 1;
                s = u * u + v * v;
            } while ((s >= 1) || (s === 0));

            s = Math.sqrt(-2.0 * Math.log(s) / s);
            spare = v * s;
            hasSpare = true;
            return mean + stdDev * u * s;
        }
    }
}