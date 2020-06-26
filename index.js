const config = require('config');
const Discord = require('discord.js');
const cron = require('cron');

const bot = new Discord.Client();

let token = config.get('token.key');

const channelID = '725873677278773320';

bot.on('ready', () => {
    // bot.off();
    console.log("bot is up");
    // bot.user.setStatus("Flag Race announcement bot. Use !flag for flag race times.");
    bot.user.setActivity("dead");
    // bot.user.setStatus("slave to Revenance");
    // bot.user.setPresence("");
    // bot.channels.cache.get(channelID).send("@everyone" + " I am back!");
})

let scheduledMessage = new cron.CronJob('00 55 5,12,14,15,16  * * *', () => {
    bot.channels.cache.get(channelID).send("@everyone" + " :triangular_flag_on_post: Flag Race will begin in **_5 minutes_**! :triangular_flag_on_post:");
});

bot.on('message', msg=> {
    // if (msg.content == "announcement") {
    //     bot.channels.cache.get(channelID).send("@everyone" + " :triangular_flag_on_post: Flag Race will begin in **_5 minutes_**! :triangular_flag_on_post:");
    // }
    if (msg.content === "!flag") {
        msg.reply({embed: {
            color: 3447003,
            author: {
              name: bot.user.username,
              icon_url: bot.user.avatarURL
            },
            title: ":triangular_flag_on_post: Flag Race Times :triangular_flag_on_post:",
            // url: "http://google.com",
            description: "I will announce flag race 5 minutes before each time in the #flag-announcements!",
            fields: [{
                name: "Please attend our flag races, we get points even if you just AFK!",
                value: "**__:clock5: PDT (UTC -7): 5:00 AM, 12:00 PM, 2:00 PM, 3:00 PM, and 4:00 PM\n" +
                ":clock8: EDT (UTC -4): 8:00 AM, 3:00 PM, 5:00 PM, 6:00 PM, and 7:00 PM\n" +
               ":clock2: CEST (UTC +2): 2:00 PM, 9:00 PM, 11:00 PM, 12:00 AM, and 1:00 AM\n" +
               ":clock10: AEST (UTC +10): 10:00 PM, 5:00 AM, 7:00 AM, 8:00 AM, and 9:00 AM\n__**"
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
