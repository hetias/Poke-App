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
var pokemonContainer = document.getElementById("pokemonContainer");
var pokemonName = document.getElementById("pokemonName");
var pokemonWeight = document.getElementById("pokemonWeight");
var pokemonHeight = document.getElementById("pokemonHeight");
var pokemonTypes = document.getElementById("pokemonTypes");
var pokemonId = document.getElementById("pokemonId");

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
    if((subbmitedPokemon != "")){
	
	//get pokemon info and save it on another variable
	try{
	    data = await fetch(`https://pokeapi.co/api/v2/pokemon/${subbmitedPokemon.toLowerCase()}`)		
	    pokemonInfo = await data.json();

	    console.log(pokemonInfo);
	    
	    updateInformation();
	}catch(error){
	    console.log("there was an error", error);
	    errorMessage.style.display = "absolute";
	}
    }
}


//display information on dom elements
//replace display elements values with correct pokemon values

function updateInformation(){
    pokemonContainer.style.display = "flex";

    pokemonSprite.src = pokemonInfo.sprites.front_default;
    
    pokemonName.innerHTML = `${pokemonInfo.name}`;
    
    pokemonId.innerHTML = `${pokemonInfo.id}`;

    /*abilities list*/    
    let abilitiesList = document.getElementsByClassName("abilitiesList");
    while(abilitiesList[0].childNodes.length > 1){
	abilitiesList[0].removeChild(abilitiesList[0].lastChild);
    }

    /*size and weight*/
    pokemonWeight.innerHTML = `${(pokemonInfo.weight * 0.1).toFixed(1)}Kg \n Weight`;
    pokemonWeight.setAttribute("class", "element");
    
    pokemonWeight.style.display = "flex";
    pokemonHeight.innerHTML = `${(pokemonInfo.height * 0.1).toFixed(2)}cm \n Height`;
    pokemonHeight.setAttribute("class", "element");

    /*types list*/
    let _typesList =  document.getElementsByClassName("typesList");
    while(_typesList[0].childNodes.length > 1){
	_typesList[0].removeChild(_typesList[0].lastChild);
    }
    
    pokemonInfo.types.forEach( element =>{
	const _listElement = document.createElement("li");
	const _typeText = document.createTextNode(element.type.name);

	typeColors.forEach(typeColor =>{
	    if(typeColor.name == element.type.name){
		_listElement.classList.add("element");
		_listElement.style.backgroundColor = `${typeColor.color}`;
		_listElement.style.color = 'black';
		_listElement.appendChild(_typeText);
	    }
	});

	_typesList[0].appendChild(_listElement);
    });

    /*stats list*/
    let statList = document.getElementsByClassName("statList");

    while(statList[0].childNodes.length > 1){
	statList[0].removeChild(statList[0].lastChild);
    }

    pokemonInfo.stats.forEach(element =>{
	const _listElement = document.createElement("li");
	const _parrElement = document.createElement("p");
	const _statText = document.createTextNode(`${element.stat.name} - ${element.base_stat}`);
	
	/*_listElement.classList.add("statElement");*/
	_listElement.classList.add("element");
	_listElement.classList.add("statElement");

	_parrElement.appendChild(_statText);
	_listElement.appendChild(_parrElement);
	statList[0].appendChild(_listElement);
    });
        
}
