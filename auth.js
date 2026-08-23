// Estado simples de autenticação na aplicação
// Este módulo guarda apenas um valor local para controlar o acesso ao cardápio.
let loggedIn = false;

// Inicia a sessão local do usuário. O login real é validado pelo backend;
// este estado permite que as telas do aplicativo saibam que o acesso foi feito.
export function login() {
  // Marca o usuário como logado
  loggedIn = true;
}

export function logout() {
  // Remove a indicação local de sessão ativa.
  loggedIn = false;
}

export function isLoggedIn() {
  // Retorna o estado atual sem alterar o valor armazenado no módulo.
  return loggedIn;
}
