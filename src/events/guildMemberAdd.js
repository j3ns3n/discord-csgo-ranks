module.exports = (bot, config) => {
  bot.on('guildMemberAdd', (guild, member) => {
    if (!config.discord.defaultRole.enabled) return;
    member.addRole(config.discord.defaultRole.roleid);
    member.user.getDMChannel().then((dmchannel) => {
      dmchannel.createMessage({
        embed: {
          title: 'Welcome!',
          type: 'rich',
          description: 'Welcome to the server, thank you for joining! You have been automatically assigned the \'Waiting for Rank\' role, please follow the GIF tutorial below in <#701820150839771641> to link your Steam and Discord accounts within our ranking bot and have your CS:GO rank automatically applied.\nTo begin, type `cs.link <Your Steam account link>` in <#701820150839771641>!',
          image: {
            url: 'https://please.get-some.help/XcXFJBX.gif'
          },
          color: 16716947
        }
      });
    });
  });
};
