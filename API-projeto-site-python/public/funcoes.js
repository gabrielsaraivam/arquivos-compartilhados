let login_usuario;
let senha_usuario;

function redirecionar_login() {
    window.location.href = 'http://localhost:3000/index.html';
}

function verificar_autenticacao() {
    login_usuario = sessionStorage.login_usuario_meuapp;
    senha_usuario = sessionStorage.senha_usuario_meuapp;
    
    if (login_usuario == undefined)  {
        redirecionar_login();
    } else {
        b_usuario.innerHTML = senha_usuario;
        validar_sessao();
    }
    
}

function logoff() {
    finalizar_sessao();
    Cookies.remove('latitude');
    Cookies.remove('longitude');
    sessionStorage.clear();
    redirecionar_login();
}

function validar_sessao() {
    fetch(`/usuarios/sessao/${login_usuario}`, {cache:'no-store'})
    .then(resposta => {
        if (resposta.ok) {
            resposta.text().then(texto => {
                console.log('Sessão :) ', texto);    
            });
        } else {
            console.error('Sessão :.( ');
            logoff();
        } 
    });    
}

function finalizar_sessao() {
    fetch(`/usuarios/sair/${login_usuario}`, {cache:'no-store'}); 
}