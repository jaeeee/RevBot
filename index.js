const config = require('config');
const Discord = require('discord.js');
const cron = require('cron');
// const configuration = require('config.js');

const bot = new Discord.Client();

let token = config.get('token.key');

const channelID = '725851446511272029';

bot.on('ready', () => {
    console.log("bot is up");
    // bot.channels.cache.get(channelID).send("@everyone" + " Flag Race will begin in 5 minutes!");
})

let scheduledMessage = new cron.CronJob('00 55 5,12,14,15,16  * * *', () => {
    // 5 AM
// 12 PM
// 2 PM 
// 3 PM 
// 4 PM
    // console.log("hello");
    bot.channels.cache.get(channelID).send("@everyone" + " Flag Race will begin in 5 minutes!");
});

bot.on('message', (message) => {

});

scheduledMessage.start();

bot.login(token);
