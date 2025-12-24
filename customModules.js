function sortStringsIgnoreSpaces(arr) {
  return [...arr].sort((a, b) =>
    a.replace(/\s+/g, '').localeCompare(b.replace(/\s+/g, ''), 'ru')
  );
}
async function loadJson(url) {
  const state = { data: [], isLoading: true, error: null };
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    state.data = await res.json();
  } catch (err) {
    state.error = err;
  } finally {
    state.isLoading = false;
  }
  return state;
}
const fs = require('fs');
const { promises: fsp } = require('fs');
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
async function writeFile(file, content) {
  await fsp.writeFile(file, content, 'utf8');
}
async function readFile(file) {
  return await fsp.readFile(file, 'utf8');
}
async function overwriteFile(file, content) {
  await fsp.writeFile(file, content, 'utf8');
}
async function clearFile(file) {
  await fsp.writeFile(file, '', 'utf8');
}
async function sanitizeFile(file) {
  const data = await readFile(file);
  const sanitized = data.replace(/\d+/g, '').toLowerCase();
  await writeFile(file, sanitized);
}
async function copyFile(src, dest) {
  await fsp.copyFile(src, dest);
}
async function createDir(dir) {
  await fsp.mkdir(dir, { recursive: true });
}
async function removeDir(dir) {
  await fsp.rm(dir, { recursive: true, force: true });
}
module.exports = {
  sortStringsIgnoreSpaces,
  loadJson,
  writeFileSync, readFileSync, overwriteFileSync, clearFileSync,
  sanitizeFileSync, copyFileSync, createDirSync, removeDirSync,
  writeFile, readFile, overwriteFile, clearFile,
  sanitizeFile, copyFile, createDir, removeDir
};
