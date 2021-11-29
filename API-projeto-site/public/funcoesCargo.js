
function verificarCargo(){

    var cargo = sessionStorage.cargo_usuario_meuapp;


    if(cargo == "Analista"){
        aUser.style.display = "none";
        aCaixa.style.display = "none";
        hCargo.innerHTML = "Analista";
    }

    else if(cargo == "Gerente"){
        hCargo.innerHTML = "Gerente";
        // window.location.href = "dashboardGerente.html";
    }

    else if(cargo == "Admin"){
        hCargo.innerHTML == "Administração";
        // window.location.href = "dashboardPython.html";
    }
}
