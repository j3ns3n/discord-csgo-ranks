module.exports.init = (steamUser, csgoClient, bot, config) => {
  csgoClient.on('connectedToGC', () => {
    bot.log.info('CSGO logged on!');
    bot.editStatus('online', {
      name: '👍 | CS:GO Up!'
    });
    bot.responding = true;
  });
};
