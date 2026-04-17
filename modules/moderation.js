module.exports = (sock) => {
    return {
        warn: async (msg, args, sender, user, isGroup) => {
            await sock.sendMessage(sender, { text: '⚠️ Fonction warn - À configurer' });
        },
        unwarn: async (msg, args, sender, user, isGroup) => {
            await sock.sendMessage(sender, { text: '✅ Fonction unwarn - À configurer' });
        },
        mute: async (msg, args, sender, user, isGroup) => {
            await sock.sendMessage(sender, { text: '🔇 Fonction mute - À configurer' });
        },
        unmute: async (msg, args, sender, user, isGroup) => {
            await sock.sendMessage(sender, { text: '🔊 Fonction unmute - À configurer' });
        },
        lockgroup: async (msg, args, sender, user, isGroup) => {
            await sock.sendMessage(sender, { text: '🔒 Groupe verrouillé' });
        },
        unlockgroup: async (msg, args, sender, user, isGroup) => {
            await sock.sendMessage(sender, { text: '🔓 Groupe déverrouillé' });
        }
    };
};
