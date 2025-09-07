#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Fix undefined exports and clean up export blocks
  let fixed = content
    .replace(/,\s*undefined,?/g, ',')  // Remove undefined entries
    .replace(/undefined,?\s*/g, '')   // Remove standalone undefined
    .replace(/,\s*,/g, ',')          // Remove double commas
    .replace(/,\s*}/g, '\n}')        // Fix trailing comma before closing brace
    .replace(/{\s*,/g, '{')          // Fix leading comma after opening brace
    .replace(/export\s+{\s*}/g, '')  // Remove empty export blocks
    .replace(/{\s*\n\s*}/g, '{}')    // Fix empty multiline blocks
    .replace(/,\s*\n\s*}/g, '\n}');  // Fix trailing comma before closing brace on newline
  
  // Fix specific problematic patterns
  fixed = fixed
    .replace(/export { default } from/g, 'export { default as ')
    .replace(/type { /g, 'export type { ');
    
  if (fixed !== content) {
    fs.writeFileSync(filePath, fixed);
    console.log(`Fixed: ${filePath}`);
    return true;
  }
  return false;
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  let changedFiles = 0;
  
  for (const file of files) {
    const filePath = path.join(dir, file.name);
    
    if (file.isDirectory()) {
      changedFiles += processDirectory(filePath);
    } else if ((file.name.endsWith('.ts') || file.name.endsWith('.tsx')) && 
               !file.name.endsWith('.d.ts') && 
               !file.name.includes('node_modules')) {
      try {
        if (processFile(filePath)) {
          changedFiles++;
        }
      } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
      }
    }
  }
  
  return changedFiles;
}

// Start processing from src directory
const srcDir = path.join(__dirname, 'src');
const changedFiles = processDirectory(srcDir);
console.log(`\nFixed ${changedFiles} files`);