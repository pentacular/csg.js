const canonicalize = require('./canonicalize')
const retesselate = require('./retesselate')
const transformGeometry = require('./transformGeometry')

const intersection = (otherCag, geometry) => {
  let geometries
  if (geometry instanceof Array) {
    geometries = geometry
  } else {
    geometries = [geometry]
  }
  let r = toShape3Wall(transformGeometry(otherCag), -1, 1)
  // reduce?
  geometries.map( geometry => {
    r = intersectSub(r, toShape3Wall(transformGeometry(geometry), -1, 1), false, false)
  })
  r = retesselate(r)
  r = canonicalize(r)
  r = fromFakeCSG(r)
  r = canonicalize(r)
  return r
}

module.exports = intersection
