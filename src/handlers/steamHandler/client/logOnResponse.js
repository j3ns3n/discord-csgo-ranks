const Steam = require('steam');

module.exports.init = (steamClient, steamUser, steamFriends, csgoClient, bot, config) => {
  steamClient.on('logOnResponse', (res) => {
    switch(res.eresult) {
      case Steam.EResult.OK:
        bot.log.info('Steam logged on!')
        csgoClient.launch();
        break;

      case Steam.EResult.AccountLogonDenied:
      case Steam.EResult.AccountLoginDeniedNeedTwoFactor:
      case Steam.EResult.TwoFactorCodeMismatch:
        bot.log.error(JSON.stringify(res));
        // Call disconnect manually so we don't receive 'error' event
        steamClient.disconnect();

        // Let's reconnect
        steamClient.connect();
        break;

      default:
        steamClient.disconnect();
    }
  });
};
