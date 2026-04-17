module.exports = (sock) => {
    const commands = {};
    for (let i = 1; i <= 12; i++) {
        commands[`gfx${i}`] = async (msg, args) => {
            await sock.sendMessage(sender, { text: `🎨 GFX${i} - Texte: ${args || 'pas de texte'}` });
        };
    }
    return commands;
};
