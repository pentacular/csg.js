const create = require('./create')

/** Construct a geom2 from a list of `Side` instances.
 * @param {Side[]} sides - list of sides
 * @returns {geom2} new geom2 object
 */
const fromSides = (sides) => {
  const geom2 = create()
  geom2.sides = sides
  return geom2
}

module.exports = fromSides
