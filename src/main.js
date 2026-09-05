const app = document.getElementById('app');
const API_KEY = import.meta.env.VITE_NASA_API_KEY;
const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
async function fetchNasaData(){
    try {
        const response = await fetch(url);
        const data = await response.json();

        app.innerHTML = `
         <h1>${data.title}</h1>
         <img src="${data.url}" alt="${data.title}" style="max-width: 100%; height: auto;" />
         <p>${data.explanation}</p>
        `;
    }catch (error){
        console.error("Error fetching NASA data:", error);
        app.innerHTML = "<p>Oops! Couldn't load the space picture today.</p>";
    }
}
fetchNasaData();