
//════════════════════════════════════════════════════════════════════════════════════════════════════════════════════//
//                                                                                                                    //
//                                             W H A T S A P P _ U S E R _ BOT                                        //
//                                                                                                                    //
//                                                     V E R S I O N：１.0                                             //
//                                                                                                                    //
//            ███╗░░░███╗░░█████╗░░███████╗░█████████░░███████╗░████████╗░░░░░░░░░░░░███╗░░░███╗░░██████╗░░░░░        //   
//            ████╗░████║░██╔══██╗░██╔════╝░╚══██║═══╝░██║════╝░██╔═══██╗░░░░░░░░░░░░████╗ ████║░░██╔══██╗░░░░        //
//            ██╔████╔██║░███████║░███████╗░░░░██║░░░░░███████║░███████╔╝░░███████░░░██╔████╔██║░░██║░░██║░░░░        // 
//            ██║░██║╚██║░██╔══██║░╚════██║░░░░██║░░░░░██║════╝░██╔═══██╗░░╚══════╝░░██║░██░░██║░░██║░░██║░░░░        //
//            ██║░╚═╝░██║░██║░░██║░███████║░░░░██║░░░░░███████║░██║░░░░██░░░░░░░░░░░░██║░╚═╝░██║░░██████╔╝░░░░        //
//            ╚═╝░░░░░╚═╝░╚═╝░░╚═╝░╚══════╝░░░░╚═╝░░░░░╚══════╝░╚═╝░░░░╚═╝░░░░░░░░░░░╚═╝░░░░░╚═╝░░╚═════╝░░░░░        //
//                                                                                                                    //
//                                 C R E A T E D _ B Y _ M R _ S A H A N _ O F C _ S L _ R G                          //  
//                                                                                                                    //
//                                                                                                                    //
//════════════════════════════════════════════════════════════════════════════════════════════════════════════════════//
const { zokou } = require("../framework/zokou");
const {getAllSudoNumbers,isSudoTableNotEmpty} = require("../bdd/sudo")
const conf = require("../set");

zokou({ nomCom: "owner", categorie: "General", reaction: "💞" }, async (dest, zk, commandeOptions) => {
    const { ms , mybotpic } = commandeOptions;
    
  const thsudo = await isSudoTableNotEmpty()

  if (thsudo) {
     let msg = `*My Super-User*\n
     *Owner Number*\n :
- 🌟 @${conf.NUMERO_OWNER}

------ *other sudos* -----\n`
     
 let sudos = await getAllSudoNumbers()

   for ( const sudo of sudos) {
    if (sudo) { // Vérification plus stricte pour éliminer les valeurs vides ou indéfinies
      sudonumero = sudo.replace(/[^0-9]/g, '');
      msg += `- 💼 @${sudonumero}\n`;
    } else {return}

   }   const ownerjid = conf.NUMERO_OWNER.replace(/[^0-9]/g) + "@s.whatsapp.net";
   const mentionedJid = sudos.concat([ownerjid])
   console.log(sudos);
   console.log(mentionedJid)
      zk.sendMessage(
        dest,
        {
          image : { url : mybotpic() },
          caption : msg,
          mentions : mentionedJid
        }
      )
  } else {
    const vcard =
        'BEGIN:VCARD\n' + // metadata of the contact card
        'VERSION:3.0\n' +
        'FN:' + conf.OWNER_NAME + '\n' + // full name
        'ORG:undefined;\n' + // the organization of the contact
        'TEL;type=CELL;type=VOICE;waid=' + conf.NUMERO_OWNER + ':+' + conf.NUMERO_OWNER + '\n' + // WhatsApp ID + phone number
        'END:VCARD';
    zk.sendMessage(dest, {
        contacts: {
            displayName: conf.OWNER_NAME,
            contacts: [{ vcard }],
        },
    },{quoted:ms});
  }
});

zokou({ nomCom: "developer", categorie: "General", reaction: "👨‍💻" }, async (dest, zk, commandeOptions) => {
    const { ms, mybotpic } = commandeOptions;

    const devs = [
      { nom: " *✔️.Creater :Kanishka De Silva* ", numero: "94722477361" },
      { nom: " *✔️.Co Leader : Sahan Maduwantha* ", numero: "94720797915" },
        { nom: " *✔️.Bug Tester : Cyber Buddy* ", numero: "94728103228" },
      // Ajoute d'autres développeurs ici avec leur nom et numéro
    ];

    let message = "👋 *WELCOME TO QUEEN-SASI-MD WHATSAPP USER BOT.. QUEEN-SASI DEVELOPERS ARE* \n\n";
    for (const dev of devs) {
      message += `----------------\n• ${dev.nom} : https://wa.me/${dev.numero}\n`;
    }
  var lien = mybotpic()
    if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:message }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:message }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    repondre(lien)
    repondre("link error");
    
}
});

zokou({ nomCom: "support", categorie: "Help" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, auteurMessage, } = commandeOptions; 
 
  repondre("*QUEEN-SASI-MD Developer @Kanishka's Number*")
  await zk.sendMessage(auteurMessage,{text : `https://wa.me/94722477361?text=Hey_QUEEN-SASI-MD_Owner_👨‍💻✅`},{quoted :ms})

});
zokou({ nomCom: "kanishka", categorie: "Developer" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, auteurMessage, } = commandeOptions; 
 
  repondre("💀 *QUEEN-SASI-MD BOT CREATED BY CYBER GHOST 💀* \n ▬▬▬▬▬▬▬▬▬▬▬▬▬▬ \n *💀From Ambalangoda💀* \n ▬▬▬▬▬▬▬▬▬▬▬▬▬▬ \n *💀 17 YEARS OLD 💀* \n ▬▬▬▬▬▬▬▬▬▬▬▬▬▬ \n  *© 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝙲𝚈𝙱𝙴𝚁 𝙶𝙷𝙾𝚂𝚃👻* ")
  await zk.sendMessage(auteurMessage,{text : `*Leader Link https://wa.me/94722477361?text=Hey_Owner_👨‍💻✅*`},{quoted :ms})

});
zokou({ nomCom: "sahan", categorie: "Developer" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, auteurMessage, } = commandeOptions; 
 
  repondre("💀 *QUEEN-SASI-MD Bot Co leader is MASTER MIND. 💀* \n ▬▬▬▬▬▬▬▬▬▬▬▬▬▬ \n *💀From Galewela💀* \n ▬▬▬▬▬▬▬▬▬▬▬▬▬▬ \n *💀 17 Years Old💀* \n ▬▬▬▬▬▬▬▬▬▬▬▬▬▬ \n  *© 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝙲𝚈𝙱𝙴𝚁 𝙶𝙷𝙾𝚂𝚃👻* ")
  await zk.sendMessage(auteurMessage,{text : `*Co Leader Link https://wa.me/+94720797915?text=Hey_Co_Leader_👨‍💻✅*`},{quoted :ms})

});
zokou({ nomCom: "kavi", categorie: "Developer" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, auteurMessage, } = commandeOptions; 
 
  repondre("💀 *QUEEN-SASI-MD Bot Bug Tester is CYBER KAVI 💀* \n ▬▬▬▬▬▬▬▬▬▬▬▬▬▬ \n *💀From GAMPAHA💀* \n ▬▬▬▬▬▬▬▬▬▬▬▬▬▬ \n *💀 17 Years Old💀* \n ▬▬▬▬▬▬▬▬▬▬▬▬▬▬ \n  *© 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝙲𝚈𝙱𝙴𝚁 𝙶𝙷𝙾𝚂𝚃👻* ")
  await zk.sendMessage(auteurMessage,{text : `*Bug Tester Link https://wa.me/+94743579892?text=Hey_Owner_👨‍💻✅*`},{quoted :ms})

});
zokou({ nomCom: "ping" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, auteurMessage, } = commandeOptions; 
 
  repondre("*QUEEN-SASI-MD PING* \n *72 MS*")
  await zk.sendMessage(auteurMessage,{text : `*© 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 𝙲𝚈𝙱𝙴𝚁 𝙶𝙷𝙾𝚂𝚃👻*`},{quoted :ms})
})

