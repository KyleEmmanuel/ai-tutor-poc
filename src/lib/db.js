// // Function to read JSON data from localStorage
// export function readJson() {
//     const data = localStorage.getItem('db');
//     return data ? JSON.parse(data) : { progress: 0, currentStep: 1 };
// }

// // Function to update JSON in localStorage
// export function updateJson(updates) {
//     const currentData = readJson();  // Get the current data from localStorage
//     const updatedData = { ...currentData, ...updates };

//     // Save the updated data back to localStorage
//     localStorage.setItem('db', JSON.stringify(updatedData));

//     return updatedData; // Return the updated data
// }

import { writable } from 'svelte/store';

// Function to create a store that syncs with localStorage
function localStorageStore(key, initialValue) {
    // Read initial data from localStorage or use the default value
    const storedValue = localStorage.getItem(key);
    const initial = storedValue ? JSON.parse(storedValue) : initialValue;

    // Create a writable store with the initial value
    const store = writable(initial);

    // Subscribe to the store and update localStorage whenever it changes
    store.subscribe((value) => {
        localStorage.setItem(key, JSON.stringify(value));
    });

    return store;
}

// Create the store
export const dbStore = localStorageStore('db', { progress: 0, currentStep: 1 });
export const stepsStore = localStorageStore('steps', [])
export const planStore = localStorageStore('plan', null)
export const reflectionStore = localStorageStore('reflection', null)
