module.exports.init = (steamClient, steamUser, steamFriends, csgoClient, bot, config) => {
  csgoClient.on('exited', (err) => {
    bot.log.warn('CSGO client exited: ' + err);
  });
};
