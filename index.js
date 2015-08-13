var transit = require('transit-immutable-js')

module.exports = {
  in: function(state){
    if(state && typeof state === 'object'){
      return transit.toJSON(state)
    }
    return state
  },
  out: function(raw){
    console.log('out', raw)
    if(typeof raw === 'string'){
      return transit.fromJSON(raw)
    }
    return raw
  }
}
