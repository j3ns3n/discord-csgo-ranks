module.exports = (bot, config, userid, newrank) => {
  bot.db.getRoles(config.discord.serverid, (err, roles) => {
    if (err) return bot.log.error(err);
    try {
      let guild = bot.guilds.get(config.discord.serverid);
      let member = guild.members.get(userid);
      Object.values(roles).forEach((role) => {
        if (member.roles.includes(role)) {
          member.removeRole(role);
        }
      });
      
      member.addRole(roles[newrank]);
    } catch (error) {
      bot.log.error(error);
    }
  });
}
