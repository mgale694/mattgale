// SEO Health Check Script
// Run this after building your site to check SEO implementation

import fs from 'fs';
import path from 'path';

interface SEOCheck {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
}

function checkSEOHealth(): SEOCheck[] {
  const checks: SEOCheck[] = [];
  const publicDir = path.join(process.cwd(), 'public');
  const distDir = path.join(process.cwd(), 'dist');
  
  // Check if essential files exist
  const essentialFiles = [
    { file: 'robots.txt', name: 'Robots.txt' },
    { file: 'sitemap.xml', name: 'Sitemap' },
    { file: 'site.webmanifest', name: 'Web Manifest' },
    { file: '_headers', name: 'Security Headers' }
  ];

  essentialFiles.forEach(({ file, name }) => {
    const filePath = path.join(publicDir, file);
    if (fs.existsSync(filePath)) {
      checks.push({
        name,
        status: 'pass',
        message: `${name} exists and configured`
      });
    } else {
      checks.push({
        name,
        status: 'fail',
        message: `${name} is missing`
      });
    }
  });

  // Check favicon files
  const faviconFiles = [
    'favicon.ico',
    'favicon-16x16.png',
    'favicon-32x32.png',
    'apple-touch-icon.png'
  ];

  const missingFavicons = faviconFiles.filter(file => 
    !fs.existsSync(path.join(publicDir, file))
  );

  if (missingFavicons.length === 0) {
    checks.push({
      name: 'Favicons',
      status: 'pass',
      message: 'All essential favicon files present'
    });
  } else if (missingFavicons.length < faviconFiles.length) {
    checks.push({
      name: 'Favicons',
      status: 'warning',
      message: `Some favicon files missing: ${missingFavicons.join(', ')}`
    });
  } else {
    checks.push({
      name: 'Favicons',
      status: 'fail',
      message: 'No favicon files found - add favicon.ico and PNG variants'
    });
  }

  // Check social media images
  const socialImages = ['og-image.jpg', 'photography-preview.jpg'];
  const missingSocialImages = socialImages.filter(file => 
    !fs.existsSync(path.join(publicDir, file))
  );

  if (missingSocialImages.length === 0) {
    checks.push({
      name: 'Social Media Images',
      status: 'pass',
      message: 'Social media preview images present'
    });
  } else {
    checks.push({
      name: 'Social Media Images',
      status: 'warning',
      message: `Missing social preview images: ${missingSocialImages.join(', ')} (optional but recommended)`
    });
  }

  // Check if build output exists
  if (fs.existsSync(distDir)) {
    checks.push({
      name: 'Build Output',
      status: 'pass',
      message: 'Site has been built successfully'
    });
  } else {
    checks.push({
      name: 'Build Output',
      status: 'warning',
      message: 'Run "npm run build" to generate production files'
    });
  }

  return checks;
}

function printSEOReport() {
  console.log('\n🔍 SEO Health Check Report\n');
  console.log('='.repeat(50));
  
  const checks = checkSEOHealth();
  let passCount = 0;
  let warningCount = 0;
  let failCount = 0;

  checks.forEach(check => {
    const icon = check.status === 'pass' ? '✅' : 
                 check.status === 'warning' ? '⚠️' : '❌';
    console.log(`${icon} ${check.name}: ${check.message}`);
    
    if (check.status === 'pass') passCount++;
    else if (check.status === 'warning') warningCount++;
    else failCount++;
  });

  console.log('\n' + '='.repeat(50));
  console.log(`Summary: ${passCount} passed, ${warningCount} warnings, ${failCount} failed`);
  
  if (failCount === 0 && warningCount === 0) {
    console.log('🎉 Excellent! Your SEO setup is complete.');
  } else if (failCount === 0) {
    console.log('👍 Good! Address warnings for optimal SEO.');
  } else {
    console.log('⚠️  Please fix the failed checks for proper SEO.');
  }

  console.log('\n📋 Next Steps:');
  console.log('1. Generate favicons using https://favicon.io/');
  console.log('2. Create og-image.jpg (1200x630) for social media');
  console.log('3. Test your site with Google PageSpeed Insights');
  console.log('4. Submit your sitemap to Google Search Console');
  console.log('5. Validate your structured data with Google Rich Results Test');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  printSEOReport();
}

export { checkSEOHealth, printSEOReport };
