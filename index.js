const config = require('config');
const Discord = require('discord.js');
const cron = require('cron');

// const bot = new Discord.Client();

const bot = new Discord.Client({
  partials:  ['MESSAGE', 'CHANNEL', 'REACTION']
});

let token = config.get('token.key');

const channelID = '725873677278773320';


bot.on('ready', () => {
  // bot.off();
  console.log("bot is up");
  // bot.user.setStatus("Flag Race announcement bot. Use !flag for flag race times.");
  bot.user.setActivity("dead");
  // bot.channels.cache.get(channelID).send("<@&725880768659980330>" + " :triangular_flag_on_post: Flag Race will begin in **_5 minutes_**! :triangular_flag_on_post:");
  // bot.user.setStatus("slave to Revenance");
  // bot.user.setPresence("");
  // bot.channels.cache.get(channelID).send("I am back online!");
  // bot.channels.cache.get(channelID).send("rawr");
  scheduledMessage.start();

})

let scheduledMessage = new cron.CronJob('00 55 5,12,14,15,16  * * *', () => {
  bot.channels.cache.get(channelID).send("<@&725880768659980330>" + " :triangular_flag_on_post: Flag Race will begin in **_5 minutes_**! :triangular_flag_on_post:");
});

bot.on('message', msg => {
  // if (msg.content == "rawr") {
  //     bot.channels.cache.get(channelID).send("<@&725880768659980330>" + " :triangular_flag_on_post: Flag Race will begin in **_5 minutes_**! :triangular_flag_on_post:");
  // }
  if (msg.content === "!flag") {
    msg.reply({
      embed: {
        color: 3447003,
        author: {
          name: bot.user.username,
          icon_url: bot.user.avatarURL
        },
        title: ":triangular_flag_on_post: Flag Race Times :triangular_flag_on_post:",
        // url: "http://google.com",
        description: "I will announce flag race 5 minutes before each time in #flag-announcements!",
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

bot.on('messageReactionAdd', async (reaction, user) => {
	// When we receive a reaction we check if the reaction is partial or not
	if (reaction.partial) {
		// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
		try {
			await reaction.fetch();
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
  }
  if (reaction.message.id == 725894587813724202) {
    console.log("correct");
    const member = reaction.message.member;
    member.roles.set([])
  .then(member => console.log(`Member roles is now of ${member.roles.cache.size} size`))
  .catch(console.error);
	// Now the message has been cached and is fully available
	console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
	// The reaction is now also fully available and the properties will be reflected accurately:
	console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
  }
});


bot.login(token);