module.exports.init = (steamClient, steamUser, steamFriends, csgoClient, bot, config) => {
  csgoClient.on('ready', () => {
    bot.log.info('CSGO logged on!');
    bot.editStatus('online', {
      name: '👍 | CS:GO Up!'
    });
    bot.responding = true;
  });
};
