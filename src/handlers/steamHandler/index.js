const Steam        = require('steam');
const CSGO         = require('csgo');

const fs           = require('fs');
const path         = require('path');

const handlerTypes = ['client', 'csgo', 'friends'];

module.exports = (bot, config) => {
  let steamClient  = new Steam.SteamClient();
  let steamUser    = new Steam.SteamUser(steamClient);
  let steamGC      = new Steam.SteamGameCoordinator(steamClient, 730);
  let steamFriends = new Steam.SteamFriends(steamClient);
  let csgoClient   = new CSGO.CSGOClient(steamUser, steamGC, false);

  bot.csgoClient = csgoClient;

  handlerTypes.forEach((handlerType) => {

    fs.readdir(path.join(__dirname, handlerType), (error, events) => {
      if (error) throw error; // TODO: Error handling

      for (let i = 0; i < events.length; i++) {
        let event = require(path.join(__dirname, handlerType, events[i]));
        try {
          event.init(steamClient, steamUser, steamFriends, csgoClient, bot, config);
        } catch (err) {
          bot.log.error(err);
        }
      }
      bot.log.info('Loaded ' + events.length + ' ' + handlerType + ' events!');
    });

  });

  steamClient.connect();

}
