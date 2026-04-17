module.exports = (sock) => {
    return {
        antivirus: async (msg, args) => {
            await sock.sendMessage(sender, { text: '🛡️ Anti-virus activé' });
        },
        antispam: async (msg, args) => {
            await sock.sendMessage(sender, { text: '🛡️ Anti-spam activé' });
        },
        antilink: async (msg, args) => {
            await sock.sendMessage(sender, { text: '🛡️ Anti-link activé' });
        }
    };
};
