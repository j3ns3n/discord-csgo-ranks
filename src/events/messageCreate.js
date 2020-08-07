module.exports = (bot, config) => {
	bot.on('messageCreate', (msg) => {
		let prefix = 'cs.';
    if (!bot.ready || !msg || !msg.author || msg.author.bot) return;
    if (!msg.content.toLowerCase().startsWith(prefix)) return;

    const command = bot.commands.filter((c) => c.name == msg.content.toLowerCase().replace(prefix, '').split(' ')[0]);
  	if (command.length < 1) return;

  	try {
  		command[0].execute(bot, config, msg);
  	} catch (e) {
  		msg.channel.createMessage(':x: │ An error occurred while running that command. :(');
			bot.log.error(e);
  	}
  });
};
