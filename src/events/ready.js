const path = require('path');

module.exports = (bot, config) => {
  bot.once('ready', () => {
    require(path.join(__dirname, '../handlers/steamHandler'))(bot, config);
  });
}
