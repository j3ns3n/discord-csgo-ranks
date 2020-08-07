module.exports.init = (steamUser, csgoClient, bot, config) => {
  csgoClient.on('playersProfile', (profile) => {
    bot.playerDataHandler(bot, config, csgoClient, profile);
  });
};
