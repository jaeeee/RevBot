const config = require('config');
const Discord = require('discord.js');
const cron = require('cron');

const bot = new Discord.Client();

let token = config.get('token.key');

const channelID = '725851446511272029';

bot.on('ready', () => {
    console.log("bot is up");
    // bot.channels.cache.get(channelID).send("@everyone" + " I am back!");
})

let scheduledMessage = new cron.CronJob('00 55 5,12,14,15,16  * * *', () => {
    bot.channels.cache.get(channelID).send("@everyone" + " Flag Race will begin in 5 minutes!");
});

bot.on('message', msg=> {
    if (msg.content === "!flag") {
        msg.reply({embed: {
            color: 3447003,
            author: {
              name: bot.user.username,
              icon_url: bot.user.avatarURL
            },
            title: "Flag Race Times",
            // url: "http://google.com",
            description: "I will announce flag race 5 minutes before each time in the flag announcement channel!",
            fields: [{
                name: "Please attend our flag races!",
                value: "**__PDT (UTC -7): 5:00 AM, 12:00 PM, 2:00 PM, 3:00 PM, and 4:00 PM\n" +
                "EDT (UTC -4): 8:00 AM, 3:00 PM, 5:00 PM, 6:00 PM, and 7:00 PM\n" +
               "CEST (UTC +2): 2:00 PM, 9:00 PM, 11:00 PM, 12:00 AM, and 1:00 AM\n" +
               "AEST (UTC +10): 10:00 PM, 5:00 AM, 7:00 AM, 8:00 AM, and 9:00 AM\n__**"
              },
            ],
            timestamp: new Date(),
            footer: {
              icon_url: bot.user.avatarURL,
              text: "© Revenance's Favorite Bot!"
            }
          }
        });
    }
});

scheduledMessage.start();

bot.login(token);
