let state = require('./state');
let methods = require('./methods');
let mutations = require('./mutations');

let store = {
  state,
  methods,
  mutations
};

module.exports = store;