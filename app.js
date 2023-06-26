//https://pokeapi.co/api/v2/pokemon/pikachu

//on form submit 
//get form button
//get form input
//get display elements

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
    pokemonInformation.style.display = "block";

    pokemonSprite.src = pokemonInfo.sprites.front_default;

    pokemonName.innerHTML = `${pokemonInfo.name}`;
    
    pokemonId.innerHTML = `Id: ${pokemonInfo.id}`;

    pokemonWeight.innerHTML = `Weight: ${(pokemonInfo.weight * 0.1).toFixed(1)}Kg`;

    pokemonHeight.innerHTML = `Height: ${(pokemonInfo.height * 0.1).toFixed(2)}cm`;
    
    let _pokemonTypes = " ";
    pokemonInfo.types.forEach( element =>{
	_pokemonTypes += element.type.name + " ";
    });
    pokemonType.innerHTML = `Type: ${_pokemonTypes}`;

    let _pokeAbilities = "";
    pokemonInfo.abilities.forEach( abilities =>{
	_pokeAbilities += abilities.ability.name + " ";
    });
    pokemonAbility.innerHTML = `Abilities: ${_pokeAbilities}`;

    pokemonStatHp.innerHTML = `${pokemonInfo.stats[0].stat.name}: ${pokemonInfo.stats[0].base_stat}`;
    pokemonStatAttack.innerHTML = `${pokemonInfo.stats[1].stat.name}: ${pokemonInfo.stats[1].base_stat}`;
    pokemonStatDefense.innerHTML = `${pokemonInfo.stats[2].stat.name}: ${pokemonInfo.stats[2].base_stat}`;
    pokemonStatSpecialAttack.innerHTML = `${pokemonInfo.stats[3].stat.name}: ${pokemonInfo.stats[3].base_stat}`;
    pokemonStatSpecialDefense.innerHTML = `${pokemonInfo.stats[4].stat.name}: ${pokemonInfo.stats[4].base_stat}`;
    pokemonStatExperience.innerHTML = `Experience: ${pokemonInfo.base_experience}`;
}
