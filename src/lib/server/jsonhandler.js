import fs from 'fs/promises';
import path from 'path';

const filePath = path.resolve('static/db.json') // Adjust the path based on your directory structure

// Function to read JSON data
export async function readJson() {
    const fileContents = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContents);
}

// Function to update JSON with multiple key-value pairs
export async function updateJson(updates) {
    const fileContents = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContents);

    // Merge updates into the existing JSON object
    Object.assign(jsonData, updates);

    // Write the updated JSON back to the file
    await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');
    await new Promise((resolve) => setTimeout(resolve, 100));
    const updatedFileContents = await fs.readFile(filePath, 'utf-8');

    return updatedFileContents;
}
