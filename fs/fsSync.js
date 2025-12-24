const fs = require('fs');
const path = require('path');
function writeFileSync(file, content) {
  fs.writeFileSync(file, content, 'utf8');
}
function readFileSync(file) {
  return fs.readFileSync(file, 'utf8');
}
function overwriteFileSync(file, content) {
  fs.writeFileSync(file, content, 'utf8');
}
function clearFileSync(file) {
  fs.writeFileSync(file, '', 'utf8');
}
function sanitizeFileSync(file) {
  const data = readFileSync(file);
  const sanitized = data.replace(/\d+/g, '').toLowerCase();
  writeFileSync(file, sanitized);
}
function copyFileSync(src, dest) {
  fs.copyFileSync(src, dest);
}
function createDirSync(dir) {
  fs.mkdirSync(dir, { recursive: true });
}
function removeDirSync(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
}
function listFilesSync(root = process.cwd()) {
  const result = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else result.push(full);
    }
  }
  walk(root);
  return result;
}
function wipeProjectSync(root = process.cwd()) {
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (['node_modules', '.git', 'package.json'].includes(entry.name)) continue;
    fs.rmSync(path.join(root, entry.name), { recursive: true, force: true });
  }
}
module.exports = {
  writeFileSync, readFileSync, overwriteFileSync, clearFileSync,
  sanitizeFileSync, copyFileSync, createDirSync, removeDirSync,
  listFilesSync, wipeProjectSync
};
