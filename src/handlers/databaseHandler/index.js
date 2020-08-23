const mongodb = require('mongodb');

class databaseHandler {

  constructor(mongoUrl, config) {
    this.config = config;
    this.MongoClient = new mongodb.MongoClient(mongoUrl, {
      useUnifiedTopology: true,
      loggerLevel: 'error'
    });

    this.MongoClient.connect((err, client) => {
      if (err) return console.error(err.stack);
      this.client = client;
    });
  }

  getUser(userID, callback) {
    this.client.db(this.config.mongodb.dbname).collection(this.config.mongodb.collections.accounts).findOne({
      '_id': {'$eq': userID.toString()}
    }, (err, result) => {
      if (err) {
        callback(err, null);
      }
      else if (result) {
        callback(null, result);
      } else {
        callback(null, null);
      }
    });
  }

  addUser(userID, steamID, authkey) {
    this.client.db(this.config.mongodb.dbname).collection(this.config.mongodb.collections.accounts).insertOne({
      _id: userID.toString(),
      steamid: steamID.toString(),
      csgoid: null,
      authcode: authkey.toString(),
      confirmed: false,
      rank: -1
    }, (err, result) => {
      if (err) {
        return console.error(error);
      }
    });
  }

  deleteUser(userID) {
    this.client.db(this.config.mongodb.dbname).collection(this.config.mongodb.collections.accounts).deleteOne({
      '_id': {'$eq': userID.toString()}
    }, (err, result) => {
      if (err) {
        return console.error(error);
      }
    });
  }

  getUserFromCSGOID(csgoID, callback) {
    this.client.db(this.config.mongodb.dbname).collection(this.config.mongodb.collections.accounts).findOne({
      'csgoid': {'$eq':csgoID.toString()}
    }, (err, result) => {
      if (err) {
        callback(err, null);
      }
      else if (result) {
        callback(null, result);
      } else {
        callback(null, null);
      }
    });
  }

  updateCSGOData(bot, csgoID, profile) {
    this.client.db(this.config.mongodb.dbname).collection(this.config.mongodb.collections.accounts).updateOne({
      'csgoid': {'$eq': csgoID.toString()}
    },
    {
      $set: {
        'rank': profile.ranking.rank_id,
        'profileData': profile
      }
    }, {ignoreUndefined: true}, (err, result) => {
      if (err) return console.error(err);
    });
  }

  getUserFromSteamID(steamID, callback) {
    this.client.db(this.config.mongodb.dbname).collection(this.config.mongodb.collections.accounts).findOne({
      'steamid': {'$eq': steamID.toString()}
    }, (err, result) => {
      if (err) {
        callback(err, null);
      }
      else if (result) {
        callback(null, result);
      } else {
        callback(null, null);
      }
    });
  }

  updateUserConfirmed(userID, csgoID) {
    this.client.db(this.config.mongodb.dbname).collection(this.config.mongodb.collections.accounts).updateOne({
      'steamid': {'$eq': userID.toString()}
    },
    {
      $set: {
        'csgoid': csgoID.toString(),
        'confirmed': true
      }
    },
    {
      ignoreUndefined: true
    }, (err, result) => {
      if (err) return console.error(err);
    });
  }

  getRoles(serverID, callback) {
    this.client.db(this.config.mongodb.dbname).collection(this.config.mongodb.collections.roles).findOne({
      '_id': {'$eq': serverID.toString()}
    }, (err, result) => {
      if (err) {
        callback(err, null);
      }
      else if (result) {
        callback(null, result);
      } else {
        callback(null, null);
      }
    });
  }

}

module.exports = databaseHandler;
