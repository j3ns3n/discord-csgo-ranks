module.exports.init = (steamUser, csgoClient, bot, config) => {
  steamUser.chat.on('friendMessage', (message) => {

    if (message.message.trim().length == 0) return;
    bot.db.getUserFromSteamID(message.steamid_friend, (err, user) => {
      if (err) return bot.log.error(err);
      if(!user) return;
      if (user.authcode == message.message.trim()) {
        steamUser.chat.sendFriendMessage(message.steamid_friend, 'Successfully linked your account! You can now use cs.update in the Discord server to update your rank!');
        csgoClient.requestPlayersProfile(message.steamid_friend, (result) => {
          bot.db.updateUserConfirmed(message.steamid_friend, result.account_id);
        });
      }
    });
  });
};
