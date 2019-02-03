const hasPointInside = require('./validateHasPointInside')
const project = require('./project')

/** Check if all points from one Shape2 stay inside another Shape2
* @typedef  {import('../../shape2/create').Shape2} Shape2
* @param {Shape2} shape1 - Shape2 object
* @param {Object} shape2 - Shape2 object
* @returns {Boolean}
*/
const contains = (baseShape1, baseShape2) => {
  let shape1 = project(baseShape1)
  let shape2 = project(baseShape2)
  for (let i = 0, il = shape2.sides.length; i < il; i++) {
    if (!hasPointInside(shape1, shape2.sides[i][0])) {
      return false
    }
  }
  return true
}

module.exports = contains
