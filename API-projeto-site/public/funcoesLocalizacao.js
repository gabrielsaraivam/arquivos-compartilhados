function getLocalizacao(){
    var id_usuario = sessionStorage.id_usuario_meuapp;
    var cargo = sessionStorage.cargo_usuario_meuapp;
    var fkEmpresa = sessionStorage.fkEmpresa_usuario_meuapp;
    if(cargo == "Gerente"){
      id_usuario = fkEmpresa;
    }
    fetch(`/tblCaixaEletronicos/localizacao/${id_usuario}`, { cache: 'no-store' }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    resposta.reverse();
                    Cookies.set(`qtdLocalizacao`, resposta.length);
   
                    for(var i = 0; i<resposta.length; i++){
                        Cookies.set(`latitudeMaq${i+1}`, `${resposta[i].latitude}`);
                        Cookies.set(`longitudeMaq${i+1}`, `${resposta[i].longitude}`);
                    }
                    // alert(resposta[0].latitude);
                    // alert(resposta[0].longitude);
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
            .catch(function (error) {
                console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
            });
  }