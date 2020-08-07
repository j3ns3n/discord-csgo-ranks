module.exports = {
  name: 'unlink',
  description: 'Unlink your Discord and Steam accounts within the bot.',
  visible: true,
  helpInfo: '<PREFIX>unlink',
  permissionLevel: [],
  execute: (bot, config, msg) => {
    if (msg.channel.type === 1) return msg.channel.createMessage(':x: │ This command cannot be used in a Direct Message.');

    bot.db.getUser(msg.member.id, (err, res) => {
      if (err) bot.log.error(err);
      if (res != null) {
        bot.db.deleteUser(msg.member.id);
        bot.discordRoleHandler(bot, config, msg.member.id, 'default');
        return msg.channel.createMessage(':white_check_mark: │ Your account was successfully unlinked!');
      } else {
        return msg.channel.createMessage(':x: │ There is no Steam account linked to your Discord account, use `cs.link <steam url>` to link one.');
      }
    });
  }
}
