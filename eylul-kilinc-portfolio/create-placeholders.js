const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

async function createPlaceholders() {
  try {
    // Create header placeholder (1000x300)
    await sharp({
      create: {
        width: 1000,
        height: 300,
        channels: 3,
        background: { r: 50, g: 50, b: 50 }
      }
    })
      .jpeg({ quality: 90 })
      .toFile(path.join(publicDir, 'placeholder-header.jpg'));
    console.log('✓ Created placeholder-header.jpg');

    // Create visual arts placeholder (250x250)
    await sharp({
      create: {
        width: 250,
        height: 250,
        channels: 3,
        background: { r: 200, g: 180, b: 160 }
      }
    })
      .jpeg({ quality: 90 })
      .toFile(path.join(publicDir, 'placeholder-visual-arts.jpg'));
    console.log('✓ Created placeholder-visual-arts.jpg (250x250)');

    // Create theatre placeholder (250x250)
    await sharp({
      create: {
        width: 250,
        height: 250,
        channels: 3,
        background: { r: 160, g: 160, b: 180 }
      }
    })
      .jpeg({ quality: 90 })
      .toFile(path.join(publicDir, 'placeholder-theatre.jpg'));
    console.log('✓ Created placeholder-theatre.jpg (250x250)');

    console.log('\nAll placeholder images created successfully!');
  } catch (error) {
    console.error('Error creating placeholders:', error);
    process.exit(1);
  }
}

createPlaceholders();
