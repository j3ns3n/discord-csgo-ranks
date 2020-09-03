const Steam = require('steam');

module.exports.init = (steamUser, csgoClient, bot, config) => {
  steamUser.on('loggedOn', (res) => {
    if (res.eresult == Steam.EResult.OK) {
      bot.log.info('Steam logged on!');
      steamUser.setPersona(1);
      steamUser.gamesPlayed([730]);
      setTimeout(() => {
        if (!bot.responding) {
          bot.relog();
        }
      }, 60 * 1000)
    };
  });
}
