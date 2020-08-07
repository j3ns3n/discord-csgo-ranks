const handler = (bot, config, csgoClient, profile) => {

  if (!profile) return;

  let account_id = profile.account_id;


  if (profile.ranking == null) return;
  if (profile.rankings.filter(r => r.rank_type_id == 6).rank_id == null) return;

  bot.db.getUserFromCSGOID(account_id, (err, user) => {
    if (err) {
      return bot.log.error(err);
    }

    if (user.rank == profile.rankings.filter(r => r.rank_type_id == 6).rank_id) return;

    let rank_id = profile.ranking.filter(r => r.rank_type_id == 6).rank_id;


    bot.db.updateUserRank(bot, account_id, rank_id);

    bot.discordRoleHandler(bot, config, user._id, rank_id);
  });
}
module.exports = handler;
