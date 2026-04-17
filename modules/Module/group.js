module.exports = (sock) => {
    return {
        // Ajouter un membre
        add: async (msg, args, sender, user, isGroup) => {
            if (!isGroup) return;
            await sock.sendMessage(sender, { text: '✅ Fonction add - À configurer' });
        },
        
        // Expulser un membre
        kick: async (msg, args, sender, user, isGroup) => {
            if (!isGroup) return;
            await sock.sendMessage(sender, { text: '✅ Fonction kick - À configurer' });
        },
        
        // Promouvoir admin
        promote: async (msg, args, sender, user, isGroup) => {
            if (!isGroup) return;
            await sock.sendMessage(sender, { text: '✅ Fonction promote - À configurer' });
        },
        
        // Rétrograder admin
        demote: async (msg, args, sender, user, isGroup) => {
            if (!isGroup) return;
            await sock.sendMessage(sender, { text: '✅ Fonction demote - À configurer' });
        },
        
        // Mentionner tous les membres
        tagall: async (msg, args, sender, user, isGroup) => {
            if (!isGroup) return;
            await sock.sendMessage(sender, { text: '✅ Fonction tagall - À configurer' });
        },
        
        // Lien du groupe
        grouplink: async (msg, args, sender, user, isGroup) => {
            if (!isGroup) return;
            await sock.sendMessage(sender, { text: '✅ Fonction grouplink - À configurer' });
        },
        
        // Infos du groupe
        groupinfo: async (msg, args, sender, user, isGroup) => {
            if (!isGroup) return;
            await sock.sendMessage(sender, { text: '📊 Groupe: Test\n👥 Membres: 0\n👑 Admins: 0' });
        }
    };
};
