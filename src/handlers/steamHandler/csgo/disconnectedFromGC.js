module.exports.init = (steamUser, csgoClient, bot, config) => {
  csgoClient.on('disconnectedFromGC', (reason) => {
    bot.log.warn('CSGO client is no longer ready! Reason: ' + reason);
    bot.editStatus('online', {
      name: '🛑 | CS:GO Down!'
    });
    bot.responding = false;
  });
};
