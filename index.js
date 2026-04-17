const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const P = require('pino');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const { logger } = require('./utils/logger');
const antiSpam = require('./utils/antiSpam');

// Import modules
const ownerModule = require('./modules/owner');
const groupModule = require('./modules/group');
const moderationModule = require('./modules/moderation');
const antiModule = require('./modules/anti');
const downloaderModule = require('./modules/downloader');
const stickerModule = require('./modules/sticker');
const animeModule = require('./modules/anime');
const voiceModule = require('./modules/voice');
const gfxModule = require('./modules/gfx');
const ephotoModule = require('./modules/ephoto');
const funModule = require('./modules/fun');
const othersModule = require('./modules/others');

// Créer dossiers nécessaires
const dirs = ['./database', './tmp', './auth_info'];
dirs.forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

async function startBot() {
    logger.info(`🔥 ${config.botName} v${config.version} - Owner: ${config.ownerNumber}`);
    
    const { state, saveCreds } = await useMultiFileAuthState('auth_info');
    
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
        logger: P({ level: 'silent' }),
        browser: [`${config.botName}`, 'Chrome', '2026']
    });
    
    sock.ev.on('creds.update', saveCreds);
    
    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'open') {
            logger.info(`✅ Connecté en tant que ${config.botName}`);
            logger.info(`👑 Owner: ${config.ownerName} (${config.ownerNumber})`);
        }
        if (connection === 'close') {
            const reason = lastDisconnect?.error?.output?.statusCode;
            if (reason !== DisconnectReason.loggedOut) {
                logger.info('🔄 Reconnexion...');
                startBot();
            }
        }
    });
    
    // Vérification owner
    const isOwner = (sender) => {
        const cleanSender = sender.replace(/[^0-9]/g, '');
        const cleanOwner = config.ownerNumber.replace(/[^0-9]/g, '');
        return cleanSender === cleanOwner || cleanSender.includes(cleanOwner);
    };
    
    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        if (!msg.message || msg.key.fromMe) return;
        
        const sender = msg.key.remoteJid;
        const isGroup = sender.endsWith('@g.us');
        const user = isGroup ? msg.key.participant : sender;
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
        
        const prefix = config.prefix.find(p => text.startsWith(p));
        if (!prefix) return;
        
        const cmd = text.slice(prefix.length).split(' ')[0].toLowerCase();
        const args = text.slice(prefix.length + cmd.length).trim();
        
        // Anti-spam (sauf owner)
        if (!isOwner(user) && antiSpam.isSpam(user)) {
            await sock.sendMessage(sender, { text: '⛔ Anti-spam : Attends un peu !' });
            return;
        }
        
        // Toutes les commandes
        const commandMap = {
            ...ownerModule(sock, config, isOwner),
            ...groupModule(sock),
            ...moderationModule(sock),
            ...antiModule(sock),
            ...downloaderModule(sock),
            ...stickerModule(sock),
            ...animeModule(sock),
            ...voiceModule(sock),
            ...gfxModule(sock),
            ...ephotoModule(sock),
            ...funModule(sock),
            ...othersModule(sock)
        };
        
        if (commandMap[cmd]) {
            try {
                await commandMap[cmd](msg, args, sender, user, isGroup);
            } catch (err) {
                logger.error(`Erreur ${cmd}: ${err.message}`);
                await sock.sendMessage(sender, { text: `❌ Erreur: ${err.message}` });
            }
        }
    });
}

startBot();
