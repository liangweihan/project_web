const fs = require("fs")
const path = require("path")

// Define source and destination directories
const sourceDir = path.join(__dirname, "../static")
const destDir = path.join(__dirname, "../public/static")

// Create destination directory if it doesn't exist
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true })
  console.log(`Created directory: ${destDir}`)
}

// Function to copy files recursively
function copyFiles(source, destination) {
  // Get all files and directories in the source directory
  const items = fs.readdirSync(source)

  // Process each item
  items.forEach((item) => {
    const sourcePath = path.join(source, item)
    const destPath = path.join(destination, item)

    // Check if it's a directory or file
    const stats = fs.statSync(sourcePath)

    if (stats.isDirectory()) {
      // Create the directory if it doesn't exist
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true })
        console.log(`Created directory: ${destPath}`)
      }

      // Recursively copy files from this directory
      copyFiles(sourcePath, destPath)
    } else {
      // Copy the file
      fs.copyFileSync(sourcePath, destPath)
      console.log(`Copied file: ${sourcePath} -> ${destPath}`)
    }
  })
}

// Start copying files
try {
  copyFiles(sourceDir, destDir)
  console.log("All static files copied successfully!")
} catch (error) {
  console.error("Error copying static files:", error)
}
