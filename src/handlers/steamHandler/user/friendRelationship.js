module.exports.init = (steamUser, csgoClient, bot, config) => {
  steamUser.on('friendRelationship', (steamID, relationship) => {
    if (relationship == 2) {
      steamUser.addFriend(steamID);
      steamUser.chat.sendFriendMessage(steamID, 'Hi! Please send me the code you were sent on Discord to link your accounts!');
    }
  });
};
