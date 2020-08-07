const path = require('path');

module.exports = (bot, config) => {
  bot.on('ready', () => {
    require(path.join(__dirname, '../handlers/steamHandler'))(bot, config);
  });
}
