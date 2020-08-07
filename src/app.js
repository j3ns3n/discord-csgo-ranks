const Eris    = require('eris');

const fs      = require('fs');
const path    = require('path');

const Command = require(path.join(__dirname, 'structures/Command.js'));
const Collection = require(path.join(__dirname, 'structures/Collection.js'));
const dbHandler = require(path.join(__dirname, './handlers/databaseHandler'));

const config = require(path.join(__dirname, 'config.json'));

let bot = new Eris(config.discord.token);

bot.log = {};

bot.responding = false;

bot.discordRoleHandler = require(path.join(__dirname, './handlers/discordRoleHandler'));
bot.playerDataHandler = require(path.join(__dirname, './handlers/playerDataHandler'));
bot.db = new dbHandler(config.mongodb.link, config);

require(path.join(__dirname, './handlers/loggers'))(bot, config);

bot.commands = new Collection();

fs.readdir(path.join(__dirname, 'commands'), (error, commands) => {
  if (error) throw bot.log.error(error);

  for (let i = 0; i < commands.length; i++) {
    let command = require(path.join(__dirname, 'commands', commands[i]));
    bot.commands.set(command.name, new Command(command, commands[i]));
  }
  bot.log.info('Loaded ' + commands.length + ' commands!')

  fs.readdir(path.join(__dirname, 'events'), (error, events) => {
    if (error) throw bot.log.error(error);
    for (let i = 0; i < events.length; i++) {
      require('./events/' + events[i])(bot, config);
      if (i === events.length - 1) {
        bot.log.info('Loaded ' + events.length + ' events!')
        bot.connect();
      }
    }
  });
});
