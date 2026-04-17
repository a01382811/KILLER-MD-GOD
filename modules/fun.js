module.exports = (sock) => {
    return {
        truth: async (msg, args) => { await sock.sendMessage(sender, { text: '💬 Truth: Quel est ton secret ?' }); },
        dare: async (msg, args) => { await sock.sendMessage(sender, { text: '🎯 Dare: Fais 10 pompes !' }); },
        joke: async (msg, args) => { await sock.sendMessage(sender, { text: '😂 Blague: Pourquoi les plombiers sont-ils toujours fatigués ?' }); },
        kiss: async (msg, args) => { await sock.sendMessage(sender, { text: '😘 Bisous !' }); },
        hug: async (msg, args) => { await sock.sendMessage(sender, { text: '🤗 Câlin !' }); }
    };
};
