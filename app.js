const submit = document.querySelector('#submit');

const img = document.querySelector('#picture');
const pokeName = document.querySelector('#title');
const abilityName = document.querySelector('#abilityName');
const description = document.querySelector('#desctitle');

const hitpoints = document.querySelector('#hitpoint');
const attack = document.querySelector('#stat1Value');
const defense = document.querySelector('#stat2Value');
const speed = document.querySelector('#stat3Value')

const moveName = document.querySelector('#moveName');
const movePower = document.querySelector('#moveScore');

const flip = document.querySelector('#cardFront');

let pokemonId = 'None';

let getMyPokemon = async pokemonId => {
    try {
        let result = await fetch(pokemonId);
        if (result.status > 399) {
            throw new Error ("Bad status code!")
        }
        return await result.json();

    }   catch (error) {
        console.log(error);
        console.log(result.statusText);
    }
}

let capitalise = string => {
    string = string[0].toUpperCase() + string.substring(1);
    console.log(string);
    return string;
}

let modelPokemon = async () =>{
    pokemonId = 'https://pokeapi.co/api/v2/pokemon/' + document.querySelector('#myInput').value;
    document.querySelector('#cardFront').style.display = "flex";

    let pokemon = await getMyPokemon(pokemonId);
    console.log(pokemon);
    pokeName.innerText = capitalise(pokemon.name);
    
    if(pokemon.sprites.other.dream_world.front_default != null){
        img.src = pokemon.sprites.other.dream_world.front_default;
    }else{
        img.src = pokemon.sprites.front_default;
    }
    img.alt = "Looks like the picture got lost on the way";

    hitpoints.innerText = `${pokemon.stats[0].base_stat} HP`;
    description.innerHTML = `${capitalise(pokemon.types[0].type.name)} Pokemon. Weight: ${pokemon.weight} lbs`;
    colourBackground(pokemon.types[0].type.name);

    attack.innerText = pokemon.stats[1].base_stat;   
    defense.innerText = pokemon.stats[2].base_stat;
    speed.innerText = pokemon.stats[5].base_stat;
    document.querySelector('#stat1Name').innerText = capitalise(pokemon.stats[1].stat.name);
    document.querySelector('#stat2Name').innerText = capitalise(pokemon.stats[2].stat.name);
    document.querySelector('#stat3Name').innerText = capitalise(pokemon.stats[5].stat.name);

    abilityName.innerHTML = `<strong>${capitalise(pokemon.abilities[0].ability.name) + `:&nbsp;`}</strong>`;

    let ability = await getMyPokemon(pokemon.abilities[0].ability.url);
    console.log(ability);
    
    for(let i = 0; i <ability.effect_entries.length; i++){
        if ( ability.effect_entries[i].language.name == "en"){
            abilityName.innerHTML += ability.effect_entries[i].short_effect;
        }
    }
    
    let move = await getMyPokemon(pokemon.moves[0].move.url);
    console.log(move);
    // moveDesc.innerHTML = movename.innerHTML + move.effect_entries[0].effect;
    moveName.innerHTML = `<strong>${capitalise(pokemon.moves[0].move.name) + `:&nbsp;`}</strong> ${move.effect_entries[0].effect}`;
    document.querySelector('#movePower').innerHTML = `<strong>Power</strong>`;
    
    if(move.power != null){
        movePower.innerText = move.power;
    }else{
        movePower.innerText = move.pp;
    }
}

submit.addEventListener('click', () => {
    modelPokemon();
});

document.addEventListener('keydown', (event) => {
  
    if (event.key === 'Enter') {
        modelPokemon();
    }
});

let colourBackground = type => {
    switch(type) {
        case 'darkness':
            document.querySelector('#cardFront').style.backgroundColor = '#2C2E2B';
            document.querySelector('div').style.color = 'rgb(255,255,255)';
            document.querySelector('#mainPic').style.backgroundColor = '#4e5441';
            break;
        case 'dragon':
            document.querySelector('#cardFront').style.backgroundColor = '#C6A114';
            document.querySelector('#mainPic').style.backgroundColor = 'rgb(226,162,74)';
            break;
        case 'fairy':
            document.querySelector('#cardFront').style.backgroundColor = '#E03A83';
            document.querySelector('#mainPic').style.backgroundColor = '#b06b8a';
            break;
        case 'fighting':
            document.querySelector('#cardFront').style.backgroundColor = '#FF501F';
            document.querySelector('div').style.color = 'black';
            document.querySelector('#mainPic').style.backgroundColor = '#eb8f75';
            break;
        case 'fire':
            document.querySelector('#cardFront').style.backgroundColor = '#E24242';
            document.querySelector('#mainPic').style.backgroundColor = '#c25959';
            break;
        case 'grass':
            document.querySelector('#cardFront').style.backgroundColor = '#7DB808';
            document.querySelector('#mainPic').style.backgroundColor = '#8cb33e';
            break;
        case 'lightning':
            document.querySelector('#cardFront').style.backgroundColor = '#FAB536';
            document.querySelector('#mainPic').style.backgroundColor = '#ffc966';
            break;
        case 'metal':
            document.querySelector('#cardFront').style.backgroundColor = '#8A776E';
            document.querySelector('#mainPic').style.backgroundColor = '#baa195';
            break;
        case 'psychic':
            document.querySelector('#cardFront').style.backgroundColor = '#A65E9A';
            document.querySelector('#mainPic').style.backgroundColor = '#b082a8';
            break;
        case 'water':
            document.querySelector('#cardFront').style.backgroundColor = '#5BC7E5';
            document.querySelector('#mainPic').style.backgroundColor = '#80cbe0';
            break;
        default:
            console.log("Wow a new type of pokemon we don't have a colour for");
            document.querySelector('#cardFront').style.backgroundColor = '#E5D6D0';
            document.querySelector('#mainPic').style.backgroundColor = '#d1ad9f';
    }
}