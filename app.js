//https://pokeapi.co/api/v2/pokemon/pikachu

//on form submit 
//get form button
//get form input
//get display elements

//pokemon types background colors
var typeColors = [
    {"name":"normal",
     "color": "#A8A878"},
    {"name":"fire",
     "color":"#F08030"},
    {"name":"water",
     "color":"#6890F0"},
    {"name":"electric",
     "color":"#F8D030"},
    {"name":"grass",
     "color":"#78C850"},
    {"name":"ice",
     "color": "#98D8D8"},
    {"name":"fighting",
     "color":"#C03028"},
    {"name":"poison",
     "color":"#A040A0"},
    {"name":"ground",
     "color":"#E0C068"},
    {"name":"flying",
     "color":"#A890F0"},
    {"name":"psychic",
     "color":"#F85888"},
    {"name":"bug",
     "color":"#A8B820"},
    {"name":"rock",
     "color":"#B8A038"},
    {"name":"ghost",
     "color":"#705898"},
    {"name":"dragon",
     "color":"#7038F8"},
    {"name":"dark",
     "color":"#705848"},
    {"name":"steel",
     "color":"#B8B8D0"},
    {"name":"fairy",
     "color":"#EE99AC"}
];

//form elements
const searchButton = document.getElementById("searchPokemon");
const searchInput = document.getElementById("pokemonInput");

var pokemonInfo;

//display elements
var pokemonInformation = document.getElementById("pokemonInformation");
var pokemonName = document.getElementById("pokemonName");
var pokemonWeight = document.getElementById("pokemonWeight");
var pokemonHeight = document.getElementById("pokemonHeight");
var pokemonType = document.getElementById("pokemonType");
var pokemonId = document.getElementById("pokemonId");
var pokemonAbility = document.getElementById("pokemonAbility");
var pokemonStats = document.getElementById("pokemonStats");
var pokemonStatHp = document.getElementById("statHp");
var pokemonStatAttack = document.getElementById("statAttack");
var pokemonStatDefense = document.getElementById("statHp");
var pokemonStatSpecialAttack = document.getElementById("statSpecialAttack");
var pokemonStatSpecialDefense = document.getElementById("statSpecialDefense");
var pokemonStatExperience = document.getElementById("statExperience");
var pokemonSprite = document.getElementById("pokemonSprite");
var errorMessage = document.getElementById("errorMessage");

async function OnSubmit(){
    //if search is different from nothing
    let subbmitedPokemon = searchInput.value;
    if(subbmitedPokemon != ""){
	
	//get pokemon info and save it on another variable
	try{
	    data = await fetch(`https://pokeapi.co/api/v2/pokemon/${subbmitedPokemon}`)		
	    pokemonInfo = await data.json();

	    console.log(pokemonInfo);
	    
	    errorMessage.style.display = "none";
	    updateInformation();
	}catch(error){
	    console.log("there was an error", error);
	    errorMessage.style.display = "block";
	}
    }
}


//display information on dom elements
//replace display elements values with correct pokemon values

function updateInformation(){
    pokemonInformation.style.display = "flex";

    pokemonSprite.src = pokemonInfo.sprites.front_default;
    typeColors.forEach(color => {
	if(pokemonInfo.types[0].type.name == color.name){
	    console.log("coincide");
	    pokemonSprite.style.backgroundColor = `${color.color}`;
	}

    });
    
    pokemonName.innerHTML = `${pokemonInfo.name}`;
    
    pokemonId.innerHTML = `Id: ${pokemonInfo.id}`;

    pokemonWeight.innerHTML = `Weight: ${(pokemonInfo.weight * 0.1).toFixed(1)}Kg`;
    pokemonWeight.setAttribute("class", "element");
    pokemonHeight.innerHTML = `Height: ${(pokemonInfo.height * 0.1).toFixed(2)}cm`;
    pokemonHeight.setAttribute("class", "element");
    
    let _pokemonTypes = " ";
    pokemonInfo.types.forEach( element =>{
	_pokemonTypes += element.type.name + " ";
    });
    pokemonType.innerHTML = `Type: ${_pokemonTypes}`;

    let _pokeAbilities = "";
    pokemonInfo.abilities.forEach( abilities =>{
	_pokeAbilities += abilities.ability.name + " ";
    });
    pokemonAbility.innerHTML = `${_pokeAbilities}`;

    pokemonStatHp.innerHTML = `${pokemonInfo.stats[0].stat.name}: ${pokemonInfo.stats[0].base_stat}`;
    pokemonStatAttack.innerHTML = `${pokemonInfo.stats[1].stat.name}: ${pokemonInfo.stats[1].base_stat}`;
    pokemonStatDefense.innerHTML = `${pokemonInfo.stats[2].stat.name}: ${pokemonInfo.stats[2].base_stat}`;
    pokemonStatSpecialAttack.innerHTML = `${pokemonInfo.stats[3].stat.name}: ${pokemonInfo.stats[3].base_stat}`;
    pokemonStatSpecialDefense.innerHTML = `${pokemonInfo.stats[4].stat.name}: ${pokemonInfo.stats[4].base_stat}`;
    pokemonStatExperience.innerHTML = `Experience: ${pokemonInfo.base_experience}`;
}
