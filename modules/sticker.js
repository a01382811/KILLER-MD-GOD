module.exports = (sock) => {
    return {
        sticker: async (msg, args, sender, user, isGroup) => {
            await sock.sendMessage(sender, { text: '🎨 Envoie une image avec légende .sticker' });
        },
        toimg: async (msg, args) => {
            await sock.sendMessage(sender, { text: '🖼️ Conversion sticker en image...' });
        },
        cry: async (msg, args) => {
            await sock.sendMessage(sender, { text: '😢 *pleure*' });
        },
        happy: async (msg, args) => {
            await sock.sendMessage(sender, { text: '😊 *est heureux*' });
        },
        smug: async (msg, args) => {
            await sock.sendMessage(sender, { text: '😏 *sourit malicieusement*' });
        }
    };
};
