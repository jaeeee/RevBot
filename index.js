const config = require('config');
const Discord = require('discord.js');
const cron = require('cron');

// const bot = new Discord.Client();

const bot = new Discord.Client({
  partials:  ['MESSAGE', 'CHANNEL', 'REACTION']
});

let token = config.get('token.key');

const channelID = '725873677278773320';
const botChannelID = '504562059279728640';


bot.on('ready', () => {
  // bot.off();
  console.log("bot is up");
  // bot.user.setStatus("Flag Race announcement bot. Use !flag for flag race times.");
  bot.user.setActivity("roast beef");
  // bot.channels.cache.get("199218706029608961").send("rawr");
  // bot.channels.cache.get(channelID).send("<@&725880768659980330>" + " :triangular_flag_on_post: Flag Race will begin in **_5 minutes_**! :triangular_flag_on_post:");
  // bot.user.setStatus("slave to Revenance");
  // bot.user.setPresence("");
  // bot.channels.cache.get(channelID).send("I am back online!");
  // bot.channels.cache.get(channelID).send("rawr");

})

// let scheduledMessage = new cron.CronJob('00 00 5,12,14,15,16  * * *', () => {
//   console.log("fire now (1)");
//   bot.channels.cache.get(channelID).send("<@&725880768659980330>" + " :triangular_flag_on_post: Flag Race will begin in **_NOW_**! :triangular_flag_on_post:");
// });

let scheduledMessage2 = new cron.CronJob('00 55 4,11,13,14,15  * * *', () => {
  // console.log("fire now (2)");
  console.log("sending flag announcement");
  bot.channels.cache.get(channelID).send("<@&725880768659980330>" + " :triangular_flag_on_post: Flag Race will begin in **_5 minutes_**! :triangular_flag_on_post:");
});


let dailyMessage = new cron.CronJob('00 00 17 * * *', () => {
  // console.log("fire now (2)");
  console.log("sending daily message");
  bot.channels.cache.get("199218706029608961").send("Hello everyone, happy reset! This is just a daily reminder to check in and GP cap. Thank you!");
});

let gpqMessage = new cron.CronJob('00 00 20 * * 5', () => {
  // console.log("fire now (2)");
  console.log("sending GPQ message");
  bot.channels.cache.get("199218706029608961").send("Hello everyone, we will be starting Guild PQ in **_1 hour_**. See you all there!");
});

let gpqMessage2 = new cron.CronJob('00 30 20 * * 5', () => {
  // console.log("fire now (2)");
  console.log("sending GPQ (2) message");
  bot.channels.cache.get("199218706029608961").send("Hello everyone, we will be starting Guild PQ in **_30 minutes_**. See you all there!");
});

bot.on('message', msg => {
  // if (msg.content == "rawr") {
  //     bot.channels.cache.get(channelID).send("<@&725880768659980330>" + " :triangular_flag_on_post: Flag Race will begin in **_5 minutes_**! :triangular_flag_on_post:");
  // }
  if (msg.content === "!notifs") {
    if(msg.member.roles.cache.some(r=>["flaggers"].includes(r.name))) {
      // console.log(`Yay, the author of the message has the role!`);
      let role = msg.guild.roles.cache.find(r => r.name === "flaggers");
      const guildMember = msg.member;
      guildMember.roles.remove(role).catch(console.error);
      msg.reply("You will no longer receive Flag Race notifications.");
    } else {
      // console.log(`Nope, noppers, nadda.`);
      let role = msg.guild.roles.cache.find(r => r.name === "flaggers");
      const guildMember = msg.member;
      guildMember.roles.add(role).catch(console.error);
      msg.reply("You have signed up for Flag Race notifications!");
    }
  }

  // if (msg.content === "jae") {
  //   msg.reply("jaebg");
  // }

  // if (msg.content === "gg") {
  //   msg.reply("ggpeter");
  // }

  if (msg.content === "!help" || msg.content === "commands"  && msg.channel.id === botChannelID) {
    msg.reply("Currently available commands: !flag, !notifs, !ia, !starforce, !flames, !cubing");
  }

  if (msg.content === "!ia" && msg.channel.id === botChannelID) {
    msg.reply("\nHowTo: <https://imgur.com/a/PkyibM0> \nStats: <https://strategywiki.org/wiki/MapleStory/Inner_Ability> \nBiS guide (not mine): <https://bit.ly/3a0dAML>");
  }

  if (msg.content === "!starforce" && msg.channel.id === botChannelID) {
    msg.reply("\nFull numbers: <https://strategywiki.org/wiki/MapleStory/Spell_Trace_and_Star_Force> \nCalculator: <https://jsbin.com/bewimaxasa/1> \nExpected cost+boom: <https://bit.ly/2YZT3Fa>");
  }

  if (msg.content === "!flames" && msg.channel.id === botChannelID) {
    msg.reply("\nGuide: <https://bit.ly/2zHMInA> \nCalculator: <https://output.jsbin.com/tacijeq>");
  }

  if (msg.content === "!cubing" && msg.channel.id === botChannelID) {
    msg.reply("\nCubing Calculator: <https://jsfiddle.net/SuckHard/gp5mjc0v/show> \nCubing Sim: <https://stripedypaper.github.io/cube/>");
  }

  if (msg.content === "!flag" && msg.channel.id === botChannelID) {
    msg.reply({
      embed: {
        color: 3447003,
        author: {
          name: bot.user.username,
          icon_url: bot.user.avatarURL
        },
        title: ":triangular_flag_on_post: Flag Race Times :triangular_flag_on_post:",
        // url: "http://google.com",
        description: "Type **_!notifs_** to enable notifications. I will announce Flag Race 5 minutes before each time in #flag-announcements!",
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

// bot.on('messageReactionAdd', async (reaction, user) => {
// 	// When we receive a reaction we check if the reaction is partial or not
// 	if (reaction.partial) {
// 		// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
// 		try {
// 			await reaction.fetch();
// 		} catch (error) {
// 			console.log('Something went wrong when fetching the message: ', error);
// 			// Return as `reaction.message.author` may be undefined/null
// 			return;
// 		}
//   }
//   if (reaction.message.id == 725894587813724202) {
//     console.log("correct");
//     const member = reaction.message.member;
//     member.roles.set([])
//   .then(member => console.log(`Member roles is now of ${member.roles.cache.size} size`))
//   .catch(console.error);
// 	// Now the message has been cached and is fully available
// 	console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
// 	// The reaction is now also fully available and the properties will be reflected accurately:
// 	console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
//   }
// });

// scheduledMessage.start();
dailyMessage.start();
scheduledMessage2.start();
gpqMessage.start();
gpqMessage2.start();
bot.login(token);