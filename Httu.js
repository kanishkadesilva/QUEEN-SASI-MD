 require("./settings");
const {
  state,
  saveState
} = useSingleFileAuthState(sessionName + ".json");
const pino = require('pino');
const {
  Boom
} = require("@hapi/boom");
const fs = require('fs');
const yargs = require('yargs/yargs');
const chalk = require('chalk');
const FileType = require("file-type");
const path = require("path");
const _ = require('lodash');
const axios = require('axios');
const PhoneNumber = require("awesome-phonenumber");
const {
  imageToWebp,
  videoToWebp,
  writeExifImg,
  writeExifVid
} = require("./lib/exif");
const moment = require("moment-timezone");
const express = require("express");
const app = express();
const port = process.env.PORT || 0x1f40;
var low;
try {
  low = require("lowdb");
} catch (_0x42fabe) {
  low = require("./lib/lowdb");
}
const {
  Low,
  JSONFile
} = low;
const mongoDB = require("./lib/mongoDB");
global.api = (_0x6f9f5, _0x1af8cd = '/', _0x1810c3 = {}, _0x557d5a) => (_0x6f9f5 in global.APIs ? global.APIs[_0x6f9f5] : _0x6f9f5) + _0x1af8cd + (_0x1810c3 || _0x557d5a ? '?' + new URLSearchParams(Object.entries({
  ..._0x1810c3,
  ...(_0x557d5a ? {
    [_0x557d5a]: global.APIKeys[_0x6f9f5 in global.APIs ? global.APIs[_0x6f9f5] : _0x6f9f5]
  } : {})
})) : '');
const store = makeInMemoryStore({
  'logger': pino().child({
    'level': 'silent',
    'stream': 'store'
  })
});
global.opts = new Object(yargs(process.argv.slice(0x2)).exitProcess(false).parse());
global.db = new Low(/https?:\/\//.test(opts.db || '') ? new cloudDBAdapter(opts.db) : /mongodb/.test(opts.db) ? new mongoDB(opts.db) : new JSONFile("src/database.json"));
global.DATABASE = global.db;
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) {
    return new Promise(_0x58e9e5 => setInterval(function () {
      if (!global.db.READ) {
        clearInterval(this);
        _0x58e9e5(global.db.data == null ? global.loadDatabase() : global.db.data);
      } else {
        null;
      }
    }, 1000));
  }
  if (global.db.data !== null) {
    return;
  }
  global.db.READ = true;
  await global.db.read();
  global.db.READ = false;
  global.db.data = {
    'users': {},
    'chats': {},
    'database': {},
    'game': {},
    'settings': {},
    'others': {},
    'sticker': {},
    ...(global.db.data || {})
  };
  global.db.chain = _.chain(global.db.data);
};
loadDatabase();
process.on('uncaughtException', console.error);
if (global.db) {
  setInterval(async () => {
    if (global.db.data) {
      await global.db.write();
    }
  }, 30000);
}
async function startXeonBotInc() {
  const _0x3c65c4 = XeonBotIncConnect({
    'logger': pino({
      'level': 'silent'
    }),
    'printQRInTerminal': true,
    'browser': ["Cheems Bot MD", "Safari", "1.0.0"],
    'auth': state
  });
  store.bind(_0x3c65c4.ev);
  _0x3c65c4.ws.on("CB:call", async _0x353c13 => {
    const _0x10d813 = _0x353c13.content[0x0].attrs["call-creator"];
    if (_0x353c13.content[0x0].tag == "offer") {
      let _0x2bad7f = await _0x3c65c4.sendContact(_0x10d813, global.owner);
      _0x3c65c4.sendMessage(_0x10d813, {
        'text': "*Automatic blocking system!*\n*Don't call bot*!\n*Please contact the owner to open block !*"
      }, {
        'quoted': _0x2bad7f
      });
      await sleep(0x1f40);
      await _0x3c65c4.updateBlockStatus(_0x10d813, "block");
    }
  });
  _0x3c65c4.ev.on("messages.upsert", async _0x5254f7 => {
    try {
      mek = _0x5254f7.messages[0x0];
      if (!mek.message) {
        return;
      }
      mek.message = Object.keys(mek.message)[0x0] === "ephemeralMessage" ? mek.message.ephemeralMessage.message : mek.message;
      if (mek.key && mek.key.remoteJid === "status@broadcast") {
        return;
      }
      if (!_0x3c65c4["public"] && !mek.key.fromMe && _0x5254f7.type === "notify") {
        return;
      }
      if (mek.key.id.startsWith("BAE5") && mek.key.id.length === 0x10) {
        return;
      }
      m = smsg(_0x3c65c4, mek, store);
      require("./Darknero")(_0x3c65c4, m, _0x5254f7, store);
    } catch (_0x400f97) {
      console.log(_0x400f97);
    }
  });
  _0x3c65c4.ev.on("groups.update", async _0x9e3517 => {
    try {
      ppgc = await _0x3c65c4.profilePictureUrl(_0x9e3517[0x0].id, "image");
    } catch {
      ppgc = "https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png";
    }
    let _0x21d469 = {
      'url': ppgc
    };
    if (_0x9e3517[0x0].announce == true) {
      _0x3c65c4.send5ButImg(_0x9e3517[0x0].id, "「 Group Settings Changed 」\n\nThe Group Has Been Closed By Admin, Now Only Admin Can Send Messages !", '' + botname, _0x21d469, []);
    } else {
      if (_0x9e3517[0x0].announce == false) {
        _0x3c65c4.send5ButImg(_0x9e3517[0x0].id, "「 Group Settings Changed 」\n\nThe Group Has Been Opened By Admin, Now Participants Can Send Messages !", '' + botname, _0x21d469, []);
      } else {
        if (_0x9e3517[0x0].restrict == true) {
          _0x3c65c4.send5ButImg(_0x9e3517[0x0].id, "「 Group Settings Changed 」\n\nGroup Info Has Been Restricted, Now Only Admin Can Edit Group Info !", '' + botname, _0x21d469, []);
        } else if (_0x9e3517[0x0].restrict == false) {
          _0x3c65c4.send5ButImg(_0x9e3517[0x0].id, "「 Group Settings Changed 」\n\nGroup Info Has Been Opened, Now Participants Can Edit Group Info !", '' + botname, _0x21d469, []);
        } else {
          _0x3c65c4.send5ButImg(_0x9e3517[0x0].id, "「 Group Settings Changed 」\n\nGroup Subject Has Been Changed To *" + _0x9e3517[0x0].subject + '*', '' + botname, _0x21d469, []);
        }
      }
    }
  });
  let _0x50d2a7 = [doc1, doc2, doc3, doc4, doc5, doc6];
  let _0x3b4653 = _0x50d2a7[Math.floor(_0x50d2a7.length * Math.random())];
  _0x3c65c4.ev.on("group-participants.update", async _0x4e6bb0 => {
    console.log(_0x4e6bb0);
    try {
      let _0x167fdb = await _0x3c65c4.groupMetadata(_0x4e6bb0.id);
      let _0x2ea1f5 = _0x4e6bb0.participants;
      for (let _0x59efb3 of _0x2ea1f5) {
        try {
          ppuser = await _0x3c65c4.profilePictureUrl(_0x59efb3, "image");
        } catch {
          ppuser = "https://i.ibb.co/sbqvDMw/avatar-contact-large-v2.png";
        }
        try {
          ppgroup = await zass.profilePictureUrl(_0x4e6bb0.id, "image");
        } catch {
          ppgroup = "https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png";
        }
        memb = _0x167fdb.participants.length;
        XeonWlcm = await getBuffer(ppuser);
        XeonLft = await getBuffer(ppuser);
        if (_0x4e6bb0.action == "add") {
          const _0x225163 = moment.tz("Asia/Kolkata").format("HH:mm:ss");
          const _0x3bac5f = moment.tz("Asia/Kolkata").format("DD/MM/YYYY");
          const _0x1299cc = _0x167fdb.participants.length;
          let _0x4d1829 = {
            'key': {
              'fromMe': false,
              'participant': "0@s.whatsapp.net",
              'remoteJid': '916909137213-1604595598@g.us'
            },
            'message': {
              'orderMessage': {
                'itemCount': 0x98967f,
                'status': 0xc8,
                'thumbnail': XeonWlcm,
                'surface': 0xc8,
                'message': '' + _0x167fdb.subject,
                'orderTitle': "xeon",
                'sellerJid': "0@s.whatsapp.net"
              }
            },
            'contextInfo': {
              'forwardingScore': 0x3e7,
              'isForwarded': true
            },
            'sendEphemeral': true
          };
          xeonbody = "┌─❖\n│「 𝗛𝗶 👋 」\n└┬❖ 「 @" + _0x59efb3.split('@')[0x0] + "  」\n   │✑  𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝘁𝗼 \n   │✑  " + _0x167fdb.subject + "\n   │✑  𝗠𝗲𝗺𝗯𝗲𝗿 : \n   │✑ " + _0x1299cc + "th\n   │✑  𝗝𝗼𝗶𝗻𝗲𝗱 : \n   │✑ " + _0x225163 + " " + _0x3bac5f + "\n   └───────────────┈ ⳹";
          let _0x38e127 = [{
            'buttonId': 'wkwwk',
            'buttonText': {
              'displayText': "Welcome 💐"
            },
            'type': 0x1
          }];
          let _0x296682 = {
            'document': fs.readFileSync("./XeonMedia/theme/cheems.xlsx"),
            'mimetype': _0x3b4653,
            'jpegThumbnail': XeonWlcm,
            'mentions': [_0x59efb3],
            'fileName': '' + _0x167fdb.subject,
            'fileLength': 0x5af3107a3fff,
            'caption': xeonbody,
            'footer': '' + botname,
            'buttons': _0x38e127,
            'headerType': 0x4,
            'contextInfo': {
              'externalAdReply': {
                'title': '' + ownername,
                'body': "Don't forget to read group description",
                'mediaType': 0x2,
                'thumbnail': XeonWlcm,
                'sourceUrl': '' + websitex,
                'mediaUrl': '' + websitex
              }
            }
          };
          _0x3c65c4.sendMessage(_0x4e6bb0.id, _0x296682, {
            'quoted': _0x4d1829
          });
        } else {
          if (_0x4e6bb0.action == "remove") {
            const _0x12fddd = await getBuffer(ppuser);
            const _0x5854fb = moment.tz("Asia/Kolkata").format("HH:mm:ss");
            const _0x29e906 = moment.tz("Asia/Kolkata").format("DD/MM/YYYY");
            const _0x492fc9 = _0x167fdb.participants.length;
            let _0x1dba7b = {
              'key': {
                'fromMe': false,
                'participant': '0@s.whatsapp.net',
                'remoteJid': "916909137213-1604595598@g.us"
              },
              'message': {
                'orderMessage': {
                  'itemCount': 0x98967f,
                  'status': 0xc8,
                  'thumbnail': _0x12fddd,
                  'surface': 0xc8,
                  'message': '' + _0x167fdb.subject,
                  'orderTitle': "xeon",
                  'sellerJid': "0@s.whatsapp.net"
                }
              },
              'contextInfo': {
                'forwardingScore': 0x3e7,
                'isForwarded': true
              },
              'sendEphemeral': true
            };
            xeonbody = "┌─❖\n│「 𝗚𝗼𝗼𝗱𝗯𝘆𝗲 👋 」\n└┬❖ 「 @" + _0x59efb3.split('@')[0x0] + "  」\n   │✑  𝗟𝗲𝗳𝘁 \n   │✑ " + _0x167fdb.subject + "\n   │✑  𝗠𝗲𝗺𝗯𝗲𝗿 : \n   │✑ " + _0x492fc9 + "th\n   │✑  𝗧𝗶𝗺𝗲 : \n   │✑  " + _0x5854fb + " " + _0x29e906 + "\n   └───────────────┈ ⳹";
            let _0x2643db = [{
              'buttonId': "wkwkwk",
              'buttonText': {
                'displayText': "bye 🥀"
              },
              'type': 0x1
            }];
            let _0xf1a7af = {
              'document': fs.readFileSync("./XeonMedia/theme/cheems.xlsx"),
              'mimetype': _0x3b4653,
              'jpegThumbnail': XeonLft,
              'mentions': [_0x59efb3],
              'fileName': '' + _0x167fdb.subject,
              'fileLength': 0x5af3107a3fff,
              'caption': xeonbody,
              'footer': '' + botname,
              'buttons': _0x2643db,
              'headerType': 0x4,
              'contextInfo': {
                'externalAdReply': {
                  'title': '' + ownername,
                  'body': "Bye! my friend, take care.",
                  'mediaType': 0x2,
                  'thumbnail': XeonLft,
                  'sourceUrl': '' + websitex,
                  'mediaUrl': '' + websitex
                }
              }
            };
            _0x3c65c4.sendMessage(_0x4e6bb0.id, _0xf1a7af, {
              'quoted': _0x1dba7b
            });
          }
        }
      }
    } catch (_0x394352) {
      console.log(_0x394352);
    }
  });
  _0x3c65c4.decodeJid = _0x49b90d => {
    if (!_0x49b90d) {
      return _0x49b90d;
    }
    if (/:\d+@/gi.test(_0x49b90d)) {
      let _0x357ba8 = jidDecode(_0x49b90d) || {};
      return _0x357ba8.user && _0x357ba8.server && _0x357ba8.user + '@' + _0x357ba8.server || _0x49b90d;
    } else {
      return _0x49b90d;
    }
  };
  _0x3c65c4.ev.on("contacts.update", _0x39ddf0 => {
    for (let _0x35c516 of _0x39ddf0) {
      let _0x78724d = _0x3c65c4.decodeJid(_0x35c516.id);
      if (store && store.contacts) {
        store.contacts[_0x78724d] = {
          'id': _0x78724d,
          'name': _0x35c516.notify
        };
      }
    }
  });
  _0x3c65c4.getName = (_0x3e5b2e, _0x6af276 = false) => {
    id = _0x3c65c4.decodeJid(_0x3e5b2e);
    _0x6af276 = _0x3c65c4.withoutContact || _0x6af276;
    let _0x219004;
    if (id.endsWith("@g.us")) {
      return new Promise(async _0x5bc4b6 => {
        _0x219004 = store.contacts[id] || {};
        if (!(_0x219004.name || _0x219004.subject)) {
          _0x219004 = _0x3c65c4.groupMetadata(id) || {};
        }
        _0x5bc4b6(_0x219004.name || _0x219004.subject || PhoneNumber('+' + id.replace("@s.whatsapp.net", '')).getNumber('international'));
      });
    } else {
      _0x219004 = id === '0@s.whatsapp.net' ? {
        'id': id,
        'name': "WhatsApp"
      } : id === _0x3c65c4.decodeJid(_0x3c65c4.user.id) ? _0x3c65c4.user : store.contacts[id] || {};
    }
    return (_0x6af276 ? '' : _0x219004.name) || _0x219004.subject || _0x219004.verifiedName || PhoneNumber('+' + _0x3e5b2e.replace("@s.whatsapp.net", '')).getNumber("international");
  };
  _0x3c65c4.sendContact = async (_0x5a6a2d, _0x58dbd1, _0x995513 = '', _0xf9c494 = {}) => {
    let _0x11bd7c = [];
    for (let _0x108eab of _0x58dbd1) {
      _0x11bd7c.push({
        'displayName': await _0x3c65c4.getName(_0x108eab),
        'vcard': "BEGIN:VCARD\nVERSION:3.0\nN:" + (await _0x3c65c4.getName(_0x108eab)) + "\nFN:" + (await _0x3c65c4.getName(_0x108eab)) + "\nitem1.TEL;waid=" + _0x108eab + ':' + _0x108eab + "\nitem1.X-ABLabel:Click here to chat\nitem2.EMAIL;type=INTERNET:" + ytname + "\nitem2.X-ABLabel:YouTube\nitem3.URL:" + socialm + "\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;" + location + ";;;;\nitem4.X-ABLabel:Region\nEND:VCARD"
      });
    }
    _0x3c65c4.sendMessage(_0x5a6a2d, {
      'contacts': {
        'displayName': _0x11bd7c.length + " Kontak",
        'contacts': _0x11bd7c
      },
      ..._0xf9c494
    }, {
      'quoted': _0x995513
    });
  };
  _0x3c65c4.setStatus = _0xf0ad4f => {
    _0x3c65c4.query({
      'tag': 'iq',
      'attrs': {
        'to': "@s.whatsapp.net",
        'type': 'set',
        'xmlns': "status"
      },
      'content': [{
        'tag': "status",
        'attrs': {},
        'content': Buffer.from(_0xf0ad4f, "utf-8")
      }]
    });
    return _0xf0ad4f;
  };
  _0x3c65c4["public"] = true;
  _0x3c65c4.serializeM = _0x2960e4 => smsg(_0x3c65c4, _0x2960e4, store);
  _0x3c65c4.ev.on("connection.update", async _0x1c6358 => {
    const {
      connection: _0x2f87ca,
      lastDisconnect: _0x5d373b
    } = _0x1c6358;
    if (_0x2f87ca === "close") {
      let _0xf5208d = new Boom(_0x5d373b?.["error"])?.["output"]["statusCode"];
      if (_0xf5208d === DisconnectReason.badSession) {
        console.log("Bad Session File, Please Delete Session and Scan Again");
        _0x3c65c4.logout();
      } else {
        if (_0xf5208d === DisconnectReason.connectionClosed) {
          console.log("Connection closed, reconnecting....");
          startXeonBotInc();
        } else {
          if (_0xf5208d === DisconnectReason.connectionLost) {
            console.log("Connection Lost from Server, reconnecting...");
            startXeonBotInc();
          } else {
            if (_0xf5208d === DisconnectReason.connectionReplaced) {
              console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
              _0x3c65c4.logout();
            } else {
              if (_0xf5208d === DisconnectReason.loggedOut) {
                console.log("Device Logged Out, Please Scan Again And Run.");
                _0x3c65c4.logout();
              } else {
                if (_0xf5208d === DisconnectReason.restartRequired) {
                  console.log("Restart Required, Restarting...");
                  startXeonBotInc();
                } else {
                  if (_0xf5208d === DisconnectReason.timedOut) {
                    console.log("Connection TimedOut, Reconnecting...");
                    startXeonBotInc();
                  } else {
                    _0x3c65c4.end("Unknown DisconnectReason: " + _0xf5208d + '|' + _0x2f87ca);
                  }
                }
              }
            }
          }
        }
      }
    }
    console.log("Connected...", _0x1c6358);
  });
  _0x3c65c4.ev.on('creds.update', saveState);
  _0x3c65c4.sendFileUrl = async (_0x543755, _0x26a310, _0x2cd53d, _0x5476c5, _0x6b12b5 = {}) => {
    let _0x3c72bc = '';
    let _0x4edf2e = await axios.head(_0x26a310);
    _0x3c72bc = _0x4edf2e.headers["content-type"];
    if (_0x3c72bc.split('/')[0x1] === "gif") {
      return _0x3c65c4.sendMessage(_0x543755, {
        'video': await getBuffer(_0x26a310),
        'caption': _0x2cd53d,
        'gifPlayback': true,
        ..._0x6b12b5
      }, {
        'quoted': _0x5476c5,
        ..._0x6b12b5
      });
    }
    if (_0x3c72bc === "application/pdf") {
      return _0x3c65c4.sendMessage(_0x543755, {
        'document': await getBuffer(_0x26a310),
        'mimetype': "application/pdf",
        'caption': _0x2cd53d,
        ..._0x6b12b5
      }, {
        'quoted': _0x5476c5,
        ..._0x6b12b5
      });
    }
    if (_0x3c72bc.split('/')[0x0] === 'image') {
      return _0x3c65c4.sendMessage(_0x543755, {
        'image': await getBuffer(_0x26a310),
        'caption': _0x2cd53d,
        ..._0x6b12b5
      }, {
        'quoted': _0x5476c5,
        ..._0x6b12b5
      });
    }
    if (_0x3c72bc.split('/')[0x0] === "video") {
      return _0x3c65c4.sendMessage(_0x543755, {
        'video': await getBuffer(_0x26a310),
        'caption': _0x2cd53d,
        'mimetype': "video/mp4",
        ..._0x6b12b5
      }, {
        'quoted': _0x5476c5,
        ..._0x6b12b5
      });
    }
    if (_0x3c72bc.split('/')[0x0] === 'audio') {
      return _0x3c65c4.sendMessage(_0x543755, {
        'audio': await getBuffer(_0x26a310),
        'caption': _0x2cd53d,
        'mimetype': "audio/mpeg",
        ..._0x6b12b5
      }, {
        'quoted': _0x5476c5,
        ..._0x6b12b5
      });
    }
  };
  _0x3c65c4.sendListMsg = (_0x14845e, _0x3a699d = '', _0x170e2e = '', _0x26b786 = '', _0x544c17 = '', _0x47271a = [], _0x2ae77d) => {
    var _0x9c3856 = {
      'text': _0x3a699d,
      'footer': _0x170e2e,
      'title': _0x26b786,
      'buttonText': _0x544c17,
      'sections': _0x47271a
    };
    _0x3c65c4.sendMessage(_0x14845e, _0x9c3856, {
      'quoted': _0x2ae77d
    });
  };
  _0x3c65c4.send5ButMsg = (_0x41b160, _0x5a0d53 = '', _0x30505f = '', _0x46b88b = []) => {
    var _0x5950b9 = {
      'text': _0x5a0d53,
      'footer': _0x30505f,
      'templateButtons': _0x46b88b
    };
    _0x3c65c4.sendMessage(_0x41b160, _0x5950b9);
  };
  _0x3c65c4.send5ButImg = async (_0x10b1b3, _0x16f221 = '', _0x380719 = '', _0x16be64, _0x29a2f8 = [], _0x5d5d21 = {}) => {
    let _0x208f72 = await prepareWAMessageMedia({
      'image': _0x16be64
    }, {
      'upload': _0x3c65c4.waUploadToServer
    });
    var _0x4d36f4 = generateWAMessageFromContent(_0x10b1b3, proto.Message.fromObject({
      'templateMessage': {
        'hydratedTemplate': {
          'imageMessage': _0x208f72.imageMessage,
          'hydratedContentText': _0x16f221,
          'hydratedFooterText': _0x380719,
          'hydratedButtons': _0x29a2f8
        }
      }
    }), _0x5d5d21);
    _0x3c65c4.relayMessage(_0x10b1b3, _0x4d36f4.message, {
      'messageId': _0x4d36f4.key.id
    });
  };
  _0x3c65c4.send5ButVid = async (_0x3ac117, _0x12a9d4 = '', _0x373295 = '', _0x181e8b, _0x368b1f = [], _0x18388c = {}) => {
    let _0x2038e4 = await prepareWAMessageMedia({
      'video': _0x181e8b
    }, {
      'upload': _0x3c65c4.waUploadToServer
    });
    var _0x3f5fc3 = generateWAMessageFromContent(_0x3ac117, proto.Message.fromObject({
      'templateMessage': {
        'hydratedTemplate': {
          'videoMessage': _0x2038e4.videoMessage,
          'hydratedContentText': _0x12a9d4,
          'hydratedFooterText': _0x373295,
          'hydratedButtons': _0x368b1f
        }
      }
    }), _0x18388c);
    _0x3c65c4.relayMessage(_0x3ac117, _0x3f5fc3.message, {
      'messageId': _0x3f5fc3.key.id
    });
  };
  _0x3c65c4.send5ButGif = async (_0x566222, _0x5db35b = '', _0x502c42 = '', _0x3285ce, _0x34bed2 = [], _0x46d466 = {}) => {
    let _0x368e6f = await prepareWAMessageMedia({
      'video': _0x3285ce,
      'gifPlayback': true
    }, {
      'upload': _0x3c65c4.waUploadToServer
    });
    var _0x5ad22d = generateWAMessageFromContent(_0x566222, proto.Message.fromObject({
      'templateMessage': {
        'hydratedTemplate': {
          'videoMessage': _0x368e6f.videoMessage,
          'hydratedContentText': _0x5db35b,
          'hydratedFooterText': _0x502c42,
          'hydratedButtons': _0x34bed2
        }
      }
    }), _0x46d466);
    _0x3c65c4.relayMessage(_0x566222, _0x5ad22d.message, {
      'messageId': _0x5ad22d.key.id
    });
  };
  _0x3c65c4.sendButtonText = (_0x42efc7, _0x624021 = [], _0x320d9e, _0xe4d001, _0x269ce0 = '', _0x437c46 = {}) => {
    let _0x51c4f0 = {
      'text': _0x320d9e,
      'footer': _0xe4d001,
      'buttons': _0x624021,
      'headerType': 0x2,
      ..._0x437c46
    };
    _0x3c65c4.sendMessage(_0x42efc7, _0x51c4f0, {
      'quoted': _0x269ce0,
      ..._0x437c46
    });
  };
  _0x3c65c4.sendText = (_0x332bba, _0x5d418c, _0xcd824b = '', _0x14d57c) => _0x3c65c4.sendMessage(_0x332bba, {
    'text': _0x5d418c,
    ..._0x14d57c
  }, {
    'quoted': _0xcd824b
  });
  _0x3c65c4.sendImage = async (_0x23e6d7, _0x32f169, _0x4b40eb = '', _0x248c82 = '', _0x28cd8d) => {
    let _0x5aa158 = Buffer.isBuffer(_0x32f169) ? _0x32f169 : /^data:.*?\/.*?;base64,/i.test(_0x32f169) ? Buffer.from(_0x32f169.split`,`[0x1], 'base64') : /^https?:\/\//.test(_0x32f169) ? await await getBuffer(_0x32f169) : fs.existsSync(_0x32f169) ? fs.readFileSync(_0x32f169) : Buffer.alloc(0x0);
    return await _0x3c65c4.sendMessage(_0x23e6d7, {
      'image': _0x5aa158,
      'caption': _0x4b40eb,
      ..._0x28cd8d
    }, {
      'quoted': _0x248c82
    });
  };
  _0x3c65c4.sendVideo = async (_0x1afe8a, _0x3a0b15, _0x35659b = '', _0x5c6c39 = '', _0x6130cc = false, _0x18f2b5) => {
    let _0xd15b30 = Buffer.isBuffer(_0x3a0b15) ? _0x3a0b15 : /^data:.*?\/.*?;base64,/i.test(_0x3a0b15) ? Buffer.from(_0x3a0b15.split`,`[0x1], "base64") : /^https?:\/\//.test(_0x3a0b15) ? await await getBuffer(_0x3a0b15) : fs.existsSync(_0x3a0b15) ? fs.readFileSync(_0x3a0b15) : Buffer.alloc(0x0);
    return await _0x3c65c4.sendMessage(_0x1afe8a, {
      'video': _0xd15b30,
      'caption': _0x35659b,
      'gifPlayback': _0x6130cc,
      ..._0x18f2b5
    }, {
      'quoted': _0x5c6c39
    });
  };
  _0x3c65c4.sendAudio = async (_0x583880, _0x42e375, _0x40ab41 = '', _0x142866 = false, _0x45adcc) => {
    let _0x314f45 = Buffer.isBuffer(_0x42e375) ? _0x42e375 : /^data:.*?\/.*?;base64,/i.test(_0x42e375) ? Buffer.from(_0x42e375.split`,`[0x1], "base64") : /^https?:\/\//.test(_0x42e375) ? await await getBuffer(_0x42e375) : fs.existsSync(_0x42e375) ? fs.readFileSync(_0x42e375) : Buffer.alloc(0x0);
    return await _0x3c65c4.sendMessage(_0x583880, {
      'audio': _0x314f45,
      'ptt': _0x142866,
      ..._0x45adcc
    }, {
      'quoted': _0x40ab41
    });
  };
  _0x3c65c4.sendTextWithMentions = async (_0x37a4a2, _0x34c74c, _0x1f91d7, _0x5f312d = {}) => _0x3c65c4.sendMessage(_0x37a4a2, {
    'text': _0x34c74c,
    'contextInfo': {
      'mentionedJid': [..._0x34c74c.matchAll(/@(\d{0,16})/g)].map(_0x1645d3 => _0x1645d3[0x1] + '@s.whatsapp.net')
    },
    ..._0x5f312d
  }, {
    'quoted': _0x1f91d7
  });
  _0x3c65c4.sendImageAsSticker = async (_0x7a2dc4, _0x33bf94, _0x1551f4, _0x3e3a57 = {}) => {
    let _0x2b21e2 = Buffer.isBuffer(_0x33bf94) ? _0x33bf94 : /^data:.*?\/.*?;base64,/i.test(_0x33bf94) ? Buffer.from(_0x33bf94.split`,`[0x1], "base64") : /^https?:\/\//.test(_0x33bf94) ? await await getBuffer(_0x33bf94) : fs.existsSync(_0x33bf94) ? fs.readFileSync(_0x33bf94) : Buffer.alloc(0x0);
    let _0x51d321;
    if (_0x3e3a57 && (_0x3e3a57.packname || _0x3e3a57.author)) {
      _0x51d321 = await writeExifImg(_0x2b21e2, _0x3e3a57);
    } else {
      _0x51d321 = await imageToWebp(_0x2b21e2);
    }
    await _0x3c65c4.sendMessage(_0x7a2dc4, {
      'sticker': {
        'url': _0x51d321
      },
      ..._0x3e3a57
    }, {
      'quoted': _0x1551f4
    });
    return _0x51d321;
  };
  _0x3c65c4.sendVideoAsSticker = async (_0x155fe5, _0x15cddd, _0x1271e2, _0x3e2b6d = {}) => {
    let _0x43a7f3 = Buffer.isBuffer(_0x15cddd) ? _0x15cddd : /^data:.*?\/.*?;base64,/i.test(_0x15cddd) ? Buffer.from(_0x15cddd.split`,`[0x1], "base64") : /^https?:\/\//.test(_0x15cddd) ? await await getBuffer(_0x15cddd) : fs.existsSync(_0x15cddd) ? fs.readFileSync(_0x15cddd) : Buffer.alloc(0x0);
    let _0x32e560;
    if (_0x3e2b6d && (_0x3e2b6d.packname || _0x3e2b6d.author)) {
      _0x32e560 = await writeExifVid(_0x43a7f3, _0x3e2b6d);
    } else {
      _0x32e560 = await videoToWebp(_0x43a7f3);
    }
    await _0x3c65c4.sendMessage(_0x155fe5, {
      'sticker': {
        'url': _0x32e560
      },
      ..._0x3e2b6d
    }, {
      'quoted': _0x1271e2
    });
    return _0x32e560;
  };
  _0x3c65c4.downloadAndSaveMediaMessage = async (_0x3608e5, _0x1203bc, _0x149817 = true) => {
    let _0x445dd1 = _0x3608e5.msg ? _0x3608e5.msg : _0x3608e5;
    let _0x415882 = (_0x3608e5.msg || _0x3608e5).mimetype || '';
    let _0x3a2020 = _0x3608e5.mtype ? _0x3608e5.mtype.replace(/Message/gi, '') : _0x415882.split('/')[0x0];
    const _0x3345c7 = await downloadContentFromMessage(_0x445dd1, _0x3a2020);
    let _0x202145 = Buffer.from([]);
    for await (const _0x5af3eb of _0x3345c7) {
      _0x202145 = Buffer.concat([_0x202145, _0x5af3eb]);
    }
    let _0x5c3813 = await FileType.fromBuffer(_0x202145);
    trueFileName = _0x149817 ? _0x1203bc + '.' + _0x5c3813.ext : _0x1203bc;
    await fs.writeFileSync(trueFileName, _0x202145);
    return trueFileName;
  };
  _0x3c65c4.downloadMediaMessage = async _0xee144b => {
    let _0x41524b = (_0xee144b.msg || _0xee144b).mimetype || '';
    let _0x17c3c1 = _0xee144b.mtype ? _0xee144b.mtype.replace(/Message/gi, '') : _0x41524b.split('/')[0x0];
    const _0x4709c0 = await downloadContentFromMessage(_0xee144b, _0x17c3c1);
    let _0x589ea7 = Buffer.from([]);
    for await (const _0x16d1c2 of _0x4709c0) {
      _0x589ea7 = Buffer.concat([_0x589ea7, _0x16d1c2]);
    }
    return _0x589ea7;
  };
  _0x3c65c4.sendMedia = async (_0x1fa9d8, _0x2ce094, _0x330d86 = '', _0x15a0f3 = '', _0x5dfabd = '', _0x3008c1 = {}) => {
    if (_0xa56857 && _0xa56857.status !== 0xc8 || file.length <= 0x10000) {
      try {
        throw {
          'json': JSON.parse(file.toString())
        };
      } catch (_0x195e36) {
        if (_0x195e36.json) {
          throw _0x195e36.json;
        }
      }
    }
    let _0x2844a7 = '';
    let _0x5ac1ce = _0x40c8f7;
    let _0x4019a4 = _0x208aff;
    if (_0x3008c1.asDocument) {
      _0x2844a7 = 'document';
    }
    if (_0x3008c1.asSticker || /webp/.test(_0x40c8f7)) {
      let {
        writeExif: _0x245fb2
      } = require('./lib/exif');
      let _0x41e087 = {
        'mimetype': _0x40c8f7,
        'data': _0x17e1a6
      };
      _0x4019a4 = await _0x245fb2(_0x41e087, {
        'packname': _0x3008c1.packname ? _0x3008c1.packname : global.packname,
        'author': _0x3008c1.author ? _0x3008c1.author : global.author,
        'categories': _0x3008c1.categories ? _0x3008c1.categories : []
      });
      await fs.promises.unlink(_0x208aff);
      _0x2844a7 = "sticker";
      _0x5ac1ce = "image/webp";
    } else {
      if (/image/.test(_0x40c8f7)) {
        _0x2844a7 = "image";
      } else {
        if (/video/.test(_0x40c8f7)) {
          _0x2844a7 = 'video';
        } else {
          if (/audio/.test(_0x40c8f7)) {
            _0x2844a7 = 'audio';
          } else {
            _0x2844a7 = 'document';
          }
        }
      }
    }
    await _0x3c65c4.sendMessage(_0x1fa9d8, {
      [_0x2844a7]: {
        'url': _0x4019a4
      },
      'caption': _0x15a0f3,
      'mimetype': _0x5ac1ce,
      'fileName': _0x330d86,
      ..._0x3008c1
    }, {
      'quoted': _0x5dfabd,
      ..._0x3008c1
    });
    return fs.promises.unlink(_0x4019a4);
  };
  _0x3c65c4.copyNForward = async (_0x6e809d, _0x53922b, _0x190ccf = false, _0x22aff9 = {}) => {
    let _0x44292a;
    if (_0x22aff9.readViewOnce) {
      _0x53922b.message = _0x53922b.message && _0x53922b.message.ephemeralMessage && _0x53922b.message.ephemeralMessage.message ? _0x53922b.message.ephemeralMessage.message : _0x53922b.message || undefined;
      _0x44292a = Object.keys(_0x53922b.message.viewOnceMessage.message)[0x0];
      delete (_0x53922b.message && _0x53922b.message.ignore ? _0x53922b.message.ignore : _0x53922b.message || undefined);
      delete _0x53922b.message.viewOnceMessage.message[_0x44292a].viewOnce;
      _0x53922b.message = {
        ..._0x53922b.message.viewOnceMessage.message
      };
    }
    let _0x2470c7 = Object.keys(_0x53922b.message)[0x0];
    let _0xe2890f = await generateForwardMessageContent(_0x53922b, _0x190ccf);
    let _0x428ff7 = Object.keys(_0xe2890f)[0x0];
    let _0x5143da = {};
    if (_0x2470c7 != "conversation") {
      _0x5143da = _0x53922b.message[_0x2470c7].contextInfo;
    }
    _0xe2890f[_0x428ff7].contextInfo = {
      ..._0x5143da,
      ..._0xe2890f[_0x428ff7].contextInfo
    };
    const _0xdc5d81 = await generateWAMessageFromContent(_0x6e809d, _0xe2890f, _0x22aff9 ? {
      ..._0xe2890f[_0x428ff7],
      ..._0x22aff9,
      ...(_0x22aff9.contextInfo ? {
        'contextInfo': {
          ..._0xe2890f[_0x428ff7].contextInfo,
          ..._0x22aff9.contextInfo
        }
      } : {})
    } : {});
    await _0x3c65c4.relayMessage(_0x6e809d, _0xdc5d81.message, {
      'messageId': _0xdc5d81.key.id
    });
    return _0xdc5d81;
  };
  _0x3c65c4.cMod = (_0x4b17dc, _0x6d59e4, _0x324a3b = '', _0x1e9ad1 = _0x3c65c4.user.id, _0x3c3626 = {}) => {
    let _0x1f375e = Object.keys(_0x6d59e4.message)[0x0];
    let _0x361230 = _0x1f375e === "ephemeralMessage";
    if (_0x361230) {
      _0x1f375e = Object.keys(_0x6d59e4.message.ephemeralMessage.message)[0x0];
    }
    let _0x1dc72b = _0x361230 ? _0x6d59e4.message.ephemeralMessage.message : _0x6d59e4.message;
    let _0x612776 = _0x1dc72b[_0x1f375e];
    if (typeof _0x612776 === "string") {
      _0x1dc72b[_0x1f375e] = _0x324a3b || _0x612776;
    } else {
      if (_0x612776.caption) {
        _0x612776.caption = _0x324a3b || _0x612776.caption;
      } else {
        if (_0x612776.text) {
          _0x612776.text = _0x324a3b || _0x612776.text;
        }
      }
    }
    if (typeof _0x612776 !== "string") {
      _0x1dc72b[_0x1f375e] = {
        ..._0x612776,
        ..._0x3c3626
      };
    }
    if (_0x6d59e4.key.participant) {
      _0x1e9ad1 = _0x6d59e4.key.participant = _0x1e9ad1 || _0x6d59e4.key.participant;
    } else {
      if (_0x6d59e4.key.participant) {
        _0x1e9ad1 = _0x6d59e4.key.participant = _0x1e9ad1 || _0x6d59e4.key.participant;
      }
    }
    if (_0x6d59e4.key.remoteJid.includes("@s.whatsapp.net")) {
      _0x1e9ad1 = _0x1e9ad1 || _0x6d59e4.key.remoteJid;
    } else {
      if (_0x6d59e4.key.remoteJid.includes("@broadcast")) {
        _0x1e9ad1 = _0x1e9ad1 || _0x6d59e4.key.remoteJid;
      }
    }
    _0x6d59e4.key.remoteJid = _0x4b17dc;
    _0x6d59e4.key.fromMe = _0x1e9ad1 === _0x3c65c4.user.id;
    return proto.WebMessageInfo.fromObject(_0x6d59e4);
  };
  _0x3c65c4.getFile = async (_0x1fd37a, _0x2f3c5c) => {
    let _0x197e70;
    let _0x149827 = Buffer.isBuffer(_0x1fd37a) ? _0x1fd37a : /^data:.*?\/.*?;base64,/i.test(_0x1fd37a) ? Buffer.from(_0x1fd37a.split`,`[0x1], "base64") : /^https?:\/\//.test(_0x1fd37a) ? await (_0x197e70 = await getBuffer(_0x1fd37a)) : fs.existsSync(_0x1fd37a) ? (filename = _0x1fd37a, fs.readFileSync(_0x1fd37a)) : typeof _0x1fd37a === "string" ? _0x1fd37a : Buffer.alloc(0x0);
    let _0x245d49 = (await FileType.fromBuffer(_0x149827)) || {
      'mime': "application/octet-stream",
      'ext': ".bin"
    };
    filename = path.join(__filename, './src/' + new Date() * 0x1 + '.' + _0x245d49.ext);
    if (_0x149827 && _0x2f3c5c) {
      fs.promises.writeFile(filename, _0x149827);
    }
    return {
      'res': _0x197e70,
      'filename': filename,
      'size': await getSizeMedia(_0x149827),
      ..._0x245d49,
      'data': _0x149827
    };
  };
  return _0x3c65c4;
}
app.get('/', (_0xda763c, _0x34de3e) => {
  _0x34de3e.send("📟 Dark-Nero-MD Working successfully!");
});
app.listen(port, () => console.log("📟 Dark-Nero-MD Server listening on port http://localhost:" + port + " 📟"));
setTimeout(() => {
  startXeonBotInc();
}, 0xbb8);
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright("Update " + __filename));
  delete require.cache[file];
  require(file);
});
