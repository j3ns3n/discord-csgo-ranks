const handler = (bot, config, csgoClient, profile) => {

  let account_id = profile.account_profiles[0].account_id;

  if (!profile.account_profiles[0]) return;
  if (profile.account_profiles[0].ranking == null) return;
  if (profile.account_profiles[0].ranking.rank_id == null) return;

  bot.db.getUserFromCSGOID(account_id, (err, user) => {
    if (err) {
      return bot.log.error(err);
    }

    if (user.rank == profile.account_profiles[0].ranking.rank_id) return;

    let rank_id = profile.account_profiles[0].ranking.rank_id;


    bot.db.updateUserRank(bot, account_id, rank_id);

    bot.discordRoleHandler(bot, config, user._id, rank_id);
  });
}
module.exports = handler;
