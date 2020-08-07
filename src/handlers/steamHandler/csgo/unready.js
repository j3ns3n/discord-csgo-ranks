module.exports.init = (steamClient, steamUser, steamFriends, csgoClient, bot, config) => {
  csgoClient.on('unready', () => {
    bot.log.warn('CSGO client is no longer ready!');
    bot.editStatus('online', {
      name: '🛑 | CS:GO Down!'
    });
    bot.responding = false;
  });
};
