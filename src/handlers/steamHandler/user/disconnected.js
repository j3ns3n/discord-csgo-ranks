module.exports.init = (steamUser, csgoClient, bot, config) => {
  steamUser.on('disconnected', (err) => {
    bot.log.warn('Steam Client logged off with error code: [' + err + '] ' + steamUser.EResult[err]);
    steamUser.logOff();
    steamUser.logOn();
  });
};
