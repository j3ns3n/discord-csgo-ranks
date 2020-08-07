module.exports = {
  name: 'help',
  description: 'Shows the command list.',
  visible: true,
  helpInfo: '<PREFIX>help',
  permissionLevel: [],
  execute: (bot, config, msg) => {
    let commandList = [];
    bot.commands.map((command) => {
      let cmdString = '`cs.' + command.name + '` | ' + command.description + '\nUsage: `' + command.helpInfo.replace('<PREFIX>', 'cs.') + '`';
      commandList.push(cmdString);
    });
    msg.channel.createMessage({
      embed: {
        title: 'CS:GO Rank Bot | Help',
        type: 'rich',
        description: commandList.join('\n'),
        color: 16716947
      }
    });
  }
}
