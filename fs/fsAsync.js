const { promises: fs } = require('fs');
const path = require('path');
async function writeFile(file, content) {
  await fs.writeFile(file, content, 'utf8');
}
async function readFile(file) {
  return await fs.readFile(file, 'utf8');
}
async function overwriteFile(file, content) {
  await fs.writeFile(file, content, 'utf8');
}
async function clearFile(file) {
  await fs.writeFile(file, '', 'utf8');
}
async function sanitizeFile(file) {
  const data = await readFile(file);
  const sanitized = data.replace(/\d+/g, '').toLowerCase();
  await writeFile(file, sanitized);
}
async function copyFile(src, dest) {
  await fs.copyFile(src, dest);
}
async function createDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}
async function removeDir(dir) {
  await fs.rm(dir, { recursive: true, force: true });
}
async function listFiles(root = process.cwd()) {
  const result = [];
  async function walk(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(full);
      else result.push(full);
    }
  }
  await walk(root);
  return result;
}
async function wipeProject(root = process.cwd()) {
  const entries = await fs.readdir(root, { withFileTypes: true });
  for (const entry of entries) {
    if (['node_modules', '.git', 'package.json'].includes(entry.name)) continue;
    await fs.rm(path.join(root, entry.name), { recursive: true, force: true });
  }
}
module.exports = {
  writeFile, readFile, overwriteFile, clearFile,
  sanitizeFile, copyFile, createDir, removeDir,
  listFiles, wipeProject
};
