module.exports = (sock) => {
    return {
        play: async (msg, args) => {
            if (!args) return await sock.sendMessage(sender, { text: '🎵 Utilisation: .play nom de la musique' });
            await sock.sendMessage(sender, { text: `🎵 Recherche: ${args}...` });
        },
        vv: async (msg, args) => {
            await sock.sendMessage(sender, { text: '📹 Téléchargement Instagram...' });
        },
        tiktok: async (msg, args) => {
            await sock.sendMessage(sender, { text: '📱 Téléchargement TikTok...' });
        },
        facebook: async (msg, args) => {
            await sock.sendMessage(sender, { text: '📘 Téléchargement Facebook...' });
        }
    };
};
