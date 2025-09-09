#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const packageJsonPath = path.join(__dirname, '..', 'package.json');
const useLocalLib = process.env.USE_LOCAL_LIB === 'true';

console.log(`Setting up dependencies with USE_LOCAL_LIB=${useLocalLib}`);

try {
  // Read package.json
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  if (useLocalLib) {
    // Use local file dependency
    console.log('Using local design system from ../design_system');
    packageJson.dependencies['@johnqh/design-system'] = 'file:../design_system';
  } else {
    // Use npm dependency - check latest version
    console.log('Fetching latest version from npm...');
    try {
      const latestVersion = execSync('npm view @johnqh/design-system version', { 
        encoding: 'utf8', 
        stdio: 'pipe' 
      }).trim();
      console.log(`Using npm version: ^${latestVersion}`);
      packageJson.dependencies['@johnqh/design-system'] = `^${latestVersion}`;
    } catch (error) {
      console.warn('Could not fetch latest version from npm, using ^1.0.0 as fallback');
      packageJson.dependencies['@johnqh/design-system'] = '^1.0.0';
    }
  }
  
  // Write updated package.json
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  console.log('✓ Updated package.json');
  
  // Only install dependencies if INSTALL_DEPS is set to true
  if (process.env.INSTALL_DEPS === 'true') {
    console.log('Installing dependencies...');
    execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
    console.log('✓ Dependencies installed successfully');
  } else {
    console.log('✓ Package.json updated (run "npm install" to install dependencies)');
  }
  
} catch (error) {
  console.error('❌ Error setting up dependencies:', error.message);
  process.exit(1);
}