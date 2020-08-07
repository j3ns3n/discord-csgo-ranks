module.exports.init = (steamClient, steamUser, steamFriends, csgoClient, bot, config) => {
  csgoClient.on('playerProfile', (profile) => {
    bot.playerDataHandler(bot, config, csgoClient, profile);
  });
};
