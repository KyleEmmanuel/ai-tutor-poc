// Function to read JSON data from localStorage
export function readJson() {
    const data = localStorage.getItem('db');
    return data ? JSON.parse(data) : { progress: 5, currentStep: 1 }; // Return an empty object if no data is found
}

// Function to update JSON in localStorage
export function updateJson(updates) {
    const currentData = readJson();  // Get the current data from localStorage
    const updatedData = { ...currentData, ...updates };

    // Save the updated data back to localStorage
    localStorage.setItem('db', JSON.stringify(updatedData));

    return updatedData; // Return the updated data
}
