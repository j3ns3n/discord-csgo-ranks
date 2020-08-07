module.exports.init = (steamClient, steamUser, steamFriends, csgoClient, bot, config) => {
  steamClient.on('loggedOff', (err) => {
    bot.log.warn('Steam Client logged off with error code: ' + err);
    steamClient.connect();
  });
};
