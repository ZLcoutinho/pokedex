const container = document.querySelector('.container')
const openSecondGeneration = document.querySelector('.open-second-generation')
const openThirdGeneration = document.querySelector('.open-third-generation')
const openFourthGeneration = document.querySelector('.open-fourth-generation')
const openFifthGeneration = document.querySelector('.open-fifth-generation')
const openSixthGeneration = document.querySelector('.open-sixth-generation')
const formSearch = document.querySelector('.form-search')
const inputSearch = document.querySelector('.search')
const btnSearch = document.querySelector('.btn-search')
const filterPageContainer = document.querySelector('.filter-page-container')
const filterPage = document.querySelector('.filter-page')
const filterInput = document.querySelector('#select-type')


const colorType = {
    psychic: '#EEADD8',
    dark: '#4C4C4D',
    normal: '#DFD7AB',
    steel: '#DEDDD9',
    ice: '#82F3EE',
    fighting: '#E2B07E',
    fire: '#F8A3A3',
    ground: '#BEA382',
    flying: '#E6E2CD',
    poison: '#C691F0',
    electric: '#FCFF5F',
    water: '#6CB8FF',
    bug: '#7EAB6E',
    fairy: '#F6C3E8',
    ghost: '#6D5779',
    grass: '#98F873',
    rock: '#878886',
    dragon: '#F8A26E'
}

const colorTypeStatus = {
    psychic: '#825F87',//
    dark: '#000000',//
    normal: '#E17701',//
    steel: '#7E7E7E',//
    ice: '#017374',//
    fighting: '#95A3A6',//
    fire: '#FF7052',//
    ground: '#CB7723',//
    flying: '#9DBCD4',
    poison: '#36013F',//
    electric: '#D7D22C',//
    water: '#3D7AFD',//
    bug: '#748500',//
    fairy: '#F6688E',//
    ghost: '#6241C7',//
    grass: '#3A9272',//
    rock: '#CFAF7B',//
    dragon: '#CC6743'//
}

const colorTypeStatusCard = {
    salamance: '#D46A7E',//
    onix: '#6B7C85',//
    psychic: '#7E4071',//
    dark: '#95A3A6',//
    normal: '#D1A67A',//
    steel: '#A6A6A6',//
    ice: '#3BD3D3',//
    fighting: '#CFCFCF',//
    fire: '#FDAB48',//
    ground: '#BB3F3F',//
    flying: '#FFFD01',
    poison: '#8F8CE7',//
    electric: '#FCF767',//
    water: '#26F7FD',//
    bug: '#B9CC81',//
    fairy: '#805B87',//
    ghost: '#FFC5CB',//
    grass: '#0CB577',//
    rock: '#FFC512',//
    dragon: '#FEAD01'//
}

const principalPokemonContainer = (id, name, type, hp, attack, defense, speed, specialAttack, specialDefense) => `
<div  class="status-container" onclick="hiddenStatus(event)">
  <div class="status-wrapper" style="background-color: ${colorTypeStatus[type]};">
    <p  class="exit">X</p>
    <div class="img-status">
        <img src="./images/${id}.png" alt="${name}">
    </div><!--img-status-->
    <div class="name-type">
        <div class="type-wrapper">
            <div class="type" style="background-color: ${colorTypeStatusCard[type]};">
             <img src="./type-icos/${type}.svg" alt="type">
            </div><!--type-->
        </div><!--type-wrapper-->
        
        <p class="pokemon-name-status">
            ${name.toUpperCase()}
        </p><!--pokemon-name-status-->
    </div><!--name-type-->
    <div class="stats-base">
        <div class="stat hp">
            <p class="hp-title">Hp</p>
            <div class="percent-bar">
                <div class="percent" style="width:${hp / 2}%"></div>
            </div><!--percent-bar-->
        </div><!--hp-->
        <div class="stat attack">
            <p class="attack-title">Attack</p>
            <div class="percent-bar">
                <div class="percent" style="width:${attack / 2}%"></div>
            </div><!--percent-bar-->
        </div><!--attack-->
        <div class="stat defense">
            <p class="defense-title">Defense</p>
            <div class="percent-bar">
                <div class="percent" style="width:${defense / 2}%"></div>
            </div><!--percent-bar-->
        </div><!--defense-->
        <div class="stat speed">
            <p class="speed-title">Speed</p>
            <div class="percent-bar">
                <div class="percent" style="width:${speed / 2}%"></div>
            </div><!--percent-bar-->
        </div><!--speed-->
        <div class="stat special-attack">
            <p class="special-attack-title">Special attack</p>
            <div class="percent-bar">
                <div class="percent" style="width:${specialAttack / 2}%"></div>
            </div><!--percent-bar-->
        </div><!--special-attack-->
        <div class="stat special-defense">
            <p class="special-defense-title">Special defense</p>
            <div class="percent-bar">
                <div class="percent" style="width:${specialDefense / 2}%"></div>
            </div><!--percent-bar-->
        </div><!--special-defense-->
    </div><!--stats-base-->
 </div><!--status-wrapper-->
</div><!--status-container-->
`

const getPokemonAttribute = (atribute, pokemon) => pokemon.getAttribute(atribute)


const showPokemons = async (firstPokemonGet, lastPokemonGet, btnGenerationHide, btnGenerationShow) => {

    requestArray = []
    for (let i = firstPokemonGet; i <= lastPokemonGet; i++) {
        requestArray.push(await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`))
    }
    


    requestArray.forEach(async item => {
        let pokemon = await item.json()
        const getStats = index => pokemon.stats[index].base_stat

        const bgColor = colorType[pokemon.types[0].type.name]
        let pokemonMessage
        const hp = getStats(0)
        const attack = getStats(1)
        const defense = getStats(2)
        const specialAttack = getStats(3)
        const specialDefense = getStats(4)
        const speed = getStats(5)
        let typeTwo = ''
       
        if (pokemon.types.length >= 2) {
            typeTwo = pokemon.types[1].type.name
        }

  
        const setAtrributes = () => 
            `hp-pokemon = ${hp} attack-pokemon = ${attack} defense-pokemon = ${defense} special-attack-pokemon = ${specialAttack} special-defense-pokemon = ${specialDefense} speed-pokemon = ${speed} heigth-pokemon = ${pokemon.height} type-pokemon = ${pokemon.types[0].type.name} type-two-pokemon = ${typeTwo} weigth-pokemon = ${pokemon.weight} id-pokemon = ${pokemon.id} name-pokemon = ${pokemon.name}`

        if (pokemon.types.length === 2) {
            pokemonMessage = `${pokemon.types[0].type.name} <span class="spacing">|</span> ${pokemon.types[1].type.name}`
        } else {pokemonMessage = pokemon.types[0].type.name}
       
        
        container.innerHTML += `<div onclick="showStatus(event)" ${setAtrributes()}  style="background-color: ${bgColor}" class="${pokemon.name}  pokemon-wrapper">
        <div class="pokemon-image" ${setAtrributes()}>
            <img  src="./images/${pokemon.id}.png" alt="" ${setAtrributes()}>
        </div><!--pokemon-image-->
        <div ${setAtrributes()}  class="pokemon-info">
            <p  class="pokemon-name"${setAtrributes()}><span class="pokemon-number" ${setAtrributes()}>${pokemon.id}.</span>${pokemon.name}</p><!--pokemon-name-->
            <p  class="pokemon-type" ${setAtrributes()}>${pokemonMessage}</p>
        </div><!--pokemon-info-->
        </div><!--pokemon-wrapper-->
        
        `
    })
    
    btnGenerationHide.style.display = "none"
    btnGenerationShow.style.display = "block"
}

openSecondGeneration.addEventListener('click', () => showPokemons(152, 251, openSecondGeneration, openThirdGeneration)) 
openThirdGeneration.addEventListener('click', () => showPokemons(252, 386, openThirdGeneration, openFourthGeneration)) 
openFourthGeneration.addEventListener('click', () => showPokemons(387, 493,  openFourthGeneration))  

formSearch.addEventListener('submit', event => {
    event.preventDefault()


})


inputSearch.addEventListener('input', event => {
    const containerChildren = Array.from(container.children)
    
    containerChildren.forEach(pokemonWrapper => {        
        pokemonWrapper.classList[0].includes(inputSearch.value) 
       ? pokemonWrapper.style.display = "flex"
       :  pokemonWrapper.style.display = "none"
    })
       

})

const showStatus = (event) => {
    
    document.body.style.overflow = "hidden"
    scrollTo(0, 0)
    const pokemon = event.target

    const name = getPokemonAttribute('name-pokemon', pokemon)
    const type = getPokemonAttribute('type-pokemon', pokemon)
    const id = getPokemonAttribute('id-pokemon', pokemon)
    const hp = getPokemonAttribute('hp-pokemon', pokemon)
    const attack = getPokemonAttribute('attack-pokemon', pokemon)
    const defense = getPokemonAttribute('defense-pokemon', pokemon)
    const speed = getPokemonAttribute('speed-pokemon', pokemon)
    const specialAttack = getPokemonAttribute('special-attack-pokemon', pokemon)
    const specialDefense = getPokemonAttribute('special-defense-pokemon', pokemon)
  
    container.innerHTML += principalPokemonContainer(id, name, type, hp, attack, defense, speed, specialAttack, specialDefense)
}


const hiddenStatus = (event) => {
    
    const statusContainer = document.querySelector('.status-container')
    const classEventTarget = event.target.classList[0]
    
    
    if(classEventTarget == 'status-container' || classEventTarget === 'exit') {
        statusContainer.remove()
        document.body.style.overflow = "auto"
        return
    }

   
         
}

const generateFilter = () => {
    const arrayTypes =  Object.keys(colorType)
   

    arrayTypes.forEach(type => {
        
       return filterPage.innerHTML += `
        <div class="${type} type-wrapper-filter">
        <div class="${type} type-filter" style="background-color: ${colorTypeStatus[type]};">
         <img src="./type-icos/${type}.svg" class="${type}" alt="type">
        </div><!--type type-filter-->
    </div><!--type-wrapper-->
        `
    })
}

generateFilter()

filterInput.addEventListener('click', event => {
    const showFilterAndHiddenOverFlowBody = () => {
        document.body.style.overflow = "hidden"
        filterPageContainer.style.display = 'flex'
    } 

    
    showFilterAndHiddenOverFlowBody()
})

filterPageContainer.addEventListener('click', event => {
    const hiddenFilterAndShowOverFlowBody = () => {
        document.body.style.overflow = "auto"
        filterPageContainer.style.display = 'none'
    }

    const arrayTypes =  Object.keys(colorType)
    const type = event.target.classList[0]
    
    if(event.target.classList[0] === 'filter-page-container' ||event.target.classList.value === 'exit-filter') {
        hiddenFilterAndShowOverFlowBody()
        return
    } 

    if (!arrayTypes.includes(event.target.classList[0])) {
        return
    }
    hiddenFilterAndShowOverFlowBody()
        Array.from(container.children).forEach(item => {
        let typeTwo = item.getAttribute('type-two-pokemon') 

            if (item.getAttribute('type-pokemon') === type ||  typeTwo === type){
                item.style.display ="flex" 
                hiddenFilterAndShowOverFlowBody()
            } else {item.style.display ="none"}
             
            
        })
})


