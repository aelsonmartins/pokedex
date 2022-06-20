$(document).ready(function(){
   $('.input-search').keyup(function(){
    buscaPokemon(this);
    ballAnimation();
   })
   
   //chama api carregando todos os pokemons na tela
   pokemons();
});

//funcao que carrega a tela com os dados do response
function sectionData(dataJson){
    let sectionData = document.getElementById("pokemon-data");
    let pokemon = {};
    let index;
    
    //percorre os resultados
    $.each(dataJson.results, function(index,pokemon){
        const pokemonName =  pokemon.name[0].toUpperCase() + pokemon.name.substring(1);

        //gera url da img da api
        //coloquei o +1 pq nao tem o index 0 das imgs
        const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`

        sectionData.innerHTML += `
            <div class="poke-card" title="${pokemonName}" onclick="pokemonSpec('${pokemon.url}');">
                <img src="${imgUrl}" class="pokemon-foto">
                <h5 class="poke-name">${pokemonName}</h5>
            </div>`
    })
}


//chamada da API para trazer especificações do pokemon
function pokemonSpec(url){ 
    //coloca em minusculo e retira acentos para melhorar
    //a busca do usuario e não ter erros
    let resp;
    let request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
        if (request.readyState == 4 && (request.status >= 200 && request.status < 400)) {
            // Success!
            resp = request.responseText;
            respjson = JSON.parse(resp);

            console.log(respjson);

            //monta dados na popup
            let sectionPopup = document.getElementById("popup-pokedata");
            const name =  respjson.name[0].toUpperCase() + respjson.name.substring(1);
            const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${respjson.id}.png`

            sectionPopup.innerHTML = `
            <div class="popup-header">
                <div style="text-align:center;width:90%;">
                    <h3>${name}</h3>
                </div>
                <div style="float:left;" onclick="this.parentElement.parentElement.style.display='none';">
                    <i class="fa-solid fa-xmark close-pokedata" title="Fechar" style:"right=2em;"></i>
                </div>
            </div>
            
            <div class="pop-content">
                <div>
                    <img src="${imgUrl}" alt="pokemon-foto">
                </div>

                <div>
                    <span>${JSON.stringify(name)}</span>
                </div>
            </div>

            `

            //aparece a popup
            let popup = document.getElementById('popup-pokedata')
            popup.style.display = 'flex';

        } else {

           alert('Pokémon não encontrado!')
        }
    };

    request.onerror = function() {
    //Erro na conexão
       alert("Erro na requisição:"+request);
    };

    request.send();
}

//função disparada ao carregar a pagina
//retorna todos os pokemons para listar em tela
function pokemons(){

    const url = "https://pokeapi.co/api/v2/pokemon?limit=500&offset=0"

    let resp;
    let request = new XMLHttpRequest();
    let respjson;

    request.open('GET', url, true);

    request.onload = function() {
        if (request.readyState == 4 && (request.status >= 200 && request.status < 400)) {
            // Success!
            resp = request.responseText;
            
            respjson = JSON.parse(resp);

            console.log(respjson);
            sectionData(respjson);

        } else {

           alert('Pokémon não encontrado!')
        }
    };

    request.onerror = function() {
    //Erro na conexão
       alert("Erro na requisição:"+request);
    };

    request.send();
}


function buscaPokemon(element){
    // Deixa todo mundo visivel novamente
    $(".poke-card").removeClass("hidden");

    const value = element.value[0].toUpperCase() + element.value.substring(1).toLowerCase();

    if (value != ''){
        $(".poke-card").each(function(index, element){
            const name = $(element).find(".poke-name").text();
    
            if(!name.includes(value)){
                // Some com esta linha
                $(element).addClass("hidden");
            }
        });
    }
}

function ballAnimation(){
    const ball = document.querySelector(".img-search");
    
    if(ball.style.transform == 'rotate(360deg)'){
        ball.style.transition = 'transform 0.5s'
        ball.style.transform = 'rotate(00deg)';
        ball.style.animation = '0.5s ease-in-out';
    }else{
        ball.style.transition = 'transform 0.5s'
        ball.style.transform = 'rotate(360deg)';
        ball.style.animation = '0.5s ease-in-out';
    }
}
