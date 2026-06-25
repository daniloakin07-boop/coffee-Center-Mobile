// Estado simples de autenticação na aplicação
// Este módulo guarda apenas um valor local para controlar o acesso ao cardápio.
let loggedIn = false;

export function login() {
  // Marca o usuário como logado
  loggedIn = true;
}

export function logout() {
  loggedIn = false;
}

export function isLoggedIn() {
  return loggedIn;
}
