module.exports.init = (steamUser, csgoClient, bot, config) => {
  steamUser.on('error', (eresult) => {
    bot.log.error('Steam Client error with code: [' + eresult + '] ' + steamUser.EResult[eresult]);
  });
};
