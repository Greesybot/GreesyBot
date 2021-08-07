const Nuggies = require('nuggies');
const ms = require('ms')
//const ms = require("ms");

const path = require("path");
const db = require("croxydb") 
module.exports.run = async (client, message, args) => {
//let açıkmı = await db.fetch(`pre_${message.author.id}`)
 // if(açıkmı) {
  /*
	let requirements;
	let prize;
	if (!message.member.hasPermission('MANAGE_GUILD')) return message.reply("Your Don't Permission Use This Command! ") //message.reply('<:carpi:855750448711467058> Bu Komudu kullanmaya yetkin yok!');
	if (!args[1]) return message.reply('Please Type `{time} {winners} {prize}` ');
	if (isNaN(parseInt((args[1])))) return message.reply('Please Write Winner Count/', { allowedMentions: { repliedUser: false } });
	if (!args[1]) return message.reply('Please Write Giveaway time! ', { allowedMentions: { repliedUser: false } });
	if (!ms(args[0])) return message.reply('Please Write Time! Example: `1m 1w`', { allowedMentions: { repliedUser: false } });
	if (!args.slice(2).join(' ')) return message.reply('Please Write Prize!', { allowedMentions: { repliedUser: false } });
	const host = message.author.id;
	const winners = parseInt(args[1]);
	if (args[2].endsWith('[role]')) {
		const role = args[2].replace('[role]', '');
		const check = message.guild.roles.cache.get(role);
		if (!check) return message.channel.send('please provide a valid role!');
		requirements = { enabled: true, roles: [role] };
		prize = args.slice(3).join(' ');
	}
	else {
		prize = args.slice(2).join(' ');
		requirements = { enabled: false };
	}

	Nuggies.giveaways.create({
		message: message,
		prize: prize,
		host: host,
		winners: winners,
		endAfter: args[0],
		requirements: requirements,
		channel: message.channel.id,
	}); /*else { return message.channel.send(new Discord.MessageEmbed()
 .setDescription(`Bu komut premiumlulara özel!
Premium almak için [Destek sunucumuzu](https://discord.gg/KZfAEjrPUF) ziyaret et!`)*/
//.setTimestamp()
  let hasPerm = message.member.hasPermission("MANAGE_MESSAGES");
  let hasRole = message.member.roles.cache.find(r => r.name === "Giveaways");

    if (hasPerm === false || !hasRole == null) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("**Greesy | GiveAway**")
          .setColor("RED")
          .setDescription(
            "."
          )
          .setTimestamp()
      );
    }

    if (!args[0]) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("**Hata**")
          .setColor("RANDOM")
          .setDescription(
            "Lütfen çekilişin süresini girin.\n\n**Kullanımı:** \n **Saniye: s \n Dakika: m \n Saat: h \n Gün: d** \n \n **1.Adım:** g.başlat <süre>"
          )
          .setTimestamp()
      );
    }

    if (!args[1]) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("**Hata**")
          .setColor("RANDOM")
          .setDescription(
            "Lütfen çekilişi kazanacak sayısını girin \n **Örnek:** 1 \n \n **2.Adım:** g.başlat <süre> <kazanacak(lar)>"
          )
          .setTimestamp()
      );
    }

    if (!args[2]) {
      return message.channel.send(
        new Discord.MessageEmbed()
          .setTitle("**Hata**")
          .setColor("RANDOM")
          .setDescription("Lütfen Yapacağınız Çekilişi yazınız. \n \n **3.Adım:** g.başlat <süre> <kazanacak(lar)> <Çekiliş>")
          .setTimestamp()
      );
    }

    message.delete();

    client.giveawaysManager.start(message.channel, {
      time: ms(args[0]),
      prize: args.slice(2).join(" "),
      winnerCount: parseInt(args[1]),
      messages: {
        giveaway:
          "<:SpaceGiveaway:798525686142468136> **Çekiliş Başladı** <:SpaceGiveaway:798525686142468136>",
        giveawayEnded:
          "<:SpaceGiveaway:798525686142468136> **Çekiliş Bitti** <:SpaceGiveaway:798525686142468136>",
        timeRemaining: `\n\Kalan Süre: **{duration}**!\n\Çekilişi Yapan: ${
          message.author
        }`,
        inviteToParticipate: "<a:bytcec:818712678146113567> Çekilişe katılmak için 🎉 tepkisine tıklayın!",
        winMessage: "🎉 Tebrikler, {winners}! **{prize}** kazandın!",
        embedFooter: " Çekiliş",
        noWinner: `\Yeterli katılım olmadığı için çekiliş iptal edildi.\n\Çekilişi Yapan: ${message.author}`,
        winners: `\Kazanan(lar) `,
        endedAt: "Bitiş",
        units: {
          seconds: "Saniye",
          minutes: "Dakika",
          hours: "Saat",
          days: "Gün",
          pluralS: false
        }
      }
    });

    client.giveawaysManager.on("giveawayRerolled", (giveaway, winners) => {
      winners.forEach(member => {
        member.send(
          "**Çekiliş kazanan yeniden çekildi!:** **Tebrikler**, " +
            member.user.username +
            ", " +
            giveaway.prize +
            " Kazandın"
        );
      });
    });

};
  
} 
exports.conf = {
  enabled: true, 
  aliases: ["giveaway-start"] 
 } 
exports.help = {
	name: 'çekiliş-başlat'
}