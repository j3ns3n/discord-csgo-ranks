module.exports = {
  name: 'update',
  description: 'Update your CS:GO rank.',
  visible: true,
  helpInfo: '<PREFIX>update',
  permissionLevel: [],
  execute: (bot, config, msg) => {
    if (msg.channel.type === 1) return msg.channel.createMessage(':x: │ This command cannot be used in a Direct Message.');

    if (!bot.responding) return msg.channel.createMessage(':octagonal_sign: | CS:GO is down right now, this command wont work!');

    bot.db.getUser(msg.member.id, (err, user) => {
      if (err) {
        bot.log.error(err);
        msg.channel.createMessage(':x: | An error has occurred while retrieving your account.');
        return;
      }
      if (user != null && user.confirmed) {
        bot.csgoClient.requestPlayersProfile(user.steamid);
        return msg.channel.createMessage(':arrows_clockwise: │ Your account is now queued to update. Please ensure you are friends with the bot: <https://steamcommunity.com/profiles/76561199056234052/>');
      } else {
        return msg.channel.createMessage(':exclamation: │ There is no Steam account linked to your Discord account, use `cs.link <steam url>` or finish confirming to link one.');
      }
    });
  }
};
