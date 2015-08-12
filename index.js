var transit = require('transit-immutable-js');

module.exports = {
  in: function(state){
    return transit.toJSON(state)
  },
  out: function(state){
    return transit.fromJSON(state)
  }
}
