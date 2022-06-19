function call(pokemonName){

    const url = "https://pokeapi.co/api/v2/pokemon/" + pokemonName

    let resp;
    let request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
        if (request.readyState == 4 && (request.status >= 200 && request.status < 400)) {
            // Success!
            resp = request.responseText;

            console.log(JSON.parse(resp));

        } else {

           alert('Pokémon inválido!')
        }
    };

    request.onerror = function() {
    //Erro na conexão
       alert("Erro na requisição:"+request);
    };

    request.send();
}


