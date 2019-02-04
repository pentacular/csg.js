const FuzzyFactory = require('./FuzzyFactory')
const { EPS } = require('../constants')

const FuzzyShape2Factory = function () {
  this.vertexfactory = new FuzzyFactory(2, EPS)
}

FuzzyShape2Factory.prototype = {
  getVertex: function (sourcevertex) {
    let elements = [sourcevertex[0], sourcevertex[1]]
    return this.vertexfactory.lookupOrCreate(elements, otherwise => sourcevertex);
  },

  getSide: function (sourceside) {
    const vertex0 = this.getVertex(sourceside[0])
    const vertex1 = this.getVertex(sourceside[1])
    return [vertex0, vertex1]
  }
}

module.exports = FuzzyShape2Factory
