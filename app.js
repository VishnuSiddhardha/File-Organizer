const fs = require("fs");
const path = require("path");

// Get folder path from command line
const folderPath = process.argv[2];

if (!folderPath) {
    console.error("Please provide a folder path. Usage: node organizer.js <folder-path>");
    process.exit(1);
}

// Check if folder exists
if (!fs.existsSync(folderPath)) {
    console.error("Folder does not exist:", folderPath);
    process.exit(1);
}

// Extensions to ignore
const ignoreExt = ["exe", "tmp", "dll"];

// Object to track how many files were moved per extension
const summary = {};

fs.readdir(folderPath, (err, items) => {
    if (err) {
        console.error("Error reading folder:", err);
        return;
    }

    const files = items.filter(item => {
        const fullPath = path.join(folderPath, item);
        return fs.statSync(fullPath).isFile();
    });

    for (let file of files) {
        if (file.startsWith(".")) continue; // skip hidden files

        let ext = path.extname(file).slice(1); // get extension without dot

        // Skip ignored extensions
        if (ignoreExt.includes(ext)) {
            console.log(`Skipping ${file} (ignored extension)`);
            continue;
        }

        let extFolderPath = path.join(folderPath, ext);

        if (!fs.existsSync(extFolderPath)) {
            fs.mkdirSync(extFolderPath);
        }

        let oldPath = path.join(folderPath, file);
        let newPath = path.join(extFolderPath, file);

        // Handle duplicate filenames
        if (fs.existsSync(newPath)) {
            const name = path.parse(file).name;
            const extension = path.parse(file).ext;
            let counter = 1;
            while (fs.existsSync(path.join(extFolderPath, `${name}(${counter})${extension}`))) {
                counter++;
            }
            newPath = path.join(extFolderPath, `${name}(${counter})${extension}`);
        }

        fs.renameSync(oldPath, newPath);
        console.log(`${file} → moved to ${ext}/`);

        // Update summary
        summary[ext] = summary[ext] ? summary[ext] + 1 : 1;
    }

    // Print summary
    console.log("\n--- Summary ---");
    for (let ext in summary) {
        console.log(`${ext}: ${summary[ext]} file(s) moved`);
    }
});
