const os = require('os');
function getOsInfo() {
  return {
    platform: os.platform(),
    freeMem: os.freemem(),
    homeDir: os.homedir(),
    hostname: os.hostname(),
    networkInterfaces: os.networkInterfaces()
  };
}
function isEnoughMemory() {
  return os.freemem() > 4 * 1024 * 1024 * 1024;
}
function AcessCheck() {
  if (process.env.ACCESS_MODE !== 'admin') {
    throw new Error('Доступ запрещён: нужен ACCESS_MODE=admin');
  }
  return getOsInfo();
}
module.exports = { getOsInfo, isEnoughMemory, AcessCheck };
