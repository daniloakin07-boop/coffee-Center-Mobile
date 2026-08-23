// carrinho.js
// Módulo do carrinho de compras — equivalente ao Js/carrinho.js do projeto web.
// Usa AsyncStorage no lugar de localStorage (React Native não tem localStorage).
// Todas as funções são assíncronas — sempre use await ao chamá-las.

import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_CARRINHO = 'carrinhoCoffeeCenter';

export async function pegarCarrinho() {
  const dados = await AsyncStorage.getItem(CHAVE_CARRINHO);
  return dados ? JSON.parse(dados) : [];
}

export async function salvarCarrinho(carrinho) {
  await AsyncStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
}

// produto: item do cardapioData (precisa ter id, titulo, preco)
export async function adicionarCarrinho(produto) {
  const carrinho = await pegarCarrinho();
  const existe = carrinho.find((item) => item.id === produto.id);

  if (existe) {
    existe.quantidade++;
  } else {
    carrinho.push({
      id: produto.id,
      nome: produto.titulo,
      preco: produto.preco,
      quantidade: 1,
    });
  }

  await salvarCarrinho(carrinho);
  return produto.titulo;
}

export async function removerCarrinho(id) {
  let carrinho = await pegarCarrinho();
  carrinho = carrinho.filter((item) => item.id !== id);
  await salvarCarrinho(carrinho);
}

export async function aumentarQuantidade(id) {
  const carrinho = await pegarCarrinho();
  const item = carrinho.find((produto) => produto.id === id);

  if (item) {
    item.quantidade++;
    await salvarCarrinho(carrinho);
  }
}

export async function diminuirQuantidade(id) {
  let carrinho = await pegarCarrinho();
  const item = carrinho.find((produto) => produto.id === id);

  if (item) {
    item.quantidade--;

    if (item.quantidade <= 0) {
      carrinho = carrinho.filter((produto) => produto.id !== id);
    }

    await salvarCarrinho(carrinho);
  }
}

export async function calcularTotal() {
  const carrinho = await pegarCarrinho();
  return carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);
}

export async function limparCarrinho() {
  await AsyncStorage.removeItem(CHAVE_CARRINHO);
}