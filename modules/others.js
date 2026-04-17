module.exports = (sock) => {
    return {
        ai: async (msg, args) => { await sock.sendMessage(sender, { text: `🤖 IA: ${args || 'Bonjour !'}` }); },
        weather: async (msg, args) => { await sock.sendMessage(sender, { text: `🌤️ Météo pour ${args || 'Paris'}: 22°C` }); },
        time: async (msg, args) => { await sock.sendMessage(sender, { text: `⏰ Heure: ${new Date().toLocaleString()}` }); },
        qr: async (msg, args) => { await sock.sendMessage(sender, { text: '📱 QR Code généré' }); }
    };
};
