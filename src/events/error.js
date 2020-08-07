module.exports = (bot, config) => {
  bot.on('error', (err) => {
    console.error(err)
  });
}
