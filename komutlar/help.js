const Discord = require('discord.js')
const disbut = require('discord-buttons') 
const db = require("quick.db") 
exports.run = async (client, message, args) => {
 // if(fetchb) return message.channel.send("**Maintance** Mode Has Enabled! ") 
  let kontrol = db.fetch(`bakim`)
  if(kontrol == true) return message.channel.send("**Maintance** Mode Has Enabled! Commands Will Be Using Owners. ") 
  else {
  const embed_ = new Discord.MessageEmbed()
 .setImage("")
  /*.setDescription(`
  Hello I Am Greesy !  Me Using ${client.guilds.cache.size} Guild
  filterlicem mk kateqoriye gore
  !invite  - invite the bot
  
  
  
  `)*/
 .setAuthor(message.author.username , message.author.avatarURL({dynamic: true}))
 .setTitle('Greesy | Help Menu')
 .setDescription(`
 
 > Systems Will Run Faster If You Keep **@Greesy** Role at The Highest Level! 
 
  👮 ¦ **Moderation;** - Moderator-Specific Standard or Important Commands! 
   \`ban, kick, banlog, kicklog, , badwordblock-log, slowmode, clear\`
  🗨 ¦ **Economy;** - How about a fun? Save Money and Enjoy the Economic System! [Maintance!] 
   \`daily, voteaward, shop, yearlyaward \`
  🤠 ¦ **Fun**; - Here are the commands for fun :) 
   \`beaman, meme \`
  📥 ¦ **Plugins**; - Do You Want to Make the Bot Or Server Even More Useful? Then try it. 
    \`enable-cmd, disable-cmd\`
    
      **ANNOUNCUMENTS**
      \`\`\`
      ${db.fetch(`duyuru`) || "Database Error : Annoucument Not Found  "}
      \`\`\`
 `) 
  .setColor("#3437eb")//white
 .setFooter("Greesy © - All Rights Reserved! ")
  const davet = new disbut.MessageButton() 
 .setStyle('url', 'blurple') 
 .setURL("https://grees.negodev.tk")//qasidevi  oaoaoa
  .setLabel("Invite")
  const docs = new disbut.MessageButton() 
 .setStyle('blurple') 
 .setID("test")
  .setLabel("Documentation")
  .setDisabled()
  const dash = new disbut.MessageButton() 
 .setStyle("url", "green") 
 //.setID('XD')
 .setURL("https://greesy.negodev.tk/")
  .setLabel("Dashboard")
// .setDisabled()
  const sp = new disbut.MessageButton() 
 .setStyle("url")
  .setURL("https://discord.io/greedybot")
  .setLabel("Suport Server") 
message.channel.send('', {embed: embed_, buttons: [davet, sp, dash, docs]});



 } 
  
};
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ["help"]
};
exports.help = {
	name: 'yardim',
	description: 'Botu Yeniden Başlatır.',
	usage: 'yardim'
};