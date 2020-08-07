module.exports = (bot, config) => {
  bot.log.info = (msg) => {
    console.log(msg);
    bot.executeWebhook(config.discord.webhook.id, config.discord.webhook.token, {
      username: 'CS:GO Ranks Bot',
      content: ':white_check_mark: | `' + msg + '`'
    });
  }
}
