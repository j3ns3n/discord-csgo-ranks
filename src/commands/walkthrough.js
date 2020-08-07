module.exports = {
  name: 'walkthrough',
  description: 'A gif of how to link accounts.',
  visible: true,
  helpInfo: '<PREFIX>walkthrough',
  permissionLevel: [],
  execute: (bot, config, msg) => {
    msg.channel.createMessage({
      embed: {
        title: 'CS:GO Rank Bot | Walkthrough',
        type: 'gifv',
        image: {
          url: 'https://please.get-some.help/XcXFJBX.gif'
        },
        color: 16716947
      }
    });
  }
}
