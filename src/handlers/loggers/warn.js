module.exports = (bot, config) => {
  bot.log.warn = (msg) => {
    console.warn(msg);
    bot.executeWebhook(config.discord.webhook.id, config.discord.webhook.token, {
      username: 'CS:GO Ranks Bot',
      content: ':warning: | `' + msg + '`'
    });
  }
}
