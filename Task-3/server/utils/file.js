const fs = require('fs').promises;
const path = require('path');

async function loadFile(filePath, encoding = 'utf-8') {
  try {
    const fullPath = path.resolve(__dirname, '..', filePath);
    return await fs.readFile(fullPath, encoding);
  } catch (err) {
    console.error(`Error loading file: ${filePath}`, err.message);
    return null;
  }
}

async function readJSON(filePath) {
  const data = await loadFile(filePath);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch (err) {
    console.error(`Invalid JSON in ${filePath}`, err.message);
    return [];
  }
}

async function writeJSON(filePath, obj) {
  try {
    await fs.writeFile(filePath, JSON.stringify(obj));
  } catch (err) {
    console.error('Error writing JSON:', err.message);
    throw err;
  }
}

module.exports = { loadFile, readJSON, writeJSON };
