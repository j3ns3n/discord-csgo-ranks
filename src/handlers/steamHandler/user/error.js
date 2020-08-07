module.exports.init = (steamUser, csgoClient, bot, config) => {
  steamUser.on('error', (err) => {
    bot.log.error(err);
  });
};
