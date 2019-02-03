const clone = require('./clone')
const mat4 = require('../../math/mat4')

/** Performs a lazy transform.
 * @param {Mat4} matrix
 * @param {Geom2} geometry
 * @returns {Geom2} a new shape, with updated geometry
 */

const transform = (matrix, geometry) => {
  let transformed = clone(geometry)
  transformed.matrix = mat4.multiply(geometry.matrix, matrix);
  return transformed;
}
module.exports = transform
