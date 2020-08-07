module.exports.init = (steamClient, steamUser, steamFriends, csgoClient, bot, config) => {
  steamFriends.on('friend', (steamID, relationship) => {
    if (relationship == 2) {
      steamFriends.addFriend(steamID);
      steamFriends.sendMessage(steamID, 'Hi! Please send me the code you were sent on Discord to link your accounts!');
    }
  });
};
