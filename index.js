const Discord = require('discord.js');
const cron = require('cron');

const bot = new Discord.Client();

const token = 'NzI1ODUxMDY4NDE1ODY4OTQ4.XvUwDQ.bFLnlTcIfPnlKIr8OF34w80CisY';

bot.on('ready', () => {
    console.log("bot is up");
    bot.channels.cache.get("725851446511272029").send("@everyone" + " Flag Race will begin in 5 minutes!");
    // bot.channels.cache.get("725851446511272029").send("yo");
    // console.log(bot.channels);
})

bot.on('message', msg=> {
    if(msg.content === "HELLO") {
        msg.reply("HI BB");
    }
})

// 5 AM
// 12 PM
// 2 PM 
// 3 PM 
// 4 PM

let scheduledMessage = new cron.CronJob('00 55 05,12,14,15,16  * * *', () => {
    console.log("hello");
    bot.channels.cache.get("725851446511272029").send("@everyone" + " Flag Race will begin in 5 minutes!");
});

bot.on('message', (message) => {

});

scheduledMessage.start();

bot.login(token);
