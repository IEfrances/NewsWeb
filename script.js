const API_KEY = "9b6cdeb814ae4ee0b47d539a1bb46553"
const url = "https://newsapi.org/v2/everything?q="


// Fetch data from the API
async function fetchData(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data = await res.json()
    return data
}

fetchData("all").then(data => {
    console.log(data);  // Log the data to the console
    renderMain(data.articles);
});

// Menu button functionality
let mobilemenu = document.querySelector(".mobile")
let menuBtn = document.querySelector(".menuBtn")
let menuBtnDisplay = true;

menuBtn.addEventListener("click", ()=>{
    mobilemenu.classList.toggle("hidden")
    }
)

// Render the news articles in the main section
function renderMain(arr){
    if (!arr) {
        console.error("Data is undefined");
        return;
    }
    let mainHTML = ""
    for(let i = 0; i < arr.length; i++){
        if(arr[i].urlToImage){
        mainHTML += `<div class="card">
                        <a href=${arr[i].url}>
                        <img src=${arr[i].urlToImage} lazy="loading"/>
                        <h4>${arr[i].title}</h4>
                        <div class="publishbydate">
                            <p>${arr[i].source.name}</p>
                            <span>•</span>
                            <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
                        </div>
                        <div class="desc">
                            ${arr[i].description}
                        </div>
                    </div>

                `
        }
    }
    
    document.querySelector("main").innerHTML = mainHTML

}
// Event listeners for search form submission
const searchBtn = document.getElementById("searchForm")
const searchBtnMobile = document.getElementById("searchFormMobile")
const searchInputMobile = document.getElementById("searchInputMobile")
const searchInput = document.getElementById("searchInput")

searchBtn.addEventListener("submit", async(e)=>{
    e.preventDefault()
    console.log(searchInput.value)

    const data = await fetchData(searchInput.value)
    renderMain(data.articles)

})

searchBtnMobile.addEventListener("submit", async(e)=>{
    e.preventDefault()
    const data = await fetchData(searchInputMobile.value)
    renderMain(data.articles)

})

// Search function to fetch and render data for a specific query
async function Search(query){ 
    const data = await fetchData(query)
    renderMain(data.articles)

}

