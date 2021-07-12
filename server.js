 const express = require("express");
const Nuggies = require('nuggies');

//Nuggies.giveaways.connect(process.env.mongoURI);
// CUSTOM CLIENTS
//var dc2 = require("discord.js");
//const clientDash = new discord.Client();
//Dashboard Ping
/*
setInterval(function(){ 
  var pingDash = nico.ws.ping+2;
  var request = require("request");
  request("https://greesy.negodev.tk/");
  nico.ws.ping+2
  db.set(`dashPing`,pingDash);
}, 5);*/



const app = express();
const _ = require("lodash");
const discord = require("discord.js");
//require('discord-buttons')(nico);
const nico = new discord.Client();

const path = require("path");

const fs = require("fs");

/*const nego = require("nego.db");

const db2 = new nego("./Database.json");*/

const url = require("url");
const db = require("quick.db");
const moment = require("moment");
//db.add("kull",1);
require('discord-buttons')(nico);
var bodyParser = require('body-parser');

//var bodyParser = require("body-parser");

app.use(bodyParser.json()); 

app.use(bodyParser.urlencoded({ 

  extended: true 

})); 

app.use('/assets', express.static('server/web/css/'))

/*

**************

CodeList

By Kardespro

*************

*/


/*
* CUSTOM SETTINGS 
*/

require("./custom_discord/inlineReply") 


/*

*  Rastgele Kod Oluşturma

*/

function Random(length) {

       var result           = '';

       var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

       var charactersLength = characters.length;

       for(var i = 0; i < length; i++) {

          result += characters.charAt(Math.floor(Math.random() * charactersLength));

       }

       return result;

    };

//Routes

const authRouter = require("./server/auth.js");

//const serverRouter = require("./server/index.js");

//*******

//CONFIG

const config = {

  siteismi: "Greesy | Best Utility Bot",

  sunucuid: "858052041507209266",

  callback: "https://greesy.negodev.tk/l/callback",

  secret: "IWgw_oextZSp83XJabSRnTqD759LMQB3",

  logkanalid: "859899078624149516",

  kurucurolid: "682607343707488388",

  admins:["682607343707488388","682607343707488388",""],

  evalyetki: "682607343707488388",

  evalyetki1: "",

  evalyetki2: "852853360612605952",

  evalyetki3: "",
  logkanalid: "859899078624149516",

  prefix: "!",

  embedbanner: "https://i.pinimg.com/originals/30/88/a3/3088a3ebaf713600adacd00397ee410d.png"

  };

//Server

//BOT

nico.on("ready", () => {

  //require("./server/index.js")(client)

  

  console.log(`

  

  ****************

  Server Başlatıldı PORT ${process.env.PORT}

  

  Bot ${nico.user.username} Ismiyle Discorda Bağlandı 

  

  *************

  `);

  nico.user.setActivity(`🌎 !help | !stat `);

  });
nico.on('clickbutton', dugme => {

    Nuggies.giveaways.buttonclick(nico, dugme);

});

/*

* Command Handler

*/
const log = message => {
  console.log(`${message}`);
};
/*=======================================================================================*/
require('events').EventEmitter.prototype._maxListeners = 100;
nico.komutlar = new discord.Collection();
nico.aliases = new discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
    if (err) console.error(err);
    console.log(`(!) Bota ${files.length} komut başarıyla yüklendi.`);
    files.forEach(f => {
        if (!f.endsWith('.js')) return
        let props = require(`./komutlar/${f}`);
        if (!props.help) return
        nico.komutlar.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            nico.aliases.set(alias, props.help.name);
            global.commands = files;
        });
    });
});
nico.on('message', async message => {
    let p = config.prefix
    let client = message.client;
    if (message.author.bot) return;
    if (!message.content.startsWith(p)) return;
    let command = message.content.split(" ")[0].slice(p.length);
    let params = message.content.split(" ").slice(1);
    let cmd
    if (client.komutlar.has(command)) {
        cmd = client.komutlar.get(command);
    } else if (client.aliases.has(command)) {
        cmd = client.komutlar.get(client.aliases.get(command));
    }
    if (cmd) {
    //  db.fetch(`karaliste_${message.author.id}` === true ) // message.reply("") 
  /*  } else {

    const laura = [];

    client.commands.forEach(dropinnem => {

      laura.push(dropinnem.help.name);

      dropinnem.conf.aliases.forEach(abcdef => laura.push(abcdef));

    });
      const rifleman = require('string-similarity').findBestMatch(command, laura);

    message.channel.send(`That's What You Mean ? ${rifleman.bestMatch.target}`)
  */
  
    }
    cmd.run(client, message, params, p);
})
const clean = text => {

    if (typeof(text) === "string")

      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));

    else

        return text;

  }

nico.on("message", async message => {

    const args = message.content.split(" ").slice(1);

   

    if (message.content.startsWith("!eval")) {
      
      if (![config.evalyetki, config.evalyetki1,config.evalyetki2, config.evalyetki3, "661827402069966869"].includes(message.author.id)) return;
    
      try {

        const code = args.join(" ");

        let evaled = eval(code);

   
    if(message.content.includes("nico.token")) return message.reply("al `31313313131311`") 
        if (typeof evaled !== "string")

         evaled = await require("util").inspect(evaled);

   

        await message.channel.send(clean(evaled), {code:"xl"});

      } catch (err) {

       await message.channel.send(`\`Hata Oluştu \n \` \`\`\`xl\n${clean(err)}\n\`\`\``);

      }

    }

  });

const Strategy = require("passport-discord").Strategy;

const session = require('express-session');

const passport = require('passport');

/*

* Burayi Degismiyin

*/

//settings

app.set(express.json());

function gGiris(req, res, next) {

    if (req.isAuthenticated()) return next();

    req.session.backURL = req.url;

    res.redirect("/l/");

  }
function bakimCheck(req,res,next){
  var bakimDB  = db.fetch(`bakim`);

  if(bakimDB == false) return next();
  if(bakimDB == true){
    render(res,req, "bakim.ejs");
    }
  }
function karalisteCheck(req,res,next){
  if (req.isAuthenticated()) { 
  var karalisteDB = db.fetch(`karaliste_${req.user.id}`);
    if(karalisteDB == true){
      render(res,req, "karaliste.ejs");
      }
    }
  if(karalisteDB == false){
    next();
    }
}
function adminCheck(req,res,next){
  if (req.isAuthenticated()) { 
  
  var ussr = req.user.id;
    if(ussr == config.kurucurolid.includes())return res.redirect("/404")  &&  db.add(`adminpanel_izinsiz_giris_sayi`, +1);

    next();
    db.add(`adminpanel_giris_sayi`,+1);
    }
}

const dataDir = path.resolve(`${process.cwd()}${path.sep}server`);

  const templateDir = path.resolve(`${dataDir}${path.sep}web${path.sep}html${path.sep}`);

const render = (res, req, template, data = {}) => {

    const baseData = {

      bot: nico,

      path: req.path,

      user: req.isAuthenticated() ? req.user : null

    };
    res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));

  };

app.set('view engine','ejs');

//AUTH

passport.use(new Strategy({

    clientID: "817456729558220812",

    clientSecret: config.secret,

    callbackURL: config.callback,

    scope: ["identify", "guilds","guilds.join"]

  }, (accessToken, refreshToken, profile, done) => {

    process.nextTick(() => done(null, profile));

  }));

  

  passport.serializeUser((user, done) => {

    done(null, user);

  });

  passport.deserializeUser((obj, done) => {

    done(null, obj);

  });

  app.use(

    session({

      secret: "kardespro",

      resave: false,

      saveUninitialized: false

    })

  );

  

  app.use(passport.initialize());

  app.use(passport.session());
/*
app.get("/l", passport.authenticate("discord", {

    scope: ["identify", "guilds"]
  
  }));

  app.get("/l/callback", passport.authenticate("discord", { failureRedirect: "/l" }), (req, res) => {

    const anasunucu = nico.guilds.cache.get(config.sunucuid);
    var ab_free = db.fetch(`abonelik_${req.user.id}`,"free");
    var ab_var = db.fetch(`abonelik_${req.user.id}`,"premium");
    if(ab_free) return res.redirect("/");
    if(ab_var) return res.redirect("/");
    res.redirect("/");
db.set(`abonelik_${req.user.id}`,"free");

    });
*/
// FAST Login API

   app.get("/l/", (req, res, next) => {
      if (req.session.backURL) {
        req.session.backURL = req.session.backURL; 
      } else if (req.headers.referer) {
        const parsed = url.parse(req.headers.referer);
        if (parsed.hostname === app.locals.domain) {
          req.session.backURL = parsed.path;
        }
      } else {
        req.session.backURL = "/";
       }
      next();
    },
    passport.authenticate("discord", { prompt: 'none' }));
    app.get("/l/callback", passport.authenticate("discord", { failureRedirect: '/l/' }), async (req, res) => {
        let banned = await db.fetch(`banned_${req.user.id}`);
        if(banned) {
        nico.users.fetch(req.user.id).then(async a => {
        nico.channels.cache.get(config.logknalid).send(new discord.MessageEmbed().setAuthor(a.username, a.avatarURL({dynamic: true})).setThumbnail(a.avatarURL({dynamic: true})).setColor("RED").setDescription(`[**${a.username}**#${a.discriminator}]() isimli kullanıcı **siteye** giriş yapmaya çalıştı fakat siteden engellendiği için giriş yapamadı.`).addField("Username", a.username).addField("User ID", a.id).addField("User Discriminator", a.discriminator))
        })
        req.session.destroy(() => {
        res.json({ login: false, message: "You have been blocked from Greesy.", logout: true })
        req.logout();
        });
        } else {
            try {
              const request = require('request');
              request({
                  url: `https://discordapp.com/api/v8/guilds/${config.server.id}/members/${req.user.id}`,
                  method: "PUT",
                  json: { access_token: req.user.accessToken },
                  headers: { "Authorization": `Bot ${nico.token}` }
              });
        } catch {};
        res.redirect(req.session.backURL || '/')
        nico.users.fetch(req.user.id).then(async a => {
        nico.channels.cache.get(config.logkanalid).send(new discord.MessageEmbed().setAuthor(a.username, a.avatarURL({dynamic: true})).setThumbnail(a.avatarURL({dynamic: true})).setColor("GREEN").setDescription(`[**${a.username}**#${a.discriminator}]() Login In Website!`).addField("Username", a.username).addField("User ID", a.id).addField("User Discriminator", a.discriminator))
          var ab_free = db.fetch(`abonelik_${req.user.id}`,"free");
    var ab_var = db.fetch(`abonelik_${req.user.id}`,"premium");
    if(ab_free) return res.redirect("/");
    if(ab_var) return res.redirect("/");
   // res.redirect("/");
db.set(`abonelik_${req.user.id}`,"free");

        })
        }
    });
app.get("/logout", (req, res) => {

    req.logOut();

    res.redirect("/");

  });

  

// SAYFALAR

/*

Pages

*/

app.get("/", bakimCheck , (req,res) => {
var fetchComment = db.fetch(`comment`);
  render(res,req, "index.ejs",{
    kardesproclient: nico,
    fetchComment,
    config
  });

  });
app.get("/cmds", bakimCheck , (req, res) => {
  render(res, req, "commands.ejs");
 });
app.get("/stat/",bakimCheck , (req, res) => {
  var client = nico;
  render(res, req, "stat.ejs", {nego:client} );
 });

app.get("/index.html", (req, res) => {
  var client = nico;
  //render(res, req, "stat.ejs", {nego:client} );
  res.json("Al Sana HTML 🤣");
 });
/*
* Dashboard
*/
app.get("/dash", gGiris ,bakimCheck ,(req,res) => {
  const user = nico.users.cache.get(req.user.id);
  const perms = discord.Permissions;
  
  render(res, req, "sunucusec.ejs",{perms});
 });

app.get("/dash/:sunucuID/yonet", async(req, res) => {
  if(!req.user) return res.redirect("/l/")
  let id = req.params.sunucuID
  let guild = nico.guild;
  if(!id) return res.json({error: "Bulunamadı"});
  let srev = nico.guilds.cache.get(id);
  let perm = nico.guilds.cache.get(id).members.cache.get(req.user.id).permissions.has("MANAGE_GUILD")
  if(!perm) return res.json({error: "Bulunamadı"});
  const fetchedLogs = nico.guilds.cache.get(id).fetchAuditLogs({typ: "MESSAGE_DELETE"});
  var verfyseviye = nico.guilds.cache.get(id).verificationLevel;
 var mfalev = nico.guilds.cache.get(id).mfaLevel;
 var afkK = nico.guilds.cache.get(id).afkChannel;
var region = nico.guilds.cache.get(id).region;
var roller = nico.guilds.cache.get(id).roles;
var banner = nico.guilds.cache.get(id).banner;
var fetchGuildPre = db.fetch(`aboneliksunucu_${id}`);
 
 
 
 
  render(res, req, "ayarlar.ejs", {id, guild,fetchedLogs,verfyseviye,mfalev,afkK,region,roller,banner,srev,fetchGuildPre})
})

app.get("/dash/:sunucuID/yonet/embed", async(req, res) => {
  if(!req.user) return res.redirect("/l/")
  let id = req.params.sunucuID
  let guild = nico.guild;
  var fetchPre = db.fetch(`abonelik_${req.user.id}`);
  
  if(!id) return res.json({error: "Bulunamadı"});
  let perm = nico.guilds.cache.get(id).members.cache.get(req.user.id).permissions.has("MANAGE_GUILD")
  if(!perm) return res.json({error: "Bulunamadı"});
  render(res, req, "ayarlar_embed.ejs", {id,fetchPre,guild})
})

app.get("/dash/:sunucuID/yonet/counter", async(req, res) => {
  if(!req.user) return res.redirect("/l/")
  let id = req.params.sunucuID
  let guild = nico.guild;
  var fetchPre = db.fetch(`abonelik_${req.user.id}`);
  var counterAddingsize = db.fetch(`counterAdd_${id}`);
  if(!id) return res.json({error: "Bulunamadı"});
  let perm = nico.guilds.cache.get(id).members.cache.get(req.user.id).permissions.has("MANAGE_GUILD")
  if(!perm) return res.json({error: "Bulunamadı"});
  render(res, req, "ayarlar_counter.ejs", {id,fetchPre,guild,counterAddingsize})
})

app.post("/dash/:sunucuID/yonet/counter", async(req, res) => {
  if(!req.user) return res.redirect("/l/")
  let id = req.params.sunucuID
  let guild = nico.guild;
  var fetchPre = db.fetch(`abonelik_${req.user.id}`);
  
  if(!id) return res.json({error: "Bulunamadı"});
  let perm = nico.guilds.cache.get(id).members.cache.get(req.user.id).permissions.has("MANAGE_GUILD")
  if(!perm) return res.json({error: "Bulunamadı"});
 
var rBody = req.body;
  if(rBody == null){
    res.json("Please Write Informations in Inputs!");
  }
  if(rBody == undefined){
    res.json("unexcepted Error");
  }
  if(rBody == NaN){
    res.json("NaN");
  }
  //kufur engel rBody
  if(rBody == "amk"){
    res.json("amk");
  }
  
  if(rBody == "nah"){
    res.json("al sana nah 😋");
  }
  db.set(`counter_${id}`);
  db.set(`counterNumber_${id + rBody.cnumber}`);
  db.set(`counterChannel_${id +rBody.chid}`)
  db.add(`counterAdd_${id}`,+1);
  
  
  res.redirect(`/dash/${id}/yonet/counter`);



})



app.get("/api/dash/:sunucuID/yonet/counter/save", async(req, res) => {
  if(!req.user) return res.redirect("/l/")
  let id = req.params.sunucuID
  let guild = nico.guild;
  var fetchPre = db.fetch(`abonelik_${req.user.id}`);
  
  if(!id) return res.json({error: "Bulunamadı"});
  let perm = nico.guilds.cache.get(id).members.cache.get(req.user.id).permissions.has("MANAGE_GUILD")
  if(!perm) return res.json({error: "Bulunamadı"});
 
var rBody = req.body;
  /*
  if(rBody == null){
    res.json("Please Write Informations in Inputs!");
  }
  if(rBody == undefined){
    res.json("unexcepted Error");
  }
  if(rBody == NaN){
    res.json("NaN");
  }
  //kufur engel rBody
  if(rBody == "amk"){
    res.json("amk");
  }
  
  if(rBody == "nah"){
    res.json("al sana nah 😋");
  }
  
  db.set(`counter_${id}`);
  db.set(`counterRakam_${rBody.cnumber}`);
  db.set(`counterKanal_${rBody.chid}`)
  */
  db.add(`counterAdd_${id}`,+1);
  
  console.log(rBody.chid);
  res.redirect(`/dash/${id}/yonet/counter/`);



})


app.get("/te", (req, res) => {
  render(res, req, "ayarlar_counter.ejs");
 });

app.get("/shard", (req, res) => {
  const shardClient = nico.ws.shards;
  render(res, req, "shard-analitycs.ejs",{shardClient});
 });



/*
* ADMIN PANEL
*/

app.get("/admin", gGiris , adminCheck , (req, res) => {
  const panelgsayi = db.fetch(`adminpanel_giris_sayi`);
  const panelizinsizgsayi = db.fetch(`adminpanel_izinsiz_giris_sayi`);
 const kullsayi = nico.guilds.cache.size;
  const cacheGuild = nico.guilds;
const cmdsize = nico.komutlar.size;
  render(res, req, "admin/index.ejs",{panelgsayi,panelizinsizgsayi,cacheGuild,cmdsize});
 });










/*
* Subscribe API
*/

app.get("/user/subscribe", bakimCheck ,(req,res) => {
  var body = req.body;
  render(res,req, "aboneol.ejs");
  });

app.get("/user/subscribe/on", gGiris ,  (req,res) => {
 // var body = req.body;
 // var fetch = true;
  var kredisi = db.fetch(`kredi_${req.user.id}`);
  if(kredisi == 30){
    res.json({success: "The Subscription Was Added"});
    db.set(`abonelik_${req.user.id}`, "premium");
    db.delete(`kredi_${req.user.id}`,-30);
    };
  if(kredisi < 29){
    res.json({error: "Kredin Yetersiz"});
  };
  res.json("error");
  });

app.get("/user/subscriptions/", (req,res) => {
  if(!req.user) return res.redirect("/l");
  var user = req.user.id;
  var userr = req.user;
  var fetch_abonelik = db.fetch(`abonelik_${user}`);
  render(res,req, "abonelik.ejs",{
    abonelik: fetch_abonelik,
    user,
    userr
  });
  });

app.get("/user/subscriptions/delete", (req,res) => {
  if(!req.user) return res.redirect("/l");
  var user = req.user.id;
  var userr = req.user;

   db.delete(`abonelik_${req.user.id}`, "premium");
  res.redirect("/user/subscriptions");
  db.set(`abonelik_${req.user.id}`,"free");
  });
/*
* COMMENT System And COMMENT API
*/

app.get("/user/comment", (req,res) => {
 if(!req.user) return res.redirect("/l/");
 var abIzin = db.fetch(`abonelik_${req.user.id}`);
 render(res,req, "comment.ejs",{abIzin});
  });

app.post("/user/comment", gGiris ,(req,res) => {
var cBody = req.body.comment;
  var user = req.user.id;
  var commentInfo = {
    yorum:cBody,
    userId:user,
    user:req.user
  };
  if(cBody == "amk"){
    res.json("Küfürlü Yorum Kabul Edilemez");
  };
  db.push(`comment`,commentInfo);
  // db.defaults({ posts: []}).write()
// db.get('comment').push(commentInfo).write()

 // var logtest = db.fetch(`comment`);
 // console.log(logtest);
  res.redirect("/");
});

/*
* Haber Sistemi
*/
app.get("/blog/",bakimCheck,(req,res) => {
  render(res,req, 'blog.ejs',{blogPost:posts, postsLen:postsL});
});
let posts=[];
//let posts = db.fetch("post")
let postsL=posts.length;
app.get("/admin/blog/new",gGiris , (req,res) => {
  if(req.user.id != config.kurucurolid) return res.redirect("/");
  
  var user = req.user;
  render(res,req, 'blog_new.ejs',{user});
});
app.get('/blog/:postName', gGiris , bakimCheck ,  (req,res) => {
  var a=0;
 console.log(req.params.postName)
  var iDb = db.fetch(`haber_${req.params.postName}`);
 posts.forEach(function(title){
  let pName = _.lowerCase(req.params.postName);
  let pTitle = _.lowerCase(title.pT)
 // let pAuthor = _.lowercase(title.author);
   if(pName===pTitle){
     a=1;
     render(res,req, "blog_view.ejs",{blogPostTitle:title.pT,blogPostBody:title.pB,config});
   }
 });
 if(a==1){
  console.log("Match found!!")
 }
 else{
  console.log("match not found");
}
});
app.post("/admin/blog/new", gGiris,(req,res) => {
  if(req.user.id != config.kurucurolid) return res.redirect("/");
  let post = {
    pT:req.body.postTitle,
    pB:req.body.postBody
  }
 posts.push(post);
  db.push(`haber_${post.pT}`,post);
  var Log = db.fetch(`haber_${post.pT}`);
  console.log(Log);
  res.redirect("/");
});




/*
* API 
*/

//key check

app.get("/api/v1/keycheck/:key", (req, res) => {
  var key = req.params.key;
  var keyUser = db.fetch(`key`);
  if(key == "nego"){
    res.json("true");
  }
//  render(res, req, "ayarlar_counter.ejs");
 });





app.get("/api/v1/promo/generate/:kod", gGiris, (req, res) => {
  var kod = req.params.kod;
 if(!kod) return res.json({error: "not found"});
  db.set(`promocodes_${kod}`,"premium");
  res.json({success: "Successfull Added Promo Code To System"});

});

app.get("/api/v1/promocode/:promo", gGiris , (req,res) => {
  var params = req.params.promo;
  var fetchpromos = db.fetch(`promocodes_${params}`,"premium");
  if(params == "free_premium"){
    res.json({success: "The Subscription Was Added"});
    db.set(`abonelik_${req.user.id}`,"premium");
    }
  if(params == "free"){
    res.json({success: "The Subscription Was Added"});
    
    db.set(`abonelik_${req.user.id}`,"free");

    
    };
  if(fetchpromos){
    res.json({success: "The Subscription Was Added"});

    db.set(`abonelik_${req.user.id}`,"premium");
    };
  res.json({error: "Permission Denied"});
  });
//....
app.get("/api/v1/promocode/check/:promo",  (req,res) => {

  var params = req.params.promo;

  var fetchpromos = db.fetch(`promocodes_${params}`,"premium");

  if(params == "free_premium"){

    res.json({success: "true"});

    }

  if(params == "free"){

    res.json({success: "true"});

    
    

    };

  if(fetchpromos){

    res.json({success: "true"});

    
    };

  res.json({error: "Permission Denied"});

  });


/*
* Gift Api
*/

app.get("/api/v1/gift/:giftKod/", gGiris , (req,res) => {
  var fetchgift = db.fetch(`gift_${req.params.giftKod}`);
  if(fetchgift === false){  res.json({error: "İnvalid Gift Code"});};
  /*
  * Fetch Gift Code
  */
   if(fetchgift === true){
    res.json({success: "The Gift Claimed"});
     db.set(`abonelik_${req.user.id}`, "premium");
     db.set(`giftkullanim_${req.params.giftKod}`,1);
     
    }
  var kullanimsayi = db.fetch(`giftkullanim_${req.params.giftkod}`);
 
  if(kullanimsayi > 1){
    res.json({error: "This Gift Is Already Received!"});
    }
  
  
  
  
  });










const keyRouter = require("./server/api/keyAuth.js");
//app.use("/api/",keyRouter)

nico.login(process.env.TOKEN)
const listener = app.listen(process.env.PORT, () => {

  console.log("Your app is listening on port " + listener.address().port);

  console.log(`

  ***************

  ****************

  Server Başlatıldı PORT ${process.env.PORT}

  

  Bot Discorda Bağlandı 

  

  ******************

  ******************

  

  `);

});
nico.on("message", async msg => {
  if(msg.content.startsWith("!test")){
   // if(msg.author.id == "852853360612605952"){
   // msg.reply('test')
    const disbut  = require('discord-buttons');
/*let option = new MessageMenuOption()

    .setLabel('Your Label')

    .setEmoji('🍔')

    .setValue('menuid')

    .setDescription('Custom Description!')

    

let select = new MessageMenu()

    .setID('customid')

    .setPlaceholder('Click me! :D')

    .setMaxValues(1)

    .setMinValues(1)

    .addOption(option)
*/
let button = new disbut.MessageButton()

  .setLabel('Restart!')

  .setID('myid')

  .setStyle('blurple');
    msg.channel.send('test!', {buttons: [button]})
   // return process.exit();
    console.log(`
    Bot Has Restarted By ${msg.author} :) 
    `)
   // } 
    }
 });
/*
nico.on('clickButton', async (button) => {
//.checkEnd()
//  await button.reply.defer()
 // await button.reply.think()

//To make your reply only send to the user who clicked the button, add true to the options param

//await button.reply.think(true)
  
 // msg.channel.send('te')
  await button.reply.send('This is content replied!', true)

 
 // msg.delete({timeout: 4000})
  
    //Your code here...

});*/
/*
nico.on("message", async msg => {
if(!msg.content.startsWith('!sggggggggggggg')){
  const disbut = require('discord-buttons');

let sunucu = new disbut.MessageButton()

  .setLabel('Sunucu Sayısı!')

  .setID('gg')

  .setStyle('blurple');
  msg.channel.send('Here Is My Stats', {buttons: [sunucu]}) 
 } 
  
 });
nico.on('clickButton', async (sunucu) => {

    //Your code here...
await sunucu.reply.send(`**${nico.guilds.cache.size} ** __Servers! __`, true)


});*/
//Left! 
nico.on("guildMemberAdd", async member => {
  let kanal = db.fetch(`counterChannel_${member.guild.id}`) 
  let rakam = db.fetch(`counterNumber_${member.guild.id}`) 
  nico.channels.cache.get(kanal).send(`
  <a:grs:691620276055703573> **${member.user.tag}** Joined The Server! We're \`${rakam - member.guild.memberCount}\` Away From Being **${rakam}**! 
 `)//Joined! We're 8 Away From Being 5! 
 });


nico.on("guildMemberRemove", async member => {
  let kanal = db.fetch(`counterChannel_${member.guild.id}`) 
  let rakam = db.fetch(`counterNumber_${member.guild.id}`) 
 kanal.send(`
  <a:cks:691620378937917451> **${member.user.tag}** Left The Server! We're \`${rakam - member.guild.memberCount}\` Away From Being **${rakam}**! 
 `)//Joined! We're 8 Away From Being 5! 
 });
nico.on("guildMemberAdd", async member => {
  let role = db.fetch(`autoroleRole_${member.guild.id}`) 
  let ch = db.fetch(`autoroleChannel_${member.guild.id}`) 
  ch.send(`
  **${member.user.tag}** Joined. **${role}** Role Given with Automatic Role System! 
  `)
  
 });
