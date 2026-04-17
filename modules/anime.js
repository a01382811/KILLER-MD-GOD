module.exports = (sock) => {
    return {
        waifu: async (msg, args) => {
            await sock.sendMessage(sender, { text: '🌸 Commande waifu - À configurer' });
        },
        rwaifu: async (msg, args) => {
            await sock.sendMessage(sender, { text: '🌸 Commande rwaifu - À configurer' });
        },
        animekill: async (msg, args) => {
            await sock.sendMessage(sender, { text: '⚔️ Commande animekill - À configurer' });
        }
    };
};
