const baseURL = "http://localhost"

/**
 * loginFirebase
 * Realiza a autenticação do usuário no firabase
 * @param {String} email - email do usuário
 * @param {String} senha - senha do usuário
 * @return {object} - Objeto com o usupario logado
 */
function loginFirebase(email, senha) {
    firebase
        .auth()
        .signInWithEmailAndPassword(email, senha)
        .then(result => {
            alert(`Bem vindo, ${JSON.stringify(result.user.email)}`)
            window.location.href = `${baseURL}/PHP/Orquestra/index.html`
        })
        .catch(error => {
            var mensagemErro = ''
            switch (error.code) {
                case 'auth/invalid-email':
                    mensagemErro = 'O e-mail informado é inválido!'
                    break;
                case 'aluth/email-already-exists':
                    mensagemErro = 'O e-mail informado já está sendo utilizado!'
                    break;
                default:
                    mensagemErro = error.message
            }
            //-----------------------------------------------------\
            // Link onde tem os erros da função code               |
            // https://firebase.google.com/docs/auth/admin/errors  |
            //-----------------------------------------------------/
            alert(`Erro ao efetuar o login: ${mensagemErro}`)
        })
}
/**
 * verificaLogado
 * Verifica se o usuário está logado no sistema
 * @param {Null}
 */
function verificaLogado() {
    firebase.auth().onAuthStateChanged(user => {
        if (!user) {
            console.log('Acesso inválido. Redirecionando...')
            window.location.href = baseURL
        }
    })
}
function logout() {
    window.location.href = `${baseURL}/PHP/Orquestra/index.html`
}