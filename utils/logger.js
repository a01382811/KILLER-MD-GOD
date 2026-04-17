const config = require('../config');

class Logger {
    info(msg) {
        console.log(`✅ [${new Date().toLocaleString()}] ℹ️ ${msg}`);
    }
    
    error(msg) {
        console.log(`❌ [${new Date().toLocaleString()}] 🔴 ${msg}`);
    }
    
    warn(msg) {
        console.log(`⚠️ [${new Date().toLocaleString()}] 🟡 ${msg}`);
    }
    
    success(msg) {
        console.log(`🎉 [${new Date().toLocaleString()}] 🟢 ${msg}`);
    }
}

module.exports = { logger: new Logger() };
