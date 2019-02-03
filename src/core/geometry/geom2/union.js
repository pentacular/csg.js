const retessellate = require('../shape3/retessellate')
const canonicalize = require('./canonicalize')
const toShape3Wall = require('./toGeom3Wall')
const fromFakeShape3 = require('./fromFakeGeom3')
const transformGeometry = require('./transformGeometry')

// FIXME: duplicate code in shape3.union
const unionSub =  (otherGeom3, csg, doRetesselate, doCanonicalize) => {
  if (!isOverlapping(otherGeom3, csg)) {
    return unionForNonIntersecting(otherGeom3, csg)
  } else {
    let a = new Tree(otherGeom3.polygons)
    let b = new Tree(csg.polygons)
    a.clipTo(b, false)

    // b.clipTo(a, true); // ERROR: this doesn't work
    b.clipTo(a)
    b.invert()
    b.clipTo(a)
    b.invert()

    let newpolygons = a.allPolygons().concat(b.allPolygons())
    let result = fromPolygons(newpolygons)
    // FIXME: what to do with properties ????
    // result.properties = otherGeom3.properties._merge(csg.properties)
    if (doRetesselate) result = retesselate(result)
    if (doCanonicalize) result = canonicalize(result)
    return result
  }
}

/** // FIXME: double check this algorithm, or even better, swap it out with something not reliant
 * on converting to 3D and back !!!
 * do a boolean union of two (or more) 2d shapes
 * 1 - first apply the transforms of the shapes to their geometries, 'freezing' their transform
 * into the points/vertices (or else) that make up their geometry, see transformGeometry
 * 2 - apply the boolean operation
 * 3 - return a single output 2d shape
 * @param  {} shapes
 * @returns {Shape2} a single 2d shape, with default transforms (identity matrix)
 */
const union = geometries => {
  // apply the transforms of the shapes to their geometries
  let _geometries = geometries.map(project)
  _geometries[0] = retessellate(toShape3Wall(_geometries[0], -1, 1))

  let i
  // combine csg pairs in a way that forms a balanced binary tree pattern
  for (i = 1; i < _shapes.length; i += 2) {
    const current = retessellate(toShape3Wall(_geometries[i], -1, 1))
    const previous = _geometries[i - 1]
    _geometries.push(unionSub(previous, current, false, false))
  }
  return canonicalize(fromFakeShape3(_geometries[i - 1]))
}

module.exports = union
