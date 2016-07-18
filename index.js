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
      if(state && typeof state === 'object'){
        return transitInstance.toJSON(state)
      }
      return state
    },
    function(raw){
      if(typeof raw === 'string'){
        return transitInstance.fromJSON(raw)
      }
      return raw
    },
    config
  )
}
