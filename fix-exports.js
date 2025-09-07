#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  let exports = [];
  let typeExports = [];
  let inDefaultExport = false;
  let defaultExportStart = -1;
  let braceLevel = 0;
  
  const newLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Handle default export object
    if (line.includes('export default {')) {
      inDefaultExport = true;
      defaultExportStart = i;
      braceLevel = 1;
      continue;
    }
    
    if (inDefaultExport) {
      braceLevel += (line.match(/\{/g) || []).length;
      braceLevel -= (line.match(/\}/g) || []).length;
      
      if (braceLevel === 0) {
        inDefaultExport = false;
        // Skip the closing brace line
        continue;
      } else {
        // Skip content inside default export
        continue;
      }
    }
    
    // Convert direct exports to const declarations
    if (line.startsWith('export const ') || line.startsWith('export function ')) {
      const newLine = line.replace(/^export (const|function) /, '$1 ');
      newLines.push(newLine);
      
      // Extract export name
      const match = newLine.match(/^(const|function) (\w+)/);
      if (match) {
        exports.push(match[2]);
      }
    } else if (line.startsWith('export interface ') || line.startsWith('export type ')) {
      const newLine = line.replace(/^export (interface|type) /, '$1 ');
      newLines.push(newLine);
      
      // Extract export name
      const match = newLine.match(/^(interface|type) (\w+)/);
      if (match) {
        typeExports.push(match[2]);
      }
    } else if (line.startsWith('export enum ')) {
      const newLine = line.replace(/^export enum /, 'enum ');
      newLines.push(newLine);
      
      // Extract export name
      const match = newLine.match(/^enum (\w+)/);
      if (match) {
        exports.push(match[2]);
      }
    } else if (line.startsWith('export class ')) {
      const newLine = line.replace(/^export class /, 'class ');
      newLines.push(newLine);
      
      // Extract export name
      const match = newLine.match(/^class (\w+)/);
      if (match) {
        exports.push(match[2]);
      }
    } else if (!inDefaultExport) {
      newLines.push(line);
    }
  }
  
  // Add named exports at the end
  if (exports.length > 0 || typeExports.length > 0) {
    newLines.push('');
    newLines.push('export {');
    
    // Add type exports first
    typeExports.forEach(name => {
      newLines.push(`  type ${name},`);
    });
    
    // Add regular exports
    exports.forEach((name, index) => {
      const comma = index < exports.length - 1 || typeExports.length > 0 ? ',' : '';
      newLines.push(`  ${name}${comma}`);
    });
    
    newLines.push('};');
  }
  
  const newContent = newLines.join('\n');
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent);
    console.log(`Updated: ${filePath}`);
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
      if (processFile(filePath)) {
        changedFiles++;
      }
    }
  }
  
  return changedFiles;
}

// Start processing from src directory
const srcDir = path.join(__dirname, 'src');
const changedFiles = processDirectory(srcDir);
console.log(`\nProcessed ${changedFiles} files`);