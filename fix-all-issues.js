const fs = require('fs');
const path = require('path');

// Fix circular imports and export conflicts
const filesToFix = [
  'src/components/ui/internal-link-clusters.tsx',
  'src/components/ui/web3-components.tsx',
  'src/components/ui/gradient-cta-section.tsx',
  'src/components/ui/hero-section.tsx',
  'src/components/HeroSection.tsx',
  'src/components/ErrorBoundary.tsx',
  'src/components/ErrorBoundaryLazy.tsx',
  'src/components/PerformanceOptimizer.tsx'
];

filesToFix.forEach(filePath => {
  const fullPath = path.join('/Users/qianghuang/mail_box_components', filePath);
  
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Fix circular imports
    content = content.replace(/import.*from ['"]@johnqh\/mail_box_components['"];?\n?/g, '');
    content = content.replace(/import.*from ['"]@johnqh\/mail-box-components['"];?\n?/g, '');
    
    // Fix relative imports that don't exist
    content = content.replace(/import.*from ['"]\.\/ui['"];?\n?/g, '');
    content = content.replace(/import.*from ['"]\.['"];?\n?/g, '');
    
    // Add necessary local imports for cn function
    if (content.includes('cn(')) {
      const cnImport = "import { cn } from '../../lib/utils';\n";
      if (!content.includes(cnImport)) {
        content = cnImport + content;
      }
    }
    
    // Fix export conflicts by converting to named exports
    content = content.replace(/^export const/gm, 'const');
    content = content.replace(/^export interface/gm, 'interface');
    content = content.replace(/^export type/gm, 'type');
    
    // Remove React import if not used
    if (!content.match(/React\.(FC|Component|useState|useEffect|createElement)/)) {
      content = content.replace(/import React from ['"]react['"];?\n?/g, '');
    }
    
    fs.writeFileSync(fullPath, content);
    console.log(`Fixed ${filePath}`);
  }
});

// Fix component index
const indexPath = '/Users/qianghuang/mail_box_components/src/components/index.ts';
if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');
  
  // Remove problematic imports
  const problematicImports = [
    'SemanticHTML',
    'PerformanceOptimizer', 
    'ErrorBoundaryLazy',
    'AITrainingEnhancer',
    'SecurityProvider',
    'StandardPageLayout',
    'AppCore',
    'MemoizedComponent'
  ];
  
  problematicImports.forEach(imp => {
    content = content.replace(new RegExp(`.*${imp}.*\n`, 'g'), '');
  });
  
  fs.writeFileSync(indexPath, content);
  console.log('Fixed components/index.ts');
}

console.log('All fixes applied');