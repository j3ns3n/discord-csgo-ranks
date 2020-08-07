const steamid = require('steamid-parser');
const path = require('path');
const config = require(path.join(__dirname, '../config.json'));

const parser = new steamid(config.steam.apikey, { // Options object are set by default to these values
	checkForAccountID: false,
	checkNumberForVanity: true
});

module.exports = {
  name: 'link',
  description: 'Link your Discord and Steam accounts within the bot.',
  visible: true,
  helpInfo: '<PREFIX>link <steam account link>',
  permissionLevel: [],
  execute: (bot, config, msg) => {
    if (msg.channel.type === 1) return msg.channel.createMessage(':exclamation: │ This command cannot be used in a Direct Message.');

    if (!bot.responding) return msg.channel.createMessage(':octagonal_sign: | CS:GO is down right now, this command wont work!');

    bot.db.getUser(msg.member.id, (err, user) => {
      if (err) bot.log.error(err);
      if (user != null) {
        return msg.channel.createMessage(':warning: │ You already have a' + (user.confirmed ? ' verified ' : 'n unverified ') + 'Steam account. Use `cs.unlink` to unlink it ' +  (user.confirmed ? '' : 'or message the Steam bot the code sent to your Discord DMs') + '.');
      } else {
        let reg = /(?:https?:\/\/)?steamcommunity\.com\/(?:profiles|id)\/[a-zA-Z0-9]+/;

        let link = msg.content.toLowerCase().split(' ')[msg.content.toLowerCase().split(' ').length - 1];
        if (link.match(reg)) {
          let generatedString = makeid(16);

          try {
            msg.author.getDMChannel().then((dmchannel) => {
              dmchannel.createMessage(':exclamation: │ Please add the Steam bot @ <https://steamcommunity.com/profiles/76561199056234052/> and send it the code: `' + generatedString + '` as a message.');
            });
            msg.channel.createMessage(':exclamation: │ Please add the bot @ <https://steamcommunity.com/profiles/76561199056234052/> and send it a message with the code in your Discord DMs.');
            parser.get(link)
              .then(res => {
                bot.db.addUser(msg.member.id, res.getSteamID64(true), generatedString);
              })
              .catch(err => {
                bot.log.error(err);
              });
            } catch (error) {
              bot.log.error(error);
              msg.channel.createMessage(':exclamation: │ Hmm, it seems we can\'t send you Direct Messages, please allow DMs from this server to continue!');
            }

        } else {
          return msg.channel.createMessage(':exclamation: | I need a valid Steam account link to continue.');
        }
      }
    });
  }
}

function makeid(length) {
  let result           = '';
  let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/*
this.name = args.name;
this.description = args.description;
this.visible = args.visible;
this.helpInfo = args.helpInfo;
this.function = args.execute;
this.permissionLevel = args.permissionLevel;
*/
