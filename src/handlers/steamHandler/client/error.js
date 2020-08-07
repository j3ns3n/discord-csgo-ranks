module.exports.init = (steamClient, steamUser, steamFriends, csgoClient, bot, config) => {
  steamClient.on('error', (err) => {
    bot.log.error(err);
  });
};
