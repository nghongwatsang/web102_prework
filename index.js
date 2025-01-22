/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = GAMES_DATA

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // loop over each item in the data
    for (let i = 0; i < games.length; i++){
        const newDiv = document.createElement('div');
        newDiv.classList.add('game-card');
        newDiv.innerHTML = `
            <img 
            src="${games[i].img}" 
            class="game-image" 
            style="width: 100%; height: 200px; object-fit: cover;" 
            />
            <h3>${games[i].name}</h3>
            <p>${games[i].description}</p>
        `;
        gamesContainer.appendChild(newDiv);
    }

}
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalBackers = GAMES_JSON.reduce( (acc,game) =>{
    return acc + game.backers;
    
}, 0);

contributionsCard.innerHTML = `${totalBackers.toLocaleString('en-US')}`;


// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce( (acc,game) =>{
    return acc + game.pledged;
    
}, 0);

raisedCard.innerHTML = `${totalRaised.toLocaleString('en-US')}`;




// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

gamesCard.innerHTML = `${GAMES_JSON.length}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // Use the addGamesToPage function to display the filtered list
    addGamesToPage(unfundedGames);
    // use the function we previously created to add the unfunded games to the DOM

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    addGamesToPage(fundedGames);

    // use the function we previously created to add unfunded games to the DOM

}


// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn").addEventListener("click", filterUnfundedOnly);
const fundedBtn = document.getElementById("funded-btn").addEventListener("click", filterFundedOnly);
const allBtn = document.getElementById("all-btn").addEventListener("click", showAllGames);

// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.reduce((count, game) => {
    return game.pledged < game.goal ? count + 1 : count;
}, 0);

// Calculate the total amount raised
const totalMoneyRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);

// Calculate the total number of games
const totalGames = GAMES_JSON.length;

// create a string that explains the number of unfunded games using the ternary operator
const summaryMessage = `
A total of $${totalMoneyRaised.toLocaleString()} has been raised for ${totalGames} game${totalGames > 1 ? 's' : ''}. 
${unfundedGamesCount === 0 ? "All games are fully funded!" : unfundedGamesCount === 1 
    ? "Currently, 1 game remains unfunded." 
    : `Currently, ${unfundedGamesCount} games remain unfunded.`}
`;
// create a new DOM element containing the template string and append it to the description container

const paragraph = document.createElement("p");

paragraph.textContent = summaryMessage;

descriptionContainer.appendChild(paragraph);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [first, second, ...rest] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topPledged = document.createElement("p");
topPledged.textContent = first.name;
firstGameContainer.appendChild(topPledged)
// do the same for the runner up item
const runnerUp = document.createElement("p");
runnerUp.textContent = second.name;
secondGameContainer.appendChild(runnerUp)



// SEARCH BAR
const searchBar = document.getElementById("search-bar");

searchBar.addEventListener("input", (event) => {
    const searchQuery = event.target.value.toLowerCase();

    // Filter games based on the search query
    const filteredGames = GAMES_JSON.filter(game =>
        game.name.toLowerCase().includes(searchQuery)
    );

    deleteChildElements(gamesContainer);
    addGamesToPage(filteredGames);
});
