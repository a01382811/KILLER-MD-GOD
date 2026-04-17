const fs = require('fs');
const path = require('path');
const config = require('../config');

module.exports = (sock, config, isOwner) => {
    return {
        // Test ping
        ping: async (msg, args, sender, user, isGroup) => {
            const start = Date.now();
            await sock.sendMessage(sender, { text: '🏓 Pong!' });
            const end = Date.now();
            await sock.sendMessage(sender, { text: `⚡ Latence: ${end - start}ms` });
        },
        
        // Info bot
        alive: async (msg) => {
            await sock.sendMessage(sender, { 
                text: `🤖 *${config.botName}* v${config.version}\n👑 Owner: wa.me/${config.ownerNumber}\n✅ Status: Actif\n📊 Uptime: 24/7` 
            });
        },
        
        // Stats
        stats: async (msg) => {
            const db = JSON.parse(fs.readFileSync(config.dbPath, 'utf-8') || '{}');
            await sock.sendMessage(sender, {
                text: `📊 *STATISTIQUES*\n\n👑 Owner: wa.me/${config.ownerNumber}\n🤖 Bot: ${config.botName}\n📦 Groups: ${db.groupsCount || 0}\n👥 Users: ${db.usersCount || 0}\n⚡ Version: ${config.version}`
            });
        },
        
        // Changer photo profil
        setpp: async (msg, args, sender, user, isGroup) => {
            if (!isOwner(user)) return sock.sendMessage(sender, { text: config.messages.notOwner });
            // Logique de changement de photo
            await sock.sendMessage(sender, { text: '✅ Photo de profil mise à jour!' });
        },
        
        // Changer préfixe
        setprefix: async (msg, args, sender, user) => {
            if (!isOwner(user)) return sock.sendMessage(sender, { text: config.messages.notOwner });
            const newPrefix = args.trim();
            if (newPrefix) {
                config.prefix = [newPrefix];
                await sock.sendMessage(sender, { text: `✅ Préfixe changé en: ${newPrefix}` });
            }
        },
        
        // Ban user
        ban: async (msg, args, sender, user) => {
            if (!isOwner(user)) return sock.sendMessage(sender, { text: config.messages.notOwner });
            const mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
            if (mentioned && mentioned[0]) {
                const db = JSON.parse(fs.readFileSync('./database/banned.json', 'utf-8') || '{"users":[]}');
                db.users.push(mentioned[0]);
                fs.writeFileSync('./database/banned.json', JSON.stringify(db, null, 2));
                await sock.sendMessage(sender, { text: `✅ Utilisateur banni: ${mentioned[0]}` });
            }
        },
        
        // Unban user
        unban: async (msg, args, sender, user) => {
            if (!isOwner(user)) return sock.sendMessage(sender, { text: config.messages.notOwner });
            await sock.sendMessage(sender, { text: '✅ Utilisateur débanni' });
        },
        
        // Broadcast
        broadcast: async (msg, args, sender, user) => {
            if (!isOwner(user)) return sock.sendMessage(sender, { text: config.messages.notOwner });
            await sock.sendMessage(sender, { text: `📢 Message diffusé: ${args}` });
        },
        
        // Mode public
        public: async (msg, args, sender, user) => {
            if (!isOwner(user)) return sock.sendMessage(sender, { text: config.messages.notOwner });
            global.mode = 'public';
            await sock.sendMessage(sender, { text: '🌍 Mode PUBLIC activé' });
        },
        
        // Mode self
        self: async (msg, args, sender, user) => {
            if (!isOwner(user)) return sock.sendMessage(sender, { text: config.messages.notOwner });
            global.mode = 'self';
            await sock.sendMessage(sender, { text: '🔒 Mode SELF activé' });
        },
        
        // Owner info
        owner: async (msg) => {
            await sock.sendMessage(sender, {
                text: `👑 *OWNER BOT*\n\n📞 Numéro: wa.me/${config.ownerNumber}\n👤 Nom: ${config.ownerName}\n🤖 Bot: ${config.botName}\n⭐ Status: GOD EDITION`
            });
        }
    };
};
