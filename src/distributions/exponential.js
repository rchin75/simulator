/**
 * An exponential distribution.
 * @param lambda Lambda. The mean, or expected value is 1 / lambda.
 * @param rnd Random number generator.
 * @return {function(): number}
 */
export const exponential = function(lambda, rnd) {
    // Source: https://en.wikipedia.org/wiki/Exponential_distribution#Generating_exponential_variates
    return function() {
        return -1 * Math.log(rnd()) / lambda;
    }
}