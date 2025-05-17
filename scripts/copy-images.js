const fs = require("fs")
const path = require("path")

// Source and destination directories
const sourceDir = path.join(__dirname, "../static")
const destDir = path.join(__dirname, "../app/static/images")

// Create destination directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true })
  console.log(`Created directory: ${destDir}`)
}

// List of image files to copy
const imageFiles = [
  "Exhibition Photos.png",
  "fb.png",
  "IG.png",
  "map.png",
  "work1.jpg",
  "work2.jpg",
  "work3.jpg",
  "work4.jpg",
  "work5.jpg",
]

// Copy each file
imageFiles.forEach((file) => {
  const sourcePath = path.join(sourceDir, file)
  const destPath = path.join(destDir, file)

  try {
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, destPath)
      console.log(`Copied ${file} to app/static/images/`)
    } else {
      console.error(`Source file not found: ${sourcePath}`)
    }
  } catch (error) {
    console.error(`Error copying ${file}:`, error)
  }
})

console.log("Image copying complete!")
