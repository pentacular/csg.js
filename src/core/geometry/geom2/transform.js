const mat4 = require('../../math/mat4')
const vec2 = require('../../math/vec2')
const fromSides = require('./fromSides')
const flip = require('./flip')

/** Performs a lazy transform.
 * @param {Mat4} matrix
 * @param {Geom2} geometry
 * @returns {Geom2} a new shape, with updated geometry
 */

const transform = (matrix, geometry) => {
  let transformed = geometry.clone();
  transformed.matrix = mat4.multiply(geometry.matrix, matrix);
  return transformed;
}
module.exports = transform
