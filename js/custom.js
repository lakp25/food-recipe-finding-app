let searchForm = document.querySelector("form");
let container = document.querySelector(".container");
let searchResultDiv = document.querySelector(".search-result");
let error = document.querySelector(".errortitle")

let userinput = document.getElementById('uinput');
let searchQuery = "";

const APP_ID = "74238c15";
const APP_KEY  = "2f8b2395df961eceb015dce37f24b355";

searchForm.addEventListener("submit" , (e)=>{
    e.preventDefault();
   
    // console.log(searchQuery);
    if(userinput.value==null || userinput.value === ""){
        error.innerHTML = "Please Enter a Food Name";
    }else{
        searchQuery = userinput.value
        error.innerHTML = "";
    }
    customfetchAPI();
})

async function customfetchAPI(){
    let baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=20`;
    try {
        const response = await fetch(baseURL);
        const customData = await response.json();
        if(customData.hits.length <= 0) {
            error.innerHTML = "Can Not Find the Food Recipe. Try Again!";
        }else{
            generateHTML(customData.hits);
        }
        
        console.log(customData);
    }
    catch(error){
        console.log(error)
    }
}


function generateHTML(customResult){
    let generatedAllHTML = '';
    customResult.map((result)=>{
        generatedAllHTML +=
        `
            <div class="item">
                <img src="${result.recipe.image}" alt="">
                <div class="flex-container">
                    <h3 class="title">${result.recipe.label}</h3>
                    <a href="${result.recipe.url}" target="_blank" class="view-btn">View Recipe</a>
                    <p class="item-data"> <b class="subtitle">Dish Type : </b> ${result.recipe.dishType}</p>
                    <p class="item-data"> <b class="subtitle">Calories : </b> ${result.recipe.calories.toFixed(2)}</p>
                    <p class="item-data"> <b class="subtitle">Diet Label: </b> ${result.recipe.dietLabels. length > 0 ? result.recipe.dietLabels : 'No Data Found'  }</p>
                    <p class="item-data"> <b class="subtitle">Health Label : </b> ${result.recipe.healthLabels.slice(0,3)}</p>
                </div>
            </div>
        `
    })

    // append the generated list
    searchResultDiv.innerHTML = generatedAllHTML;

}