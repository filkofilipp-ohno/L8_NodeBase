const bcrypt = require('bcrypt');
const passwords = Array.from({ length: 13 }, (_, i) => `pass_${i + 1}`);
const saltRounds = 10;
(async () => {
  const startAll = Date.now();
  const results = await Promise.all(passwords.map(async (pwd) => {
    const start = Date.now();
    const hash = await bcrypt.hash(pwd, saltRounds);
    const duration = Date.now() - start;
    console.log(`[${pwd}] hashed in ${duration} ms`);
    return duration;
  }));
  const total = Date.now() - startAll;
  console.log('Total time:', total, 'ms');
  console.log('Avg per hash:', results.reduce((a, b) => a + b, 0) / results.length, 'ms');
})();