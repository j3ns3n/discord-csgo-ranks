const handler = (bot, config, csgoClient, profile) => {

  if (!profile) return;

  let account_id = profile.account_id;


  if (profile.ranking == null) return;
  if (profile.ranking.rank_id == null) return;

  bot.db.getUserFromCSGOID(account_id, (err, user) => {
    if (err) {
      return bot.log.error(err);
    }
    if (!user) return;

    if (user.rank == profile.ranking.rank_id) return;

    let rank_id = profile.ranking.rank_id;


    bot.db.updateCSGOData(bot, account_id, profile);

    bot.discordRoleHandler(bot, config, user._id, rank_id);
  });
}
module.exports = handler;
