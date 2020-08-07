module.exports = {
  name: 'add',
  description: 'Find people to play with through their linked Discord account.',
  visible: true,
  helpInfo: '<PREFIX>add @Mention',
  permissionLevel: [],
  execute: (bot, config, msg) => {
    if (msg.channel.type === 1) return msg.channel.createMessage(':x: │ This command cannot be used in a Direct Message.');
    let components = msg.content.split(' ');
    if (msg.mentions.length < 1) return msg.channel.createMessage(':warning: │ You need to mention a Discord user!');

    bot.db.getUser(msg.mentions[0].id, (err, user) => {
      if (err) return bot.log.error(err);
      if (user != null) {
        return msg.channel.createMessage(':white_check_mark: │ The user\'s Steam link is: <https://steamcommunity.com/profiles/' + user.steamid + '/>');
      } else {
        return msg.channel.createMessage(':x: │ There is no Steam account linked to this Discord account.');
      }
    });
  }
}
