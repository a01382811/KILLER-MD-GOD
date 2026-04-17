module.exports = (sock) => {
    return {
        bass: async (msg, args) => { await sock.sendMessage(sender, { text: '🎵 Effet bass activé' }); },
        deep: async (msg, args) => { await sock.sendMessage(sender, { text: '🎵 Effet deep activé' }); },
        slow: async (msg, args) => { await sock.sendMessage(sender, { text: '🎵 Effet slow activé' }); },
        nightcore: async (msg, args) => { await sock.sendMessage(sender, { text: '🎵 Effet nightcore activé' }); }
    };
};
