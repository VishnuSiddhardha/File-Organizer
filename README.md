# File Organizer (Node.js)

Automatically organizes files in a folder into subfolders based on their file extensions. Keep your directories neat, avoid clutter, and handle duplicate files safely.

## Features
- Creates folders for each file type automatically
- Moves files into the correct extension-based folder
- Handles duplicate filenames by renaming them
- Skips hidden files and allows ignoring specific extensions
- Prints a summary of files moved per extension
- Works with any folder path provided by the user

## Tech Stack
- Node.js
- fs module
- path module

## Usage
```bash
node organizer.js <folder-path>

example:
node organizer.js ./Downloads
