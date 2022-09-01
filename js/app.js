// load api and let make it dynamic
const loadCocktail = async (search) => {
    togglerSpinner(true);

    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
    const res = await fetch(url);
    const cocktail = await res.json();
    displayCocktail(cocktail.drinks)
}

// after load display the data
const displayCocktail = drinks => {
    // console.log(drinks === null)

    drinks === null ? errMessage(true) : errMessage(false);

    const drinksContainer = document.getElementById('drinks-container');
    drinksContainer.textContent = ``;
    drinks.forEach(drink => {
        const {strDrinkThumb, strDrink, strCategory, idDrink} = drink;
        // console.log(drink)
        const colDiv = document.createElement('div');
        colDiv.classList.add('col');
        colDiv.innerHTML = `
        <div class="card mt-5 border border-2 border-info bg-indigo" onclick="seeDetailFn(${idDrink})" data-bs-toggle="modal" data-bs-target="#cocktailModal">
            <img src="${strDrinkThumb}" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${strDrink}</h5>
                <p class="card-text fw-bolder">Categogry: <small>${strCategory}</small></p>
                <button class="btn btn-info text-white px-3">Get Free</button>
            </div>
        </div>
        `
        drinksContainer.appendChild(colDiv);
    })
    togglerSpinner(false)
}

// show error message
const errMessage = (isTrue) => {
    // console.log(isTrue)
    const getErrMessageSection = document.getElementById('error-message-section');
    const removeNone = getErrMessageSection.classList.remove('d-none');
    isTrue ? removeNone : getErrMessageSection.classList.add('d-none');
    togglerSpinner(false)
}

// search field
const searchCocktail = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = ``;
    
    loadCocktail(searchText);
}

// implement enter key on search field
document.getElementById('search-field').addEventListener('keypress', e => {
    e.key === 'Enter' ? searchCocktail() : false ;
})

// see detail function
const seeDetailFn = async(id) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.drinks)
}

// display cocktail details
const displayDetails = drinks => {
    const drink = drinks[0];
    const {strDrinkThumb, strDrink, dateModified, strCategory, strInstructions} = drink;

    document.getElementById('cocktailModalLabel').innerText = strDrink;
    const modalBody = document.getElementById('modalBody');
    modalBody.textContent = ``;

    const div = document.createElement('div');
    div.innerHTML = `
    <div class="card border border-2 border-info">
    <img src="${strDrinkThumb}" class="card-img-top">
    <div class="card-body bg-info">
        <p class="card-text fw-bolder">Categogry: <small>${strCategory}</small></p>
        <p class="card-text"><small>Modified: ${dateModified}</small></p>
        <p class="card-text">${strInstructions.slice(0, 40)}</p>
        <button class="btn btn-outline-success text-white px-3" onclick="alertMessage()">Get Free</button>
    </div>
    </div>
    `
    modalBody.appendChild(div);
}

const alertMessage = () => {
    alert(`Hayre ai hoise pala. Mod khojo phao!`)
}

// added toggler spinner in loading time
const togglerSpinner = (isLoading) => {
    const spinner = document.getElementById('toggler-spinner');
    isLoading ? spinner.classList.remove('d-none') : spinner.classList.add('d-none');

}

loadCocktail('')