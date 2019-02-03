const fromPolygons = require('../geom3/fromPolygons')
const project = require('./project')

/** convert a Geom2 to a Geom3 'wall' of zero thickness
 * @param  {} z0
 * @param  {} z1
 */
const toGeom3Wall = (geometry, z0, z1) => {
  const polygons = project(geometry).sides.map( side => {
    return side.toPolygon3D(z0, z1)
  })
  return fromPolygons(polygons)
}

module.exports = toGeom3Wall
