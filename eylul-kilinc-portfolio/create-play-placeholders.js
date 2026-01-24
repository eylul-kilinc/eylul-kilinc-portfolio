const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');

async function createPlayPlaceholders() {
  try {
    // Create play placeholder images (600x400)
    const colors = [
      { r: 180, g: 160, b: 140 }, // Beige
      { r: 140, g: 160, b: 180 }, // Blue-gray
      { r: 160, g: 180, b: 160 }, // Green-gray
    ];

    for (let i = 1; i <= 3; i++) {
      await sharp({
        create: {
          width: 600,
          height: 400,
          channels: 3,
          background: colors[i - 1]
        }
      })
        .jpeg({ quality: 90 })
        .toFile(path.join(publicDir, `placeholder-play${i}.jpg`));
      console.log(`✓ Created placeholder-play${i}.jpg`);
    }

    console.log('\nAll play placeholder images created successfully!');
  } catch (error) {
    console.error('Error creating placeholders:', error);
    process.exit(1);
  }
}

createPlayPlaceholders();
