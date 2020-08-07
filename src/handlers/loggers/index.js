module.exports = (bot, config) => {
    require('./error.js')(bot, config);
    require('./warn.js')(bot, config);
    require('./info.js')(bot, config);
}
