module.exports.init = (steamUser, csgoClient, bot, config) => {
  csgoClient.on('playersProfile', (profile) => {
    // console.log(profile)
    bot.playerDataHandler(bot, config, csgoClient, profile);
  });
};
