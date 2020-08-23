module.exports.init = (steamUser, csgoClient, bot, config) => {
  steamUser.on('disconnected', (err) => {
    bot.log.warn('Steam Client logged off with error code: [' + err + '] ' + steamUser.EResult[err]);
    if (err == 0) { 
      bot.users.get(config.ownerid).getDMChannel((ownerDM) => {
        ownerDM.createMessage(':exclamation: | Invalid login code error, bot will restart.');
      });
      process.exit(1);
    }
    steamUser.logOff();
    steamUser.logOn();
  });
};
