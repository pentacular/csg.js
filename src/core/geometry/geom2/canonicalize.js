const { EPS } = require('../../constants')
const FuzzyShape2Factory = require('../FuzzyFactory2d')
const clone = require('./clone')

const normalizeNumber = (number) => (Math.round(number * 10000) / 10000)
const normalizeVec2 = (vec) => [normalizeNumber(vec[0]), normalizeNumber(vec[1])]
const normalizeSide = (side) => [normalizeVec2(side[0]), normalizeVec2(side[1])]

const canonicalize = (geometry) => {
  if (geometry.isCanonicalized) {
    return geometry
  }
  const known = new Set();
  const canonicalizedSides = [];
  for (const side of geometry.sides) {
    const normalizedSide = normalizeSide(side)
    if (!known.has(normalizedSide)) {
      canonicalizedSides.push(normalizedSide);
      known.add(normalizedSide);
    }
  }
  const cloned = clone(geometry);
  cloned.sides = canonicalizedSides;
  cloned.isCanonicalized = true
  return cloned;
}

module.exports = canonicalize
