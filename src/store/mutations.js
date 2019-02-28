let state = require('./state');
let logger = require('./logger');

// Good for now
let setMainWindow = mainWindow => {
  logger('Mutating mainWindow');
  state.mainWindow = mainWindow;
};

let setSubWindow = subWindow => {
  logger('Mutating subWindow');
  state.subWindow = subWindow;
};

let mutations = {
  setMainWindow,
  setSubWindow
};

module.exports = mutations;