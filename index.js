var transit = require('transit-immutable-js')
var reduxPersist = require('redux-persist')

module.exports = function (config) {
  config = config || {}

  var transitInstance = transit
  if (config.records) {
    transitInstance = transit.withRecords(config.records)
  }

  return reduxPersist.createTransform(
    function(state){
      return transitInstance.toJSON(state)
    },
    function(raw){
      return transitInstance.fromJSON(raw)
    },
    config
  )
}
