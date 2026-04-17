const config = require('../config');

class AntiSpam {
    constructor() {
        this.users = new Map();
    }
    
    isSpam(userId) {
        const now = Date.now();
        const user = this.users.get(userId) || { count: 0, firstMsg: now, mutedUntil: 0 };
        
        if (user.mutedUntil > now) return true;
        
        if (now - user.firstMsg > config.spam.timeWindow) {
            user.count = 1;
            user.firstMsg = now;
        } else {
            user.count++;
        }
        
        if (user.count >= config.spam.maxMessages) {
            user.mutedUntil = now + config.spam.muteDuration;
            this.users.set(userId, user);
            return true;
        }
        
        this.users.set(userId, user);
        return false;
    }
}

module.exports = new AntiSpam();
