const Steam        = require('steam');
const CSGO         = require('globaloffensive');
const User         = require('steam-user');
const SteamTotp    = require('steam-totp');

const fs           = require('fs');
const path         = require('path');

const handlerTypes = ['csgo', 'user'];

module.exports = (bot, config) => {
  let steamUser    = new User();
  let csgoClient   = new CSGO(steamUser);
  csgoClient.GCConnectionStatus = Object.keys(CSGO.GCConnectionStatus);
  steamUser.EResult = User.EResult;
  

  bot.csgoClient = csgoClient;

  handlerTypes.forEach((handlerType) => {

    fs.readdir(path.join(__dirname, handlerType), (error, events) => {
      if (error) throw error; // TODO: Error handling

      for (let i = 0; i < events.length; i++) {
        let event = require(path.join(__dirname, handlerType, events[i]));
        try {
          event.init(steamUser, csgoClient, bot, config);
        } catch (err) {
          bot.log.error(err);
        }
      }
      bot.log.info('Loaded ' + events.length + ' ' + handlerType + ' events!');
    });

  });

  steamUser.logOn({
    accountName: config.steam.username,
    password: config.steam.password,
    twoFactorCode: SteamTotp.generateAuthCode(config.steam.shared_secret),
    logonID: 1337,
    machineName: 'node-csgo-discord'
  });

}
