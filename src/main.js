const app = document.getElementById('app');

// Safely retrieve the API key without crashing if import.meta.env is undefined
let envKey;
try {
    envKey = (typeof import.meta !== 'undefined' && import.meta.env) 
        ? import.meta.env.VITE_NASA_API_KEY 
        : undefined;
} catch (e) {
    envKey = undefined;
}

const API_KEY = envKey || 'DEMO_KEY';
const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

async function fetchNasaData(){
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        app.innerHTML = `
         <h1>${data.title}</h1>
         <img src="${data.url}" alt="${data.title}" style="max-width: 100%; height: auto;" />
         <p>${data.explanation}</p>
        `;
    } catch (error){
        console.error("Error fetching NASA data:", error);
        app.innerHTML = "<p>Oops! Couldn't load the space picture today.</p>";
    }
}

fetchNasaData();