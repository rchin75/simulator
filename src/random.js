
// Source: https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
// Answer: https://stackoverflow.com/a/29450606

/**
 * A random number generator with a seed value.
 * Usage:
 *   import 'random.js';
 *   const rnd = Math.seed(1234);
 *   let number = rnd();
 * @param s Seed value.
 * @return {function(): number}
 */
Math.seed = function(s) {
    const mask = 0xffffffff;
    let m_w  = (123456789 + s) & mask;
    let m_z  = (987654321 - s) & mask;

    // Returns a random number generating function.
    return function() {
        m_z = (36969 * (m_z & 65535) + (m_z >>> 16)) & mask;
        m_w = (18000 * (m_w & 65535) + (m_w >>> 16)) & mask;

        let result = ((m_z << 16) + (m_w & 65535)) >>> 0;
        result /= 4294967296;
        return result;
    }
}