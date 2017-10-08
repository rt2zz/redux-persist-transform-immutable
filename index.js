var Immutable = require('immutable')
var Serialize = require('remotedev-serialize')
var reduxPersist = require('redux-persist')

module.exports = function (config) {
  config = config || {}

  var serializer =  Serialize.immutable(Immutable, config.records)

  return reduxPersist.createTransform(serializer.stringify, serializer.parse, config)
}
