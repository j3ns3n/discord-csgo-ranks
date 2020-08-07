module.exports = (bot, config) => {
  bot.log.error = (msg) => {
    console.error(msg);
    bot.executeWebhook(config.discord.webhook.id, config.discord.webhook.token, {
      username: 'CS:GO Ranks Bot',
      content: ':x: | Error: ```' + msg + '```'
    });
  }
}
