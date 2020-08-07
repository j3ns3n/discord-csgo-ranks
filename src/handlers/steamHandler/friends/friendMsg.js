module.exports.init = (steamClient, steamUser, steamFriends, csgoClient, bot, config) => {
  steamFriends.on('friendMsg', (steamID, msg) => {

    if (msg.length == 0) return;
    bot.db.getUserFromSteamID(steamID, (err, user) => {
      if (err) return bot.log.error(err);
      if (user.authcode == msg.trim()) {
        steamFriends.sendMessage(steamID, 'Successfully linked your account! You can now use cs.update in the Discord server to update your rank!');
        let csgoAccID = csgoClient.ToAccountID(steamID);
        bot.db.updateUserConfirmed(steamID, csgoAccID);
        csgoClient.playerProfileRequest(csgoAccID);
      }
    });
  });
};
