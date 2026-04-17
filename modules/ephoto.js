module.exports = (sock) => {
    return {
        glowingtext: async (msg, args) => { await sock.sendMessage(sender, { text: '✨ Texte glow créé' }); },
        neonglitch: async (msg, args) => { await sock.sendMessage(sender, { text: '🌈 Texte néon créé' }); },
        galaxywallpaper: async (msg, args) => { await sock.sendMessage(sender, { text: '🌌 Wallpaper galaxy créé' }); }
    };
};
