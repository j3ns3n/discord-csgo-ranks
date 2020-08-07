const SteamTotp = require('steam-totp');

module.exports.init = (steamClient, steamUser, steamFriends, csgoClient, bot, config) => {
  steamClient.on('connected', () => {
    bot.log.info('Connected to Steam servers, now logging in...');
    SteamTotp.getTimeOffset((offset) => {
      steamUser.logOn({
        account_name: config.steam.username,
        password: config.steam.password,
        two_factor_code: SteamTotp.generateAuthCode(config.steam.shared_secret, offset)
      });
    });
  });
};
