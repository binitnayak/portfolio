const fs = require('fs');

async function main() {
  const data = fs.readFileSync('public/kartu.glb');
  console.log("GLB file size:", data.length);
  // Just want to make sure the file exists and is readable
}
main();
