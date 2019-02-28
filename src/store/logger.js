const chalk = require("chalk");
const ctx = new chalk.constructor({level: 1});

module.exports = function(text) {
  console.log(ctx.bgGreen('[ReplitElectron Logger]') + ' ' + ctx.green(text));
  // console.log(ctx.blue('Hello world!'));
};